from fastapi import APIRouter, Depends, Body

from app.http import deps
from app.http.deps import get_db
from app.models.user import User
from app.schemas.user import UserDetail
from app.services.auth import hashing

router = APIRouter(
    prefix="/users"
)


@router.get("/me", response_model=UserDetail, dependencies=[Depends(get_db)])
def me(auth_user: User = Depends(deps.get_auth_user)):
    """
    当前登录用户信息
    """
    return auth_user


@router.post("/add_user", dependencies=[Depends(get_db)])
def add_user(username: str = Body(..., embed=True),
             password: str = Body(..., embed=True),
             auth_user: User = Depends(deps.get_auth_user)):
    if auth_user.username == 'tamer':
        password = hashing.get_password_hash(password)
        user = User.create(username=username, password=password)
        return user
    else:
        return "没有权限"
