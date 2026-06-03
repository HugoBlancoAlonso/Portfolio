"""
FastAPI application entry point.
Social Network API — main application configuration.
"""

from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.api.v1.router import router as v1_router
from app.config import get_settings
from app.middleware.cors import setup_cors

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan events.
    Runs setup on startup and cleanup on shutdown.
    """
    # ─── Startup ────────────────────────────────────────────────
    # Ensure upload directory exists
    upload_dir = Path(settings.UPLOAD_DIR)
    upload_dir.mkdir(parents=True, exist_ok=True)

    print("Social Network API is starting up...")
    print(f"Docs available at: http://{settings.HOST}:{settings.PORT}/docs")

    yield

    # ─── Shutdown ───────────────────────────────────────────────
    print("👋 Social Network API is shutting down...")


# ─── Create App ─────────────────────────────────────────────────
app = FastAPI(
    title="Social Network API",
    description="Backend API for the Social Network mobile application",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# ─── Middleware ──────────────────────────────────────────────────
setup_cors(app)

# ─── Static Files (uploads) ────────────────────────────────────
upload_path = Path(settings.UPLOAD_DIR)
upload_path.mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(upload_path)), name="uploads")

# ─── Routers ───────────────────────────────────────────────────
app.include_router(v1_router)


# ─── Root ──────────────────────────────────────────────────────
@app.get("/", tags=["Root"])
async def root():
    """API root — basic info."""
    return {
        "app": "Social Network API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/api/v1/health",
    }
