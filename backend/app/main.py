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
    allow_origins=["http://localhost:3000"],  # Frontend URL
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


# TODO: Import and include API routers here
# from app.api import degrees, careers, roadmaps
# app.include_router(degrees.router, prefix="/api/degrees", tags=["degrees"])
# app.include_router(careers.router, prefix="/api/careers", tags=["careers"])
# app.include_router(roadmaps.router, prefix="/api/roadmaps", tags=["roadmaps"])
