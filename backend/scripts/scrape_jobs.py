"""
Job Board Scraper
Fetches job/internship listings from GitHub repositories and populates the Supabase database.

Data Sources:
  - SimplifyJobs (Tech internships): HTML table format
  - stallionz-arch (Research internships): Markdown list format

Usage:
    python scripts/scrape_jobs.py
"""
import os
import re
import json
import html
import requests
from datetime import datetime, timezone
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

# ── Data Sources ─────────────────────────────────────────────────
SOURCES = [
    {
        "name": "scraped_tech",
        "label": "Tech Internships (SimplifyJobs)",
        "url": "https://raw.githubusercontent.com/SimplifyJobs/Summer2026-Internships/dev/README.md",
    },
    {
        "name": "scraped_research",
        "label": "Research Internships",
        "url": "https://raw.githubusercontent.com/stallionz-arch/Internships/main/README.md",
    },
]

HEADERS = {
    "User-Agent": "BetterBobcats/1.0 (Job Data Scraper)",
    "Accept": "text/plain",
}


# ── Parsers ──────────────────────────────────────────────────────
def parse_simplify_jobs(markdown: str) -> list[dict]:
    """
    Parse SimplifyJobs HTML table format.
    Columns: Company | Role | Location | Application/Link
    """
    jobs: list[dict] = []

    tbody_match = re.search(r"<tbody>([\s\S]*?)</tbody>", markdown, re.IGNORECASE)
    if not tbody_match:
        print("  WARNING: Could not find <tbody> in SimplifyJobs markdown")
        return jobs

    tbody = tbody_match.group(1)
    rows = re.finditer(r"<tr>([\s\S]*?)</tr>", tbody, re.IGNORECASE)

    for row_match in rows:
        row = row_match.group(1)
        cells: list[str] = [
            m.group(1).strip()
            for m in re.finditer(r"<td[^>]*>([\s\S]*?)</td>", row, re.IGNORECASE)
        ]

        if len(cells) < 4:
            continue

        # ── Company ──
        company = re.sub(r"<strong>|</strong>", "", cells[0], flags=re.IGNORECASE)
        company_link = re.search(r"<a[^>]*>(.+?)</a>", company, re.IGNORECASE)
        company = company_link.group(1) if company_link else company
        company = company.strip()

        # ── Role ──
        role = re.sub(r"<[^>]*>", "", cells[1]).strip()

        # ── Location ──
        location = re.sub(r"<[^>]*>", "", cells[2]).strip()

        # ── Application Link ──
        link_cell = cells[3]
        is_closed = "\U0001f512" in link_cell or "closed" in link_cell.lower()
        link = ""

        if not is_closed:
            # Strategy 1: HTML href
            href_match = re.search(r'<a\s+href=["\']([^"\']+)["\']', link_cell, re.IGNORECASE)
            if href_match:
                link = href_match.group(1)

            # Strategy 2: Markdown [text](url)
            if not link:
                md_match = re.search(r"\[.+?\]\(([^)]+)\)", link_cell)
                if md_match:
                    link = md_match.group(1)

            # Strategy 3: Raw URL
            if not link:
                url_match = re.search(r"https?://[^\s<>\"']+", link_cell, re.IGNORECASE)
                if url_match:
                    link = url_match.group(0)

            if link:
                link = html.unescape(link).strip().rstrip("<>'\"")
                if not link.startswith(("http://", "https://")):
                    link = ""

        if company and role and location:
            jobs.append({
                "company": company,
                "role": role,
                "location": location,
                "application_url": link,
            })

    return jobs


def parse_research_list(markdown: str) -> list[dict]:
    """
    Parse Research Internships markdown list format.
    Format: ### N. [Program Name](link), Organization
    """
    jobs: list[dict] = []
    pattern = re.compile(r"###\s*\d+\.\s*\[([^\]]+)\]\(([^)]+)\)[,\s]*(.*)?")

    COUNTRY_MAP = {
        "usa": "USA", "united states": "USA",
        "canada": "Canada", "germany": "Germany",
        "switzerland": "Switzerland", "uk": "UK",
        "united kingdom": "UK", "japan": "Japan",
        "france": "France",
    }

    for match in pattern.finditer(markdown):
        program_name = match.group(1).strip()
        link = match.group(2).strip()
        organization = (match.group(3) or "").strip()

        # Detect location from organization text
        location = "International"
        org_lower = organization.lower()
        for keyword, country in COUNTRY_MAP.items():
            if keyword in org_lower:
                location = country
                break

        # Extract company name
        company = organization.split(",")[0].strip() if organization else program_name.split(" ")[0]

        if program_name and link:
            jobs.append({
                "company": company,
                "role": program_name,
                "location": location,
                "application_url": link,
            })

    return jobs


PARSER_MAP = {
    "scraped_tech": parse_simplify_jobs,
    "scraped_research": parse_research_list,
}


