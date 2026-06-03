"""
Security utilities: password hashing and JWT token management.
"""

import uuid
from datetime import datetime, timedelta, timezone

import jwt
from passlib.context import CryptContext

from app.config import get_settings

settings = get_settings()

# ─── Password Hashing ──────────────────────────────────────────
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    """Hash a plain-text password using bcrypt."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain-text password against a bcrypt hash."""
    return pwd_context.verify(plain_password, hashed_password)


# ─── JWT Tokens ─────────────────────────────────────────────────
def create_access_token(user_id: uuid.UUID) -> str:
    """
    Create a short-lived access token.
    Contains the user_id as 'sub' claim.
    """
    now = datetime.now(timezone.utc)
    expire = now + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    payload = {
        "sub": str(user_id),
        "type": "access",
        "iat": now,
        "exp": expire,
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")


def create_refresh_token(user_id: uuid.UUID) -> str:
    """
    Create a long-lived refresh token.
    Used to obtain a new access token without re-authenticating.
    """
    now = datetime.now(timezone.utc)
    expire = now + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)

    payload = {
        "sub": str(user_id),
        "type": "refresh",
        "iat": now,
        "exp": expire,
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")


def decode_token(token: str) -> dict:
    """
    Decode and validate a JWT token.
    Raises jwt.InvalidTokenError on failure.
    Returns the payload dict with 'sub', 'type', 'iat', 'exp'.
    """
    return jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])


def create_token_pair(user_id: uuid.UUID) -> dict[str, str]:
    """Create both access and refresh tokens for a user."""
    return {
        "access_token": create_access_token(user_id),
        "refresh_token": create_refresh_token(user_id),
        "token_type": "bearer",
    }
