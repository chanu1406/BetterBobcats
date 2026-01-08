"""
Majors API Routes
Endpoints for managing majors in the database
"""
from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.db.client import get_db
from supabase import Client

router = APIRouter()


@router.get("/")
async def get_all_majors(db: Client = Depends(get_db)):
    """
    Get all majors from the database
    
    Returns:
        List of all majors ordered by name
    """
    try:
        response = db.table("majors").select("*").order("name", desc=False).execute()
        return response.data
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch majors: {str(e)}"
        )



