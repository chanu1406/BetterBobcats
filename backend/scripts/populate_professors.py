"""
RateMyProfessors Data Scraper for UC Merced
Fetches professor data from RMP GraphQL API and populates Supabase database
"""
import os
import time
import json
import requests
from typing import Generator
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

# Configuration
RMP_GRAPHQL_URL = "https://www.ratemyprofessors.com/graphql"
UC_MERCED_SCHOOL_ID = "U2Nob29sLTQ3Njc="  # Base64 encoded School-4767

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "application/json",
    "Accept-Language": "en-US,en;q=0.9",
    "Content-Type": "application/json",
    "Origin": "https://www.ratemyprofessors.com",
    "Referer": "https://www.ratemyprofessors.com/",
}

# GraphQL query for fetching professors with pagination
TEACHERS_QUERY = """
query NewSearchTeachersQuery($query: TeacherSearchQuery!, $first: Int!, $after: String) {
  newSearch {
    teachers(query: $query, first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          legacyId
          firstName
          lastName
          department
          avgRating
          numRatings
          avgDifficulty
          wouldTakeAgainPercent
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
"""


def fetch_all_professors() -> Generator[dict, None, None]:
    """Fetch all professors from UC Merced, handling pagination."""
    cursor = None
    page = 1
    
    while True:
        variables = {
            "query": {
                "text": "",
                "schoolID": UC_MERCED_SCHOOL_ID
            },
            "first": 100,  # Max per page
            "after": cursor
        }
        
        print(f"Fetching page {page}...")
        response = requests.post(
            RMP_GRAPHQL_URL,
            json={"query": TEACHERS_QUERY, "variables": variables},
            headers=HEADERS
        )
        
        if response.status_code != 200:
            print(f"Error: HTTP {response.status_code}")
            break
        
        data = response.json()
        if "errors" in data:
            print(f"GraphQL errors: {data['errors']}")
            break
        
        teachers_data = data.get("data", {}).get("newSearch", {}).get("teachers", {})
        edges = teachers_data.get("edges", [])
        page_info = teachers_data.get("pageInfo", {})
        
        for edge in edges:
            yield edge["node"]
        
        if not page_info.get("hasNextPage"):
            break
        
        cursor = page_info.get("endCursor")
        page += 1
        time.sleep(0.5)  # Rate limiting


def slugify(text: str) -> str:
    """Convert text to URL-friendly slug."""
    return text.lower().replace(" ", "-").replace("&", "and").replace("/", "-")


def populate_database():
    """Fetch professors from RMP and populate Supabase database."""
    supabase_url = os.getenv("SUPABASE_URL") or os.getenv("NEXT_PUBLIC_SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    
    if not supabase_url or not supabase_key:
        print("Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set")
        print("Set these in backend/.env or as environment variables")
        return
    
    supabase: Client = create_client(supabase_url, supabase_key)
    
    # Track departments for batch insert
    departments_map: dict[str, str] = {}  # name -> id
    professors_to_insert = []
    
    print("Fetching professors from RateMyProfessors...")
    for professor in fetch_all_professors():
        dept_name = professor.get("department") or "Unknown"
        
        # Create department if needed
        if dept_name not in departments_map:
            dept_slug = slugify(dept_name)
            
            # Upsert department
            result = supabase.table("departments").upsert(
                {"name": dept_name, "slug": dept_slug},
                on_conflict="name"
            ).execute()
            
            if result.data:
                departments_map[dept_name] = result.data[0]["id"]
                print(f"  Created/updated department: {dept_name}")
        
        # Prepare professor data
        prof_data = {
            "rmp_id": str(professor.get("legacyId")),
            "rmp_graphql_id": professor.get("id"),
            "first_name": (professor.get("firstName") or "").strip(),
            "last_name": (professor.get("lastName") or "").strip(),
            "department_id": departments_map.get(dept_name),
            "department_name": dept_name,
            "avg_rating": professor.get("avgRating"),
            "avg_difficulty": professor.get("avgDifficulty"),
            "num_ratings": professor.get("numRatings") or 0,
            "would_take_again_percent": professor.get("wouldTakeAgainPercent"),
        }
        professors_to_insert.append(prof_data)
    
    print(f"\nInserting {len(professors_to_insert)} professors...")
    
    # Batch upsert professors (in chunks of 100)
    chunk_size = 100
    for i in range(0, len(professors_to_insert), chunk_size):
        chunk = professors_to_insert[i:i + chunk_size]
        result = supabase.table("professors").upsert(
            chunk,
            on_conflict="rmp_id"
        ).execute()
        print(f"  Inserted batch {i // chunk_size + 1}")
    
    print(f"\nDone! Inserted {len(professors_to_insert)} professors across {len(departments_map)} departments.")


if __name__ == "__main__":
    populate_database()
