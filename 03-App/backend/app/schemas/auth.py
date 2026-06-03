"""
Authentication schemas for login, register, tokens, and OAuth.
"""

from pydantic import BaseModel, EmailStr, Field


class LoginRequest(BaseModel):
    """Email/password login."""

    email: EmailStr
    password: str = Field(..., min_length=8, max_length=128)


class RegisterRequest(BaseModel):
    """New user registration."""

    email: EmailStr
    password: str = Field(..., min_length=8, max_length=128)
    full_name: str = Field(..., min_length=1, max_length=255)


class TokenResponse(BaseModel):
    """JWT token pair returned after login/register."""

    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class RefreshRequest(BaseModel):
    """Request to refresh an expired access token."""

    refresh_token: str


class GoogleLoginRequest(BaseModel):
    """Google OAuth login — receives the ID token from the mobile app."""

    id_token: str


class AppleLoginRequest(BaseModel):
    """Apple Sign In — receives the identity token and user info."""

    identity_token: str
    full_name: str | None = None  # Apple only sends name on first login
