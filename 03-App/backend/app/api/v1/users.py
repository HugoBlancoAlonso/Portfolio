"""
User endpoints: profile management.
"""

import uuid

from fastapi import APIRouter, Depends, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.core.exceptions import FileTooLargeException
from app.database import get_db
from app.models.user import User
from app.schemas.common import MessageResponse
from app.schemas.user import UserBriefResponse, UserProfileResponse, UserUpdate
from app.services import follow_service, user_service
from app.storage.base import get_storage_backend

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=UserProfileResponse)
async def get_my_profile(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get the authenticated user's profile with social stats."""
    stats = await user_service.get_user_stats(db, current_user.id)
    return UserProfileResponse(
        **{
            "id": current_user.id,
            "email": current_user.email,
            "username": current_user.username,
            "full_name": current_user.full_name,
            "avatar_url": current_user.avatar_url,
            "bio": current_user.bio,
            "is_active": current_user.is_active,
            "is_verified": current_user.is_verified,
            "created_at": current_user.created_at,
            **stats,
        }
    )


@router.put("/me", response_model=UserProfileResponse)
async def update_my_profile(
    data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Update the authenticated user's profile."""
    user = await user_service.update_user(db, current_user, data)
    stats = await user_service.get_user_stats(db, user.id)
    return UserProfileResponse(
        **{
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "full_name": user.full_name,
            "avatar_url": user.avatar_url,
            "bio": user.bio,
            "is_active": user.is_active,
            "is_verified": user.is_verified,
            "created_at": user.created_at,
            **stats,
        }
    )


@router.put("/me/avatar", response_model=UserProfileResponse)
async def update_avatar(
    file: UploadFile,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Upload a new avatar image."""
    storage = get_storage_backend()

    file_data = await file.read()

    if not storage.validate_file_size(file_data):
        raise FileTooLargeException(max_size_mb=10)

    if not storage.validate_content_type(
        file.content_type or "",
        allowed_types=["image/jpeg", "image/png", "image/webp"],
    ):
        from app.core.exceptions import BadRequestException

        raise BadRequestException("Only JPEG, PNG, and WebP images are allowed")

    # Delete old avatar if exists
    if current_user.avatar_url:
        old_path = current_user.avatar_url.removeprefix("/uploads/")
        await storage.delete_file(old_path)

    # Save new avatar
    file_path = await storage.save_file(
        file_data=file_data,
        filename=file.filename or "avatar",
        content_type=file.content_type or "image/jpeg",
        folder="avatars",
    )
    avatar_url = await storage.get_file_url(file_path)

    current_user.avatar_url = avatar_url
    await db.flush()

    stats = await user_service.get_user_stats(db, current_user.id)
    return UserProfileResponse(
        **{
            "id": current_user.id,
            "email": current_user.email,
            "username": current_user.username,
            "full_name": current_user.full_name,
            "avatar_url": current_user.avatar_url,
            "bio": current_user.bio,
            "is_active": current_user.is_active,
            "is_verified": current_user.is_verified,
            "created_at": current_user.created_at,
            **stats,
        }
    )


@router.delete("/me", response_model=MessageResponse)
async def delete_my_account(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Soft-delete the authenticated user's account."""
    current_user.is_active = False
    await db.flush()
    return MessageResponse(message="Account deactivated successfully")


# ─── Public user profiles ──────────────────────────────────────


@router.get("/{user_id}", response_model=UserProfileResponse)
async def get_user_profile(
    user_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
):
    """Get a public user profile by ID."""
    user = await user_service.get_user_by_id(db, user_id)
    stats = await user_service.get_user_stats(db, user.id)
    return UserProfileResponse(
        **{
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "full_name": user.full_name,
            "avatar_url": user.avatar_url,
            "bio": user.bio,
            "is_active": user.is_active,
            "is_verified": user.is_verified,
            "created_at": user.created_at,
            **stats,
        }
    )


# ─── Follow/Unfollow ──────────────────────────────────────────


@router.post("/{user_id}/follow", response_model=MessageResponse)
async def toggle_follow_user(
    user_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Follow or unfollow a user (toggle)."""
    is_following = await follow_service.toggle_follow(db, current_user.id, user_id)
    action = "followed" if is_following else "unfollowed"
    return MessageResponse(message=f"Successfully {action} user")


@router.get("/{user_id}/followers", response_model=list[UserBriefResponse])
async def get_user_followers(
    user_id: uuid.UUID,
    page: int = 1,
    page_size: int = 20,
    db: AsyncSession = Depends(get_db),
):
    """Get a user's followers."""
    users, _ = await follow_service.get_followers(db, user_id, page, page_size)
    return [UserBriefResponse.model_validate(u) for u in users]


@router.get("/{user_id}/following", response_model=list[UserBriefResponse])
async def get_user_following(
    user_id: uuid.UUID,
    page: int = 1,
    page_size: int = 20,
    db: AsyncSession = Depends(get_db),
):
    """Get users that a user follows."""
    users, _ = await follow_service.get_following(db, user_id, page, page_size)
    return [UserBriefResponse.model_validate(u) for u in users]
