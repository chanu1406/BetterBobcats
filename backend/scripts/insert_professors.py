"""
Insert professors into Supabase using supabase-py client
"""
import json
import os
import re
from supabase import create_client

# Supabase configuration - use the correct project
SUPABASE_URL = "https://bvfphrvjwtedyfknjyem.supabase.co"
# Use anon key - RLS allows service role write
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2ZnBocnZqd3RlZHlma25qeWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2OTcyMzcsImV4cCI6MjA4NDI3MzIzN30.6Xea_MS_nxE2mQypUUeOv00N92jA7uFf5TIs4qg-Ixs"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def slugify(name):
    """Convert name to slug"""
    slug = name.lower().strip()
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    slug = slug.strip('-')
    return slug

# Load the professors data
with open("professors_data.json", "r") as f:
    professors = json.load(f)

print(f"Loaded {len(professors)} professors")

# First get all departments to map slugs to IDs
print("Fetching departments...")
dept_result = supabase.table("departments").select("id, slug").execute()
dept_map = {d["slug"]: d["id"] for d in dept_result.data}
print(f"Found {len(dept_map)} departments")

# Prepare professor records
prof_records = []
for prof in professors:
    dept_name = prof.get("department") or "Unknown"
    slug = slugify(dept_name)
    dept_id = dept_map.get(slug)
    
    # Handle wouldTakeAgainPercent: -1 means no data
    wta = prof.get("wouldTakeAgainPercent")
    if wta is not None and wta < 0:
        wta = None
    
    record = {
        "first_name": (prof.get("firstName") or "").strip(),
        "last_name": (prof.get("lastName") or "").strip(),
        "department_name": dept_name,
        "department_id": dept_id,
        "rmp_id": str(prof.get("legacyId")),
        "rmp_graphql_id": prof.get("id"),
        "avg_rating": prof.get("avgRating"),
        "avg_difficulty": prof.get("avgDifficulty"),
        "num_ratings": prof.get("numRatings", 0),
        "would_take_again_percent": wta
    }
    prof_records.append(record)

print(f"Prepared {len(prof_records)} professor records")

# Insert in batches
BATCH_SIZE = 100
for i in range(0, len(prof_records), BATCH_SIZE):
    batch = prof_records[i:i+BATCH_SIZE]
    try:
        result = supabase.table("professors").upsert(batch, on_conflict="rmp_graphql_id").execute()
        print(f"Inserted batch {i//BATCH_SIZE + 1}: {len(batch)} professors")
    except Exception as e:
        print(f"Error on batch {i//BATCH_SIZE + 1}: {e}")
        # Try inserting one by one to find the problematic record
        for rec in batch:
            try:
                supabase.table("professors").upsert([rec], on_conflict="rmp_graphql_id").execute()
            except Exception as e2:
                print(f"  Failed: {rec['first_name']} {rec['last_name']}: {e2}")

print("Done!")

# Verify
count_result = supabase.table("professors").select("id", count="exact").execute()
print(f"Total professors in database: {count_result.count}")
