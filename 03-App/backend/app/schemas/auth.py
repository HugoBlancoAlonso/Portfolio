"""
Authentication schemas for login, register, tokens, and OAuth.
"""

from pydantic import BaseModel, EmailStr, Field


class LoginRequest(BaseModel):
    """Payload for logging in with email, phone or username."""

    identifier: str = Field(..., description="Email, phone number or username")
    password: str = Field(..., min_length=8, max_length=128)


class RegisterRequest(BaseModel):
    """New user registration."""

    email: EmailStr | None = None
    phone_number: str | None = None
    password: str = Field(..., min_length=8, max_length=128)
    username: str = Field(..., min_length=4, max_length=50)


class TokenResponse(BaseModel):
    """JWT token pair returned after login/register."""

    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class RefreshRequest(BaseModel):
    """Request to refresh an expired access token."""

    refresh_token: str

class ChangePasswordRequest(BaseModel):
    """Change user password."""

    current_password: str
    new_password: str = Field(..., min_length=8, max_length=128)


class GoogleLoginRequest(BaseModel):
    """Google OAuth login — receives the ID token from the mobile app."""

    id_token: str


class AppleLoginRequest(BaseModel):
    """Apple Sign In — receives the identity token and user info."""

    identity_token: str
    full_name: str | None = None  # Apple only sends name on first login
