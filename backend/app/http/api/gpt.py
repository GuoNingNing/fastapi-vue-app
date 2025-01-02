import os

from fastapi import APIRouter, Depends

from app.http.deps import get_db

router = APIRouter(
    prefix="/gpt"
)

from openai import OpenAI

__client = OpenAI(
    base_url=os.environ.get("OPENAI_BASE_URL"),  # This is the default and can be omitted
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)


@router.get("/")
def index():
    return "Gpt"


@router.post("/ask", dependencies=[Depends(get_db)])
def ask(content: str):
    messages = [{'role': 'user', 'content': content}]

    response = __client.chat.completions.create(
        messages=messages,
        model="gpt-4o-mini",
    )
    return response.choices[0].message.content or ""
