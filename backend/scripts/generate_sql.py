"""
Generate SQL to insert professors data
"""
import json
import re

# Load the professors data
with open("professors_data.json", "r") as f:
    professors = json.load(f)

def slugify(name):
    """Convert name to slug"""
    slug = name.lower().strip()
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    slug = slug.strip('-')
    return slug

def escape_sql(value):
    """Escape single quotes for SQL"""
    if value is None:
        return "NULL"
    if isinstance(value, str):
        return "'" + value.replace("'", "''").strip() + "'"
    return str(value)

# Group by department
departments = {}
for prof in professors:
    dept = prof.get("department") or "Unknown"
    if dept not in departments:
        departments[dept] = []
    departments[dept].append(prof)

# Generate department INSERT SQL
print("-- INSERT DEPARTMENTS")
dept_ids = {}
for dept_name in sorted(departments.keys()):
    slug = slugify(dept_name)
    dept_ids[dept_name] = f"(SELECT id FROM departments WHERE slug = '{slug}')"
    print(f"INSERT INTO departments (name, slug, professor_count) VALUES ({escape_sql(dept_name)}, '{slug}', {len(departments[dept_name])}) ON CONFLICT (slug) DO UPDATE SET professor_count = {len(departments[dept_name])};")

print("\n-- INSERT PROFESSORS")
for prof in professors:
    dept_name = prof.get("department") or "Unknown"
    slug = slugify(dept_name)
    
    first_name = escape_sql(prof.get("firstName"))
    last_name = escape_sql(prof.get("lastName"))
    rmp_id = escape_sql(str(prof.get("legacyId")))
    rmp_graphql_id = escape_sql(prof.get("id"))
    dept = escape_sql(dept_name)
    
    avg_rating = prof.get("avgRating")
    avg_difficulty = prof.get("avgDifficulty")
    num_ratings = prof.get("numRatings", 0)
    would_take_again = prof.get("wouldTakeAgainPercent")
    
    # Handle NULL values
    avg_rating_sql = f"{avg_rating}" if avg_rating is not None else "NULL"
    avg_difficulty_sql = f"{avg_difficulty}" if avg_difficulty is not None else "NULL"
    would_take_again_sql = f"{would_take_again}" if would_take_again is not None and would_take_again >= 0 else "NULL"
    
    print(f"""INSERT INTO professors (first_name, last_name, department_name, department_id, rmp_id, rmp_graphql_id, avg_rating, avg_difficulty, num_ratings, would_take_again_percent) 
VALUES ({first_name}, {last_name}, {dept}, (SELECT id FROM departments WHERE slug = '{slug}'), {rmp_id}, {rmp_graphql_id}, {avg_rating_sql}, {avg_difficulty_sql}, {num_ratings}, {would_take_again_sql})
ON CONFLICT (rmp_graphql_id) DO UPDATE SET avg_rating = EXCLUDED.avg_rating, avg_difficulty = EXCLUDED.avg_difficulty, num_ratings = EXCLUDED.num_ratings, would_take_again_percent = EXCLUDED.would_take_again_percent;""")
