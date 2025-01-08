from pydantic import BaseModel


# Shared properties
class ChatBase(BaseModel):
    id: int
    title: str
    user_id: str
    session_id: str

    class Config:
        orm_mode = True
