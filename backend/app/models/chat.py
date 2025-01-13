import uuid

from peewee import CharField, IntegerField

from app.models.base_model import BaseModel


class Session(BaseModel):
    class Meta:
        table_name = 'sessions'

    id = IntegerField(primary_key=True)
    user_id = CharField()
    session_id = CharField(default=uuid.uuid4().hex)


class Chat(BaseModel):
    class Meta:
        table_name = 'chats'

    id = IntegerField(primary_key=True)
    title = CharField(default='New Chat')
    user_id = CharField()
    session_id = CharField(default=uuid.uuid4().hex)
    message = CharField(default='[]')
