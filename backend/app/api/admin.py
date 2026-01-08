"""
Admin API Routes
Endpoints for admin authentication
"""
from fastapi import APIRouter, HTTPException, Cookie, Header
from typing import Optional
from pydantic import BaseModel
from app.core.admin_auth import (
    validate_credentials,
    is_valid_session,
    ADMIN_SESSION_TOKEN,
)

router = APIRouter()


# Request/Response Models
class LoginRequest(BaseModel):
    """Login request model"""
    username: str
    password: str


class LoginResponse(BaseModel):
    """Login response model"""
    success: bool
    session_token: Optional[str] = None
    error: Optional[str] = None


class AuthCheckResponse(BaseModel):
    """Auth check response model"""
    authenticated: bool


class LogoutResponse(BaseModel):
    """Logout response model"""
    success: bool


@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    """
    Admin login endpoint
    
    Validates credentials and returns session token on success.
    Returns generic error message on failure to prevent credential enumeration.
    
    Args:
        request: LoginRequest with username and password
        
    Returns:
        LoginResponse with session token on success, error on failure
    """
    if validate_credentials(request.username, request.password):
        return LoginResponse(
            success=True,
            session_token=ADMIN_SESSION_TOKEN,
        )
    else:
        # Generic error message to prevent credential enumeration
        return LoginResponse(
            success=False,
            error="Invalid username or password",
        )


@router.get("/check", response_model=AuthCheckResponse)
async def check_auth(
    admin_session: Optional[str] = Cookie(None),
    authorization: Optional[str] = Header(None),
):
    """
    Check if user is authenticated
    
    Accepts session token from cookie or Authorization header.
    
    Args:
        admin_session: Session token from cookie
        authorization: Authorization header (Bearer token format)
        
    Returns:
        AuthCheckResponse with authenticated status
    """
    # Extract token from cookie or Authorization header
    session_token = admin_session
    if not session_token and authorization:
        # Handle "Bearer <token>" format
        if authorization.startswith("Bearer "):
            session_token = authorization[7:]
        else:
            session_token = authorization
    
    if session_token and is_valid_session(session_token):
        return AuthCheckResponse(authenticated=True)
    else:
        return AuthCheckResponse(authenticated=False)


@router.post("/logout", response_model=LogoutResponse)
async def logout(
    admin_session: Optional[str] = Cookie(None),
    authorization: Optional[str] = Header(None),
):
    """
    Admin logout endpoint
    
    Accepts session token from cookie or Authorization header.
    In a real system, this would invalidate the session server-side.
    For this minimal implementation, we just return success.
    
    Args:
        admin_session: Session token from cookie
        authorization: Authorization header (Bearer token format)
        
    Returns:
        LogoutResponse with success status
    """
    # Token validation is optional for logout (idempotent operation)
    # Frontend will clear the cookie regardless
    return LogoutResponse(success=True)

