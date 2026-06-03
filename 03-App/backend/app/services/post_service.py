"""
Post service — business logic for posts, comments, likes, and feed.
"""

import uuid

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.exceptions import ForbiddenException, NotFoundException
from app.models.comment import Comment
from app.models.follow import Follow
from app.models.like import Like
from app.models.post import Post
from app.schemas.post import PostCreate, PostUpdate

# ─── Posts ──────────────────────────────────────────────────────


async def create_post(db: AsyncSession, author_id: uuid.UUID, data: PostCreate) -> Post:
    """Create a new post."""
    post = Post(
        content=data.content,
        image_urls=data.image_urls,
        author_id=author_id,
    )
    db.add(post)
    await db.flush()

    # Reload with relationships
    result = await db.execute(
        select(Post).where(Post.id == post.id).options(selectinload(Post.author))
    )
    return result.scalar_one()


async def get_post_by_id(db: AsyncSession, post_id: uuid.UUID) -> Post:
    """Get a post by ID with author loaded, or raise 404."""
    result = await db.execute(
        select(Post).where(Post.id == post_id).options(selectinload(Post.author))
    )
    post = result.scalar_one_or_none()
    if not post:
        raise NotFoundException("Post")
    return post


async def update_post(
    db: AsyncSession,
    post_id: uuid.UUID,
    user_id: uuid.UUID,
    data: PostUpdate,
) -> Post:
    """Update a post. Only the author can update."""
    post = await get_post_by_id(db, post_id)
    if post.author_id != user_id:
        raise ForbiddenException("You can only edit your own posts")

    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(post, field, value)
    await db.flush()
    return post


async def delete_post(db: AsyncSession, post_id: uuid.UUID, user_id: uuid.UUID) -> None:
    """Delete a post. Only the author can delete."""
    post = await get_post_by_id(db, post_id)
    if post.author_id != user_id:
        raise ForbiddenException("You can only delete your own posts")
    await db.delete(post)
    await db.flush()


async def get_feed(
    db: AsyncSession,
    user_id: uuid.UUID,
    page: int = 1,
    page_size: int = 20,
) -> tuple[list[Post], int]:
    """
    Get the feed for a user: posts from people they follow + their own.
    Returns (posts, total_count).
    """
    # Get IDs of users this person follows
    following_result = await db.execute(
        select(Follow.following_id).where(Follow.follower_id == user_id)
    )
    following_ids = [row[0] for row in following_result.all()]
    following_ids.append(user_id)  # Include own posts

    # Count total
    count_result = await db.execute(
        select(func.count()).where(Post.author_id.in_(following_ids))
    )
    total = count_result.scalar() or 0

    # Fetch paginated posts
    offset = (page - 1) * page_size
    result = await db.execute(
        select(Post)
        .where(Post.author_id.in_(following_ids))
        .options(selectinload(Post.author))
        .order_by(Post.created_at.desc())
        .offset(offset)
        .limit(page_size)
    )
    posts = list(result.scalars().all())

    return posts, total


async def get_user_posts(
    db: AsyncSession,
    user_id: uuid.UUID,
    page: int = 1,
    page_size: int = 20,
) -> tuple[list[Post], int]:
    """Get all posts from a specific user, paginated."""
    count_result = await db.execute(
        select(func.count()).where(Post.author_id == user_id)
    )
    total = count_result.scalar() or 0

    offset = (page - 1) * page_size
    result = await db.execute(
        select(Post)
        .where(Post.author_id == user_id)
        .options(selectinload(Post.author))
        .order_by(Post.created_at.desc())
        .offset(offset)
        .limit(page_size)
    )
    posts = list(result.scalars().all())

    return posts, total


# ─── Likes ──────────────────────────────────────────────────────


async def toggle_like(db: AsyncSession, user_id: uuid.UUID, post_id: uuid.UUID) -> bool:
    """
    Toggle a like on a post. Returns True if liked, False if unliked.
    """
    # Check if post exists
    await get_post_by_id(db, post_id)

    # Check if already liked
    result = await db.execute(
        select(Like).where(Like.user_id == user_id, Like.post_id == post_id)
    )
    existing_like = result.scalar_one_or_none()

    if existing_like:
        await db.delete(existing_like)
        await db.flush()
        return False
    else:
        like = Like(user_id=user_id, post_id=post_id)
        db.add(like)
        await db.flush()
        return True


async def get_likes_count(db: AsyncSession, post_id: uuid.UUID) -> int:
    """Get the number of likes on a post."""
    result = await db.execute(select(func.count()).where(Like.post_id == post_id))
    return result.scalar() or 0


async def has_user_liked(
    db: AsyncSession, user_id: uuid.UUID, post_id: uuid.UUID
) -> bool:
    """Check if a user has liked a specific post."""
    result = await db.execute(
        select(Like).where(Like.user_id == user_id, Like.post_id == post_id)
    )
    return result.scalar_one_or_none() is not None


# ─── Comments ──────────────────────────────────────────────────


async def create_comment(
    db: AsyncSession,
    author_id: uuid.UUID,
    post_id: uuid.UUID,
    content: str,
) -> Comment:
    """Add a comment to a post."""
    await get_post_by_id(db, post_id)

    comment = Comment(
        content=content,
        author_id=author_id,
        post_id=post_id,
    )
    db.add(comment)
    await db.flush()

    # Reload with author
    result = await db.execute(
        select(Comment)
        .where(Comment.id == comment.id)
        .options(selectinload(Comment.author))
    )
    return result.scalar_one()


async def get_post_comments(
    db: AsyncSession,
    post_id: uuid.UUID,
    page: int = 1,
    page_size: int = 20,
) -> tuple[list[Comment], int]:
    """Get comments on a post, paginated."""
    count_result = await db.execute(
        select(func.count()).where(Comment.post_id == post_id)
    )
    total = count_result.scalar() or 0

    offset = (page - 1) * page_size
    result = await db.execute(
        select(Comment)
        .where(Comment.post_id == post_id)
        .options(selectinload(Comment.author))
        .order_by(Comment.created_at.asc())
        .offset(offset)
        .limit(page_size)
    )
    comments = list(result.scalars().all())

    return comments, total


async def get_comments_count(db: AsyncSession, post_id: uuid.UUID) -> int:
    """Get the number of comments on a post."""
    result = await db.execute(select(func.count()).where(Comment.post_id == post_id))
    return result.scalar() or 0
