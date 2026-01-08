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


@router.patch("/{club_id}")
async def update_club(
    club_id: str,
    update_data: dict = Body(...),
    db: Client = Depends(lambda: get_db(admin=True))  # Use admin client to bypass RLS
):
    """
    Update club fields including tags, majors, and notes
    
    Args:
        club_id: UUID of the club
        update_data: Dictionary with fields to update. Can include:
            - name, description, website, slug, is_active, display_order, logo_url, banner_url
            - tags: array of tag strings (replaces all tags if provided)
            - major_ids: array of major UUID strings (replaces all majors if provided)
            - major_notes: object mapping major_id to note (replaces all notes if provided)
        
    Returns:
        Updated club with tags, major_ids, and major_notes
        
    Raises:
        HTTPException: 404 if club not found
    """
    try:
        # Check if club exists
        existing = db.table("clubs").select("*").eq("id", club_id).execute()
        if not existing.data:
            raise HTTPException(status_code=404, detail=f"Club with id '{club_id}' not found")
        
        if not update_data:
            # Return existing club with related data if no updates
            club = Club(**existing.data[0])
            tags_response = db.table("club_tags").select("tag").eq("club_id", club_id).execute()
            tags_list = [tag["tag"] for tag in tags_response.data] if tags_response.data else []
            majors_response = db.table("club_majors").select("major_id").eq("club_id", club_id).execute()
            major_ids_list = [major["major_id"] for major in majors_response.data] if majors_response.data else []
            notes_response = db.table("club_major_notes").select("major_id, note").eq("club_id", club_id).execute()
            major_notes_dict = {note["major_id"]: note["note"] for note in notes_response.data} if notes_response.data else {}
            club_dict = club.model_dump()
            club_dict["tags"] = tags_list
            club_dict["major_ids"] = major_ids_list
            club_dict["major_notes"] = major_notes_dict
            return club_dict
        
        # Separate club fields from related data
        club_fields = {k: v for k, v in update_data.items() if k not in ["tags", "major_ids", "major_notes"]}
        tags = update_data.get("tags")
        major_ids = update_data.get("major_ids")
        major_notes = update_data.get("major_notes")
        
        # Update club table if there are fields to update
        if club_fields:
            response = db.table("clubs").update(club_fields).eq("id", club_id).execute()
            if not response.data:
                raise HTTPException(status_code=500, detail="Failed to update club")
        
        # Update tags if provided (replace all)
        if tags is not None:
            # Delete existing tags
            db.table("club_tags").delete().eq("club_id", club_id).execute()
            # Add new tags
            if isinstance(tags, list) and tags:
                tag_records = [{"club_id": club_id, "tag": tag} for tag in tags if tag and tag.strip()]
                if tag_records:
                    db.table("club_tags").insert(tag_records).execute()
        
        # Update majors and notes if provided (replace all)
        if major_ids is not None:
            # Delete existing majors and notes
            db.table("club_major_notes").delete().eq("club_id", club_id).execute()
            db.table("club_majors").delete().eq("club_id", club_id).execute()
            # Add new majors
            if isinstance(major_ids, list) and major_ids:
                # Verify all major IDs exist
                major_response = db.table("majors").select("id").in_("id", major_ids).execute()
                valid_major_ids = [m["id"] for m in major_response.data]
                
                if valid_major_ids:
                    major_records = [{"club_id": club_id, "major_id": major_id} for major_id in valid_major_ids]
                    db.table("club_majors").insert(major_records).execute()
                    
                    # Add major notes if provided
                    if major_notes and isinstance(major_notes, dict):
                        note_records = []
                        for major_id, note_text in major_notes.items():
                            if major_id in valid_major_ids and note_text and note_text.strip():
                                note_records.append({
                                    "club_id": club_id,
                                    "major_id": major_id,
                                    "note": note_text.strip()
                                })
                        if note_records:
                            db.table("club_major_notes").insert(note_records).execute()
        
        # Fetch updated club with all related data
        updated_response = db.table("clubs").select("*").eq("id", club_id).execute()
        club = Club(**updated_response.data[0])
        
        # Fetch related tags
        tags_response = db.table("club_tags").select("tag").eq("club_id", club_id).execute()
        tags_list = [tag["tag"] for tag in tags_response.data] if tags_response.data else []
        
        # Fetch related majors
        majors_response = db.table("club_majors").select("major_id").eq("club_id", club_id).execute()
        major_ids_list = [major["major_id"] for major in majors_response.data] if majors_response.data else []
        
        # Fetch major notes
        notes_response = db.table("club_major_notes").select("major_id, note").eq("club_id", club_id).execute()
        major_notes_dict = {note["major_id"]: note["note"] for note in notes_response.data} if notes_response.data else {}
        
        # Return club with additional fields
        club_dict = club.model_dump()
        club_dict["tags"] = tags_list
        club_dict["major_ids"] = major_ids_list
        club_dict["major_notes"] = major_notes_dict
        
        return club_dict
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to update club: {str(e)}"
        )


