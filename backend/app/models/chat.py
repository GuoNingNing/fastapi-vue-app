import uuid
from datetime import datetime

from peewee import CharField, IntegerField

from app.models.base_model import BaseModel


class Chat(BaseModel):
    class Meta:
        table_name = 'chats'

    id = IntegerField(primary_key=True)
    title = CharField(default=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    user_id = CharField()
    session_id = CharField(default=uuid.uuid4().hex)
    message = CharField(default='[]')
