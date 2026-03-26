"""
UC Merced Course Schedule Scraper
Fetches course data from UC Merced's registration API and populates Supabase database

API Base: https://reg-prod.ec.ucmerced.edu/StudentRegistrationSsb/ssb
Reference: https://github.com/aelew/ucmerced-ical
"""
import os
import time
import requests
from typing import Generator
from difflib import SequenceMatcher
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

# Configuration
API_BASE = "https://reg-prod.ec.ucmerced.edu/StudentRegistrationSsb/ssb"

HEADERS = {
    "User-Agent": "BetterBobcats/1.0 (Course Data Scraper)",
    "Accept": "application/json",
}


def get_terms() -> list[dict]:
    """Fetch available academic terms."""
    url = f"{API_BASE}/classSearch/getTerms"
    params = {"searchTerm": "", "offset": "1", "max": "10"}
    
    response = requests.get(url, params=params, headers=HEADERS)
    response.raise_for_status()
    return response.json()


def get_subjects(term: str) -> list[dict]:
    """Fetch all subjects/departments for a term."""
    url = f"{API_BASE}/classSearch/get_subject"
    params = {"searchTerm": "", "term": term, "offset": "1", "max": "999"}
    
    response = requests.get(url, params=params, headers=HEADERS)
    response.raise_for_status()
    return response.json()


def search_courses(session: requests.Session, term: str, subject: str, offset: int = 0, max_results: int = 500) -> dict:
    """Search for courses by subject using an established session."""
    params = {
        "txt_subject": subject,
        "txt_term": term,
        "pageOffset": str(offset),
        "pageMaxSize": str(max_results),
        "sortColumn": "subjectDescription",
        "sortDirection": "asc",
    }
    
    url = f"{API_BASE}/searchResults/searchResults"
    response = session.get(url, params=params, headers=HEADERS)
    response.raise_for_status()
    return response.json()


def get_faculty_meeting_times(term: str, crn: str) -> dict:
    """Get instructor and meeting time info for a course section."""
    url = f"{API_BASE}/searchResults/getFacultyMeetingTimes"
    params = {"term": term, "courseReferenceNumber": crn}
    
    response = requests.get(url, params=params, headers=HEADERS)
    response.raise_for_status()
    return response.json()


def normalize_name(name: str) -> str:
    """Normalize a name for matching."""
    return " ".join(name.lower().split())


def find_professor_match(
    first_name: str, 
    last_name: str, 
    professors_cache: dict[str, str]
) -> str | None:
    """
    Find a matching professor ID using fuzzy matching.
    Returns professor UUID or None if no match.
    """
    search_name = normalize_name(f"{first_name} {last_name}")
    
    best_match = None
    best_ratio = 0.0
    
    for full_name, prof_id in professors_cache.items():
        ratio = SequenceMatcher(None, search_name, full_name).ratio()
        if ratio > best_ratio and ratio >= 0.75:  # 75% threshold
            best_ratio = ratio
            best_match = prof_id
    
    return best_match


def create_data_import_run(supabase: Client, source: str) -> str | None:
    """Create a data_imports row marking a scraper run as running."""
    try:
        result = (
            supabase
            .table("data_imports")
            .insert({"source": source, "status": "running"})
            .execute()
        )
        if result.data:
            return result.data[0]["id"]
    except Exception as e:
        # Non-fatal: scraping should still continue even if observability write fails.
        print(f"Warning: failed to create data_imports row: {e}")
    return None


def finalize_data_import_run(
    supabase: Client,
    import_id: str | None,
    *,
    status: str,
    record_count: int | None = None,
    error_message: str | None = None,
) -> None:
    """Update a data_imports row at the end of a scraper run."""
    if not import_id:
        return

    payload: dict[str, object] = {"status": status}
    if record_count is not None:
        payload["record_count"] = record_count
    if error_message:
        payload["error"] = error_message[:4000]

    try:
        (
            supabase
            .table("data_imports")
            .update(payload)
            .eq("id", import_id)
            .execute()
        )
    except Exception as e:
        print(f"Warning: failed to update data_imports row {import_id}: {e}")


