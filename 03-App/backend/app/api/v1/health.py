"""
Health check endpoint.
"""

from fastapi import APIRouter

router = APIRouter(tags=["Health"])


@router.get("/health")
async def health_check():
    """Simple health check — returns OK if the server is running."""
    return {"status": "ok", "service": "social-network-api"}
