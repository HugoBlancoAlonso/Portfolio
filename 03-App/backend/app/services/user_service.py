"""
User service — business logic for user operations.
"""

import uuid

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import AlreadyExistsException, NotFoundException
from app.core.security import hash_password, verify_password
from app.models.follow import Follow
from app.models.post import Post
from app.models.user import User
from app.schemas.user import UserUpdate


async def get_user_by_id(db: AsyncSession, user_id: uuid.UUID) -> User:
    """Get a user by ID or raise 404."""
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise NotFoundException("User")
    return user


async def get_user_by_email(db: AsyncSession, email: str) -> User | None:
    """Get a user by email, returns None if not found."""
    result = await db.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()


async def create_user(
    db: AsyncSession,
    email: str,
    password: str,
    full_name: str,
) -> User:
    """Create a new user with email/password. Raises 409 if email exists."""
    existing = await get_user_by_email(db, email)
    if existing:
        raise AlreadyExistsException("User with this email")

    user = User(
        email=email,
        hashed_password=hash_password(password),
        full_name=full_name,
    )
    db.add(user)
    await db.flush()
    return user


async def create_or_get_oauth_user(
    db: AsyncSession,
    provider: str,
    provider_user_id: str,
    email: str,
    full_name: str | None = None,
    avatar_url: str | None = None,
) -> User:
    """
    Find or create a user from an OAuth provider.
    If the user exists by provider ID, return them.
    If the user exists by email, link the provider.
    Otherwise, create a new user.
    """
    provider_field = f"{provider}_id"

    # Check if user exists by provider ID
    result = await db.execute(
        select(User).where(getattr(User, provider_field) == provider_user_id)
    )
    user = result.scalar_one_or_none()
    if user:
        return user

    # Check if user exists by email (link provider)
    user = await get_user_by_email(db, email)
    if user:
        setattr(user, provider_field, provider_user_id)
        if avatar_url and not user.avatar_url:
            user.avatar_url = avatar_url
        await db.flush()
        return user

    # Create new user
    user = User(
        email=email,
        full_name=full_name or email.split("@")[0],
        avatar_url=avatar_url,
        is_verified=True,  # OAuth users are pre-verified
        **{provider_field: provider_user_id},
    )
    db.add(user)
    await db.flush()
    return user


async def authenticate_user(db: AsyncSession, email: str, password: str) -> User | None:
    """Verify email/password and return user, or None if invalid."""
    user = await get_user_by_email(db, email)
    if not user or not user.hashed_password:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


async def update_user(db: AsyncSession, user: User, data: UserUpdate) -> User:
    """Update user profile fields."""
    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(user, field, value)
    await db.flush()
    return user


async def get_user_stats(db: AsyncSession, user_id: uuid.UUID) -> dict[str, int]:
    """Get follower, following, and post counts for a user."""
    followers = await db.execute(
        select(func.count()).where(Follow.following_id == user_id)
    )
    following = await db.execute(
        select(func.count()).where(Follow.follower_id == user_id)
    )
    posts = await db.execute(select(func.count()).where(Post.author_id == user_id))
    return {
        "followers_count": followers.scalar() or 0,
        "following_count": following.scalar() or 0,
        "posts_count": posts.scalar() or 0,
    }
