from __future__ import annotations

"""
Follow model — follower/following relationships between users.
"""

import uuid

from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class Follow(Base):
    """
    Represents a follow relationship: follower_id follows following_id.
    Uses composite unique constraint to prevent duplicate follows.
    """

    __tablename__ = "follows"
    __table_args__ = (
        UniqueConstraint("follower_id", "following_id", name="uq_follower_following"),
    )

    follower_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    following_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    follower = relationship("User", foreign_keys=[follower_id], lazy="selectin")
    following = relationship("User", foreign_keys=[following_id], lazy="selectin")

    def __repr__(self) -> str:
        return f"<Follow(follower={self.follower_id} -> following={self.following_id})>"
