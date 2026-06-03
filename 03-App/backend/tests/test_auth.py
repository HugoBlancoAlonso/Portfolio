"""
Tests for authentication endpoints.
"""

import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_register_success(client: AsyncClient):
    """Test successful user registration."""
    response = await client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "password": "securepass123",
            "full_name": "Test User",
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["token_type"] == "bearer"


@pytest.mark.asyncio
async def test_register_duplicate_email(client: AsyncClient):
    """Test registration with an already used email."""
    user_data = {
        "email": "duplicate@example.com",
        "password": "securepass123",
        "full_name": "Test User",
    }
    # First registration
    await client.post("/api/v1/auth/register", json=user_data)
    # Second attempt
    response = await client.post("/api/v1/auth/register", json=user_data)
    assert response.status_code == 409


@pytest.mark.asyncio
async def test_login_success(client: AsyncClient):
    """Test successful login with valid credentials."""
    # Register first
    await client.post(
        "/api/v1/auth/register",
        json={
            "email": "login@example.com",
            "password": "securepass123",
            "full_name": "Login User",
        },
    )
    # Login
    response = await client.post(
        "/api/v1/auth/login",
        json={"email": "login@example.com", "password": "securepass123"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data


@pytest.mark.asyncio
async def test_login_invalid_credentials(client: AsyncClient):
    """Test login with wrong password."""
    response = await client.post(
        "/api/v1/auth/login",
        json={"email": "wrong@example.com", "password": "wrongpassword"},
    )
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_get_profile_unauthorized(client: AsyncClient):
    """Test accessing profile without authentication."""
    response = await client.get("/api/v1/users/me")
    assert response.status_code == 422  # Missing Authorization header


@pytest.mark.asyncio
async def test_health_check(client: AsyncClient):
    """Test health check endpoint."""
    response = await client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
