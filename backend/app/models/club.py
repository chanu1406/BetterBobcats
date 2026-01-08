"""
Club Model
Pydantic model for club data matching database schema
"""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from uuid import UUID


class ClubBase(BaseModel):
    """Base club model with common fields"""
    name: str = Field(..., description="Club name")
    description: str = Field(..., description="Club description")
    website: Optional[str] = Field(None, description="Club website URL")
    slug: Optional[str] = Field(None, description="URL-friendly slug for the club")
    is_active: bool = Field(True, description="Whether the club is currently active")
    display_order: int = Field(0, description="Order for displaying clubs (lower numbers appear first)")
    logo_url: Optional[str] = Field(None, description="URL to the club's logo image")
    banner_url: Optional[str] = Field(None, description="URL to the club's banner image")


class ClubCreate(ClubBase):
    """Club model for creation (no id or created_at)"""
    pass


class Club(ClubBase):
    """Complete club model matching database schema"""
    id: UUID = Field(..., description="Unique identifier for the club")
    created_at: datetime = Field(..., description="Timestamp when the club was created")
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "name": "ACM (Association for Computing Machinery)",
                "description": "Professional organization for computing students",
                "website": "https://ucm.acm.org/",
                "slug": "acm",
                "is_active": True,
                "display_order": 0,
                "logo_url": "https://example.com/logo.png",
                "banner_url": "https://example.com/banner.png",
                "created_at": "2025-01-02T00:00:00Z"
            }
        }

