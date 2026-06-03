"""
Local filesystem storage implementation.
Stores files on the server's disk and serves them via a static endpoint.
"""

import os
from pathlib import Path

import aiofiles

from app.config import get_settings
from app.storage.base import StorageBackend

settings = get_settings()


class LocalStorage(StorageBackend):
    """
    Stores files on the local filesystem.
    Files are organized in subfolders within the configured UPLOAD_DIR.
    """

    def __init__(self):
        self.base_dir = Path(settings.UPLOAD_DIR)
        self.base_dir.mkdir(parents=True, exist_ok=True)

    async def save_file(
        self,
        file_data: bytes,
        filename: str,
        content_type: str,
        folder: str = "",
    ) -> str:
        """Save file to local disk, return relative path."""
        unique_name = self.generate_unique_filename(filename)

        # Create subfolder if specified
        target_dir = self.base_dir / folder if folder else self.base_dir
        target_dir.mkdir(parents=True, exist_ok=True)

        file_path = target_dir / unique_name

        async with aiofiles.open(file_path, "wb") as f:
            await f.write(file_data)

        # Return relative path from uploads root
        return str(file_path.relative_to(self.base_dir))

    async def delete_file(self, file_path: str) -> bool:
        """Delete a file from local disk."""
        full_path = self.base_dir / file_path
        if full_path.exists():
            os.remove(full_path)
            return True
        return False

    async def get_file_url(self, file_path: str) -> str:
        """
        Return the URL path for accessing a stored file.
        The actual serving is handled by FastAPI's StaticFiles mount.
        """
        # Ensure we use forward slashes for web URLs even on Windows
        normalized_path = file_path.replace("\\", "/")
        return f"/uploads/{normalized_path}"

    async def file_exists(self, file_path: str) -> bool:
        """Check if a file exists on local disk."""
        full_path = self.base_dir / file_path
        return full_path.exists()
