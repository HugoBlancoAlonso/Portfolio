from __future__ import annotations

"""
Notification model — tracks push and in-app notifications.
"""

import uuid
from typing import Optional

from sqlalchemy import Boolean, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class Notification(Base):
    """
    In-app notification. Types: like, comment, follow, mention.
    """

    __tablename__ = "notifications"

    # ─── Content ────────────────────────────────────────────────
    type: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        index=True,
    )  # "like" | "comment" | "follow" | "mention"

    message: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    is_read: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    # ─── Relations ──────────────────────────────────────────────
    recipient_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    sender_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    # Optional reference to the related entity (post, comment, etc.)
    reference_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True),
        nullable=True,
    )

    recipient = relationship("User", foreign_keys=[recipient_id], lazy="selectin")
    sender = relationship("User", foreign_keys=[sender_id], lazy="selectin")

    def __repr__(self) -> str:
        return f"<Notification(type={self.type}, recipient={self.recipient_id})>"
