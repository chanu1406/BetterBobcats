"""
Professors API Router
Endpoints for fetching professor and department data
"""
import os
from typing import Optional
from fastapi import APIRouter, HTTPException, Query
from supabase import create_client, Client
from dotenv import load_dotenv

from app.models.professor import (
    Professor,
    ProfessorDetail,
    Department,
    ProfessorListResponse,
    DepartmentListResponse,
)

load_dotenv()

router = APIRouter()


def get_supabase() -> Client:
    """Get Supabase client."""
    url = os.getenv("SUPABASE_URL") or os.getenv("NEXT_PUBLIC_SUPABASE_URL")
    key = os.getenv("SUPABASE_ANON_KEY") or os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
    if not url or not key:
        raise HTTPException(status_code=500, detail="Supabase configuration missing")
    return create_client(url, key)


@router.get("/departments", response_model=DepartmentListResponse)
async def list_departments():
    """Get all departments with professor counts."""
    supabase = get_supabase()
    
    result = supabase.table("departments")\
        .select("*")\
        .order("name")\
        .execute()
    
    departments = [Department(**d) for d in result.data]
    return DepartmentListResponse(
        departments=departments,
        total_count=len(departments)
    )


@router.get("", response_model=ProfessorListResponse)
async def list_professors(
    department: Optional[str] = Query(None, description="Filter by department slug"),
    search: Optional[str] = Query(None, description="Search by name"),
    sort_by: str = Query("rating", description="Sort by: rating, difficulty, name, num_ratings"),
    sort_order: str = Query("desc", description="Sort order: asc or desc"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(20, ge=1, le=100, description="Items per page"),
):
    """Get professors with optional filtering and pagination."""
    supabase = get_supabase()
    
    # Build query
    query = supabase.table("professors").select("*", count="exact")
    
    # Filter by department
    if department:
        # Get department ID from slug
        dept_result = supabase.table("departments")\
            .select("id")\
            .eq("slug", department)\
            .single()\
            .execute()
        
        if dept_result.data:
            query = query.eq("department_id", dept_result.data["id"])
    
    # Search by name
    if search:
        search_term = f"%{search}%"
        query = query.or_(f"first_name.ilike.{search_term},last_name.ilike.{search_term}")
    
    # Sorting
    sort_column = {
        "rating": "avg_rating",
        "difficulty": "avg_difficulty",
        "name": "last_name",
        "num_ratings": "num_ratings"
    }.get(sort_by, "avg_rating")
    
    ascending = sort_order.lower() == "asc"
    query = query.order(sort_column, desc=not ascending, nullsfirst=False)
    
    # Pagination
    offset = (page - 1) * page_size
    query = query.range(offset, offset + page_size - 1)
    
    result = query.execute()
    
    professors = [Professor(**p) for p in result.data]
    total_count = result.count or len(professors)
    
    return ProfessorListResponse(
        professors=professors,
        total_count=total_count,
        page=page,
        page_size=page_size
    )


@router.get("/{professor_id}", response_model=ProfessorDetail)
async def get_professor(professor_id: str):
    """Get a single professor by ID."""
    supabase = get_supabase()
    
    result = supabase.table("professors")\
        .select("*")\
        .eq("id", professor_id)\
        .single()\
        .execute()
    
    if not result.data:
        raise HTTPException(status_code=404, detail="Professor not found")
    
    return ProfessorDetail(**result.data)
