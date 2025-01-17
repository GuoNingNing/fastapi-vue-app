from pydantic import BaseModel


# Shared properties
class ChatBase(BaseModel):
    id: int
    title: str
    user_id: str
    session_id: str
    message: str = None

    class Config:
        orm_mode = True


class ChatSession(BaseModel):
    title: str
    session_id: str
