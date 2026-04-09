Feasibility Analysis — Database-Backed Prerequisite Reasoning                                                          
                                                                                                                      
 Context

 AUDIT.md point #5 flagged that BetterBobcats has no database-backed prerequisites: all prereq graphs live in static
 TypeScript files, and the UC Merced course scraper doesn't capture prereqs at all. The user wants to support these
 degree-planning queries:

 1. "What's next for me?" — given completed courses, what's immediately eligible.
 2. "What classes unlock CSE 120?" — forward reachability (what depends on this course).
 3. "What can I take after CSE 120?" — same as above, filtered by user progress.
 4. "Why can't I take this course yet?" — missing prereqs diff against completed courses.

 This analysis is grounded in a direct inspection of the repo — the scraper, migrations, the 5 per-degree static course
  files, and the frontend PrerequisiteGraph components — not a brainstorm.

 ---
 Feasibility Verdict

 Feasible — High confidence for a curated 115-course Phase 1. Medium confidence for full-catalog coverage (Phase 3).

 The foundational assumption of the audit ("you'd have to build the data from scratch") is too pessimistic. The data is
  already there, just in the wrong tier of the stack. Four reasons for the high-confidence verdict:

 1. Structured prerequisite data already exists. Five per-degree files (frontend/src/app/degrees/{cs-cse,electrical-eng
 ineering,mechanical-engineering,cogs,political-science}/data/courses.ts) expose Course[] arrays with real
 prerequisites: string[] fields — 115 courses total (CS/CSE 23, EE 30, ME 35, PoliSci 16, COGS 11). These are already
 the source of truth for the rendered PrerequisiteGraph.tsx components.
 2. The join key is deterministic. Static IDs are kebab-case (cse-030); DB courses.course_code is upper + spaced (CSE
 030). Transformation is one replace call. The courses.course_code UNIQUE constraint already exists (migration
 20260205000001_create_courses_tables.sql:16).
 3. The query layer is vanilla Postgres. All four user queries reduce to graph traversal on a single edge table.
 Recursive CTEs + Supabase RPCs handle it — no ML, no new runtime, no special index.
 4. Types are already modeled. frontend/src/types/course.ts:16 and backend/app/models/course.py:32 both declare
 prerequisites fields. We're plumbing, not designing.

 The medium-confidence caveat is only for Phase 3 (scaling past the curated 115 to the full UC Merced catalog) where
 catalog HTML parsing gets messy.

 ---
 Current State (Verified)

 ✅ What exists

 ┌────────────────────────┬───────────────────────────────────────────────────────────────┬────────────────────────┐
 │        Artifact        │                           Location                            │          Note          │
 ├────────────────────────┼───────────────────────────────────────────────────────────────┼────────────────────────┤
 │ 5 structured           │ frontend/src/app/degrees/*/data/courses.ts                    │ 115 courses with       │
 │ courses.ts files       │                                                               │ prereq arrays          │
 ├────────────────────────┼───────────────────────────────────────────────────────────────┼────────────────────────┤
 │ Shared Course TS type  │ frontend/src/types/course.ts:9                                │ Has prerequisites:     │
 │                        │                                                               │ string[]               │
 ├────────────────────────┼───────────────────────────────────────────────────────────────┼────────────────────────┤
 │ Pydantic Course model  │ backend/app/models/course.py:32                               │ Has prerequisites:     │
 │                        │                                                               │ list[str]              │
 ├────────────────────────┼───────────────────────────────────────────────────────────────┼────────────────────────┤
 │ 5                      │                                                               │ Renders React Flow     │
 │ PrerequisiteGraph.tsx  │ frontend/src/app/degrees/*/components/PrerequisiteGraph.tsx   │ edges from static      │
 │ components             │                                                               │ prereqs                │
 ├────────────────────────┼───────────────────────────────────────────────────────────────┼────────────────────────┤
 │ courses +              │ supabase/migrations/20260205000001_create_courses_tables.sql  │ course_code UNIQUE; no │
 │ course_sections tables │                                                               │  prereq column         │
 ├────────────────────────┼───────────────────────────────────────────────────────────────┼────────────────────────┤
 │                        │                                                               │ Extracts 13 fields;    │
 │ SSB course scraper     │ backend/scripts/scrape_courses.py                             │ doesn't touch prereqs  │
 │                        │                                                               │ or description         │
 ├────────────────────────┼───────────────────────────────────────────────────────────────┼────────────────────────┤
 │                        │                                                               │ Returns                │
 │ search_courses() RPC   │ supabase/migrations/20260326000001_add_search_courses_rpc.sql │ code/title/prof; no    │
 │                        │                                                               │ prereq fields          │
 ├────────────────────────┼───────────────────────────────────────────────────────────────┼────────────────────────┤
 │ data_imports           │ supabase/migrations/20260326000002_add_data_imports_table.sql │ Reusable for new       │
 │ observability          │                                                               │ seed/scrape tracking   │
 └────────────────────────┴───────────────────────────────────────────────────────────────┴────────────────────────┘

 ❌ What's missing

 ┌───────────────────────────────────────┬──────────────────────────────────────────────────────────┐
 │                Missing                │                          Impact                          │
 ├───────────────────────────────────────┼──────────────────────────────────────────────────────────┤
 │ course_prerequisites table            │ No DB-level edges                                        │
 ├───────────────────────────────────────┼──────────────────────────────────────────────────────────┤
 │ degree_requirements table             │ Category nodes (GenEd, Free Elective) have no home       │
 ├───────────────────────────────────────┼──────────────────────────────────────────────────────────┤
 │ Prerequisite query RPCs               │ No graph traversal possible                              │
 ├───────────────────────────────────────┼──────────────────────────────────────────────────────────┤
 │ user_profiles / completed_courses     │ "What's next for me?" is not personalizable server-side  │
 ├───────────────────────────────────────┼──────────────────────────────────────────────────────────┤
 │ Scraper description/prereq extraction │ SSB response likely has more data we ignore (unverified) │
 ├───────────────────────────────────────┼──────────────────────────────────────────────────────────┤
 │ Frontend prereq badges on /courses    │ Users see zero prereq info on the DB-driven courses page │
 └───────────────────────────────────────┴──────────────────────────────────────────────────────────┘

 Edge cases in static data (from inspection)

 - 10–15 category entries are isCategory: true and don't match real DB courses: gened-a-life, gened-b, wri-upper-div,
 major-technical-elective, free-elective, spark.
 - 3–5 disjunction entries encode an implicit OR: "math-032-or-engr-080" with code "MATH 032/ENGR 080", spark = "SPRK
 010 or SPRK 001".
 - Compound entries like "PHYS 008 + 008L" represent course + lab as a single node.
 - PrerequisiteGraph.tsx has hard-coded positioning logic keyed on specific static IDs (phys-008, wri-upper-div, spark
 at lines 270–369 of CS/CSE graph). Migrating to DB-backed without preserving layout metadata will regress the visual.

 The two parallel universes (confirmed)

 Universe A (static): data/courses.ts → PrerequisiteGraph.tsx → React Flow.
 Universe B (scraped): scrape_courses.py → courses table → /courses page.
 Integration today: zero. /courses shows no prereqs. Degree pages don't read from DB.

 ---
 Blockers

 Data blockers

 1. Category nodes have no DB equivalent. ~10–15 entries need to go somewhere other than course_prerequisites.
 2. Disjunction semantics not encoded. Static files use string IDs like math-032-or-engr-080; we need to preserve the
 "OR" meaning.
 3. Compound entries ("PHYS 008 + 008L"). Must decide: alias to parent PHYS 008, or split into two rows.
 4. courses.description is empty. Blocks Phase 3 catalog-text prereq parsing, not Phase 1.

 Architectural blockers

 5. No user_profiles / completed_courses table (grep of all migrations returns nothing). Blocks server-side
 personalization for query #1. Workaround: pass completed[] as an RPC parameter from the client (localStorage-backed
 until onboarding lands).
 6. PrerequisiteGraph.tsx layout is coupled to static IDs. Phase 2 migration to DB-driven must preserve positions.
 7. SSB API prereq availability is unverified. The scraper extracts 13 of N fields — we don't know what else the API
 returns.

 ---
 Comparison of Approaches

 The user asked which of these to pursue. Ranked by fit:

 ┌─────────────────────────────┬───────────────┬──────────────────────────────────────────────────────────────────┐
 │          Approach           │    Verdict    │                               Why                                │
 ├─────────────────────────────┼───────────────┼──────────────────────────────────────────────────────────────────┤
 │ A. Database-backed prereq   │ ✅ Start here │ 115 courses of clean structured data already exist.              │
 │ graph from static files     │  (Phase 1)    │ Deterministic join key. Zero new data-acquisition work.          │
 ├─────────────────────────────┼───────────────┼──────────────────────────────────────────────────────────────────┤
 │ B. Scraper/parser           │ 🟡 Later      │ SSB may or may not expose prereqs. Worth a 1-hour probe, but the │
 │ improvements (SSB API)      │ (Phase 3)     │  static files get us to a working product first.                 │
 ├─────────────────────────────┼───────────────┼──────────────────────────────────────────────────────────────────┤
 │ C. Catalog scraping         │ 🟡 Later      │ Structured HTML with parseable prereq text. Higher coverage      │
 │ (catalog.ucmerced.edu)      │ (Phase 3)     │ ceiling but requires a disjunction-aware parser.                 │
 ├─────────────────────────────┼───────────────┼──────────────────────────────────────────────────────────────────┤
 │ D. Rule-based prereq engine │ ✅ Free with  │ "Rule-based engine" = recursive CTEs over the edge table. No     │
 │                             │ Phase 1       │ separate engine needed.                                          │
 ├─────────────────────────────┼───────────────┼──────────────────────────────────────────────────────────────────┤
 │                             │               │ LLMs are useful for interpreting unstructured prereq text. We    │
 │ E. LLM/RAG querying layer   │ ❌ Not        │ have structured data already. Introducing LLMs now adds latency, │
 │                             │ recommended   │  cost, and hallucination risk with no gain. Reconsider only if   │
 │                             │               │ Phase 3 catalog scraping proves too brittle.                     │
 ├─────────────────────────────┼───────────────┼──────────────────────────────────────────────────────────────────┤
 │                             │ ✅            │                                                                  │
 │ F. Hybrid                   │ Recommended   │ A → D for Phase 1, A+B+C for Phase 3. Skip E.                    │
 │                             │ overall       │                                                                  │
 └─────────────────────────────┴───────────────┴──────────────────────────────────────────────────────────────────┘

 Recommendation: Hybrid, staged. Ship the structured edge table + recursive-CTE queries first (Phase 1). Extend to
 full-catalog coverage via scraping (Phase 3). Skip the LLM/RAG layer entirely for now.

 ---
 Technical Changes Required

 Database

 New migration supabase/migrations/20260410000001_create_course_prerequisites.sql:

 CREATE TABLE public.course_prerequisites (
   id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   course_id       UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
   prereq_course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
   group_id        SMALLINT NOT NULL DEFAULT 1,   -- same group = AND, different = OR
   is_corequisite  BOOLEAN NOT NULL DEFAULT false,
   source          TEXT NOT NULL DEFAULT 'static-degree-file',
   notes           TEXT,
   created_at      TIMESTAMPTZ DEFAULT now(),
   UNIQUE(course_id, prereq_course_id, group_id)
 );
 CREATE INDEX idx_cp_course_id ON public.course_prerequisites(course_id);
 CREATE INDEX idx_cp_prereq_course_id ON public.course_prerequisites(prereq_course_id);
 ALTER TABLE public.course_prerequisites ENABLE ROW LEVEL SECURITY;
 CREATE POLICY cp_public_read ON public.course_prerequisites FOR SELECT USING (true);

 Semantics: "C requires (A AND B) OR (D)" → {C,A,group=1}, {C,B,group=1}, {C,D,group=2}. Phase 1 uses group_id=1 for
 almost everything; bumps only for the 3–5 known disjunction entries.

 Why this shape, not fully normalized: Normalized prerequisite_groups(id) + prerequisite_group_items(group_id,
 prereq_id) is more "correct" but doubles JOINs in recursive CTEs and the expressiveness gain is unused for the real
 data we have. 3–5 disjunctions in 115 courses does not justify the complexity tax. The group_id discriminator is
 forward-compatible — migrate to normalized later if real-world data demands it.

 New migration 20260410000002_create_degree_requirements.sql:

 CREATE TABLE public.degree_requirements (
   id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   degree_slug     TEXT NOT NULL,          -- "cs-cse"
   requirement_key TEXT NOT NULL,          -- "gened-a-life"
   display_code    TEXT NOT NULL,          -- "GenED A-Life"
   display_name    TEXT NOT NULL,
   year            SMALLINT,
   semester        TEXT,
   UNIQUE(degree_slug, requirement_key)
 );
 ALTER TABLE public.degree_requirements ENABLE ROW LEVEL SECURITY;
 CREATE POLICY dr_public_read ON public.degree_requirements FOR SELECT USING (true);

 This holds the category nodes that don't map to real DB courses but still need to render in degree graphs.

 New migration 20260410000003_create_prereq_rpcs.sql — three functions:

 1. get_forward_prereqs(target_code TEXT) — recursive CTE returning all ancestors of target_code plus their group_ids.
 Powers "what do I need for CSE 120?" and "why can't I take this yet?".
 2. get_unlocked_by(completed_codes TEXT[]) — returns courses whose at-least-one-group-of-prereqs is fully satisfied by
  completed_codes, minus those already completed. Powers "what's next for me?" and "what can I take after CSE 120?".
 3. get_downstream(source_code TEXT) — one-hop children: courses that directly list source_code as a prereq.

 All handle disjunction by grouping on group_id and requiring at least one group satisfied.

 Seed pipeline

 New backend/scripts/export_static_courses.mjs — Node ESM script that imports each of the 5 courses.ts files, flattens
 with a degree field, and writes backend/data/static_courses.json. Uses the TS compiler as the source of truth instead
 of regex over source text.

 New backend/scripts/seed_prerequisites.py — loads the JSON, for each course:
 - If isCategory: true → insert into degree_requirements.
 - Else → derive course_code from id (e.g., cse-030 → CSE 030, uppercase + space before digits), look up courses.id by
 course_code.
 - For each prerequisites[i], same lookup; INSERT (course_id, prereq_course_id, group_id=1).
 - Explicit DISJUNCTION_MAP for math-032-or-engr-080 and spark, each emitting two rows with different group_id.
 - Explicit COMPOUND_MAP for phys-008 → alias to the parent PHYS 008 row with notes='includes lab 008L'.
 - Write backend/data/MISMATCH.log for any static entry that has no DB match — lets us diagnose scraper-vs-static drift
  in one place.
 - Log a data_imports row with source='prereq-seed' so the run is observable (reuses data_imports table at
 supabase/migrations/20260326000002_add_data_imports_table.sql).

 Backend API

 New backend/app/api/prerequisites.py — four FastAPI endpoints that thin-wrap the RPCs:
 - GET /api/prerequisites/{course_code} — forward prereqs (full ancestor tree).
 - GET /api/prerequisites/{course_code}/downstream — one-hop children.
 - POST /api/prerequisites/next body {completed: string[]} → next eligible courses.
 - POST /api/prerequisites/check body {course_code, completed: string[]} → {eligible: bool, missing: string[]}.

 Register in backend/app/main.py (same pattern as the existing clubs and majors routers). Reuse get_db(admin=False)
 from backend/app/db/client.py. Reuse the prerequisites: list[str] field already on backend/app/models/course.py:32.

 Frontend

 - Extend frontend/src/lib/api.ts with fetchForwardPrereqs, fetchDownstream, fetchNextEligible, fetchBlockedReason.
 Repurpose the currently-unused fetchCourses/fetchCourseById skeleton (audit confirmed these are dead).
 - New frontend/src/components/courses/PrerequisiteBadge.tsx — reusable badge. Props typed via Course.prerequisites
 from frontend/src/types/course.ts:16.
 - Modify frontend/src/app/courses/page.tsx — inject <PrerequisiteBadge> into course cards. This is the #1 place
 students see zero prereq info today.
 - New frontend/src/app/planner/page.tsx — localStorage-backed "what's next for me" page (until user_profiles lands).
 - Do not touch the 5 PrerequisiteGraph.tsx components in Phase 1. They keep reading static files. Phase 2 migrates
 them.

 ---
 Phased Implementation Plan

 Phase 1 — Seed + Query (Scope: M)

 Goal: 115 curated courses have their prereqs in the DB; all four user queries return correct results through live
 endpoints; /courses page shows prereq badges.

 Query coverage after Phase 1:
 - ✅ "What's next for me?" — works for curated courses (client passes completed[])
 - ✅ "What unlocks CSE 120?" — works
 - ✅ "What can I take after CSE 120?" — works
 - ✅ "Why can't I take this yet?" — works

 Exit criteria:
 - SELECT COUNT(*) FROM course_prerequisites ≥ 150.
 - get_forward_prereqs('CSE 030') returns CSE 015 and CSE 024 (matches
 frontend/src/app/degrees/cs-cse/data/courses.ts:110).
 - POST /api/prerequisites/next with {completed:["CSE 015","MATH 021"]} returns a non-empty list including MATH 022 and
  CSE 030.
 - /courses page shows "Prereqs: CSE 015, CSE 024" on the CSE 030 card.
 - /degrees/cs-cse React Flow graph renders byte-identical to before (regression safety — Phase 1 does not touch
 PrerequisiteGraph.tsx).
 - MISMATCH.log contains only the 3–5 known disjunction/compound/category entries.

 Phase 2 — Unify frontend on DB + Planner UX (Scope: M)

 Goal: The 5 PrerequisiteGraph.tsx components read from the DB via SSR loaders; planner page ships.

 Tasks:
 - frontend/src/app/degrees/[degree]/data/fetchCourses.ts — server component loader that queries Supabase (courses +
 course_prerequisites + degree_requirements) and returns the same Course[] shape the static files currently expose.
 - Refactor each PrerequisiteGraph.tsx to accept courses: Course[] as a prop. Preserve the hardcoded positioning logic
 by keying off id (no change to the IDs since seeding uses the same kebab-case IDs via a mapping table).
 - Delete the five courses.ts data exports only after visual regression check.
 - frontend/src/app/planner/page.tsx — drag-and-drop or list-based "what's next" UI. localStorage-backed
 completedCourses.
 - frontend/src/app/courses/[code]/page.tsx — "Why can't I take this?" detail view.

 Exit criteria: Removing the 5 courses.ts arrays does not break degree pages. Planner returns valid recommendations for
  a hardcoded test scenario (e.g., "completed first-year fall courses → expect MATH 022, CSE 015, CSE 024, ENGR 091 as
 next eligible").

 Phase 3 — Catalog coverage expansion (Scope: L)

 Goal: Coverage beyond the curated 115 to the full courses table (~2000+ rows).

 Tasks:
 - 1-hour probe: fetch a single SSB course detail and log the raw JSON. If it includes prerequisites / description
 fields, extend backend/scripts/scrape_courses.py to capture them.
 - backend/scripts/parse_catalog_prereqs.py — HTML-parse catalog.ucmerced.edu/preview_course_nopop.php?coid=....
 Extract "Prerequisites:" block. Small disjunction-aware parser: tokens and, or, ,, course codes matching
 [A-Z]{2,4}\s?\d{1,3}[A-Z]?. Map to course_prerequisites rows with source='catalog-scrape'.
 - Conflict policy: source='static-degree-file' wins over source='catalog-scrape' on duplicate (course_id,
 prereq_course_id, group_id).
 - Add to .github/workflows/scrape-academic-data.yml (the existing weekly cron).

 Exit criteria: ≥ 80% of rows in courses have at least one course_prerequisites edge OR a confirmed empty-prereq
 record. Phase 3 is deferred until Phase 1+2 are validated with real users.

 ---
 Phase 1 — Ordered Task List

 1. Write supabase/migrations/20260410000001_create_course_prerequisites.sql (edge table + indexes + public-read RLS).
 2. Write supabase/migrations/20260410000002_create_degree_requirements.sql (category table + RLS).
 3. Write supabase/migrations/20260410000003_create_prereq_rpcs.sql with get_forward_prereqs, get_unlocked_by,
 get_downstream as recursive CTEs keyed by group_id.
 4. Create backend/scripts/export_static_courses.mjs — Node ESM importing each of the 5
 frontend/src/app/degrees/*/data/courses.ts, flattening to backend/data/static_courses.json.
 5. Create backend/scripts/seed_prerequisites.py — load JSON, kebab-to-upper code derivation, look up courses.id by
 course_code, handle DISJUNCTION_MAP and COMPOUND_MAP, insert rows, write data_imports observability row.
 6. Create backend/app/api/prerequisites.py — four FastAPI endpoints wrapping the RPCs. Reuse get_db(admin=False) from
 backend/app/db/client.py.
 7. Register prerequisites router in backend/app/main.py alongside clubs and majors. Do not resurrect
 backend/app/api/courses.py (deprecated).
 8. Extend frontend/src/lib/api.ts with four new client functions. Reuse existing API_BASE_URL.
 9. Create frontend/src/components/courses/PrerequisiteBadge.tsx — props typed via Course.prerequisites from
 frontend/src/types/course.ts:16.
 10. Wire <PrerequisiteBadge> into frontend/src/app/courses/page.tsx course cards. No changes to any
 PrerequisiteGraph.tsx.

 ---
 Reuse Opportunities (non-negotiable — do not rebuild)

 - frontend/src/types/course.ts:9 — shared Course interface. Same type across frontend, seed pipeline, and API
 response.
 - backend/app/models/course.py:32 — prerequisites: list[str] already declared. Populate it; don't redefine.
 - frontend/src/lib/api.ts — repurpose the unused skeleton instead of creating a new client module.
 - 5 data/courses.ts files — these ARE the seed data. No external acquisition needed for Phase 1.
 - courses.course_code UNIQUE constraint — the join key. No mapping table needed.
 - data_imports table — log the seed run and any Phase 3 scrapes through it.
 - backend/app/api/clubs.py (registered router pattern) — copy its FastAPI + Supabase client wiring for
 prerequisites.py.
 - search_courses() RPC (supabase/migrations/20260326000001_add_search_courses_rpc.sql) — template for the new
 recursive-CTE RPCs.
 - courses.description column — reserve for Phase 3 raw catalog text. Do not overload in Phase 1.
 - Recursive CTEs — vanilla Postgres; Supabase supports out of the box. No extensions.
 - React Flow — already wired in all 5 degree pages; Phase 2 just swaps the data source.

 ---
 Open Decisions (worth confirming before execution)

 1. Schema: simple group_id discriminator vs normalized AND/OR groups. Recommendation: simple. Willing to revisit in
 Phase 2 if disjunction count grows.
 2. Category nodes: separate degree_requirements table vs synthetic courses rows. Recommendation: separate table —
 keeps /courses listing clean.
 3. "What's next for me?" dependency on user_profiles. Recommendation: unblock now with a stateless POST {completed:[]}
  API; swap to profile-backed in Phase 2 when onboarding lands — API contract stays identical.
 4. Phase 3 trigger. Recommendation: do not start Phase 3 until Phase 1 is in production and we have at least one real
 student using the planner. Avoids scope creep.
 5. LLM/RAG layer. Recommendation: skip entirely. Reintroduce only if Phase 3 catalog parsing proves too brittle.

 ---
 Verification Plan (Phase 1)

 Setup
 cd /Users/sureshollala/Desktop/BetterBobcats/BetterBobcats
 supabase db reset                                # apply new migrations
 node backend/scripts/export_static_courses.mjs   # exports backend/data/static_courses.json
 python backend/scripts/seed_prerequisites.py     # populates course_prerequisites + degree_requirements
 npm run dev                                      # runs frontend + backend

 Seed sanity checks (psql / Supabase SQL editor)
 SELECT COUNT(*) FROM course_prerequisites;                   -- expect ~150+
 SELECT COUNT(DISTINCT course_id) FROM course_prerequisites;  -- expect ~95-100
 SELECT COUNT(*) FROM degree_requirements;                    -- expect ~10-15

 RPC smoke tests
 -- "What do I need for CSE 120?"
 SELECT * FROM get_forward_prereqs('CSE 120');
 -- Expect: CSE 031, CSE 100, CSE 030, CSE 015, CSE 024, CSE 022 (transitive)

 -- "What can I take after finishing CSE 015 and MATH 021?"
 SELECT * FROM get_unlocked_by(ARRAY['CSE 015','MATH 021']);
 -- Expect includes: MATH 022

 -- "What does CSE 030 directly unlock?"
 SELECT * FROM get_downstream('CSE 030');
 -- Expect: CSE 031, CSE 100

 API-level tests
 curl http://localhost:8000/api/prerequisites/CSE%20120
 curl http://localhost:8000/api/prerequisites/CSE%20030/downstream
 curl -X POST http://localhost:8000/api/prerequisites/next \
   -H 'content-type: application/json' \
   -d '{"completed":["CSE 015","MATH 021"]}'
 curl -X POST http://localhost:8000/api/prerequisites/check \
   -H 'content-type: application/json' \
   -d '{"course_code":"CSE 120","completed":["CSE 015"]}'
 # Expect: eligible=false, missing=["CSE 031","CSE 100","CSE 030","CSE 024","CSE 022"]

 Frontend check
 - Visit /courses, find CSE 030 → verify badge shows "Prereqs: CSE 015, CSE 024".
 - Visit /degrees/cs-cse → verify React Flow graph renders byte-identical to pre-change (Phase 1 does not touch it;
 regression would indicate accidental coupling).
 - Inspect backend/data/MISMATCH.log → should contain only known disjunction/compound entries. Any unexpected
 real-course miss = bug.

 Regression safety
 Phase 1 only adds tables, functions, endpoints, one frontend component, and one seed script. It does not modify any
 existing migration, any existing frontend page, or any existing backend route. The only modified existing files are
 backend/app/main.py (register router) and frontend/src/app/courses/page.tsx (inject badge) and frontend/src/lib/api.ts
  (new client functions).

 ---
 Critical Files (referenced throughout)

 Inspect / reuse (read-only in Phase 1)
 - frontend/src/app/degrees/cs-cse/data/courses.ts — canonical seed-source shape
 - frontend/src/app/degrees/electrical-engineering/data/courses.ts
 - frontend/src/app/degrees/mechanical-engineering/data/courses.ts
 - frontend/src/app/degrees/cogs/data/courses.ts
 - frontend/src/app/degrees/political-science/data/courses.ts
 - frontend/src/types/course.ts — shared Course interface
 - backend/app/models/course.py — Pydantic model with prerequisites field
 - backend/app/db/client.py — Supabase client factory
 - backend/app/main.py — router registration pattern
 - backend/app/api/clubs.py — registered-router template
 - supabase/migrations/20260205000001_create_courses_tables.sql — courses schema + UNIQUE(course_code)
 - supabase/migrations/20260326000001_add_search_courses_rpc.sql — RPC template
 - supabase/migrations/20260326000002_add_data_imports_table.sql — observability table

 Create (new in Phase 1)
 - supabase/migrations/20260410000001_create_course_prerequisites.sql
 - supabase/migrations/20260410000002_create_degree_requirements.sql
 - supabase/migrations/20260410000003_create_prereq_rpcs.sql
 - backend/scripts/export_static_courses.mjs
 - backend/scripts/seed_prerequisites.py
 - backend/app/api/prerequisites.py
 - frontend/src/components/courses/PrerequisiteBadge.tsx

 Modify (new in Phase 1)
 - backend/app/main.py — register prerequisites router
 - frontend/src/lib/api.ts — add 4 client functions
 - frontend/src/app/courses/page.tsx — inject <PrerequisiteBadge>

 ---
 One-sentence summary

 The 115 curated courses across the 5 per-degree data/courses.ts files are already a clean, typed, structured
 prerequisite graph — the work to unlock all four target queries is not data collection, it is a ~200-line seed script,
  a 3-migration schema, and three recursive-CTE RPCs, with the LLM/RAG approach explicitly rejected as a premature
 answer to a problem we don't have yet.

