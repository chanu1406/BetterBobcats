"""
BetterBobcats Backend API
FastAPI application providing REST API endpoints for clubs, majors, and platform data
"""
import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration

# Load environment variables from .env file
load_dotenv()


def _get_traces_sample_rate() -> float:
    try:
        return float(os.getenv("SENTRY_TRACES_SAMPLE_RATE", "0.0"))
    except ValueError:
        return 0.0


sentry_sdk.init(
    dsn=os.getenv("SENTRY_DSN"),
    integrations=[FastApiIntegration()],
    traces_sample_rate=_get_traces_sample_rate(),
    environment=os.getenv("SENTRY_ENVIRONMENT", os.getenv("ENVIRONMENT", "development")),
)

app = FastAPI(
    title="BetterBobcats API",
    description="Open-source platform for UC Merced students",
    version="0.1.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local frontend
        "http://localhost:8080",  # Test server
        "https://better-bobcats.vercel.app",  # Production frontend
        "https://*.vercel.app",  # All Vercel preview deployments
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
# NOTE: courses and professors routers removed (2026-03-26).
# The frontend lib (lib/courses.ts, lib/professors.ts) goes direct to Supabase
# and has never called these FastAPI endpoints. The endpoint files are kept for
# reference but not registered.
from app.api import clubs, majors

app.include_router(clubs.router, prefix="/api/clubs", tags=["clubs"])
app.include_router(majors.router, prefix="/api/majors", tags=["majors"])
