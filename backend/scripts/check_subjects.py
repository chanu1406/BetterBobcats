"""Quick script to check available subjects at UC Merced"""
import requests
import sys

API_BASE = "https://reg-prod.ec.ucmerced.edu/StudentRegistrationSsb/ssb"

# Get all terms
terms = requests.get(f"{API_BASE}/classSearch/getTerms", params={"searchTerm": "", "offset": "1", "max": "10"}).json()
print("Available terms:")
for t in terms:
    print(f"  {t['code']}: {t['description']}")

# Use specified term or default to Spring 2026 (more classes than summer)
term = sys.argv[1] if len(sys.argv) > 1 else "202610"  # Spring 2026
term_desc = next((t['description'] for t in terms if t['code'] == term), term)
print(f"\nUsing term: {term_desc} ({term})")

# Get all subjects
subjects = requests.get(f"{API_BASE}/classSearch/get_subject", params={"searchTerm": "", "term": term, "offset": "1", "max": "999"}).json()
print(f"\nTotal subjects: {len(subjects)}")
print("\nSubjects:")
for s in subjects:
    print(f"  {s['code']}: {s['description']}")
