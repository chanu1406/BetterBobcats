"""
BetterBobcats Backend API
Minimal FastAPI instance - business logic to be implemented
"""
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from dotenv import load_dotenv
import os
from pathlib import Path

# Load environment variables from .env file
# This must happen BEFORE any other imports that use environment variables
# Find the backend directory (parent of app directory where this file lives)
backend_dir = Path(__file__).parent.parent
env_path = backend_dir / ".env"
# Try to load .env from backend directory, fallback to current directory
if env_path.exists():
    load_dotenv(dotenv_path=env_path, override=True)
    # Verify variables were loaded (only log if missing, to avoid logging secrets)
    missing_vars = []
    if not os.getenv("SUPABASE_URL"):
        missing_vars.append("SUPABASE_URL")
    if not os.getenv("SUPABASE_KEY"):
        missing_vars.append("SUPABASE_KEY")
    if not os.getenv("SUPABASE_SERVICE_ROLE_KEY"):
        missing_vars.append("SUPABASE_SERVICE_ROLE_KEY")
    
    if missing_vars:
        import logging
        logger = logging.getLogger(__name__)
        logger.warning(f"⚠️  .env file found at {env_path} but missing: {', '.join(missing_vars)}")
else:
    # Fallback: try loading from current working directory
    load_dotenv(override=True)

app = FastAPI(
    title="BetterBobcats API",
    description="Open-source platform for UC Merced students",
    version="0.1.0"
)

# CORS configuration
# Allow frontend from localhost and network IP (for mobile/other device access)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Frontend URL (localhost)
        "http://127.0.0.1:3000",  # Frontend URL (127.0.0.1)  # Frontend URL (network IP - for mobile/other devices)
        "http://localhost:8080",  # Test server
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Health check endpoint"""
    return {"status": "ok", "message": "BetterBobcats API is running"}


@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy"}


# Global exception handlers to ensure CORS headers are included in error responses
# Helper function to get allowed origin from request
def get_allowed_origin(request: Request) -> str:
    """Get the allowed origin from the request"""
    origin = request.headers.get("origin", "")
    allowed_origins = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://192.168.1.31:3000",
        "http://localhost:8080",
    ]
    if origin in allowed_origins:
        return origin
    return "http://localhost:3000"  # Default fallback


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    """Handle HTTP exceptions with CORS headers"""
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
        headers={
            "Access-Control-Allow-Origin": get_allowed_origin(request),
            "Access-Control-Allow-Credentials": "true",
        },
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Handle validation errors with CORS headers"""
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": exc.errors()},
        headers={
            "Access-Control-Allow-Origin": get_allowed_origin(request),
            "Access-Control-Allow-Credentials": "true",
        },
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Handle general exceptions with CORS headers"""
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": str(exc)},
        headers={
            "Access-Control-Allow-Origin": get_allowed_origin(request),
            "Access-Control-Allow-Credentials": "true",
        },
    )


# API Routers
from app.api import admin, clubs, majors

app.include_router(admin.router, prefix="/api/admin", tags=["admin"])
app.include_router(clubs.router, prefix="/api/clubs", tags=["clubs"])
app.include_router(majors.router, prefix="/api/majors", tags=["majors"])
