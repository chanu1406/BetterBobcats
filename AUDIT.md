# BetterBobcats — Product & Engineering Audit

Grounded in a first-principles read of the actual codebase. Every finding points at a real file, route, or schema so you can action it directly.

---

## Current strengths

1. **Clean architectural spine.** Next.js 16 App Router + strict TS + TanStack Query + shadcn/ui + `@supabase/ssr` + React Flow + Dagre is genuinely a strong, modern stack. The split between `lib/supabase/browser.ts` and `lib/supabase/server.ts` is right. `ConditionalNavigation`, `ThemeProvider`, `ReactQueryProvider` wiring in `frontend/src/app/layout.tsx` is clean.
2. **RLS-first data model.** The clubs/events/invites surface in `supabase/migrations/20260115101728_remote_schema.sql` (957→end) and `20260116000018_create_events_system.sql` is genuinely well-designed: normalized `club_memberships`, `club_invites`, `email_outbox`, `platform_admins`, soft deletes, `is_platform_admin()` helper, RPC-based reads, per-role policies. This is more thoughtful RLS than most student side projects ever reach.
3. **Real scraping pipeline.** `backend/scripts/scrape_jobs.py`, `scrape_courses.py`, plus `.github/workflows/scrape-academic-data.yml` (weekly) and `scrape-jobs.yml` (hourly) is a legit data-ingestion story. You already solved the hardest infra problem: getting fresh data in.
4. **Ambitious degree-planning UX.** Per-degree React Flow prerequisite + career-path graphs with tier priorities (`tierCourses.ts`) is the differentiator. Nothing at UC Merced looks like this. Stellic charges universities six figures for less.
5. **Event request / voting loop.** `event_requests`, `event_request_votes`, `event_request_tags`, and `event_requests_with_counts` (migration `20260117000001`) is a real demand-signal mechanism — this is an underrated growth loop most campus apps never build.
6. **Observability baseline.** Sentry wired into `backend/app/main.py`, scraper-run tracking, degree path registry referenced in commit `9c5b695` — you're past "it works on my laptop."
7. **RMP data enrichment.** The `professors` table stores `rmp_id`, `rmp_graphql_id`, `avg_rating`, `avg_difficulty`, `num_ratings`, `would_take_again_percent` joined to `course_sections` via `professor_sections` (`20260205000001_create_courses_tables.sql`). That's a Coursicle-grade feature already in your schema.

---

## Biggest weaknesses / product gaps

These are the things I would fix first because they are either **live data lies, broken loops, or dead code that's actively misleading contributors.**

### 1. The jobs board is disconnected from its own database
This is the single most damaging issue I found. `backend/scripts/scrape_jobs.py` runs hourly via `.github/workflows/scrape-jobs.yml` and writes into the `jobs` table (migration `20260212000001_create_jobs_tables.sql`). The frontend (`frontend/src/app/jobs/page.tsx` lines 164–240) **completely ignores that table** — it `fetch()`s five GitHub README markdown files at runtime in the browser, regex-parses HTML `<tr>` rows, runs a string-match "anti-slop filter," and tags degrees with hardcoded keyword lists. Result:
- Every page load hits GitHub from the user's browser (rate limits, CORS risk, slow, no pagination).
- The `jobs` table, the `is_approved` flow, the `submit_jobs` RLS policies, and the scraper itself are **entirely unused infrastructure**.
- `degree_category` in the DB is ignored; degree mapping runs client-side.
- No search index. No deduplication. No "saved jobs" wiring even though `saved_jobs` table exists.

### 2. `submit-job` is a fake form
`frontend/src/app/submit-job/page.tsx` line 103 literally does `console.log("📝 New Job Submission:", {...})` and shows a success toast. It does not write to Supabase. Users think they're contributing; nothing is happening. This is the kind of silent-failure bug that erodes trust fast if anyone notices.

### 3. `DegreesContent.tsx` is a 2,878-line monolith
`frontend/src/app/degrees/components/DegreesContent.tsx` is 2,878 lines and does all routing, content rendering, dynamic imports for every career graph, and state management in one file. It's the reason the degrees section is 3.3MB on disk across 154 files.

