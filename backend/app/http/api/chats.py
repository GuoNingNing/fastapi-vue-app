import json
import logging
import os.path
import time
import uuid
from typing import List, Dict

from fastapi import APIRouter, Depends, Body
from openai.types.chat import ChatCompletionUserMessageParam, ChatCompletionMessageParam, \
    ChatCompletionAssistantMessageParam, ChatCompletionSystemMessageParam
from pydantic import BaseModel
from starlette.responses import StreamingResponse, Response

from app.http import deps
from app.http.deps import get_db
from app.models.chat import Chat
from app.models.user import User
from config.config import settings as app_settings
from config.database import openai_settings
from utils import files, youtube

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
    content: str
    stream: bool = False


@router.get("/new_sessions", dependencies=[Depends(get_db)])
def new_sessions(auth_user: User = Depends(deps.get_auth_user)):
    session_id = uuid.uuid4().hex
    Chat.insert(user_id=auth_user.id, session_id=session_id, message='[]').execute()

    return {"title": "新会话", "session_id": session_id}


@router.get("/del_sessions", dependencies=[Depends(get_db)])
def del_sessions(session_id: str, auth_user: User = Depends(deps.get_auth_user)):
    chat = Chat.get(user_id=auth_user.id, session_id=session_id)
    if chat:
        chat.delete_instance()

    return {"session_id": session_id}


@router.get("/sessions", dependencies=[Depends(get_db)])
def sessions(auth_user: User = Depends(deps.get_auth_user)):
    # 使用列表推导式获取所有 session_id
    s_id = [chat.session_id for chat in Chat.select(Chat.session_id).filter(user_id=auth_user.id)]

    return {"sessions": s_id}


@router.get("/history", dependencies=[Depends(get_db)])
def history(auth_user: User = Depends(deps.get_auth_user)):
    if auth_user.id not in user_message_history:
        user_message_history[auth_user.id] = []
    return user_message_history[auth_user.id]


@router.get("/clean", dependencies=[Depends(get_db)])
def clean(auth_user: User = Depends(deps.get_auth_user)):
    user_message_history[auth_user.id] = []


@router.post("/ask", dependencies=[Depends(get_db)])
async def ask(chat: ChatRequest, auth_user: User = Depends(deps.get_auth_user)):
    # 获取用户历史消息，如果不存在则初始化为空列表
    if auth_user.id not in user_message_history:
        user_message_history[auth_user.id] = []

    # 当前用户的历史消息
    messages = user_message_history[auth_user.id]

    if chat.content.startswith("@youtube"):
        v_info = youtube.get_best_video_info(chat.content.split("@youtube")[1], cookies_path)
        chat.content += f"""下面是从这个URL中获取的信息：
        ```json
        {json.dumps(v_info, indent=2)}
        ```
        """
        # messages.append(ChatCompletionAssistantMessageParam(role='assistant', content=_c))

    # 添加当前用户的新消息
    messages.append(ChatCompletionUserMessageParam(role='user', content=chat.content))
    logging.info(f"Asking user {auth_user.id}: {chat.content}")
    # 调用模型，发送历史消息
    response = __client.chat.completions.create(
        messages=[sys_prompt] + messages,
        model="gpt-4o-mini",
        stream=chat.stream
    )

    async def event_stream():
        _content = ""
        for chunk in response:
            if len(chunk.choices) > 0 and chunk.choices[0].delta.content is not None:
                _content += chunk.choices[0].delta.content
                yield chunk.choices[0].delta.content or ""

        messages.append(ChatCompletionAssistantMessageParam(role='assistant', content=_content))
        logging.info(messages)

    if chat.stream:
        # 返回流式响应
        return StreamingResponse(event_stream(), media_type="text/event-stream")
    else:
        logging.info(response.choices[0].message)
        return response.choices[0].message.content or ''


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
