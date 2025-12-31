"""
Courses API Routes
Endpoints for course and prerequisite data
"""
from fastapi import APIRouter, HTTPException
from app.models.course import Course, CourseGraph
from app.data.courses import CS_CSE_COURSES

router = APIRouter()

# Use course data from data file
# TODO: Move to database once Supabase is configured
COURSES_DATA = CS_CSE_COURSES


@router.get("/", response_model=list[Course])
async def get_all_courses():
    """
    Get all courses
    
    Returns:
        List of all courses with their prerequisites
    """
    return COURSES_DATA


@router.get("/{course_id}", response_model=Course)
async def get_course_by_id(course_id: str):
    """
    Get a specific course by ID
    
    Args:
        course_id: The unique course identifier (e.g., 'cse-030')
        
    Returns:
        Course details
        
    Raises:
        HTTPException: 404 if course not found
    """
    course = next((c for c in COURSES_DATA if c.id == course_id), None)
    if not course:
        raise HTTPException(status_code=404, detail=f"Course '{course_id}' not found")
    return course


@router.get("/graph/", response_model=CourseGraph)
async def get_course_graph():
    """
    Get course graph for visualization
    
    Returns:
        CourseGraph containing all courses
    """
    return CourseGraph(courses=COURSES_DATA)
