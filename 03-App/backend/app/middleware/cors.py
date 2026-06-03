"""
CORS middleware configuration.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings


def setup_cors(app: FastAPI) -> None:
    """
    Configure CORS to allow requests from the mobile app.
    Origins are loaded from the ALLOWED_ORIGINS environment variable.
    """
    settings = get_settings()

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
