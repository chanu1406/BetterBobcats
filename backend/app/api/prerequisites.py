"""
Prerequisites API Routes
Thin wrappers around the three Supabase RPCs that implement prerequisite-graph
traversal. All business logic lives in the SQL functions; these endpoints just
translate HTTP ↔ RPC calls and handle errors uniformly.

Routes:
  GET  /api/prerequisites/{course_code}            — full ancestor tree
  GET  /api/prerequisites/{course_code}/downstream — one-hop dependents
  POST /api/prerequisites/next                     — courses unlocked by completed list
  POST /api/prerequisites/check                    — eligibility + missing prereqs
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.db.client import get_db

router = APIRouter()


# ── Request bodies ────────────────────────────────────────────────────────────


class NextEligibleRequest(BaseModel):
    completed: list[str]


class CheckRequest(BaseModel):
    course_code: str
    completed: list[str]


# ── Endpoints ─────────────────────────────────────────────────────────────────


@router.get("/{course_code}/downstream")
async def get_downstream(course_code: str):
    """
    One-hop dependents: courses that directly list course_code as a prerequisite.
    Powers "What does CSE 030 unlock?"

    Returns a list of {course_code, course_title, group_id} objects.
    Must be defined before /{course_code} so FastAPI routes the two-segment
    path correctly.
    """
    try:
        db = get_db()
        result = db.rpc("get_downstream", {"source_code": course_code}).execute()
        return result.data or []
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@router.get("/{course_code}")
async def get_forward_prereqs(course_code: str):
    """
    Full transitive prerequisite tree for a course.
    Powers "What do I need for CSE 120?" and "Why can't I take this yet?"

    Returns a list of {course_code, course_title, parent_code, group_id, depth} objects.
    group_id discriminates AND/OR branches: same group_id on the same parent = AND,
    different group_id = alternative OR branch.
    """
    try:
        db = get_db()
        result = db.rpc("get_forward_prereqs", {"target_code": course_code}).execute()
        return result.data or []
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@router.post("/next")
async def get_next_eligible(body: NextEligibleRequest):
    """
    Courses newly unlocked by the supplied completed course codes.
    Powers "What's next for me?"

    A course is unlocked when at least one of its prerequisite groups is fully
    satisfied. Already-completed courses are excluded.

    Returns a list of {course_code, course_title} objects.
    """
    try:
        db = get_db()
        result = db.rpc("get_unlocked_by", {"completed_codes": body.completed}).execute()
        return result.data or []
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@router.post("/check")
async def check_eligibility(body: CheckRequest):
    """
    Checks whether a student is eligible to take a course given their completed
    courses, and lists every transitive prerequisite they still need.
    Powers "Why can't I take this yet?"

    Logic: fetch the full ancestor tree via get_forward_prereqs, then subtract
    the completed set. If nothing remains, the student is eligible.

    Returns {eligible: bool, missing: list[str]}.
    """
    try:
        db = get_db()
        result = db.rpc(
            "get_forward_prereqs", {"target_code": body.course_code}
        ).execute()

        all_prereq_codes = [row["course_code"] for row in (result.data or [])]
        completed_upper = {c.upper() for c in body.completed}
        missing = [c for c in all_prereq_codes if c.upper() not in completed_upper]

        return {"eligible": len(missing) == 0, "missing": missing}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
