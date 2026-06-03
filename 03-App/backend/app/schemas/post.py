"""
Post schemas for the social feed.
"""

import uuid
from datetime import datetime

from pydantic import BaseModel, Field

from app.schemas.user import UserBriefResponse


class PostCreate(BaseModel):
    """Create a new post."""

    content: str = Field(..., min_length=1, max_length=5000)
    image_urls: list[str] | None = None


class PostUpdate(BaseModel):
    """Update an existing post."""

    content: str | None = Field(None, min_length=1, max_length=5000)


class PostResponse(BaseModel):
    """Post data returned by the API."""

    id: uuid.UUID
    content: str
    image_urls: list[str] | None = None
    author: UserBriefResponse
    likes_count: int = 0
    comments_count: int = 0
    is_liked: bool = False  # Whether the current user has liked this post
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class CommentCreate(BaseModel):
    """Create a comment on a post."""

    content: str = Field(..., min_length=1, max_length=2000)


class CommentResponse(BaseModel):
    """Comment data returned by the API."""

    id: uuid.UUID
    content: str
    author: UserBriefResponse
    post_id: uuid.UUID
    created_at: datetime

    model_config = {"from_attributes": True}
