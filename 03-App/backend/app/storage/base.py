"""
Abstract storage backend interface.

This abstraction layer allows swapping storage implementations
(local disk, AWS S3, Google Cloud Storage, etc.) by simply changing
the STORAGE_BACKEND environment variable and providing a new implementation.

To add a new backend:
1. Create a new class inheriting from StorageBackend (e.g., S3Storage)
2. Implement all abstract methods
3. Register it in get_storage_backend()
"""

import uuid
from abc import ABC, abstractmethod

from app.config import get_settings


class StorageBackend(ABC):
    """
    Abstract base class defining the storage interface.
    All storage implementations must implement these methods.
    """

    @abstractmethod
    async def save_file(
        self,
        file_data: bytes,
        filename: str,
        content_type: str,
        folder: str = "",
    ) -> str:
        """
        Save a file and return its public URL/path.

        Args:
            file_data: Raw file bytes.
            filename: Original filename.
            content_type: MIME type (e.g., "image/jpeg").
            folder: Optional subfolder to organize files.

        Returns:
            The URL or path to access the saved file.
        """
        ...

    @abstractmethod
    async def delete_file(self, file_path: str) -> bool:
        """
        Delete a file by its path/URL.

        Returns:
            True if deleted successfully, False if not found.
        """
        ...

    @abstractmethod
    async def get_file_url(self, file_path: str) -> str:
        """
        Get the public URL for a stored file.

        Args:
            file_path: Internal file path/key.

        Returns:
            The publicly accessible URL.
        """
        ...

    @abstractmethod
    async def file_exists(self, file_path: str) -> bool:
        """Check if a file exists in storage."""
        ...

    @staticmethod
    def generate_unique_filename(original_filename: str) -> str:
        """Generate a unique filename preserving the original extension."""
        extension = (
            original_filename.rsplit(".", 1)[-1] if "." in original_filename else ""
        )
        unique_name = f"{uuid.uuid4().hex}"
        return f"{unique_name}.{extension}" if extension else unique_name

    def validate_file_size(self, file_data: bytes) -> bool:
        """Check if file size is within the configured limit."""
        settings = get_settings()
        return len(file_data) <= settings.max_file_size_bytes

    def validate_content_type(
        self,
        content_type: str,
        allowed_types: list[str] | None = None,
    ) -> bool:
        """Check if the content type is allowed."""
        if allowed_types is None:
            allowed_types = [
                "image/jpeg",
                "image/png",
                "image/gif",
                "image/webp",
                "video/mp4",
                "video/quicktime",
            ]
        return content_type in allowed_types


def get_storage_backend() -> StorageBackend:
    """
    Factory function that returns the configured storage backend.

    To switch storage backends, change the STORAGE_BACKEND env var:
    - "local" → LocalStorage (default)
    - "s3"   → S3Storage (future implementation)
    - "gcs"  → GCSStorage (future implementation)
    """
    settings = get_settings()

    if settings.STORAGE_BACKEND == "local":
        from app.storage.local import LocalStorage

        return LocalStorage()

    # ──── Future implementations ────────────────────────────────
    # elif settings.STORAGE_BACKEND == "s3":
    #     from app.storage.s3 import S3Storage
    #     return S3Storage()
    # elif settings.STORAGE_BACKEND == "gcs":
    #     from app.storage.gcs import GCSStorage
    #     return GCSStorage()

    raise ValueError(f"Unknown storage backend: {settings.STORAGE_BACKEND}")
