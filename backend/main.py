import uvicorn
from starlette.responses import HTMLResponse
from starlette.templating import Jinja2Templates

from bootstrap.application import create_app
from config.config import settings

app = create_app()

from fastapi import WebSocket, Request

templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
def read_index(request: Request):
    # Render the HTML template
    return templates.TemplateResponse("index.html", {"request": request})


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        print('data', data)
        await websocket.send_text(data)


if __name__ == "__main__":
    uvicorn.run(app="main:app", host=settings.SERVER_HOST, port=settings.SERVER_PORT)
    # db = SqliteDatabase('/Users/guoning/Workspace/fastapi-vue-app/backend/database/fastapi.db')
    # print(db.)
