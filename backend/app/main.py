"""
BetterBobcats Backend API
FastAPI application providing REST API endpoints for clubs, majors, and platform data
"""
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from .env file
load_dotenv()

app = FastAPI(
    title="BetterBobcats API",
    description="Open-source platform for UC Merced students",
    version="0.1.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Frontend URL
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


# API Routers
from app.api import clubs, majors

# Admin router removed - admin auth now handled via Supabase Auth in Next.js
# app.include_router(admin.router, prefix="/api/admin", tags=["admin"])
app.include_router(clubs.router, prefix="/api/clubs", tags=["clubs"])
app.include_router(majors.router, prefix="/api/majors", tags=["majors"])
