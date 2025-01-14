import json
import logging
import os.path
import uuid
from typing import List, Dict

from fastapi import WebSocket, WebSocketDisconnect, APIRouter, Depends, Body, Query
from openai.types.chat import ChatCompletionMessageParam, \
    ChatCompletionSystemMessageParam
from pydantic import BaseModel
from starlette.background import BackgroundTask
from starlette.responses import StreamingResponse, Response

from app.http import deps
from app.http.deps import get_db
from app.models.chat import Chat
from app.models.user import User
from app.schemas.chat import ChatBase, ChatSession
from app.schemas.msg import MsgBase
from app.support import gpt
from config.config import settings as app_settings
from utils import files

router = APIRouter(
    prefix="/chats"
)

cookies_path = os.path.join(app_settings.BASE_PATH, "storage", "cookies.txt")

# 假设这是一个全局存储（仅供示例使用，生产环境建议使用数据库或缓存）
user_message_history: Dict[int, List[ChatCompletionMessageParam]] = {}
sys_prompt = ChatCompletionSystemMessageParam(role='system',
                                              name='Tamer',
                                              content='You are a very helpful robot.')


class ChatRequest(BaseModel):
    content: str
    session_id: str = None
    stream: bool = False


@router.get("/new", response_model=ChatSession, dependencies=[Depends(get_db)])
def new_session(auth_user: User = Depends(deps.get_auth_user)):
    chat = Chat.create(user_id=auth_user.id, session_id=uuid.uuid4().hex)
    logging.info(f"New session created: {chat}")
    chat.save()
    return chat.__data__


@router.get("/del", dependencies=[Depends(get_db)])
def del_session(session_id: str, auth_user: User = Depends(deps.get_auth_user)):
    chat = Chat.get(user_id=auth_user.id, session_id=session_id)
    if chat:
        logging.info(f"Deleting session: {chat}")
        chat.delete_instance()


@router.get("/get", response_model=ChatBase, dependencies=[Depends(get_db)])
def get_session(session_id: str, auth_user: User = Depends(deps.get_auth_user)):
    return Chat.get_or_none(user_id=auth_user.id, session_id=session_id)


@router.get("/list", response_model=list[ChatSession], dependencies=[Depends(get_db)])
def list_session(auth_user: User = Depends(deps.get_auth_user)):
    """
    获取所有session
    :param auth_user:
    :return:
    """

    chats = Chat.filter(user_id=auth_user.id).order_by(Chat.created_at.desc())
    return [c.__data__ for c in chats]


@router.get("/title", response_model=ChatSession, dependencies=[Depends(get_db)])
def title(session_id: str, auth_user: User = Depends(deps.get_auth_user)):
    """
    生成标题
    :param session_id:
    :param auth_user:
    :return:
    """
    prompt = "请根据我们的对话，提取出一个不超过5个字的标题（可以加一些趣味性的emij）。请仅输出标题，不要有任何别的描述。"

    chat = Chat.get(user_id=auth_user.id, session_id=session_id)

    if chat is None:
        return {"title": 'New Chat', "session_id": session_id}

    messages = json.loads(chat.message)
    messages.append(MsgBase.user(prompt))
    chat.title = list(gpt.text(messages, False))[0]
    chat.update(title=chat.title).where(Chat.id == chat.id).execute()
    return {"title": chat.title, "session_id": session_id}


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, token: str = Query(..., alias="token")):
    auth_user = deps.get_auth_user(token)
    logging.info(f"WebSocket connection with token: {auth_user.username}")

    await websocket.accept()
    try:
        while True:
            # 接收客户端的 JSON 消息
            data = await websocket.receive_json()
            chatR = ChatRequest(**data)

            logging.info(f"Received message: {chatR}")
            if chatR.session_id is None:
                chatR.session_id = uuid.uuid4().hex
            chat = Chat.get_or_create(user_id=auth_user.id, session_id=chatR.session_id)[0]

            messages = json.loads(chat.message)
            messages.append(MsgBase.user(chatR.content))
            logging.info(f"Asking user {auth_user.id}: {messages}")

            __content = ""
            for text in gpt.text(messages, True):
                __content += text
                await websocket.send_text(text)

            replay = MsgBase.assistant(__content)
            messages.append(replay)

            # 发送响应后保存聊天记录
            logging.info(f"Saved message: {messages}")
            chat.message = json.dumps(messages)
            chat.save()
            await websocket.send_text(f"END{replay['timestamp']}DNE")

    except WebSocketDisconnect:
        logging.info(f"Client disconnected")
        await websocket.close()


@router.post("/ask", dependencies=[Depends(get_db)])
def ask(chatR: ChatRequest, auth_user: User = Depends(deps.get_auth_user)):
    logging.info(f"Received message: {chatR}")

    if chatR.session_id is None or chatR.session_id == '':
        chatR.session_id = uuid.uuid4().hex
    chat = Chat.get_or_create(user_id=auth_user.id, session_id=chatR.session_id)[0]

    messages = json.loads(chat.message)
    messages.append(MsgBase.user(chatR.content))

    async def __event_stream():
        __content = ""
        for text in gpt.text(messages, True):
            __content += text
            yield text

        __msg = MsgBase.assistant(__content)
        yield f"#END#{__msg['timestamp']}"

        messages.append(__msg)

    def __save_data(data):
        logging.debug(f"Saved message: {data}")
        chat.message = json.dumps(data)
        chat.save()

    if chatR.stream:
        # 返回流式响应
        return StreamingResponse(__event_stream(),
                                 media_type="text/event-stream",
                                 background=BackgroundTask(__save_data, data=messages))
    else:
        msg = list(gpt.text(messages))
        messages.append(MsgBase.assistant(msg[0]))
        __save_data(messages)
        return msg[0]


@router.post("/set_sys_prompt", dependencies=[Depends(get_db)])
async def set_sys_prompt(name: str = Body(..., embed=True),
                         content: str = Body(..., embed=True),
                         auth_user: User = Depends(deps.get_auth_user)):
    sys_prompt = ChatCompletionSystemMessageParam(role='system',
                                                  name=name,
                                                  content=content)
    logging.info(auth_user.id, sys_prompt)
    return Response()


@router.get("/get_sys_prompt", dependencies=[Depends(get_db)])
def get_sys_prompt(auth_user: User = Depends(deps.get_auth_user)):
    return sys_prompt


@router.post("/set_cookies", dependencies=[Depends(get_db)])
async def set_cookies(cookies: str = Body(..., embed=True), auth_user: User = Depends(deps.get_auth_user)):
    files.write_file(cookies_path, cookies)
