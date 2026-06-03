"""
Models package — import all models here so Alembic can discover them.
"""

import functools
import operator

import sqlalchemy.util.typing as sa_typing


def patched_make_union_type(*types_args):
    if len(types_args) == 1:
        return types_args[0]
    return functools.reduce(operator.or_, types_args)


sa_typing.make_union_type = patched_make_union_type

from app.models.base import Base
from app.models.comment import Comment
from app.models.follow import Follow
from app.models.like import Like
from app.models.notification import Notification
from app.models.post import Post
from app.models.user import User

__all__ = ["Base", "Comment", "Follow", "Like", "Notification", "Post", "User"]
