from routes.api import api_router


def boot(app):
    # 注册api路由[routes/api.py]
    app.include_router(api_router, prefix="/api")
