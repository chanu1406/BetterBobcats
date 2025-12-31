"""
Course Model
Defines the structure for courses and prerequisite graph data
"""
from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field


class Semester(str, Enum):
    """Academic semester enumeration"""
    FALL = "fall"
    SPRING = "spring"


class AcademicYear(int, Enum):
    """Academic year enumeration"""
    YEAR_1 = 1
    YEAR_2 = 2
    YEAR_3 = 3
    YEAR_4 = 4


class Course(BaseModel):
    """Course model matching frontend TypeScript interface"""
    id: str = Field(..., description="Unique course identifier, e.g., 'cse-030'")
    code: str = Field(..., description="Course code, e.g., 'CSE 030'")
    name: str = Field(..., description="Course name, e.g., 'Data Structures'")
    full_name: str = Field(..., description="Full course name, e.g., 'CSE 030: Data Structures'")
    year: int = Field(..., ge=1, le=4, description="Academic year (1-4)")
    semester: Semester = Field(..., description="Academic semester")
    prerequisites: list[str] = Field(default_factory=list, description="Array of prerequisite course IDs")
    is_category: Optional[bool] = Field(None, description="True for GenEd/Elective category nodes")
    category: Optional[str] = Field(None, description="Category name: Math, Writing, Physics, etc.")

    class Config:
        json_schema_extra = {
            "example": {
                "id": "cse-030",
                "code": "CSE 030",
                "name": "Data Structures",
                "full_name": "CSE 030: Data Structures",
                "year": 2,
                "semester": "fall",
                "prerequisites": ["cse-020"],
                "is_category": False,
                "category": "CSE"
            }
        }


class CourseGraph(BaseModel):
    """Course graph containing all courses"""
    courses: list[Course] = Field(..., description="List of all courses")