### 4. Five nearly-identical 700-line career graph files
`cs-cse/careers/{swe,cybersecurity,datascience,ml-ai,embedded-systems}/components/CareerPathGraph.tsx` are all ~700 lines and 90%+ duplicated (the only differences are config imports and node labels). Same pattern repeats across `electrical-engineering`, `mechanical-engineering`, `cogs`, `political-science`. Every new career path is a copy-paste of 700 lines of React Flow boilerplate.

### 5. No database-backed prerequisites
`grep -i prerequisite` across all migrations returns nothing. Prerequisite graphs live exclusively in static `tierCourses.ts` files, which means:
- You can't query "what classes unlock CSE 120?"
- You can't show students a personalized "what's next for me" view.
- Every new degree requires a developer deploy — a non-technical officer can't add content.
- The UC Merced course scraper (`scrape_courses.py`) populates `courses`/`course_sections` but the degree pages don't use that data at all. Two parallel course universes.

### 6. The "dashboard" is a "My Clubs" page
`frontend/src/app/dashboard/page.tsx` title literally says "My Clubs" (line 111). It only renders `memberships`. A dashboard is where the product's value compounds — this one has no "My Courses," "My Saved Jobs," "Upcoming Events for Me," "My Academic Plan," "Recommended for You," nothing. It's the least-loved surface in the app and should be the most-loved one.

### 7. FastAPI backend is ~60% dead code
- `backend/app/api/professors.py` and `courses.py` both have `[DEPRECATED 2026-03-26]` headers and are unregistered in `main.py`.
- `backend/app/core/config.py` still says `# TODO: Add environment variables` — you're reading `os.getenv` directly in scripts.
- Only `/api/clubs` and `/api/majors` actually serve traffic. The rest of the backend exists to run scrapers on cron.
- You're paying the operational cost of two runtimes (Next.js + FastAPI) for ~two endpoints. Either collapse the backend into Next.js route handlers / Supabase edge functions, or commit to it and give it a real job.

### 8. No search across the platform
There's no global `/search` route, no `ilike` or `pg_trgm` or `tsvector` indexes in any migration, no command palette. Students landing on the home page can't type "CSE 120" or "data science" and get anywhere. Discovery is pure click-through.

### 9. No onboarding → no personalization
There's no `user_profiles` table (grep the migrations — absent), no "tell us your major / year / interests" flow, no `degree_id` on the user. Without that, personalization is impossible: the dashboard can't recommend events, the jobs board can't prefilter, the degree page can't deep-link. This is the single highest-leverage data point you're not collecting.

### 10. Home page doesn't show activity
`frontend/src/app/page.tsx` renders `<Hero />` + `<FeaturesSection />`. Both are fully static marketing copy. No "3 new events this week," no "2 new jobs matching your major," no live counts, no testimonials, no what's-happening. Compare to Engage/CampusGroups landing pages, which all lead with live activity — that's what makes a community product feel alive on first visit.

### 11. No mobile-first review
A lot of these pages were clearly designed desktop-first. The degrees interactive graphs (React Flow) are particularly mobile-hostile — pan/zoom on a 375px viewport with the sidebar `Sheet` covering most of the graph is rough. UC Merced is a phone-first audience; this should be the primary viewport.

### 12. No analytics / no feedback loop
No `posthog` / `plausible` / `umami` / `vercel/analytics` in `package.json`, no event tracking, no feature-flag system. You're flying blind on what students actually use, which makes prioritization guesswork.

### 13. No tests, anywhere
`CLAUDE.md` says "No test suite is currently configured." That's fine at MVP scale but is going to bite once students start trusting academic-planning data. The minimum viable addition is Playwright smoke tests against `/degrees`, `/clubs`, `/events`, `/jobs`, `/dashboard` that just verify the pages render and don't 500.

### 14. No course reviews, no "would take again" beyond RMP
You have the `professors` table storing RMP data but no schema for **your own** reviews. RMP data is stale, biased, and sparse at UC Merced. Your moat is first-party reviews tied to verified student accounts. This is the most underrated feature you're not building.

---

## 10 highest-leverage improvements

Ranked by impact ÷ effort:

