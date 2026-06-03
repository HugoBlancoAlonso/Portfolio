"""
User schemas for request/response serialization.
"""

import uuid
from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class UserResponse(BaseModel):
    """Public user data returned by the API."""

    id: uuid.UUID
    email: EmailStr | None = None
    username: str | None = None
    phone_number: str | None = None
    full_name: str | None = None
    avatar_url: str | None = None
    bio: str | None = None
    is_active: bool
    is_verified: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class UserProfileResponse(UserResponse):
    """Extended user profile with social stats."""

    followers_count: int = 0
    following_count: int = 0
    posts_count: int = 0


class UserUpdate(BaseModel):
    """Fields that can be updated by the user."""

    full_name: str | None = Field(None, min_length=1, max_length=255)
    username: str | None = Field(None, min_length=4, max_length=50)
    avatar_url: str | None = None
    bio: str | None = Field(None, max_length=500)
    email: EmailStr | None = None
    phone_number: str | None = Field(None, min_length=5, max_length=20)


class UserBriefResponse(BaseModel):
    """Minimal user info for embedding in posts, comments, etc."""

    id: uuid.UUID
    username: str | None = None
    full_name: str | None = None
    avatar_url: str | None = None

    model_config = {"from_attributes": True}
