"""
seed_prerequisites.py

Reads backend/data/static_courses.json (produced by export_static_courses.mjs)
and seeds the course_prerequisites and degree_requirements tables.

Special cases handled:
  DISJUNCTION_MAP — static IDs that encode OR logic (e.g. "math-032-or-engr-080")
                    are expanded into two rows with different group_ids.
  COMPOUND_MAP    — static IDs whose code includes a lab suffix (e.g. "PHYS 008 + 008L")
                    are aliased to the parent course in the DB.
  FORCE_CATEGORY  — IDs that should always go to degree_requirements regardless of
                    how isCategory is set in the source file (data inconsistency fix).

Writes backend/data/MISMATCH.log for any static entry that has no DB match.
Logs a data_imports row (source='prereq-seed') for observability.

Usage:
    cd /path/to/repo
    python backend/scripts/seed_prerequisites.py
"""

import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv
from supabase import Client, create_client

load_dotenv(Path(__file__).parent.parent / ".env")

# ── Paths ─────────────────────────────────────────────────────────────────────

SCRIPT_DIR = Path(__file__).parent
DATA_FILE = SCRIPT_DIR.parent / "data" / "static_courses.json"
MISMATCH_LOG = SCRIPT_DIR.parent / "data" / "MISMATCH.log"

# ── Special-case maps ─────────────────────────────────────────────────────────

# Static IDs that encode an OR prerequisite:
#   keyed by static ID → list of {code, group_id} expansions.
#   Same group_id = AND; different group_id = OR (one group fully satisfied = unlocked).
DISJUNCTION_MAP: dict[str, list[dict]] = {
    "math-032-or-engr-080": [
        {"code": "MATH 032", "group_id": 1},
        {"code": "ENGR 080", "group_id": 2},
    ],
    "spark": [
        {"code": "SPRK 010", "group_id": 1},
        {"code": "SPRK 001", "group_id": 2},
    ],
}

# Static IDs whose code contains extra lab notation → alias to the real DB course_code.
# Different degree files encode the same course differently; this map is the canonical fix.
COMPOUND_MAP: dict[str, str] = {
    "phys-008": "PHYS 008",   # CS/CSE: "PHYS 008 + 008L"  |  ME: "PHYS 008 + PHYS 008L"
    "phys-008l": "PHYS 008",  # EE treats the lab as a separate node; alias to parent
    "phys-009": "PHYS 009",   # CS/CSE & ME: "PHYS 009 + 009L"
    "phys-009l": "PHYS 009",  # EE separate lab node
    "chem-002": "CHEM 002",   # ME: "CHEM 002 + CHEM 002L"
}

# IDs that should always be treated as degree-requirement category nodes, even if
# the source file omits isCategory (data inconsistency across degree files).
FORCE_CATEGORY_IDS: frozenset[str] = frozenset({"wri-upper-div"})


# ── Helpers ───────────────────────────────────────────────────────────────────

def is_category(entry: dict) -> bool:
    return bool(entry.get("isCategory")) or entry["id"] in FORCE_CATEGORY_IDS


def db_code_for(static_id: str, static_code: str) -> str | None:
    """Return the DB course_code for a static entry.
    Returns None if it is a category/disjunction (handled at call site).
    """
    if is_category({"id": static_id, "isCategory": False}):
        return None
    if static_id in DISJUNCTION_MAP:
        return None  # expanded at call site
    if static_id in COMPOUND_MAP:
        return COMPOUND_MAP[static_id]
    return static_code  # code field already matches DB course_code format


# ── Main ──────────────────────────────────────────────────────────────────────