def fetch_and_populate_courses(term: str = None, subjects: list[str] = None):
    """
    Main function to fetch courses and populate database.
    
    Args:
        term: Specific term to fetch (e.g., "202510"). If None, uses latest.
        subjects: List of subject codes to fetch. If None, fetches all.
    """
    supabase_url = os.getenv("SUPABASE_URL") or os.getenv("NEXT_PUBLIC_SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    
    if not supabase_url or not supabase_key:
        print("Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set")
        print("Set these in backend/.env or as environment variables")
        return
    
    supabase: Client = create_client(supabase_url, supabase_key)
    
    import_id = create_data_import_run(supabase, "courses")
    courses_added = 0
    sections_added = 0
    professor_links = 0

    try:
        # Get term if not specified
        if not term:
            terms = get_terms()
            if not terms:
                raise RuntimeError("Could not fetch terms")
            term = terms[0]["code"]
            print(f"Using term: {terms[0]['description']} ({term})")

        # Get subjects if not specified
        if not subjects:
            subject_data = get_subjects(term)
            subjects = [s["code"] for s in subject_data]
            print(f"Found {len(subjects)} subjects")

        # Load professors for matching
        print("Loading professors for matching...")
        professors_result = supabase.table("professors").select("id, first_name, last_name").execute()
        professors_cache = {
            normalize_name(f"{p['first_name']} {p['last_name']}"): p["id"]
            for p in professors_result.data
        }
        print(f"Loaded {len(professors_cache)} professors")

        # Load departments for linking
        departments_result = supabase.table("departments").select("id, name, slug").execute()
        departments_map = {d["slug"].upper().replace("-", " "): d["id"] for d in departments_result.data}
        # Also map by name
        for d in departments_result.data:
            departments_map[d["name"].upper()] = d["id"]

        # Process each subject
        for subject_code in subjects:
            print(f"\nProcessing {subject_code}...")

            # Create fresh session for each subject to avoid stale data
            session = requests.Session()
            session.post(f"{API_BASE}/classSearch/resetDataForm")
            session.get(f"{API_BASE}/term/search?mode=search")
            session.post(f"{API_BASE}/term/search", data={"term": term})

            try:
                results = search_courses(session, term, subject_code)
                courses = results.get("data", [])

                if not courses:
                    print(f"  No courses found for {subject_code}")
                    continue

                print(f"  Found {len(courses)} course sections")

                for course_data in courses:
                    try:
                        # Extract course info
                        course_code = f"{course_data.get('subject', '')} {course_data.get('courseNumber', '')}".strip()
                        if not course_code or course_code == " ":
                            continue

                        title = course_data.get("courseTitle", "")
                        crn = str(course_data.get("courseReferenceNumber", ""))
                        section_num = course_data.get("sequenceNumber", "")
                        credits = course_data.get("creditHours")

                        # Get actual subject code from course data (not the search parameter)
                        actual_subject = course_data.get("subject", subject_code)

                        # Find department
                        dept_id = departments_map.get(actual_subject.upper())

                        # Upsert course (base course, not section)
                        course_record = {
                            "course_code": course_code,
                            "course_number": course_data.get("courseNumber", ""),
                            "title": title,
                            "subject_code": actual_subject,
                            "department_id": dept_id,
                            "credits": int(credits) if credits else None,
                        }

                        course_result = supabase.table("courses").upsert(
                            course_record,
                            on_conflict="course_code"
                        ).execute()

                        if course_result.data:
                            course_id = course_result.data[0]["id"]
                            courses_added += 1
                        else:
                            continue

                        # Extract meeting time info
                        meeting_times = course_data.get("meetingsFaculty", [])
                        meeting_days = ""
                        start_time = ""
                        end_time = ""
                        building = ""
                        room = ""

                        if meeting_times:
                            mt = meeting_times[0].get("meetingTime", {})
                            # Build days string
                            days = []
                            if mt.get("monday"): days.append("M")
                            if mt.get("tuesday"): days.append("T")
                            if mt.get("wednesday"): days.append("W")
                            if mt.get("thursday"): days.append("R")
                            if mt.get("friday"): days.append("F")
                            if mt.get("saturday"): days.append("S")
                            if mt.get("sunday"): days.append("U")
                            meeting_days = "".join(days)

                            start_time = mt.get("beginTime", "")
                            end_time = mt.get("endTime", "")
                            building = mt.get("building", "")
                            room = mt.get("room", "")

                        # Insert section
                        section_record = {
                            "course_id": course_id,
                            "crn": crn,
                            "term": term,
                            "section_number": section_num,
                            "meeting_days": meeting_days,
                            "start_time": start_time,
                            "end_time": end_time,
                            "building": building,
                            "room": room,
                        }

                        section_result = supabase.table("course_sections").upsert(
                            section_record,
                            on_conflict="crn,term"
                        ).execute()

                        if section_result.data:
                            section_id = section_result.data[0]["id"]
                            sections_added += 1
                        else:
                            continue

                        # Process faculty (instructors)
                        faculty_list = course_data.get("faculty", [])
                        for faculty in faculty_list:
                            display_name = faculty.get("displayName", "")
                            if not display_name or display_name == "Staff":
                                continue

                            # Parse name - typically "Last, First" or "Last, First Middle"
                            name_parts = display_name.split(",")
                            if len(name_parts) >= 2:
                                last_name = name_parts[0].strip()
                                first_name = name_parts[1].strip().split()[0] if name_parts[1].strip() else ""
                            else:
                                # Try splitting by space
                                parts = display_name.split()
                                first_name = parts[0] if parts else ""
                                last_name = parts[-1] if len(parts) > 1 else ""

                            # Find matching professor
                            professor_id = find_professor_match(first_name, last_name, professors_cache)

                            if professor_id:
                                is_primary = faculty.get("primaryIndicator", False)

                                # Insert professor-section link
                                link_record = {
                                    "professor_id": professor_id,
                                    "section_id": section_id,
                                    "is_primary": is_primary,
                                }

                                try:
                                    supabase.table("professor_sections").upsert(
                                        link_record,
                                        on_conflict="professor_id,section_id"
                                    ).execute()
                                    professor_links += 1
                                except Exception:
                                    # Link may already exist
                                    pass

                    except Exception as e:
                        print(f"  Error processing course: {e}")
                        continue

                # Rate limiting
                time.sleep(0.3)

            except Exception as e:
                print(f"  Error fetching {subject_code}: {e}")
                continue

        total_records = courses_added + sections_added + professor_links
        finalize_data_import_run(
            supabase,
            import_id,
            status="success",
            record_count=total_records,
        )

        print(f"\n{'='*50}")
        print("Scraping complete!")
        print(f"  Courses: {courses_added}")
        print(f"  Sections: {sections_added}")
        print(f"  Professor links: {professor_links}")
        print(f"  Total records processed: {total_records}")
        print(f"{'='*50}")
    except Exception as e:
        finalize_data_import_run(
            supabase,
            import_id,
            status="failed",
            record_count=courses_added + sections_added + professor_links,
            error_message=str(e),
        )
        print(f"Fatal error during course scrape: {e}")
        raise


if __name__ == "__main__":
    import sys
    
    # Allow specifying term and subjects via command line
    term = sys.argv[1] if len(sys.argv) > 1 else None
    subjects = sys.argv[2:] if len(sys.argv) > 2 else None
    
    fetch_and_populate_courses(term, subjects)
