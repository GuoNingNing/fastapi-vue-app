import os
from typing import List, Dict
from fastapi import APIRouter, Depends, Body
from openai.types.chat import ChatCompletionMessage, ChatCompletionUserMessageParam, ChatCompletionMessageParam, \
    ChatCompletionAssistantMessageParam
from starlette.responses import StreamingResponse

from app.http import deps
from app.http.deps import get_db
from app.models.user import User
from config.database import openai_settings

router = APIRouter(
    prefix="/gpt"
)

from openai import OpenAI

__client = OpenAI(
    base_url=openai_settings.OPENAI_BASE_URL,  # This is the default and can be omitted
    api_key=openai_settings.OPENAI_API_KEY,  # This is the default and can be omitted
)


# 假设这是一个全局存储（仅供示例使用，生产环境建议使用数据库或缓存）
user_message_history: Dict[int, List[ChatCompletionMessageParam]] = {}

@router.get("/history",dependencies=[Depends(get_db)])
def history(auth_user: User = Depends(deps.get_auth_user)):
    if auth_user.id not in user_message_history:
        user_message_history[auth_user.id] = []
    print(auth_user.id,user_message_history[auth_user.id])
    return user_message_history[auth_user.id]


@router.get("/ask", dependencies=[Depends(get_db)])
async def ask(content: str, auth_user: User = Depends(deps.get_auth_user)):
    # 获取用户历史消息，如果不存在则初始化为空列表
    if auth_user.id not in user_message_history:
        user_message_history[auth_user.id] = []

    # 当前用户的历史消息
    messages = user_message_history[auth_user.id]

    # 添加当前用户的新消息
    messages.append(ChatCompletionUserMessageParam(role='user',content=content))

    async def event_stream():
        # 调用模型，发送历史消息
        response = __client.chat.completions.create(
            messages=messages,
            model="gpt-4o-mini",
            stream=True
        )
        _content = ""
        for chunk in response:
            if len(chunk.choices) > 0 and chunk.choices[0].delta.content is not None:
                _content += chunk.choices[0].delta.content
                print(_content)
                yield chunk.choices[0].delta.content
            else:
                messages.append(ChatCompletionAssistantMessageParam(role='assistant', content=_content))
                print(messages)

    # 返回流式响应
    return StreamingResponse(event_stream(), media_type="text/event-stream")