def main() -> None:
    supabase_url = os.getenv("SUPABASE_URL") or os.getenv("NEXT_PUBLIC_SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    if not supabase_url or not supabase_key:
        print("Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in backend/.env")
        sys.exit(1)

    db: Client = create_client(supabase_url, supabase_key)

    # ── data_imports: start run ───────────────────────────────────────────────
    import_id: str | None = None
    try:
        res = db.table("data_imports").insert({"source": "prereq-seed", "status": "running"}).execute()
        if res.data:
            import_id = res.data[0]["id"]
            print(f"data_imports run: {import_id}")
    except Exception as exc:
        print(f"Warning: could not create data_imports row: {exc}")

    mismatches: list[str] = []
    edges_inserted = 0
    reqs_inserted = 0

    try:
        # ── Load JSON ─────────────────────────────────────────────────────────
        with open(DATA_FILE) as f:
            all_courses: list[dict] = json.load(f)
        print(f"Loaded {len(all_courses)} entries from {DATA_FILE.name}")

        # ── Fetch DB course_code → UUID lookup ────────────────────────────────
        res = db.table("courses").select("id, course_code").execute()
        db_code_to_uuid: dict[str, str] = {row["course_code"]: row["id"] for row in res.data}
        print(f"Fetched {len(db_code_to_uuid)} courses from DB")

        # ── Build static_id → DB course_code (first-occurrence wins) ─────────
        id_to_dbcode: dict[str, str | None] = {}
        for entry in all_courses:
            sid = entry["id"]
            if sid in id_to_dbcode:
                continue
            if is_category(entry):
                id_to_dbcode[sid] = None
            elif sid in DISJUNCTION_MAP:
                id_to_dbcode[sid] = "__disjunction__"
            elif sid in COMPOUND_MAP:
                id_to_dbcode[sid] = COMPOUND_MAP[sid]
            else:
                id_to_dbcode[sid] = entry["code"]

        # ── Seed course_prerequisites ─────────────────────────────────────────
        # Track inserted edges to deduplicate across degree files that share courses.
        seen_edges: set[tuple[str, str, int]] = set()

        for entry in all_courses:
            if is_category(entry):
                continue

            course_dbcode = id_to_dbcode.get(entry["id"])
            if not course_dbcode or course_dbcode == "__disjunction__":
                continue  # disjunction nodes are prereqs, not courses with their own edges

            course_uuid = db_code_to_uuid.get(course_dbcode)
            if course_uuid is None:
                mismatches.append(
                    f"COURSE_NOT_IN_DB  id={entry['id']!r}  code={course_dbcode!r}"
                    f"  degree={entry['degree_slug']!r}"
                )
                continue

            for prereq_static_id in entry.get("prerequisites", []):
                # Resolve prereq to one or more (db_code, group_id) pairs
                if prereq_static_id in DISJUNCTION_MAP:
                    candidates = DISJUNCTION_MAP[prereq_static_id]
                else:
                    prereq_dbcode = id_to_dbcode.get(prereq_static_id)
                    if prereq_dbcode is None:
                        mismatches.append(
                            f"PREREQ_IS_CATEGORY  course={course_dbcode!r}"
                            f"  prereq_id={prereq_static_id!r}"
                        )
                        continue
                    if prereq_dbcode == "__disjunction__":
                        # Should not happen (disjunctions don't appear as course entries)
                        continue
                    candidates = [{"code": prereq_dbcode, "group_id": 1}]

                for cand in candidates:
                    prereq_uuid = db_code_to_uuid.get(cand["code"])
                    if prereq_uuid is None:
                        mismatches.append(
                            f"PREREQ_NOT_IN_DB  course={course_dbcode!r}"
                            f"  prereq_code={cand['code']!r}"
                        )
                        continue

                    edge_key = (course_uuid, prereq_uuid, cand["group_id"])
                    if edge_key in seen_edges:
                        continue  # same edge from another degree file
                    seen_edges.add(edge_key)

                    notes = (
                        f"compound alias: {prereq_static_id}"
                        if prereq_static_id in COMPOUND_MAP
                        else None
                    )

                    db.table("course_prerequisites").upsert(
                        {
                            "course_id":        course_uuid,
                            "prereq_course_id": prereq_uuid,
                            "group_id":         cand["group_id"],
                            "is_corequisite":   False,
                            "source":           "static-degree-file",
                            "notes":            notes,
                        },
                        on_conflict="course_id,prereq_course_id,group_id",
                        ignore_duplicates=True,
                    ).execute()
                    edges_inserted += 1

        print(f"Inserted {edges_inserted} prerequisite edges")

        # ── Seed degree_requirements ──────────────────────────────────────────
        seen_reqs: set[tuple[str, str]] = set()

        for entry in all_courses:
            if not is_category(entry):
                continue

            req_key = (entry["degree_slug"], entry["id"])
            if req_key in seen_reqs:
                continue
            seen_reqs.add(req_key)

            db.table("degree_requirements").upsert(
                {
                    "degree_slug":     entry["degree_slug"],
                    "requirement_key": entry["id"],
                    "display_code":    entry["code"],
                    "display_name":    entry["name"],
                    "year":            entry.get("year"),
                    "semester":        entry.get("semester"),
                },
                on_conflict="degree_slug,requirement_key",
                ignore_duplicates=True,
            ).execute()
            reqs_inserted += 1

        print(f"Inserted {reqs_inserted} degree requirement entries")

        # ── Write MISMATCH.log ────────────────────────────────────────────────
        MISMATCH_LOG.parent.mkdir(parents=True, exist_ok=True)
        with open(MISMATCH_LOG, "w") as f:
            ts = datetime.now(timezone.utc).isoformat()
            f.write(f"# prereq-seed MISMATCH log — {ts}\n")
            f.write(f"# {len(mismatches)} entries could not be matched to DB courses\n")
            f.write("# Expected entries: known category/disjunction/compound nodes only.\n")
            f.write("# Unexpected entries = scraper–static drift; investigate.\n\n")
            for m in mismatches:
                f.write(m + "\n")

        if mismatches:
            print(f"\nMISMATCH.log: {len(mismatches)} entries written to {MISMATCH_LOG}")
            for m in mismatches[:8]:
                print(f"  {m}")
            if len(mismatches) > 8:
                print(f"  … and {len(mismatches) - 8} more")
        else:
            print("MISMATCH.log: no unexpected mismatches")

        # ── data_imports: success ─────────────────────────────────────────────
        if import_id:
            try:
                db.table("data_imports").update({
                    "status":       "success",
                    "record_count": edges_inserted + reqs_inserted,
                }).eq("id", import_id).execute()
            except Exception as exc:
                print(f"Warning: could not finalize data_imports row: {exc}")

    except Exception as exc:
        print(f"Fatal error: {exc}")
        if import_id:
            try:
                db.table("data_imports").update({
                    "status": "failed",
                    "error":  str(exc)[:4000],
                }).eq("id", import_id).execute()
            except Exception:
                pass
        raise


if __name__ == "__main__":
    main()