# ── Auto-tag helper ──────────────────────────────────────────────
def infer_degree_category(role: str) -> str:
    """Guess the best degree filter tag from the role text."""
    r = role.lower()
    if any(k in r for k in ("software", "developer", "web", "backend", "frontend",
                             "full stack", "fullstack", "data scien", "machine learning",
                             "ml engineer", "ai engineer", "cloud", "devops")):
        return "CS"
    if any(k in r for k in ("electrical", "hardware", "circuit", "fpga", "vlsi",
                             "semiconductor", "embedded")):
        return "EE"
    if any(k in r for k in ("mechanical", "manufacturing", "thermal", "cad")):
        return "ME"
    if any(k in r for k in ("biolog", "biotech", "biomed", "genomic", "lab tech",
                             "pharmaceutical", "chemistry")):
        return "Bio"
    if any(k in r for k in ("nurs", "clinical", "pre-med", "health")):
        return "Nursing"
    if any(k in r for k in ("business", "management", "finance", "marketing", "accounting")):
        return "Business"
    return "All"


def infer_tags(role: str, location: str) -> list[str]:
    """Generate tags from job attributes."""
    tags: list[str] = []
    rl = role.lower()
    ll = location.lower()

    if "intern" in rl:
        tags.append("Internship")
    if "research" in rl:
        tags.append("Research")
    if "remote" in ll:
        tags.append("Remote")
    if any(k in ll for k in ("ca", "california", "san francisco", "los angeles",
                              "san diego", "san jose")):
        tags.append("California")

    return tags


# ── Main ─────────────────────────────────────────────────────────
def scrape_and_populate():
    """Fetch jobs from all sources and upsert into Supabase."""
    supabase_url = os.getenv("SUPABASE_URL") or os.getenv("NEXT_PUBLIC_SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

    if not supabase_url or not supabase_key:
        print("Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set")
        print("Set these in backend/.env or as environment variables")
        return

    supabase: Client = create_client(supabase_url, supabase_key)
    now = datetime.now(timezone.utc).isoformat()
    total_upserted = 0
    total_deactivated = 0

    for source in SOURCES:
        source_name = source["name"]
        parser = PARSER_MAP[source_name]

        print(f"\n{'-'*50}")
        print(f"Fetching: {source['label']}")
        print(f"   URL: {source['url']}")

        try:
            response = requests.get(source["url"], headers=HEADERS, timeout=30)
            response.raise_for_status()
        except Exception as e:
            print(f"   FAILED to fetch: {e}")
            continue

        raw_text = response.text
        print(f"   Downloaded {len(raw_text):,} bytes")

        jobs = parser(raw_text)
        print(f"   Parsed {len(jobs)} jobs")

        if not jobs:
            continue

        # Deduplicate jobs by company and role before batching
        unique_jobs = []
        seen = set()
        for job in jobs:
            key = (job["company"], job["role"])
            if key not in seen:
                seen.add(key)
                unique_jobs.append(job)
        
        print(f"   Deduplicated to {len(unique_jobs)} unique jobs")
        
        # Upsert jobs in batches via the Supabase REST API
        batch_size = 50
        source_upserted = 0

        for i in range(0, len(unique_jobs), batch_size):
            batch = unique_jobs[i : i + batch_size]
            records = []

            for job in batch:
                records.append({
                    "company": job["company"],
                    "role": job["role"],
                    "location": job["location"],
                    "application_url": job["application_url"],
                    "source": source_name,
                    "degree_category": infer_degree_category(job["role"]),
                    "tags": infer_tags(job["role"], job["location"]),
                    "is_active": True,
                    "is_approved": True,  # Scraped jobs are auto-approved
                    "scraped_at": now,
                })

            try:
                result = supabase.table("jobs").upsert(
                    records,
                    on_conflict="company,role,source",
                ).execute()
                source_upserted += len(result.data) if result.data else 0
            except Exception as e:
                print(f"   WARNING: Batch upsert error: {e}")

        print(f"   OK: Upserted {source_upserted} jobs")
        total_upserted += source_upserted

        # Deactivate jobs that were NOT in this scrape
        # (they may have been removed from the source repo = posting closed)
        try:
            scraped_keys = {(j["company"], j["role"]) for j in jobs}
            existing = (
                supabase.table("jobs")
                .select("id, company, role")
                .eq("source", source_name)
                .eq("is_active", True)
                .execute()
            )
            for existing_job in existing.data or []:
                if (existing_job["company"], existing_job["role"]) not in scraped_keys:
                    supabase.table("jobs").update({"is_active": False}).eq("id", existing_job["id"]).execute()
                    total_deactivated += 1
        except Exception as e:
            print(f"   WARNING: Could not deactivate stale jobs: {e}")

    print(f"\n{'='*50}")
    print(f"Scraping complete!")
    print(f"  Total upserted:    {total_upserted}")
    print(f"  Total deactivated: {total_deactivated}")
    print(f"{'='*50}")


if __name__ == "__main__":
    scrape_and_populate()
