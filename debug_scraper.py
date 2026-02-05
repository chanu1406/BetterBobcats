import requests
import json

API_BASE = "https://reg-prod.ec.ucmerced.edu/StudentRegistrationSsb/ssb"
HEADERS = {
    "User-Agent": "BetterBobcats/1.0 (Course Data Scraper)",
    "Accept": "application/json",
}

def test_scrape():
    session = requests.Session()
    session.post(f"{API_BASE}/classSearch/resetDataForm")
    session.get(f"{API_BASE}/term/search?mode=search")
    session.post(f"{API_BASE}/term/search", data={"term": "202510"})
    
    subjects = ["MATH", "CSE", "PHYS"]
    
    for subj in subjects:
        print(f"\n--- Testing {subj} ---")
        params = {
            "txt_subject": subj,
            "txt_term": "202510",
            "pageOffset": "0",
            "pageMaxSize": "500",
            "sortColumn": "subjectDescription",
            "sortDirection": "asc",
        }
        url = f"{API_BASE}/searchResults/searchResults"
        res = session.get(url, params=params, headers=HEADERS)
        data = res.json()
        
        courses = data.get("data", [])
        print(f"Count: {len(courses)}")
        if courses:
            print(f"First course: {courses[0].get('subject')} {courses[0].get('courseNumber')} - {courses[0].get('courseTitle')}")
            # Check unique subjects returned
            unique_subjs = set(c.get('subject') for c in courses)
            print(f"Subjects in response: {unique_subjs}")

if __name__ == "__main__":
    test_scrape()