| # | Improvement | Why it matters | Effort |
|---|---|---|---|
| 1 | **Wire `jobs/page.tsx` to the `jobs` table** via Supabase query with server-side filtering, pagination, and `suggestedDegree` from the `degree_category` column. Delete the client-side GitHub fetch + HTML regex. | Fixes a silent infra lie, makes the scraper's work actually visible, unlocks search/pagination/saved-jobs, cuts first-load JS. | S |
| 2 | **Wire `submit-job` to actually insert into `jobs`** with `source='user_submitted'`, `is_approved=false`. Then build a 1-page `/admin/jobs` approval queue using the existing `jobs_admin_update` policy. | The schema and RLS already exist. You're one `supabase.from('jobs').insert()` + one admin table away from a working user-submission loop. | S |
| 3 | **Onboarding flow + `user_profiles` table** (`user_id`, `major_id`, `graduation_year`, `interests[]`, `degree_path`). Run it once on first login after `requireUser()`. | Unlocks every personalization feature that follows. Cheapest highest-leverage schema change you can make. | S |
| 4 | **Real dashboard.** Replace the "My Clubs" page with a 4-card grid: My Clubs, My Courses (this term), Upcoming Events (major-matched), Saved Jobs. All four tables already exist. | Turns the dashboard from a dead end into the product's home screen. | M |
| 5 | **Unify prerequisites into the database.** Add `course_prerequisites(course_id, prereq_course_id, relationship)` and `degree_requirements(degree_id, course_id, category, tier)` migrations. Load once from the existing `tierCourses.ts` files. Render graphs from the DB. | Kills the static-config bottleneck. Non-devs can edit degree content. Opens up a personalized "what's next for me" query. | L |
| 6 | **Refactor `CareerPathGraph` into a single generic component** that takes a config prop. The five 700-line CS files collapse into one <200-line component + five configs. Same for EE/ME/COGS/PolSci. | Deletes ~3,500 lines. Cuts the degrees folder from 3.3MB to <1MB. New career paths become a 50-line config file instead of a 700-line copy-paste. | M |
| 7 | **Split `DegreesContent.tsx` (2,878 lines).** Per-degree folder, shared `<DegreeContentShell>`, dynamic import per degree. | Unblocks future degree work and cuts the degrees route bundle significantly. | M |
| 8 | **Global command palette + Postgres full-text search.** Add `tsvector` columns to `courses`, `professors`, `clubs`, `events`, `jobs`, a `search_all(query)` RPC, and a ⌘K palette in the nav. | Single biggest discovery upgrade. Turns the app from click-to-navigate into type-to-navigate. | M |
| 9 | **First-party course/professor reviews.** `course_reviews(user_id, section_id, difficulty, workload, would_take_again, text)` gated to users enrolled that term. Aggregate into the `courses_with_professors` view. | This is your moat. RMP is stale and biased; verified reviews from classmates are the thing students will open the app for. | L |
| 10 | **Collapse the FastAPI backend.** Move `/api/clubs` and `/api/majors` to Next.js route handlers or Supabase RPCs. Keep only `backend/scripts/` as a cron-runner (or move those to Supabase scheduled edge functions). | Removes half your deployment surface, halves your env-var sprawl, removes the dual-runtime split-brain in the codebase. | M |

---

## Quick wins you can ship this week

- **[2h] Wire `submit-job/page.tsx`** to `supabase.from('jobs').insert({...})` instead of `console.log`. The RLS policy `jobs_auth_insert` already exists at lines 64–70 of the jobs migration.
- **[3h] Replace `jobs/page.tsx` fetch loop** with `supabase.from('jobs').select().eq('is_active', true).eq('is_approved', true).order('created_at', {ascending: false})`. Keep your filter UI; drive it off `degree_category`. Delete ~600 lines of markdown parsers and anti-slop heuristics.
- **[2h] Real home-page activity counts.** `FeaturesSection.tsx` currently has static copy; swap each card's description for a live `count()` from Supabase (clubs, events this week, new jobs, departments). Cache 10 min via `unstable_cache`.
- **[1h] Rename "My Clubs" dashboard page header** — or at minimum add empty "Upcoming Events" / "Saved Jobs" / "My Courses" cards so the dashboard shape is visible even before the data lands.
- **[2h] Add `PostHog` or `Plausible`.** One npm install + one env var. You cannot prioritize what you can't measure.
- **[1h] Delete or archive the `[DEPRECATED 2026-03-26]` routers** (`courses.py`, `professors.py`). Dead code with "don't re-register" warnings is a smell; either delete or comment out in `git`.
- **[2h] Fix `backend/app/core/config.py`.** Replace the `TODO` stub with a real `BaseSettings` class and use it instead of `os.getenv` in `db/client.py`. Tiny but it unblocks type-safe config.
- **[1h] Delete `DegreesSidebar.tsx.backup`.** Backup files in source control are clutter; `git` already is the backup.
- **[3h] Playwright smoke test** (`frontend/tests/smoke.spec.ts`) that visits `/`, `/degrees`, `/clubs`, `/events`, `/jobs`, `/courses`, `/professors`, `/dashboard` and asserts 200. Add to CI. Takes 5 min to run.
- **[2h] Add a sitemap + `robots.txt`.** Next.js has `app/sitemap.ts` and `app/robots.ts` conventions; for an open-to-the-web student platform, this is free SEO.

