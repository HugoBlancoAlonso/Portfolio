"""
Application configuration loaded from environment variables.
Uses pydantic-settings for validation and type coercion.
"""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Central application settings, loaded from .env file."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # ─── Database ───────────────────────────────────────────────
    DATABASE_URL: str = (
        "postgresql+psycopg://app_user:app_password@localhost:5432/app_db"
    )

    # ─── JWT ────────────────────────────────────────────────────
    SECRET_KEY: str = "change-me-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # ─── OAuth ──────────────────────────────────────────────────
    GOOGLE_CLIENT_ID: str = ""
    APPLE_TEAM_ID: str = ""
    APPLE_CLIENT_ID: str = ""
    APPLE_KEY_ID: str = ""

    # ─── Storage ────────────────────────────────────────────────
    STORAGE_BACKEND: str = "local"  # "local" | "s3" | "gcs" (future)
    UPLOAD_DIR: str = "uploads"
    MAX_FILE_SIZE_MB: int = 10

    # ─── Server ─────────────────────────────────────────────────
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DEBUG: bool = True
    ALLOWED_ORIGINS: str = "http://localhost:8081,http://localhost:19006"

    @property
    def allowed_origins_list(self) -> list[str]:
        """Parse comma-separated origins into a list."""
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]

    @property
    def max_file_size_bytes(self) -> int:
        """Convert MB to bytes."""
        return self.MAX_FILE_SIZE_MB * 1024 * 1024


@lru_cache
def get_settings() -> Settings:
    """
    Cached settings singleton.
    Call get_settings() anywhere to access config without re-reading .env.
    """
    return Settings()
