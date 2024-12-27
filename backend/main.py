from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
from typing import Any, Optional
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse

app = FastAPI()

# 配置允许跨域请求
origins = [
    "http://localhost:5173",  # 允许来自前端开发服务器的请求
    "http://localhost",  # 如果前端可能在 localhost 上运行
    "http://127.0.0.1",  # 如果前端可能在 127.0.0.1 上运行
]

# 配置 CORS 中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 允许的源
    allow_credentials=True,
    allow_methods=["*"],  # 允许所有 HTTP 方法
    allow_headers=["*"],  # 允许所有 HTTP 请求头
)


# 定义通用的响应模型
class ResponseModel(BaseModel):
    code: int
    message: str
    data: Optional[Any] = None
    error: Optional[str] = None

    class Config:
        orm_mode = True


@app.get("/user/{user_id}", response_model=ResponseModel)
async def get_user(user_id: int):
    if user_id == 0:
        # 用户不存在时，返回错误信息
        return ResponseModel(code=404, message="用户不存在", error="User not found")
    else:
        # 正常返回用户数据
        user_data = {"user_id": user_id, "username": f"user{user_id}"}
        return ResponseModel(code=200, message="请求成功", data=user_data)


@app.get("/items/{item_id}", response_model=ResponseModel)
async def get_item(item_id: int):
    if item_id == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return ResponseModel(code=200, message="请求成功", data={"item_id": item_id})


@app.get("/error_example", response_model=ResponseModel)
async def error_example():
    raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail="内部服务器错误"
    )


# 全局异常处理，统一错误响应格式
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "code": exc.status_code,
            "message": exc.detail,
            "data": None,
            "error": exc.detail
        }
    )
