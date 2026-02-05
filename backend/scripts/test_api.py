"""Quick test to verify UC Merced API session handling."""
import requests

s = requests.Session()
API_BASE = 'https://reg-prod.ec.ucmerced.edu/StudentRegistrationSsb/ssb'
term = '202610'

print("Testing UC Merced Course API...")

# Step 1: Reset form
s.post(f'{API_BASE}/classSearch/resetDataForm')
print("1. Reset form - OK")

# Step 2: Get search page to establish session
s.get(f'{API_BASE}/term/search?mode=search')
print("2. Get search page - OK")

# Step 3: Set term
s.post(f'{API_BASE}/term/search', data={'term': term})
print("3. Set term - OK")

# Step 4: Now search for CSE courses
params = {
    'txt_subject': 'CSE',
    'txt_term': term,
    'pageOffset': '0',
    'pageMaxSize': '10'
}
r = s.get(f'{API_BASE}/searchResults/searchResults', params=params)
data = r.json()
print(f"4. Search results - Total CSE courses: {data.get('totalCount', 0)}")

if data.get('data'):
    print("\nSample courses:")
    for c in data['data'][:5]:
        code = f"{c.get('subject')} {c.get('courseNumber')}"
        title = c.get('courseTitle', 'N/A')
        faculty = c.get('faculty', [])
        instructor = faculty[0].get('displayName', 'TBA') if faculty else 'TBA'
        print(f"  {code} - {title}")
        print(f"    Instructor: {instructor}")
else:
    print("\nNo courses found. API may require different session handling.")
