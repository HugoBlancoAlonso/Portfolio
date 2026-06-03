"""
Notification endpoints: list, mark as read.
"""

import uuid

from fastapi import APIRouter, Depends, Query
from sqlalchemy import func, select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.api.deps import get_current_user
from app.database import get_db
from app.models.notification import Notification
from app.models.user import User
from app.schemas.common import MessageResponse, PaginatedResponse
from app.schemas.notification import NotificationResponse

router = APIRouter(prefix="/notifications", tags=["Notifications"])


@router.get("/", response_model=PaginatedResponse[NotificationResponse])
async def get_notifications(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=50),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get the current user's notifications, newest first."""
    count_result = await db.execute(
        select(func.count()).where(Notification.recipient_id == current_user.id)
    )
    total = count_result.scalar() or 0

    offset = (page - 1) * page_size
    result = await db.execute(
        select(Notification)
        .where(Notification.recipient_id == current_user.id)
        .options(selectinload(Notification.sender))
        .order_by(Notification.created_at.desc())
        .offset(offset)
        .limit(page_size)
    )
    notifications = list(result.scalars().all())
    items = [NotificationResponse.model_validate(n) for n in notifications]

    return PaginatedResponse.create(items, total, page, page_size)


@router.get("/unread-count")
async def get_unread_count(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get the number of unread notifications."""
    result = await db.execute(
        select(func.count()).where(
            Notification.recipient_id == current_user.id,
            Notification.is_read == False,  # noqa: E712
        )
    )
    count = result.scalar() or 0
    return {"unread_count": count}


@router.put("/{notification_id}/read", response_model=MessageResponse)
async def mark_as_read(
    notification_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Mark a single notification as read."""
    result = await db.execute(
        select(Notification).where(
            Notification.id == notification_id,
            Notification.recipient_id == current_user.id,
        )
    )
    notification = result.scalar_one_or_none()
    if notification:
        notification.is_read = True
        await db.flush()
    return MessageResponse(message="Notification marked as read")


@router.put("/read-all", response_model=MessageResponse)
async def mark_all_as_read(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Mark all notifications as read."""
    await db.execute(
        update(Notification)
        .where(
            Notification.recipient_id == current_user.id,
            Notification.is_read == False,  # noqa: E712
        )
        .values(is_read=True)
    )
    await db.flush()
    return MessageResponse(message="All notifications marked as read")
