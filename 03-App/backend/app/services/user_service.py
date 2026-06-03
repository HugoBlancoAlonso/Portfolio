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


async def get_user_by_phone_number(db: AsyncSession, phone_number: str) -> User | None:
    """Get a user by phone number, returns None if not found."""
    result = await db.execute(select(User).where(User.phone_number == phone_number))
    return result.scalar_one_or_none()


async def create_user(
    db: AsyncSession,
    email: str | None,
    phone_number: str | None,
    password: str,
    username: str,
) -> User:
    """Create a new user. Raises 409 if username or phone exists."""
    if not email and not phone_number:
        from app.core.exceptions import BadRequestException
        raise BadRequestException("Se requiere un correo electrónico o número de teléfono")

    # Check username uniqueness
    existing_username = await db.execute(select(User).where(User.username == username))
    if existing_username.scalar_one_or_none():
        raise AlreadyExistsException("El nombre de usuario ya está en uso")

    if phone_number:
        existing = await get_user_by_phone_number(db, phone_number)
        if existing:
            raise AlreadyExistsException("El número de teléfono ya está registrado")

    user = User(
        email=email,
        phone_number=phone_number,
        hashed_password=hash_password(password),
        username=username,
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

    import random
    
    username = f"user_{random.randint(100000, 999999)}"
    while True:
        existing_username = await db.execute(select(User).where(User.username == username))
        if existing_username.scalar_one_or_none():
            username = f"user_{random.randint(100000, 999999)}"
        else:
            break

    # Create new user
    user = User(
        email=email,
        full_name=full_name or email.split("@")[0],
        username=username,
        avatar_url=avatar_url,
        is_verified=True,  # OAuth users are pre-verified
        **{provider_field: provider_user_id},
    )
    db.add(user)
    await db.flush()
    return user


async def authenticate_user(db: AsyncSession, identifier: str, password: str) -> User | None:
    """Verify identifier (email/phone/username) and password and return user, or None if invalid."""
    from sqlalchemy import or_
    
    result = await db.execute(
        select(User).where(
            or_(
                User.email == identifier,
                User.phone_number == identifier,
                User.username == identifier,
            )
        )
    )
    user = result.scalar_one_or_none()

    if not user:
        return None  # user_not_found
    if not user.hashed_password:
        return None  # no_password
    if not verify_password(password, user.hashed_password):
        from app.core.exceptions import BadRequestException
        raise BadRequestException("Contraseña incorrecta")
    return user


async def update_user(db: AsyncSession, user: User, data: UserUpdate) -> User:
    """Update user profile fields."""
    update_data = data.model_dump(exclude_unset=True)
            
    if "username" in update_data and update_data["username"] != user.username:
        result = await db.execute(select(User).where(User.username == update_data["username"]))
        existing = result.scalar_one_or_none()
        if existing and existing.id != user.id:
            raise AlreadyExistsException("El nombre de usuario ya está en uso")

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
