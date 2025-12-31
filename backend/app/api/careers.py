"""
Career Paths API Routes
Endpoints for career path tier course data
"""
from fastapi import APIRouter, HTTPException
from app.models.career import CareerPathConfig
from app.data.career_paths import CAREER_PATHS

router = APIRouter()


@router.get("/", response_model=list[str])
async def get_available_career_paths():
    """
    Get list of available career paths
    
    Returns:
        List of career path IDs (e.g., ['cybersecurity', 'swe'])
    """
    return list(CAREER_PATHS.keys())


@router.get("/{career_path}", response_model=CareerPathConfig)
async def get_career_path(career_path: str):
    """
    Get career path configuration with tier courses
    
    Args:
        career_path: The career path identifier (e.g., 'cybersecurity', 'swe')
        
    Returns:
        Complete career path configuration with tier courses
        
    Raises:
        HTTPException: 404 if career path not found
    """
    if career_path not in CAREER_PATHS:
        available_paths = ", ".join(CAREER_PATHS.keys())
        raise HTTPException(
            status_code=404, 
            detail=f"Career path '{career_path}' not found. Available paths: {available_paths}"
        )
    
    return CAREER_PATHS[career_path]
