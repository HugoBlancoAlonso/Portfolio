"""
Shared FastAPI dependencies used across endpoints.
"""

import uuid
from typing import Annotated

import jwt
from fastapi import Depends, Header
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import get_settings
from app.core.exceptions import UnauthorizedException
from app.database import get_db
from app.models.user import User
from app.services import user_service

settings = get_settings()


async def get_current_user(
    authorization: Annotated[str, Header()],
    db: AsyncSession = Depends(get_db),
) -> User:
    """
    Dependency that extracts and validates the JWT from the Authorization header.
    Returns the authenticated User or raises 401.

    Usage:
        @router.get("/protected")
        async def protected(user: User = Depends(get_current_user)):
            ...
    """
    if not authorization.startswith("Bearer "):
        raise UnauthorizedException("Invalid authorization header format")

    token = authorization.removeprefix("Bearer ").strip()

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        raise UnauthorizedException("Token has expired")
    except jwt.InvalidTokenError:
        raise UnauthorizedException("Invalid token")

    if payload.get("type") != "access":
        raise UnauthorizedException("Invalid token type")

    user_id_str = payload.get("sub")
    if not user_id_str:
        raise UnauthorizedException("Token missing user ID")

    try:
        user_id = uuid.UUID(user_id_str)
    except ValueError:
        raise UnauthorizedException("Invalid user ID in token")

    user = await user_service.get_user_by_id(db, user_id)
    if not user.is_active:
        raise UnauthorizedException("User account is deactivated")

    return user
