"""
Course Catalog Models
Models for the course listing and professor-course linking feature
(Separate from course.py which handles degree path visualizations)
"""
from typing import Optional
from pydantic import BaseModel, Field
from uuid import UUID


class CourseSummary(BaseModel):
    """Course summary for list views"""
    id: UUID
    course_code: str
    course_number: str
    title: str
    subject_code: str
    credits: Optional[int] = None


class CourseSection(BaseModel):
    """Course section (specific offering per term)"""
    id: UUID
    crn: str
    term: str
    section_number: Optional[str] = None
    meeting_days: Optional[str] = None
    start_time: Optional[str] = None
    end_time: Optional[str] = None
    building: Optional[str] = None
    room: Optional[str] = None


class CourseProfessor(BaseModel):
    """Professor info for course display"""
    id: UUID
    first_name: str
    last_name: str
    avg_rating: Optional[float] = None
    avg_difficulty: Optional[float] = None
    num_ratings: int = 0
    is_primary: bool = True


class CourseDetail(CourseSummary):
    """Full course details with sections and professors"""
    description: Optional[str] = None
    sections: list[CourseSection] = Field(default_factory=list)
    professors: list[CourseProfessor] = Field(default_factory=list)


class CourseWithProfessor(CourseSummary):
    """Course with primary professor for list display"""
    professor_id: Optional[UUID] = None
    professor_first_name: Optional[str] = None
    professor_last_name: Optional[str] = None
    professor_rating: Optional[float] = None
    section_id: Optional[UUID] = None
    meeting_days: Optional[str] = None
    start_time: Optional[str] = None
    end_time: Optional[str] = None


class SubjectInfo(BaseModel):
    """Subject (department) with course count"""
    subject_code: str
    course_count: int


class CourseListResponse(BaseModel):
    """Response for course list endpoint"""
    courses: list[CourseWithProfessor]
    total_count: int
    page: int
    page_size: int


class SubjectListResponse(BaseModel):
    """Response for subject list endpoint"""
    subjects: list[SubjectInfo]
    total_count: int
