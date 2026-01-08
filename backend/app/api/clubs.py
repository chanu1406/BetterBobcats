"""
Clubs API Routes
Endpoints for managing clubs in the database
"""
from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Form, Body
from typing import List, Optional, Dict
from app.models.club import Club, ClubCreate
from app.db.client import get_db
from app.utils.slug import generate_slug
from supabase import Client
import os
import json

router = APIRouter()

# Storage bucket name
STORAGE_BUCKET = "club-assets"


@router.get("/", response_model=List[Club])
async def get_all_clubs(db: Client = Depends(get_db)):
    """
    Get all clubs from the database
    
    Returns:
        List of all clubs ordered by display_order, then created_at
    """
    try:
        response = db.table("clubs").select("*").order("display_order", desc=False).order("created_at", desc=False).execute()
        return [Club(**club) for club in response.data]
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch clubs: {str(e)}"
        )


@router.post("/", response_model=Club, status_code=201)
async def create_club(
    name: str = Form(...),
    description: str = Form(...),
    website: Optional[str] = Form(None),
    slug: Optional[str] = Form(None),
    is_active: bool = Form(True),
    display_order: int = Form(0),
    logo_url: Optional[str] = Form(None),
    banner_url: Optional[str] = Form(None),
    tags: Optional[str] = Form(None),  # JSON array of tag strings
    major_ids: Optional[str] = Form(None),  # JSON array of major UUIDs
    major_notes: Optional[str] = Form(None),  # JSON object mapping major_id to note text
    db: Client = Depends(lambda: get_db(admin=True))  # Use admin client to bypass RLS
):
    """
    Create a new club with optional tags, majors, and major-specific notes
    
    Args:
        name: Club name
        description: Club description
        website: Club website URL (optional)
        slug: URL-friendly slug (optional, auto-generated from name if not provided)
        is_active: Whether club is active
        display_order: Display order
        logo_url: Logo URL (optional)
        banner_url: Banner URL (optional)
        tags: JSON array of tag strings (optional, e.g., '["STEM", "Social"]')
        major_ids: JSON array of major UUID strings (optional)
        major_notes: JSON object mapping major_id to note (optional, e.g., '{"uuid1": "note1"}')
        
    Returns:
        Created club with generated id and created_at
        
    Raises:
        HTTPException: 400 if validation fails, 500 if database error
    """
    try:
        # Generate slug if not provided
        if not slug:
            slug = generate_slug(name)
        
        # Check if slug already exists
        existing = db.table("clubs").select("id").eq("slug", slug).execute()
        if existing.data:
            # Append number if slug exists
            counter = 1
            original_slug = slug
            while existing.data:
                slug = f"{original_slug}-{counter}"
                existing = db.table("clubs").select("id").eq("slug", slug).execute()
                counter += 1
        
        club_dict = {
            "name": name,
            "description": description,
            "website": website,
            "slug": slug,
            "is_active": is_active,
            "display_order": display_order,
            "logo_url": logo_url,
            "banner_url": banner_url,
        }
        
        # Insert into database
        response = db.table("clubs").insert(club_dict).execute()
        
        if not response.data:
            raise HTTPException(
                status_code=500,
                detail="Failed to create club: No data returned"
            )
        
        club = Club(**response.data[0])
        club_id = str(club.id)
        
        # Parse and insert tags
        if tags:
            try:
                tags_list = json.loads(tags)
                if isinstance(tags_list, list) and tags_list:
                    # Insert tags into club_tags table
                    tag_records = [{"club_id": club_id, "tag": tag} for tag in tags_list if tag.strip()]
                    if tag_records:
                        db.table("club_tags").insert(tag_records).execute()
            except json.JSONDecodeError:
                # Invalid JSON, skip tags
                pass
        
        # Parse and insert majors and notes
        if major_ids:
            try:
                majors_list = json.loads(major_ids)
                if isinstance(majors_list, list) and majors_list:
                    # Verify all major IDs exist
                    major_response = db.table("majors").select("id").in_("id", majors_list).execute()
                    valid_major_ids = [m["id"] for m in major_response.data]
                    
                    # Insert club-major relationships
                    if valid_major_ids:
                        major_records = [{"club_id": club_id, "major_id": major_id} for major_id in valid_major_ids]
                        db.table("club_majors").insert(major_records).execute()
                        
                        # Parse and insert major notes if provided
                        if major_notes:
                            try:
                                notes_dict = json.loads(major_notes)
                                if isinstance(notes_dict, dict):
                                    note_records = []
                                    for major_id, note_text in notes_dict.items():
                                        if major_id in valid_major_ids and note_text and note_text.strip():
                                            note_records.append({
                                                "club_id": club_id,
                                                "major_id": major_id,
                                                "note": note_text.strip()
                                            })
                                    if note_records:
                                        db.table("club_major_notes").insert(note_records).execute()
                            except json.JSONDecodeError:
                                # Invalid JSON for notes, skip
                                pass
            except json.JSONDecodeError:
                # Invalid JSON, skip majors
                pass
        
        return club
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to create club: {str(e)}"
        )


