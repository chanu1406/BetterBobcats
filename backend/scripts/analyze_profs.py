"""
Insert fetched professors into Supabase using MCP-style SQL
"""
import json

# Load the professors data
with open("professors_data.json", "r") as f:
    professors = json.load(f)

# Group by department
departments = {}
for prof in professors:
    dept = prof.get("department") or "Unknown"
    if dept not in departments:
        departments[dept] = []
    departments[dept].append(prof)

print(f"Found {len(departments)} departments:")
for dept, profs in sorted(departments.items()):
    print(f"  {dept}: {len(profs)} professors")
