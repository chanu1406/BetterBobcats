"""
Professor Models
Defines the structure for professors and departments
"""
from typing import Optional
from pydantic import BaseModel, Field
from uuid import UUID


class Department(BaseModel):
    """Department model"""
    id: UUID
    name: str
    slug: str
    professor_count: int = 0


class Professor(BaseModel):
    """Professor model for list views"""
    id: UUID
    first_name: str
    last_name: str
    department_name: Optional[str] = None
    avg_rating: Optional[float] = None
    avg_difficulty: Optional[float] = None
    num_ratings: int = 0
    would_take_again_percent: Optional[float] = None


class ProfessorDetail(Professor):
    """Extended professor model with additional details"""
    rmp_id: Optional[str] = None
    rmp_graphql_id: Optional[str] = None
    department_id: Optional[UUID] = None


class ProfessorListResponse(BaseModel):
    """Response model for professor list endpoint"""
    professors: list[Professor]
    total_count: int
    page: int
    page_size: int


class DepartmentListResponse(BaseModel):
    """Response model for department list endpoint"""
    departments: list[Department]
    total_count: int
