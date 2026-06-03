from __future__ import annotations

"""
User model — core entity for authentication and profile management.
"""

from typing import Optional

from sqlalchemy import Boolean, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class User(Base):
    """
    Represents an application user.
    Supports both email/password and OAuth (Google, Apple) authentication.
    """

    __tablename__ = "users"

    # ─── Profile ────────────────────────────────────────────────
    email: Mapped[Optional[str]] = mapped_column(
        String(255),
        unique=False,
        index=True,
        nullable=True,
    )
    username: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        index=True,
        nullable=False,
    )
    phone_number: Mapped[Optional[str]] = mapped_column(
        String(20),
        unique=False,
        index=True,
        nullable=True,
        default=None,
    )
    full_name: Mapped[Optional[str]] = mapped_column(
        String(255),
        nullable=True,
    )
    avatar_url: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
        default=None,
    )
    bio: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
        default=None,
    )

    # ─── Auth ───────────────────────────────────────────────────
    hashed_password: Mapped[Optional[str]] = mapped_column(
        String(255),
        nullable=True,  # Nullable for OAuth-only users
    )
    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )
    is_verified: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    # ─── OAuth Providers ────────────────────────────────────────
    google_id: Mapped[Optional[str]] = mapped_column(
        String(255),
        unique=True,
        nullable=True,
        default=None,
    )
    apple_id: Mapped[Optional[str]] = mapped_column(
        String(255),
        unique=True,
        nullable=True,
        default=None,
    )

    def __repr__(self) -> str:
        return f"<User(id={self.id}, email={self.email})>"