---

## Bigger bets worth building next

### A. Personalized academic roadmap ("My Plan")
This is the Stellic/DegreeWorks killer. With `user_profiles.major_id` + the unified `course_prerequisites` + `degree_requirements` tables, give students a 4-year plan grid: drag courses into terms, see prereq validation in real time, see "missing requirements," share via public URL. This is the feature that would make BetterBobcats spread mouth-to-mouth. Coursicle has a weaker version and charges $2-8/semester; you can give it away.

### B. Verified first-party reviews
`course_reviews` + `professor_reviews` gated to authenticated students, with a lightweight enrolled-this-term check (you already scrape sections). Aggregate: difficulty, workload hours/week, "would take again," "fairness," plus free-text. Show alongside RMP numbers on professor pages, but weight first-party reviews higher. This is where real network-effect value compounds — the more reviews, the more students come back.

### C. Smart class-schedule builder
Students pick courses → app generates valid weekly timetables (conflict-free, preference-weighted: no 8am, preferred professor rating > 4.0, minimize walking between buildings). You already have `course_sections` with meeting days/times/building/room. This is "Coursicle's most loved feature" and a weekend-scale project given the data you already have.

### D. Events → "going" / "interested" RSVP + calendar export
`events` is there. Add `event_rsvps(user_id, event_id, status)` + a one-click `.ics` download + "Add to Google Calendar" link. Plus a "friends who RSVP'd" signal once `user_profiles` exists. Events page becomes a real engagement loop.

### E. Mobile PWA install + push notifications
Students live on their phones. `next-pwa` + `web-push` subscriptions + notifications for: "new event matching your major," "deadline in 7 days," "job matching your degree posted." Install prompt on `/dashboard`. UC Merced is a commuter campus; pushes beat email.

### F. Public club pages with SEO
Each club at `/clubs/[slug]` should be an SSR'd, OpenGraph-tagged, shareable landing page with the club's events, officers, join button, and recent activity. Right now club discovery depends on being on-app. A Google result for "UC Merced AI Club" should land on *you*, not on the club's dead Instagram.

### G. Invite-a-friend + referral tracking
The `club_invites` + `email_outbox` + `send-emails` edge function infrastructure is already built. Generalize it into user-to-user invites tied to a `referrals` table. This is how student apps grow — one early user telling three friends.

### H. AI academic advisor chat
With prerequisites + degree requirements + the user's profile in the DB, a grounded LLM chat ("Can I take CSE 120 next semester if I haven't done CSE 100?") is a few hundred lines of code and a crushingly good retention feature. The data model is the hard part, and fixing #5 above unlocks it.

---

## Technical architecture improvements

### Frontend
- **Kill direct Supabase queries in Client Components** for anything that should be SSR'd. `jobs/page.tsx`, `clubs/page.tsx`, `events/page.tsx`, `courses/page.tsx`, `professors/page.tsx` are all `"use client"` — they should be Server Components that pass initial data to Client Components for interactivity. Right now first-paint is empty skeletons. Next.js 16 App Router can do this for free.
- **Adopt the Server Action pattern** for mutations (submit-job, RSVP, save-job, write review) instead of client-side `supabase.from().insert()`. Better for auth, logs, validation, and Sentry breadcrumbs.
- **Route segment caching.** `/clubs`, `/events`, `/courses`, `/professors` can use `unstable_cache` / `revalidate` tags and drop to ~0 DB queries per page view.
- **Bundle budget.** Add `@next/bundle-analyzer` and enforce a 300KB client budget per route. `DegreesContent.tsx` at 2,878 lines is certainly blowing it.
- **Lint on CI.** `frontend/eslint.config` + `backend/ruff` should block merges, not just run locally.
- **TypeScript `strict: true` + no-`any` on `frontend/src/lib/**`.** Check that `lib/api.ts`, `lib/dashboard.ts`, etc. have real types — `interface Job` duplicated inside `jobs/page.tsx` suggests types are drifting.
- **Shared types package.** Move `frontend/src/types/*` into a shape Supabase can generate via `supabase gen types typescript` — you'll eliminate a whole class of frontend/schema drift bugs.