@router.post("/{club_slug}/upload-logo")
async def upload_logo(
    club_slug: str,
    file: UploadFile = File(...),
    db: Client = Depends(lambda: get_db(admin=True))  # Use admin client to bypass RLS
):
    """
    Upload logo image for a club
    
    Args:
        club_slug: The club's slug
        file: Image file (must be PNG, max 2MB, 1:1 aspect ratio)
        
    Returns:
        Public URL of the uploaded logo
        
    Raises:
        HTTPException: 404 if club not found, 400 if validation fails
    """
    try:
        # Verify club exists
        club_response = db.table("clubs").select("id, slug").eq("slug", club_slug).execute()
        if not club_response.data:
            raise HTTPException(status_code=404, detail=f"Club with slug '{club_slug}' not found")
        
        # Read file content
        file_content = await file.read()
        
        # Validate file size (2 MB max for logo)
        if len(file_content) > 2 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="Logo file size must be ≤ 2 MB")
        
        # Validate file type
        if not file.content_type or not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Upload to Supabase Storage
        storage_path = f"clubs/{club_slug}/logo.png"
        
        # Upload with upsert (overwrite if exists)
        storage = db.storage.from_(STORAGE_BUCKET)
        upload_response = storage.upload(
            storage_path,
            file_content,
            file_options={"content-type": file.content_type, "upsert": "true"}
        )
        
        # Get public URL
        public_url_response = storage.get_public_url(storage_path)
        # Handle both string and dict responses
        if isinstance(public_url_response, dict):
            public_url = public_url_response.get("publicUrl", public_url_response.get("public_url", str(public_url_response)))
        else:
            public_url = str(public_url_response)
        
        # Update club record with logo URL
        db.table("clubs").update({"logo_url": public_url}).eq("slug", club_slug).execute()
        
        return {"logo_url": public_url, "message": "Logo uploaded successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to upload logo: {str(e)}"
        )


@router.post("/{club_slug}/upload-banner")
async def upload_banner(
    club_slug: str,
    file: UploadFile = File(...),
    db: Client = Depends(lambda: get_db(admin=True))  # Use admin client to bypass RLS
):
    """
    Upload banner image for a club
    
    Args:
        club_slug: The club's slug
        file: Image file (must be JPG/PNG, max 2MB, wide aspect ratio)
        
    Returns:
        Public URL of the uploaded banner
        
    Raises:
        HTTPException: 404 if club not found, 400 if validation fails
    """
    try:
        # Verify club exists
        club_response = db.table("clubs").select("id, slug").eq("slug", club_slug).execute()
        if not club_response.data:
            raise HTTPException(status_code=404, detail=f"Club with slug '{club_slug}' not found")
        
        # Read file content
        file_content = await file.read()
        
        # Validate file size (2 MB max for banner)
        if len(file_content) > 2 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="Banner file size must be ≤ 2 MB")
        
        # Validate file type
        if not file.content_type or not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Upload to Supabase Storage
        storage_path = f"clubs/{club_slug}/banner.jpg"
        
        # Upload with upsert (overwrite if exists)
        storage = db.storage.from_(STORAGE_BUCKET)
        upload_response = storage.upload(
            storage_path,
            file_content,
            file_options={"content-type": file.content_type, "upsert": "true"}
        )
        
        # Get public URL
        public_url_response = storage.get_public_url(storage_path)
        # Handle both string and dict responses
        if isinstance(public_url_response, dict):
            public_url = public_url_response.get("publicUrl", public_url_response.get("public_url", str(public_url_response)))
        else:
            public_url = str(public_url_response)
        
        # Update club record with banner URL
        db.table("clubs").update({"banner_url": public_url}).eq("slug", club_slug).execute()
        
        return {"banner_url": public_url, "message": "Banner uploaded successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to upload banner: {str(e)}"
        )


@router.patch("/{club_id}", response_model=Club)
async def update_club(
    club_id: str,
    update_data: dict = Body(...),
    db: Client = Depends(lambda: get_db(admin=True))  # Use admin client to bypass RLS
):
    """
    Update club fields (typically image URLs)
    
    Args:
        club_id: UUID of the club
        update_data: Dictionary with fields to update (logo_url, banner_url, etc.)
        
    Returns:
        Updated club
        
    Raises:
        HTTPException: 404 if club not found
    """
    try:
        # Check if club exists
        existing = db.table("clubs").select("*").eq("id", club_id).execute()
        if not existing.data:
            raise HTTPException(status_code=404, detail=f"Club with id '{club_id}' not found")
        
        if not update_data:
            return Club(**existing.data[0])
        
        # Update club
        response = db.table("clubs").update(update_data).eq("id", club_id).execute()
        
        if not response.data:
            raise HTTPException(status_code=500, detail="Failed to update club")
        
        return Club(**response.data[0])
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to update club: {str(e)}"
        )


@router.get("/{club_id}", response_model=Club)
async def get_club_by_id(club_id: str, db: Client = Depends(get_db)):
    """
    Get a specific club by ID
    
    Args:
        club_id: UUID of the club
        
    Returns:
        Club details
        
    Raises:
        HTTPException: 404 if club not found
    """
    try:
        response = db.table("clubs").select("*").eq("id", club_id).execute()
        
        if not response.data:
            raise HTTPException(
                status_code=404,
                detail=f"Club with id '{club_id}' not found"
            )
        
        return Club(**response.data[0])
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch club: {str(e)}"
        )
