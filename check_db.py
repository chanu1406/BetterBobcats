import os
from supabase import create_client
from collections import Counter
from dotenv import load_dotenv

load_dotenv("backend/.env")

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not url or not key:
    print("Missing env vars")
    exit(1)

sb = create_client(url, key)

# Check total count
count = sb.table("courses").select("*", count="exact").execute()
print(f"Total courses: {count.count}")

# Check subject breakdown
res = sb.table("courses").select("subject_code").limit(10000).execute()
subjects = [r['subject_code'] for r in res.data]
print("Breakdown:")
for subj, c in Counter(subjects).most_common():
    print(f"  {subj}: {c}")
