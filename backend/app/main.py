"""
BetterBobcats Backend API
Minimal FastAPI instance - business logic to be implemented
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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
from app.api import courses, careers

app.include_router(courses.router, prefix="/api/courses", tags=["courses"])
app.include_router(careers.router, prefix="/api/careers", tags=["careers"])

# TODO: Import and include remaining API routers
# from app.api import degrees, roadmaps
# app.include_router(degrees.router, prefix="/api/degrees", tags=["degrees"])
# app.include_router(roadmaps.router, prefix="/api/roadmaps", tags=["roadmaps"])
