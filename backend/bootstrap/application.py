import logging

from fastapi import FastAPI
from fastapi.routing import APIRoute

from app.providers import app_provider
from app.providers import logging_provider
from app.providers import handle_exception
from app.providers import route_provider


def custom_generate_unique_id(route: APIRoute):
    if len(route.tags):
        return f"{route.tags[0]}-{route.name}"
    else:
        print(route)
        return f"{route.name}"


def create_app() -> FastAPI:
    app = FastAPI(generate_unique_id_function=custom_generate_unique_id)

    register(app, logging_provider)
    register(app, app_provider)
    register(app, handle_exception)

    boot(app, route_provider)

    return app


def register(app, provider):
    provider.register(app)
    logging.info(provider.__name__ + ' registered')


def boot(app, provider):
    provider.boot(app)
    logging.info(provider.__name__ + ' booted')
