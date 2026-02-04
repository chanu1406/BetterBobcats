"""
Fetch professors from RMP and output as JSON
"""
import requests
import json

url = "https://www.ratemyprofessors.com/graphql"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Origin": "https://www.ratemyprofessors.com",
    "Referer": "https://www.ratemyprofessors.com/",
    "Authorization": "Basic dGVzdDp0ZXN0"
}

search_query = """
query NewSearchTeachersQuery($query: TeacherSearchQuery!, $count: Int, $after: String) {
  newSearch {
    teachers(query: $query, first: $count, after: $after) {
      edges {
        node {
          id
          legacyId
          firstName
          lastName
          department
          avgRating
          avgDifficulty
          numRatings
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

all_profs = []
cursor = None
pages = 0

# Fetch all professors (paginate up to 15 pages)
while pages < 15:
    variables = {
        "query": {"text": "", "schoolID": "U2Nob29sLTQ3Njc="},
        "count": 100
    }
    if cursor:
        variables["after"] = cursor
    
    response = requests.post(url, json={"query": search_query, "variables": variables}, headers=headers)
    data = response.json()
    
    teachers_data = data.get("data", {}).get("newSearch", {}).get("teachers", {})
    edges = teachers_data.get("edges", [])
    
    for edge in edges:
        if edge and edge.get("node"):
            all_profs.append(edge["node"])
    
    page_info = teachers_data.get("pageInfo", {})
    if not page_info.get("hasNextPage"):
        break
    cursor = page_info.get("endCursor")
    pages += 1
    print(f"Fetched page {pages + 1}, total professors: {len(all_profs)}", flush=True)

print(f"\n\nTotal professors fetched: {len(all_profs)}")

# Save to file
with open("professors_data.json", "w") as f:
    json.dump(all_profs, f, indent=2)

print("Saved to professors_data.json")
