from peewee import SqliteDatabase

from bootstrap.application import create_app
from config.config import settings
import uvicorn

app = create_app()


@app.get("/")
async def root():
    return "welcome to fastapi skeleton"


if __name__ == "__main__":
    uvicorn.run(app="main:app", host=settings.SERVER_HOST, port=settings.SERVER_PORT)
    # db = SqliteDatabase('/Users/guoning/Workspace/fastapi-vue-app/backend/database/fastapi.db')
    # print(db.)