### Backend
- **Decide what it's for.** Today it's a crontab wearing a FastAPI costume. If the answer is "scrapers only," move to Supabase scheduled edge functions or GitHub Actions calling Python scripts, and delete FastAPI + `uvicorn` + Sentry-FastAPI + the whole `app/api/` tree. If the answer is "handle heavy data logic Supabase can't," then build real features there (search ranking, recommendations, LLM chat endpoint) and delete the deprecated routers.
- **Single source of truth for env.** `core/config.py` should be the only place reading env vars. Scripts should import from `core.config.settings`, not `os.getenv`.
- **Deduplicate scraper state.** Create `scraper_runs(name, started_at, finished_at, rows_inserted, status, error)` — you mentioned you already started this in commit `9c5b695`. Render it in `/admin/maintenance` so you can see when a scrape last succeeded without digging through GitHub Actions.
- **Rate-limit and CAPTCHA on unauthenticated mutations** (join via invite code, submit a job). `slowapi` or Supabase edge function middleware.

### Database
- **Add `user_profiles`.** Foundation for everything personalized.
- **Full-text search indexes.** `ALTER TABLE courses ADD COLUMN search_tsv tsvector; CREATE INDEX idx_courses_fts ON courses USING gin(search_tsv);` + update triggers. Same for `professors`, `clubs`, `events`, `jobs`. Then a `search_all(q text)` RPC returning a union.
- **`course_prerequisites`, `course_corequisites`, `degree_requirements`** tables.
- **`saved_jobs` is defined but unused.** Wire it up in dashboard and jobs cards ("bookmark" icon).
- **Materialized view for `courses_with_professors`.** It's currently a `VIEW` (line 92 of courses migration) which recomputes per query. For a high-traffic page, `CREATE MATERIALIZED VIEW` + hourly `REFRESH CONCURRENTLY` via `pg_cron`.
- **Audit RLS coverage.** I see strong RLS on clubs/jobs/events; verify `courses`, `course_sections`, `professors` have explicit `ENABLE ROW LEVEL SECURITY` + public-read policies (the `20260204...` and `20260205...` migrations do, which is good). Run Supabase's RLS linter once before production.
- **Supabase DB function docs.** The `remote_schema.sql` has 100+ `CREATE OR REPLACE FUNCTION` calls — add a comment per function so future you knows what `set_club_member_role` is without reading 900 lines.

---

## UX/UI improvements

- **Home page: lead with live data.** Replace the hero's static "Explore Degrees / Find Clubs" cards with a live "This week on BetterBobcats" feed: 3 events, 3 jobs, 1 trending club, 1 most-requested event. The hero is the product's first impression — right now it makes the app look empty even though it isn't.
- **Global nav with search.** `Navigation.tsx` is too light. Add a ⌘K search input in the middle, a profile dropdown on the right (with "My Plan," "My Clubs," "Saved," "Settings," "Sign out"), and keep the logo on the left. Sticky, blurred, consistent across every route.
- **Breadcrumbs on nested routes.** `/courses/CSE/120`, `/degrees/cs-cse/careers/swe`, `/professors/department/computer-science` all have depth but no breadcrumb trail.
- **Empty states with a next action.** The dashboard empty state says "No clubs yet" — it should also say "Browse clubs →" with a prominent CTA. Every empty state in the app should answer "what do I do now?"
- **Loading skeletons → Suspense + optimistic.** Many pages flash a skeleton then a full render. Server Components + `loading.tsx` per route segment will feel faster.
- **Dark mode QA pass.** You have `ThemeProvider` + `ThemeToggle`, but nothing signals they've been tested end-to-end. Pick a dark-mode-first day and walk the whole app.
- **Typography hierarchy.** `h1` "My Clubs" at `text-5xl font-semibold` on dashboard is shouting. Modern student dashboards use `text-2xl` + context. A smaller h1 + a denser grid fits more on-screen, which is exactly what a dashboard should do.
- **React Flow mobile controls.** Add a "Reset view" button and a minimap for the prerequisite graphs. Pinch-to-zoom on mobile React Flow is rough without UI affordances.
- **Inline course search on degrees page.** When a student is looking at a career path graph with 30 courses, let them Cmd+F inside the graph.
- **Accessibility pass.** Interactive graph nodes should be keyboard navigable and screen-reader labeled. React Flow supports this but it has to be explicitly wired. Public-sector employers increasingly ask about WCAG compliance.
- **Favicons, OpenGraph, Twitter card images** per route. `/clubs/[slug]` without a real OG image when shared in a Discord is a missed growth vector.

