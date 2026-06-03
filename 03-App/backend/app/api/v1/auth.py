"""
Authentication endpoints: register, login, refresh, OAuth (Google, Apple).
"""

import jwt
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import BadRequestException, UnauthorizedException
from app.core.oauth import verify_apple_token, verify_google_token
from app.core.security import create_token_pair, decode_token, verify_password, hash_password
from app.database import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.database import get_db
from app.schemas.auth import (
    AppleLoginRequest,
    GoogleLoginRequest,
    LoginRequest,
    RefreshRequest,
    RegisterRequest,
    TokenResponse,
    ChangePasswordRequest,
)
from app.services import user_service

router = APIRouter(prefix="/auth", tags=["Authentication"])


# ─── Email/Password ────────────────────────────────────────────


@router.post("/register", response_model=TokenResponse, status_code=201)
async def register(data: RegisterRequest, db: AsyncSession = Depends(get_db)):
    """Register a new user with email/phone and password."""
    user = await user_service.create_user(
        db,
        email=data.email,
        phone_number=data.phone_number,
        password=data.password,
        username=data.username,
    )
    return create_token_pair(user.id)


@router.post("/login", response_model=TokenResponse)
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    """Login with email, phone or username and password."""
    user = await user_service.authenticate_user(db, data.identifier, data.password)
    if not user:
        raise UnauthorizedException("Usuario no encontrado")
    return create_token_pair(user.id)


@router.put("/password", response_model=dict)
async def change_password(
    data: ChangePasswordRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Change the user's password."""
    if not current_user.hashed_password:
        raise BadRequestException("OAuth users cannot change password this way")
        
    if not verify_password(data.current_password, current_user.hashed_password):
        raise BadRequestException("Current password is incorrect")
        
    if data.current_password == data.new_password:
        raise BadRequestException("New password cannot be the same as the current password")
        
    current_user.hashed_password = hash_password(data.new_password)
    await db.flush()
    
    return {"message": "Password changed successfully"}


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(data: RefreshRequest, db: AsyncSession = Depends(get_db)):
    """Exchange a refresh token for a new token pair."""
    try:
        payload = decode_token(data.refresh_token)
    except jwt.ExpiredSignatureError:
        raise UnauthorizedException("Refresh token has expired, please login again")
    except jwt.InvalidTokenError:
        raise UnauthorizedException("Invalid refresh token")

    if payload.get("type") != "refresh":
        raise BadRequestException("Invalid token type, expected refresh token")

    import uuid

    user_id = uuid.UUID(payload["sub"])
    user = await user_service.get_user_by_id(db, user_id)

    if not user.is_active:
        raise UnauthorizedException("User account is deactivated")

    return create_token_pair(user.id)


# ─── OAuth ──────────────────────────────────────────────────────


@router.post("/login/google", response_model=TokenResponse)
async def login_with_google(
    data: GoogleLoginRequest, db: AsyncSession = Depends(get_db)
):
    """
    Login with Google OAuth.
    The mobile app authenticates with Google and sends the ID token.
    """
    try:
        oauth_info = await verify_google_token(data.id_token)
    except ValueError as e:
        raise BadRequestException(str(e))

    user = await user_service.create_or_get_oauth_user(
        db,
        provider=oauth_info.provider,
        provider_user_id=oauth_info.provider_user_id,
        email=oauth_info.email,
        full_name=oauth_info.full_name,
        avatar_url=oauth_info.avatar_url,
    )
    return create_token_pair(user.id)


@router.post("/login/apple", response_model=TokenResponse)
async def login_with_apple(data: AppleLoginRequest, db: AsyncSession = Depends(get_db)):
    """
    Login with Apple Sign-In.
    The mobile app authenticates with Apple and sends the identity token.
    """
    try:
        oauth_info = await verify_apple_token(data.identity_token)
    except ValueError as e:
        raise BadRequestException(str(e))

    # Apple only sends full_name on first login
    if data.full_name:
        oauth_info.full_name = data.full_name

    user = await user_service.create_or_get_oauth_user(
        db,
        provider=oauth_info.provider,
        provider_user_id=oauth_info.provider_user_id,
        email=oauth_info.email,
        full_name=oauth_info.full_name,
    )
    return create_token_pair(user.id)
