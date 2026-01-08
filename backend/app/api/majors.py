"""
Majors API Routes
Endpoints for managing majors in the database
"""
from fastapi import APIRouter, HTTPException, Depends, Body
from typing import List, Dict, Optional
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


@router.get("/{major_id}")
async def get_major_by_id(major_id: str, db: Client = Depends(get_db)):
    """
    Get a specific major by ID
    
    Args:
        major_id: UUID of the major
        
    Returns:
        Major details
        
    Raises:
        HTTPException: 404 if major not found
    """
    try:
        response = db.table("majors").select("*").eq("id", major_id).execute()
        
        if not response.data:
            raise HTTPException(
                status_code=404,
                detail=f"Major with id '{major_id}' not found"
            )
        
        return response.data[0]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch major: {str(e)}"
        )


@router.post("/", status_code=201)
async def create_major(
    major_data: Dict[str, str] = Body(...),
    db: Client = Depends(lambda: get_db(admin=True))  # Use admin client to bypass RLS
):
    """
    Create a new major
    
    Args:
        major_data: Dictionary with 'name' field (major name)
        
    Returns:
        Created major with generated id and created_at
        
    Raises:
        HTTPException: 400 if validation fails, 500 if database error
    """
    try:
        if "name" not in major_data or not major_data["name"] or not major_data["name"].strip():
            raise HTTPException(
                status_code=400,
                detail="Major name is required"
            )
        
        name = major_data["name"].strip()
        
        # Check if major with same name already exists
        existing = db.table("majors").select("id").eq("name", name).execute()
        if existing.data:
            raise HTTPException(
                status_code=400,
                detail=f"Major with name '{name}' already exists"
            )
        
        # Insert into database
        response = db.table("majors").insert({"name": name}).execute()
        
        if not response.data:
            raise HTTPException(
                status_code=500,
                detail="Failed to create major: No data returned"
            )
        
        return response.data[0]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to create major: {str(e)}"
        )


@router.patch("/{major_id}")
async def update_major(
    major_id: str,
    major_data: Dict[str, str] = Body(...),
    db: Client = Depends(lambda: get_db(admin=True))  # Use admin client to bypass RLS
):
    """
    Update a major
    
    Args:
        major_id: UUID of the major to update
        major_data: Dictionary with 'name' field (optional)
        
    Returns:
        Updated major
        
    Raises:
        HTTPException: 404 if major not found, 400 if validation fails
    """
    try:
        # Check if major exists
        existing = db.table("majors").select("*").eq("id", major_id).execute()
        if not existing.data:
            raise HTTPException(
                status_code=404,
                detail=f"Major with id '{major_id}' not found"
            )
        
        # Build update dict
        update_dict = {}
        if "name" in major_data and major_data["name"]:
            name = major_data["name"].strip()
            if not name:
                raise HTTPException(
                    status_code=400,
                    detail="Major name cannot be empty"
                )
            
            # Check if another major with same name exists
            existing_name = db.table("majors").select("id").eq("name", name).neq("id", major_id).execute()
            if existing_name.data:
                raise HTTPException(
                    status_code=400,
                    detail=f"Major with name '{name}' already exists"
                )
            
            update_dict["name"] = name
        
        if not update_dict:
            return existing.data[0]
        
        # Update major
        response = db.table("majors").update(update_dict).eq("id", major_id).execute()
        
        if not response.data:
            raise HTTPException(
                status_code=500,
                detail="Failed to update major"
            )
        
        return response.data[0]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to update major: {str(e)}"
        )


@router.delete("/{major_id}", status_code=204)
async def delete_major(
    major_id: str,
    db: Client = Depends(lambda: get_db(admin=True))  # Use admin client to bypass RLS
):
    """
    Delete a major
    
    This will fail if the major has associated clubs (enforced by database constraints).
    Consider updating club associations first.
    
    Args:
        major_id: UUID of the major to delete
        
    Raises:
        HTTPException: 404 if major not found, 400 if major has associated clubs
    """
    try:
        # Check if major exists
        existing = db.table("majors").select("*").eq("id", major_id).execute()
        if not existing.data:
            raise HTTPException(
                status_code=404,
                detail=f"Major with id '{major_id}' not found"
            )
        
        # Check if major has associated clubs
        clubs_check = db.table("club_majors").select("club_id").eq("major_id", major_id).limit(1).execute()
        if clubs_check.data:
            raise HTTPException(
                status_code=400,
                detail=f"Cannot delete major: It is associated with one or more clubs. Please remove the associations first."
            )
        
        # Delete the major
        delete_response = db.table("majors").delete().eq("id", major_id).execute()
        
        if not delete_response.data:
            raise HTTPException(
                status_code=404,
                detail=f"Major with id '{major_id}' not found or already deleted"
            )
        
        return None  # 204 No Content
    except HTTPException:
        raise
    except Exception as e:
        # Check if error is due to foreign key constraint
        error_str = str(e).lower()
        if "foreign key" in error_str or "constraint" in error_str:
            raise HTTPException(
                status_code=400,
                detail=f"Cannot delete major: It is associated with one or more clubs. Please remove the associations first."
            )
        raise HTTPException(
            status_code=500,
            detail=f"Failed to delete major: {str(e)}"
        )

