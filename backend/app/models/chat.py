from peewee import CharField, IntegerField

from app.models.base_model import BaseModel


class Chat(BaseModel):
    class Meta:
        table_name = 'chats'

    id = IntegerField(primary_key=True)
    title = CharField()
    user_id = CharField()
    session_id = CharField()
    message = CharField()
