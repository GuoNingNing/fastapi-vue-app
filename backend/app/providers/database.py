from contextvars import ContextVar

import redis
#
from peewee import _ConnectionState, SqliteDatabase

from config.database import db_settings, redis_settings

# from peewee import _ConnectionState, MySQLDatabase
# from playhouse.pool import PooledMySQLDatabase

db_state_default = {"closed": None, "conn": None, "ctx": None, "transactions": None}
db_state = ContextVar("db_state", default=db_state_default.copy())


class PeeweeConnectionState(_ConnectionState):
    def __init__(self, **kwargs):
        super().__setattr__("_state", db_state)
        super().__init__(**kwargs)

    def __setattr__(self, name, value):
        self._state.get()[name] = value

    def __getattr__(self, name):
        return self._state.get()[name]


async def reset_db_state():
    db._state._state.set(db_state_default.copy())
    db._state.reset()


# db = MySQLDatabase(
#     settings.DB_DATABASE,
#     user=settings.DB_USER,
#     host=settings.DB_HOST,
#     password=settings.DB_PASSWORD,
#     port=settings.DB_PORT
# )

db = SqliteDatabase(db_settings.DB_DATABASE, check_same_thread=False)

db._state = PeeweeConnectionState()

# redis
# redis_client = redis.Redis(
#     host=redis_settings.REDIS_HOST,
#     port=redis_settings.REDIS_PORT,
#     db=redis_settings.REDIS_DB,
#     password=redis_settings.REDIS_PASSWORD,
#     decode_responses=True
# )
redis_pool = redis.ConnectionPool(
    host=redis_settings.REDIS_HOST,
    port=redis_settings.REDIS_PORT,
    db=redis_settings.REDIS_DB,
    password=redis_settings.REDIS_PASSWORD,
    decode_responses=True
)
redis_client = redis.Redis(connection_pool=redis_pool)
