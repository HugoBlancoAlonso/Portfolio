"""
Notification schemas.
"""

import uuid
from datetime import datetime

from pydantic import BaseModel

from app.schemas.user import UserBriefResponse


class NotificationResponse(BaseModel):
    """Notification data returned by the API."""

    id: uuid.UUID
    type: str
    message: str
    is_read: bool
    sender: UserBriefResponse
    reference_id: uuid.UUID | None = None
    created_at: datetime

    model_config = {"from_attributes": True}
