"""
OAuth verification for Google and Apple Sign-In.
Verifies ID tokens received from the mobile app.
"""

from dataclasses import dataclass

import httpx
import jwt
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token as google_id_token

from app.config import get_settings

settings = get_settings()


@dataclass
class OAuthUserInfo:
    """Normalized user info extracted from an OAuth provider."""

    provider: str  # "google" | "apple"
    provider_user_id: str
    email: str
    full_name: str | None = None
    avatar_url: str | None = None


async def verify_google_token(id_token: str) -> OAuthUserInfo:
    """
    Verify a Google ID token and extract user information.

    The mobile app authenticates with Google and sends us the ID token.
    We verify it server-side using Google's public keys.

    Raises:
        ValueError: If the token is invalid or expired.
    """
    try:
        idinfo = google_id_token.verify_oauth2_token(
            id_token,
            google_requests.Request(),
            settings.GOOGLE_CLIENT_ID,
        )

        return OAuthUserInfo(
            provider="google",
            provider_user_id=idinfo["sub"],
            email=idinfo["email"],
            full_name=idinfo.get("name"),
            avatar_url=idinfo.get("picture"),
        )
    except Exception as e:
        raise ValueError(f"Invalid Google token: {e}") from e


async def verify_apple_token(identity_token: str) -> OAuthUserInfo:
    """
    Verify an Apple identity token.

    Apple Sign-In sends a JWT signed with Apple's private key.
    We fetch Apple's public keys and verify the signature.

    Raises:
        ValueError: If the token is invalid or expired.
    """
    try:
        # Fetch Apple's public keys
        async with httpx.AsyncClient() as client:
            response = await client.get("https://appleid.apple.com/auth/keys")
            response.raise_for_status()
            apple_keys = response.json()

        # Decode the token header to find the key ID
        header = jwt.get_unverified_header(identity_token)
        kid = header.get("kid")

        # Find the matching public key
        key_data = None
        for key in apple_keys.get("keys", []):
            if key["kid"] == kid:
                key_data = key
                break

        if not key_data:
            raise ValueError("Apple public key not found for token")

        # Build the public key and verify
        public_key = jwt.algorithms.RSAAlgorithm.from_jwk(key_data)

        payload = jwt.decode(
            identity_token,
            public_key,
            algorithms=["RS256"],
            audience=settings.APPLE_CLIENT_ID,
            issuer="https://appleid.apple.com",
        )

        return OAuthUserInfo(
            provider="apple",
            provider_user_id=payload["sub"],
            email=payload.get("email", ""),
            full_name=None,  # Apple sends name separately on first login
        )
    except jwt.InvalidTokenError as e:
        raise ValueError(f"Invalid Apple token: {e}") from e
    except Exception as e:
        raise ValueError(f"Apple token verification failed: {e}") from e
