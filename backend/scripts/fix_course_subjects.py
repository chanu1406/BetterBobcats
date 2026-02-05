"""
Fix Course Subjects Script
Iterates through all courses and fixes subject_code and department_id based on course_code.
"""
import os
import sys
from dotenv import load_dotenv
from supabase import create_client, Client

# Add backend directory to path to import models if needed
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

load_dotenv()

def fix_course_subjects():
    supabase_url = os.getenv("SUPABASE_URL") or os.getenv("NEXT_PUBLIC_SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    
    if not supabase_url or not supabase_key:
        print("Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set")
        return
    
    supabase: Client = create_client(supabase_url, supabase_key)
    
    print("Fetching courses...")
    # Fetch all courses
    # Depending on volume, might need pagination, but for now let's try fetching all
    # max rows is usually 1000 by default in supabase-js, let's see for py
    
    all_courses = []
    page = 0
    page_size = 1000
    
    while True:
        result = supabase.table("courses").select("*").range(page * page_size, (page + 1) * page_size - 1).execute()
        if not result.data:
            break
        all_courses.extend(result.data)
        page += 1
        print(f"Fetched {len(all_courses)} courses so far...")
        
    print(f"Total courses to check: {len(all_courses)}")
    
    # Load departments for linking
    print("Loading departments...")
    departments_result = supabase.table("departments").select("id, name, slug").execute()
    departments_map = {d["slug"].upper().replace("-", " "): d["id"] for d in departments_result.data}
    for d in departments_result.data:
        departments_map[d["name"].upper()] = d["id"]
        
    updated_count = 0
    errors = 0
    
    for course in all_courses:
        try:
            course_id = course["id"]
            course_code = course["course_code"]
            current_subject_code = course["subject_code"]
            
            # Extract actual subject from course_code (e.g., "CSE 100" -> "CSE")
            parts = course_code.split(" ")
            if not parts:
                continue
                
            actual_subject_code = parts[0]
            
            # If subject code is wrong, update it
            if actual_subject_code != current_subject_code:
                print(f"Fixing {course_code}: {current_subject_code} -> {actual_subject_code}")
                
                # Find correct department
                dept_id = departments_map.get(actual_subject_code.upper())
                
                update_data = {
                    "subject_code": actual_subject_code
                }
                
                if dept_id:
                    update_data["department_id"] = dept_id
                
                supabase.table("courses").update(update_data).eq("id", course_id).execute()
                updated_count += 1
                
        except Exception as e:
            print(f"Error processing course {course.get('course_code')}: {e}")
            errors += 1

    print(f"\n{'='*50}")
    print(f"Fix complete!")
    print(f"  Total Checked: {len(all_courses)}")
    print(f"  Updated: {updated_count}")
    print(f"  Errors: {errors}")
    print(f"{'='*50}")

if __name__ == "__main__":
    fix_course_subjects()