---

## Final ranked roadmap

### NOW (this week → next week, ship directly to `main`)

1. **Fix `jobs/page.tsx`** → read from `jobs` table. Remove GitHub fetchers. *(~3h)*
2. **Fix `submit-job/page.tsx`** → actually insert. Wire approval queue stub at `/admin/jobs`. *(~3h)*
3. **Add PostHog or Plausible analytics.** Track page views + 10 key events. *(~1h)*
4. **Delete deprecated backend routers + backup files.** `courses.py`, `professors.py`, `DegreesSidebar.tsx.backup`. *(~30m)*
5. **Playwright smoke tests in CI.** One file, 10 assertions. *(~3h)*
6. **Home-page live counts.** Replace static `FeaturesSection` copy with real numbers. *(~2h)*
7. **Fix `backend/app/core/config.py`** — real `BaseSettings`, not TODO. *(~1h)*
8. **Sitemap + robots.** *(~1h)*
9. **`user_profiles` migration** — just the schema, no UI yet. *(~1h)*
10. **Dashboard skeleton** — 4-card grid, real "My Clubs" + empty "My Courses"/"Saved Jobs"/"Upcoming Events." *(~3h)*

### NEXT (this month)

11. **Onboarding flow** writing into `user_profiles` (major, year, interests). Gate new dashboard.
12. **Refactor career-path graphs into a single generic component** driven by config. Delete ~3,500 lines across five CS + EE + ME + COGS + PolSci career folders.
13. **Split `DegreesContent.tsx` (2,878 lines)** into per-degree server components.
14. **`course_prerequisites` + `degree_requirements` tables + one-time migration** of `tierCourses.ts` data.
15. **Full-text `search_all()` RPC + ⌘K command palette** in nav. Searches courses, professors, clubs, events, jobs.
16. **Events RSVP + .ics export + Google Calendar link.**
17. **Public SSR'd `/clubs/[slug]` pages** with OpenGraph tags.
18. **Collapse backend** — move `/api/clubs` and `/api/majors` to Next.js route handlers or Supabase RPCs; scrapers become scheduled edge functions or stay in `.github/workflows/`.
19. **Mobile PWA manifest + install prompt.**
20. **Saved jobs wired up** — the table exists; just needs a bookmark UI.

### LATER (quarter-scale bets)

21. **Personalized academic roadmap ("My Plan")** — drag-and-drop 4-year planner backed by `course_prerequisites` + `degree_requirements`. Shareable public URL. This is the Stellic competitor.
22. **First-party course/professor reviews** with verified-enrollment gate. The moat.
23. **Smart schedule builder** — conflict-free term generator from `course_sections` with preferences.
24. **Web push notifications** for matched events/jobs/deadlines.
25. **AI academic advisor chat** grounded in the user's plan + prereqs.
26. **Referrals / invite-a-friend** — generalize `club_invites` into user-to-user invites.
27. **Officer analytics on club dashboard** — "views this week," "new followers," "event RSVPs," etc.
28. **Materialized views + `pg_cron`** for heavy read paths.
29. **Typed Supabase client** via `supabase gen types typescript` integrated into `frontend/src/types/`.
30. **Full WCAG accessibility pass + dark-mode QA.**

---

## One-sentence summary

**You've built surprisingly solid infrastructure — RLS, scrapers, a real event-request loop, React Flow graphs — but the product surface that students actually touch has three broken/disconnected flows (jobs, submit-job, dashboard) and one crushingly underused asset (the academic data model).** Fix the broken connections first, then turn "My Clubs" into a real dashboard, then lean into prerequisites + first-party reviews to become the thing Stellic and Coursicle wish they were. The stack already supports all of it.
