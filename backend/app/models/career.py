"""
Career Path Models
Pydantic models for career path data matching frontend TypeScript types
"""
from pydantic import BaseModel, Field
from typing import Optional


class ExpandedInfo(BaseModel):
    """Expanded information for a course in a career path"""
    credits: Optional[int] = None
    prerequisites: Optional[str] = None
    learning_outcomes: Optional[list[str]] = Field(default=None, alias="learningOutcomes")
    topics: Optional[list[str]] = None
    career_relevance: Optional[str] = Field(default=None, alias="careerRelevance")
    additional_notes: Optional[str] = Field(default=None, alias="additionalNotes")
    
    class Config:
        populate_by_name = True


class TierCourse(BaseModel):
    """Course in a career path tier"""
    id: str
    code: str
    name: str
    full_name: str = Field(alias="fullName")
    description: str
    resources: Optional[list[str]] = None
    tier: int
    prerequisites: Optional[list[str]] = None
    expanded_info: Optional[ExpandedInfo] = Field(default=None, alias="expandedInfo")
    
    class Config:
        populate_by_name = True


class CareerPathCategory(BaseModel):
    """Category/tier in a career path"""
    id: str
    label: str
    emoji: Optional[str] = None


class CareerPathConfig(BaseModel):
    """Complete career path configuration"""
    root_label: str = Field(alias="rootLabel")
    categories: list[CareerPathCategory]
    courses: list[TierCourse]
    category_intros: Optional[dict[str, str]] = Field(default=None, alias="categoryIntros")
    
    class Config:
        populate_by_name = True
