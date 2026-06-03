from __future__ import annotations

"""
Like model — tracks which users liked which posts.
Uses a composite unique constraint to prevent duplicate likes.
"""

import uuid

from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class Like(Base):
    """A like on a post by a user. One like per user per post."""

    __tablename__ = "likes"
    __table_args__ = (UniqueConstraint("user_id", "post_id", name="uq_user_post_like"),)

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    post_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("posts.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    user = relationship("User", lazy="selectin")
    post = relationship("Post", back_populates="likes")

    def __repr__(self) -> str:
        return f"<Like(user_id={self.user_id}, post_id={self.post_id})>"