@router.get("/{club_id}")
async def get_club_by_id(club_id: str, db: Client = Depends(get_db)):
    """
    Get a specific club by ID with tags, majors, and notes
    
    Args:
        club_id: UUID of the club
        
    Returns:
        Club details with tags, major_ids, and major_notes
        
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
        
        club = Club(**response.data[0])
        
        # Fetch related tags
        tags_response = db.table("club_tags").select("tag").eq("club_id", club_id).execute()
        tags = [tag["tag"] for tag in tags_response.data] if tags_response.data else []
        
        # Fetch related majors
        majors_response = db.table("club_majors").select("major_id").eq("club_id", club_id).execute()
        major_ids = [major["major_id"] for major in majors_response.data] if majors_response.data else []
        
        # Fetch major notes
        notes_response = db.table("club_major_notes").select("major_id, note").eq("club_id", club_id).execute()
        major_notes = {note["major_id"]: note["note"] for note in notes_response.data} if notes_response.data else {}
        
        # Return club with additional fields
        club_dict = club.model_dump()
        club_dict["tags"] = tags
        club_dict["major_ids"] = major_ids
        club_dict["major_notes"] = major_notes
        
        return club_dict
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch club: {str(e)}"
        )


@router.delete("/{club_id}", status_code=204)
async def delete_club(
    club_id: str,
    db: Client = Depends(lambda: get_db(admin=True))  # Use admin client to bypass RLS
):
    """
    Delete a club and all its related data
    
    This will delete:
    - Club record
    - Related club_tags entries
    - Related club_majors entries (cascades automatically)
    - Related club_major_notes entries
    - Storage files (logo and banner) if they exist
    
    Args:
        club_id: UUID of the club to delete
        
    Raises:
        HTTPException: 404 if club not found, 500 if deletion fails
    """
    try:
        # Check if club exists and get slug for storage cleanup
        club_response = db.table("clubs").select("id, slug, logo_url, banner_url").eq("id", club_id).execute()
        
        if not club_response.data:
            raise HTTPException(
                status_code=404,
                detail=f"Club with id '{club_id}' not found"
            )
        
        club_data = club_response.data[0]
        club_slug = club_data.get("slug")
        
        # Delete related club_tags entries
        try:
            db.table("club_tags").delete().eq("club_id", club_id).execute()
        except Exception:
            # Continue even if deletion fails (table might not exist or be empty)
            pass
        
        # Delete related club_major_notes entries
        try:
            db.table("club_major_notes").delete().eq("club_id", club_id).execute()
        except Exception:
            # Continue even if deletion fails (table might not exist or be empty)
            pass
        
        # Delete storage files if club has a slug
        if club_slug:
            try:
                storage = db.storage.from_(STORAGE_BUCKET)
                # Delete logo if it exists
                logo_path = f"clubs/{club_slug}/logo.png"
                try:
                    storage.remove([logo_path])
                except Exception:
                    # File might not exist, continue
                    pass
                
                # Delete banner if it exists
                banner_path = f"clubs/{club_slug}/banner.jpg"
                try:
                    storage.remove([banner_path])
                except Exception:
                    # File might not exist, continue
                    pass
            except Exception:
                # Storage deletion is not critical, continue with club deletion
                pass
        
        # Delete the club (this will cascade to club_majors due to ON DELETE CASCADE)
        delete_response = db.table("clubs").delete().eq("id", club_id).execute()
        
        # Check if deletion was successful
        if not delete_response.data:
            # This might happen if the club was already deleted
            raise HTTPException(
                status_code=404,
                detail=f"Club with id '{club_id}' not found or already deleted"
            )
        
        return None  # 204 No Content
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to delete club: {str(e)}"
        )
