# import json
# import logging
#
# from fastapi import WebSocket, WebSocketDisconnect, APIRouter, Depends
#
# from app.http import deps
# from app.http.api.chats import ChatRequest, __client
# from app.http.deps import get_db
# from app.models.chat import Chat
# from app.models.user import User
# from app.schemas.msg import MsgBase
#
# router = APIRouter(
#     prefix="/chats/ws"
# )
#
#
# @router.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket,
#                              dependencies=[Depends(get_db)],
#                              auth_user: User = Depends(deps.get_auth_user)):
#     await websocket.accept()
#     try:
#         while True:
#             # 接收客户端的 JSON 消息
#             data = await websocket.receive_json()
#             chatR = ChatRequest(**data)
#
#             if chatR.session_id is None:
#                 chatR.session_id = uuid.uuid4().hex
#             chat = Chat.get_or_create(user_id=auth_user.id, session_id=chatR.session_id)[0]
#
#             messages = json.loads(chat.message)
#             messages.append(MsgBase.user(chatR.content))
#             logging.info(f"Asking user {auth_user.id}: {messages}")
#
#             response = __client.chat.completions.create(
#                 messages=messages,
#                 model="gpt-4o-mini",
#                 stream=True
#             )
#
#             __content = ""
#             for chunk in response:
#                 if len(chunk.choices) > 0:
#                     _c = chunk.choices[0].delta.content or ""
#                     __content += _c
#                     await websocket.send_text(_c)
#
#             messages.append(MsgBase.assistant(__content))
#
#             # 发送响应后保存聊天记录
#             logging.info(f"Saved message: {messages}")
#             chat.message = json.dumps(messages)
#             chat.save()
#
#     except WebSocketDisconnect:
#         logging.info(f"Client disconnected")
#         await websocket.close()
