"""
Post endpoints: CRUD, feed, likes, comments.
"""

import uuid

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.database import get_db
from app.models.user import User
from app.schemas.common import MessageResponse, PaginatedResponse
from app.schemas.post import (
    CommentCreate,
    CommentResponse,
    PostCreate,
    PostResponse,
    PostUpdate,
)
from app.services import post_service

router = APIRouter(prefix="/posts", tags=["Posts"])


# ─── Helper to enrich post response ───────────────────────────


async def _enrich_post(db: AsyncSession, post, current_user_id: uuid.UUID) -> dict:
    """Add likes_count, comments_count, and is_liked to a post."""
    likes_count = await post_service.get_likes_count(db, post.id)
    comments_count = await post_service.get_comments_count(db, post.id)
    is_liked = await post_service.has_user_liked(db, current_user_id, post.id)

    return {
        "id": post.id,
        "content": post.content,
        "image_urls": post.image_urls,
        "author": post.author,
        "likes_count": likes_count,
        "comments_count": comments_count,
        "is_liked": is_liked,
        "created_at": post.created_at,
        "updated_at": post.updated_at,
    }


# ─── Posts CRUD ────────────────────────────────────────────────


@router.post("/", response_model=PostResponse, status_code=201)
async def create_post(
    data: PostCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create a new post."""
    post = await post_service.create_post(db, current_user.id, data)
    enriched = await _enrich_post(db, post, current_user.id)
    return PostResponse(**enriched)


@router.get("/{post_id}", response_model=PostResponse)
async def get_post(
    post_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get a single post by ID."""
    post = await post_service.get_post_by_id(db, post_id)
    enriched = await _enrich_post(db, post, current_user.id)
    return PostResponse(**enriched)


@router.put("/{post_id}", response_model=PostResponse)
async def update_post(
    post_id: uuid.UUID,
    data: PostUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Update a post. Only the author can update."""
    post = await post_service.update_post(db, post_id, current_user.id, data)
    enriched = await _enrich_post(db, post, current_user.id)
    return PostResponse(**enriched)


@router.delete("/{post_id}", response_model=MessageResponse)
async def delete_post(
    post_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Delete a post. Only the author can delete."""
    await post_service.delete_post(db, post_id, current_user.id)
    return MessageResponse(message="Post deleted successfully")


# ─── Feed ──────────────────────────────────────────────────────


@router.get("/feed/timeline", response_model=PaginatedResponse[PostResponse])
async def get_feed(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=50),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Get the home feed: posts from people you follow + your own posts.
    Ordered by newest first.
    """
    posts, total = await post_service.get_feed(db, current_user.id, page, page_size)

    items = []
    for post in posts:
        enriched = await _enrich_post(db, post, current_user.id)
        items.append(PostResponse(**enriched))

    return PaginatedResponse.create(items, total, page, page_size)


@router.get("/user/{user_id}", response_model=PaginatedResponse[PostResponse])
async def get_user_posts(
    user_id: uuid.UUID,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=50),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get all posts from a specific user."""
    posts, total = await post_service.get_user_posts(db, user_id, page, page_size)

    items = []
    for post in posts:
        enriched = await _enrich_post(db, post, current_user.id)
        items.append(PostResponse(**enriched))

    return PaginatedResponse.create(items, total, page, page_size)


# ─── Likes ─────────────────────────────────────────────────────


@router.post("/{post_id}/like", response_model=MessageResponse)
async def toggle_like(
    post_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Like or unlike a post (toggle)."""
    is_liked = await post_service.toggle_like(db, current_user.id, post_id)
    action = "liked" if is_liked else "unliked"
    return MessageResponse(message=f"Post {action}")


# ─── Comments ──────────────────────────────────────────────────


@router.post("/{post_id}/comments", response_model=CommentResponse, status_code=201)
async def create_comment(
    post_id: uuid.UUID,
    data: CommentCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Add a comment to a post."""
    comment = await post_service.create_comment(
        db, current_user.id, post_id, data.content
    )
    return CommentResponse.model_validate(comment)


@router.get("/{post_id}/comments", response_model=PaginatedResponse[CommentResponse])
async def get_comments(
    post_id: uuid.UUID,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=50),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get comments on a post, ordered oldest first."""
    comments, total = await post_service.get_post_comments(db, post_id, page, page_size)
    items = [CommentResponse.model_validate(c) for c in comments]
    return PaginatedResponse.create(items, total, page, page_size)
