"""
Follow service — business logic for follow/unfollow and follower lists.
"""

import uuid

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.exceptions import BadRequestException, NotFoundException
from app.models.follow import Follow
from app.models.user import User


async def toggle_follow(
    db: AsyncSession, follower_id: uuid.UUID, following_id: uuid.UUID
) -> bool:
    """
    Toggle follow/unfollow.
    Returns True if now following, False if unfollowed.
    """
    if follower_id == following_id:
        raise BadRequestException("You cannot follow yourself")

    # Check target user exists
    result = await db.execute(select(User).where(User.id == following_id))
    if not result.scalar_one_or_none():
        raise NotFoundException("User")

    # Check existing follow
    result = await db.execute(
        select(Follow).where(
            Follow.follower_id == follower_id,
            Follow.following_id == following_id,
        )
    )
    existing = result.scalar_one_or_none()

    if existing:
        await db.delete(existing)
        await db.flush()
        return False
    else:
        follow = Follow(follower_id=follower_id, following_id=following_id)
        db.add(follow)
        await db.flush()
        return True


async def is_following(
    db: AsyncSession, follower_id: uuid.UUID, following_id: uuid.UUID
) -> bool:
    """Check if follower_id follows following_id."""
    result = await db.execute(
        select(Follow).where(
            Follow.follower_id == follower_id,
            Follow.following_id == following_id,
        )
    )
    return result.scalar_one_or_none() is not None


async def get_followers(
    db: AsyncSession,
    user_id: uuid.UUID,
    page: int = 1,
    page_size: int = 20,
) -> tuple[list[User], int]:
    """Get users who follow the given user, paginated."""
    count_result = await db.execute(
        select(func.count()).where(Follow.following_id == user_id)
    )
    total = count_result.scalar() or 0

    offset = (page - 1) * page_size
    result = await db.execute(
        select(Follow)
        .where(Follow.following_id == user_id)
        .options(selectinload(Follow.follower))
        .order_by(Follow.created_at.desc())
        .offset(offset)
        .limit(page_size)
    )
    follows = list(result.scalars().all())
    users = [f.follower for f in follows]

    return users, total


async def get_following(
    db: AsyncSession,
    user_id: uuid.UUID,
    page: int = 1,
    page_size: int = 20,
) -> tuple[list[User], int]:
    """Get users that the given user follows, paginated."""
    count_result = await db.execute(
        select(func.count()).where(Follow.follower_id == user_id)
    )
    total = count_result.scalar() or 0

    offset = (page - 1) * page_size
    result = await db.execute(
        select(Follow)
        .where(Follow.follower_id == user_id)
        .options(selectinload(Follow.following))
        .order_by(Follow.created_at.desc())
        .offset(offset)
        .limit(page_size)
    )
    follows = list(result.scalars().all())
    users = [f.following for f in follows]

    return users, total
