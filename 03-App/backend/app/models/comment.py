from __future__ import annotations

"""
Comment model — user comments on posts.
"""

import uuid

from sqlalchemy import ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class Comment(Base):
    """A comment on a post."""

    __tablename__ = "comments"

    content: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    # ─── Relations ──────────────────────────────────────────────
    author_id: Mapped[uuid.UUID] = mapped_column(
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

    author = relationship("User", lazy="selectin")
    post = relationship("Post", back_populates="comments")

    def __repr__(self) -> str:
        return f"<Comment(id={self.id}, post_id={self.post_id})>"
