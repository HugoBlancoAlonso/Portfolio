from __future__ import annotations

"""
Post model — the core content unit of the social network.
"""

import uuid
from typing import Optional

from sqlalchemy import ForeignKey, Text
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class Post(Base):
    """
    A user-created post with text content and optional images.
    """

    __tablename__ = "posts"

    # ─── Content ────────────────────────────────────────────────
    content: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )
    image_urls: Mapped[Optional[list]] = mapped_column(
        ARRAY(Text),
        nullable=True,
        default=None,
    )

    # ─── Relations ──────────────────────────────────────────────
    author_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    author = relationship("User", backref="posts", lazy="selectin")
    comments = relationship(
        "Comment", back_populates="post", cascade="all, delete-orphan", lazy="selectin"
    )
    likes = relationship(
        "Like", back_populates="post", cascade="all, delete-orphan", lazy="noload"
    )

    def __repr__(self) -> str:
        return f"<Post(id={self.id}, author_id={self.author_id})>"
