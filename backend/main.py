import uvicorn

from bootstrap.application import create_app
from config.config import settings

app = create_app()

if __name__ == "__main__":
    uvicorn.run(app="main:app", host=settings.SERVER_HOST, port=settings.SERVER_PORT)
