from datetime import datetime

from pydantic import BaseModel

from app.support.helper import format_datetime


class MsgBase(BaseModel):
    role: str
    content: str
    timestamp: str

    @staticmethod
    def user(content: str) -> "MsgBase":
        return MsgBase(role="user", content=content, timestamp=format_datetime(datetime.now())).dict()

    @staticmethod
    def assistant(content: str) -> "MsgBase":
        return MsgBase(role="assistant", content=content, timestamp=format_datetime(datetime.now())).dict()
