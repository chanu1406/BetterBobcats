"""
Courses API Router
Endpoints for fetching course catalog data and professor-course links
"""
import os
from typing import Optional
from fastapi import APIRouter, HTTPException, Query
from supabase import create_client, Client
from dotenv import load_dotenv

from app.models.course_catalog import (
    CourseSummary,
    CourseDetail,
    CourseWithProfessor,
    CourseSection,
    CourseProfessor,
    SubjectInfo,
    CourseListResponse,
    SubjectListResponse,
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


@router.get("/subjects", response_model=SubjectListResponse)
async def list_subjects():
    """Get all subjects with course counts."""
    supabase = get_supabase()
    
    # Get distinct subjects with counts
    result = supabase.table("courses")\
        .select("subject_code")\
        .execute()
    
    # Count courses per subject
    subject_counts: dict[str, int] = {}
    for row in result.data:
        code = row["subject_code"]
        subject_counts[code] = subject_counts.get(code, 0) + 1
    
    subjects = [
        SubjectInfo(subject_code=code, course_count=count)
        for code, count in sorted(subject_counts.items())
    ]
    
    return SubjectListResponse(
        subjects=subjects,
        total_count=len(subjects)
    )


@router.get("", response_model=CourseListResponse)
async def list_courses(
    subject: Optional[str] = Query(None, description="Filter by subject code (e.g., CSE, MATH)"),
    search: Optional[str] = Query(None, description="Search by course code or title"),
    term: Optional[str] = Query(None, description="Filter by term (e.g., 202610)"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(20, ge=1, le=100, description="Items per page"),
):
    """Get courses with optional filtering and pagination."""
    supabase = get_supabase()
    
    # Use the view for easier querying
    query = supabase.table("courses_with_professors")\
        .select("*", count="exact")
    
    # Filter by subject
    if subject:
        query = query.eq("subject_code", subject.upper())
    
    # Filter by term
    if term:
        query = query.eq("term", term)
    
    # Search by course code or title
    if search:
        search_term = f"%{search}%"
        query = query.or_(f"course_code.ilike.{search_term},title.ilike.{search_term}")
    
    # Order by course code
    query = query.order("course_code")
    
    # Pagination
    offset = (page - 1) * page_size
    query = query.range(offset, offset + page_size - 1)
    
    result = query.execute()
    
    # Transform to response model
    courses = []
    seen_courses: set[str] = set()
    
    for row in result.data:
        course_id = row["course_id"]
        if course_id in seen_courses:
            continue
        seen_courses.add(course_id)
        
        courses.append(CourseWithProfessor(
            id=course_id,
            course_code=row["course_code"],
            course_number=row.get("course_code", "").split()[-1] if row.get("course_code") else "",
            title=row["title"],
            subject_code=row["subject_code"],
            credits=row.get("credits"),
            professor_id=row.get("professor_id"),
            professor_first_name=row.get("professor_first_name"),
            professor_last_name=row.get("professor_last_name"),
            professor_rating=row.get("professor_rating"),
            section_id=row.get("section_id"),
            meeting_days=row.get("meeting_days"),
            start_time=row.get("start_time"),
            end_time=row.get("end_time"),
        ))
    
    return CourseListResponse(
        courses=courses,
        total_count=result.count or len(courses),
        page=page,
        page_size=page_size
    )


@router.get("/{course_id}", response_model=CourseDetail)
async def get_course(course_id: str):
    """Get a single course with all sections and professors."""
    supabase = get_supabase()
    
    # Get base course info
    course_result = supabase.table("courses")\
        .select("*")\
        .eq("id", course_id)\
        .single()\
        .execute()
    
    if not course_result.data:
        raise HTTPException(status_code=404, detail="Course not found")
    
    course_data = course_result.data
    
    # Get all sections
    sections_result = supabase.table("course_sections")\
        .select("*")\
        .eq("course_id", course_id)\
        .order("term", desc=True)\
        .execute()
    
    sections = [CourseSection(**s) for s in sections_result.data]
    
    # Get all professors teaching this course
    section_ids = [s.id for s in sections]
    professors = []
    
    if section_ids:
        # Query professor_sections with professor info
        prof_result = supabase.table("professor_sections")\
            .select("*, professors(*)")\
            .in_("section_id", [str(sid) for sid in section_ids])\
            .execute()
        
        seen_profs: set[str] = set()
        for row in prof_result.data:
            prof_data = row.get("professors", {})
            if prof_data and prof_data["id"] not in seen_profs:
                seen_profs.add(prof_data["id"])
                professors.append(CourseProfessor(
                    id=prof_data["id"],
                    first_name=prof_data.get("first_name", ""),
                    last_name=prof_data.get("last_name", ""),
                    avg_rating=prof_data.get("avg_rating"),
                    avg_difficulty=prof_data.get("avg_difficulty"),
                    num_ratings=prof_data.get("num_ratings", 0),
                    is_primary=row.get("is_primary", True),
                ))
    
    return CourseDetail(
        id=course_data["id"],
        course_code=course_data["course_code"],
        course_number=course_data["course_number"],
        title=course_data["title"],
        subject_code=course_data["subject_code"],
        credits=course_data.get("credits"),
        description=course_data.get("description"),
        sections=sections,
        professors=professors,
    )


@router.get("/by-code/{course_code:path}")
async def get_course_by_code(course_code: str):
    """Get a course by its code (e.g., CSE-120 or CSE 120)."""
    supabase = get_supabase()
    
    # Normalize course code - handle both "CSE-120" and "CSE 120"
    normalized = course_code.upper().replace("-", " ")
    
    result = supabase.table("courses")\
        .select("id")\
        .eq("course_code", normalized)\
        .single()\
        .execute()
    
    if not result.data:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Redirect to the main endpoint
    return await get_course(result.data["id"])
