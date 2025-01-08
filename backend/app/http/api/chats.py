import json
import logging
import os.path
import time
import uuid
from datetime import datetime
from typing import List, Dict

from fastapi import APIRouter, Depends, Body
from openai.types.chat import ChatCompletionMessageParam, \
    ChatCompletionSystemMessageParam
from pydantic import BaseModel
from starlette.background import BackgroundTask
from starlette.responses import StreamingResponse, Response

from app.http import deps
from app.http.deps import get_db
from app.models.chat import Chat
from app.models.user import User
from config.config import settings as app_settings
from config.database import openai_settings
from utils import files

router = APIRouter(
    prefix="/chats"
)

from openai import OpenAI

__client = OpenAI(
    base_url=openai_settings.OPENAI_BASE_URL,  # This is the default and can be omitted
    api_key=openai_settings.OPENAI_API_KEY,  # This is the default and can be omitted
)

cookies_path = os.path.join(app_settings.BASE_PATH, "storage", "cookies.txt")

# 假设这是一个全局存储（仅供示例使用，生产环境建议使用数据库或缓存）
user_message_history: Dict[int, List[ChatCompletionMessageParam]] = {}
sys_prompt = ChatCompletionSystemMessageParam(role='system',
                                              name='Tamer',
                                              content='You are a very helpful robot.')


class ChatRequest(BaseModel):
    session_id: str
    content: str = None
    stream: bool = False


@router.get("/new_session", dependencies=[Depends(get_db)])
def new_session(auth_user: User = Depends(deps.get_auth_user)):
    chat = Chat(user_id=auth_user.id, session_id=uuid.uuid4().hex)
    logging.info(f"New session created: {chat}")
    chat.save()
    return chat.__data__


@router.get("/del_session", dependencies=[Depends(get_db)])
def del_session(session_id: str, auth_user: User = Depends(deps.get_auth_user)):
    chat = Chat.get(user_id=auth_user.id, session_id=session_id)
    if chat:
        chat.delete_instance()

    return chat.__data__


@router.get("/get_session", dependencies=[Depends(get_db)])
def get_session(session_id: str, auth_user: User = Depends(deps.get_auth_user)):
    chat = Chat.get_or_none(user_id=auth_user.id, session_id=session_id)
    return chat.__data__


@router.get("/list_session", dependencies=[Depends(get_db)])
def list_session(auth_user: User = Depends(deps.get_auth_user)):
    # 使用列表推导式获取所有 session_id
    chats = [c.__data__ for c in Chat.filter(user_id=auth_user.id).order_by(Chat.created_at.desc())]

    return chats


@router.post("/ask", dependencies=[Depends(get_db)])
def ask(chatR: ChatRequest, auth_user: User = Depends(deps.get_auth_user)):
    if chatR.session_id == '':
        chatR.session_id = uuid.uuid4().hex
    chat = Chat.get_or_create(user_id=auth_user.id, session_id=chatR.session_id)[0]

    messages = json.loads(chat.message)

    messages.append({'role': 'user', 'content': chatR.content, 'timestamp': int(datetime.now().timestamp())})
    # 添加当前用户的新消息
    logging.info(f"Asking user {auth_user.id}: {json.dumps(messages)}")
    # 调用模型，发送历史消息
    response = __client.chat.completions.create(
        messages=messages,
        model="gpt-4o-mini",
        stream=chatR.stream
    )

    async def __event_stream():
        _content = ""
        for chunk in response:
            if len(chunk.choices) > 0 and chunk.choices[0].delta.content is not None:
                _content += chunk.choices[0].delta.content
                yield chunk.choices[0].delta.content or ""

        messages.append({'role': 'assistant', 'content': _content, 'timestamp': int(datetime.now().timestamp())})

    def __save_data(data):
        chat.message = json.dumps(data)
        chat.save()
        logging.info(f"Saved message: {chat.__data__}")

    db_task = BackgroundTask(__save_data, data=messages)

    if chatR.stream:
        # 返回流式响应
        return StreamingResponse(__event_stream(), media_type="text/event-stream", background=db_task)
    else:
        _content = response.choices[0].message or ""
        messages.append({'role': 'assistant', 'content': _content, 'timestamp': int(datetime.now().timestamp())})
        __save_data(messages)
        return _content


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


# 事件流生成器
def event_stream():
    while True:
        time.sleep(1)
        yield f"data: {time.time()}\n\n"


@router.get("/events")
async def get_events():
    return StreamingResponse(event_stream(), media_type="text/event-stream")
