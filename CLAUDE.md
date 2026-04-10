# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BetterBobcats is an open-source platform for UC Merced students to explore degree programs, discover career paths, find clubs/events/jobs, and build academic roadmaps. It's a monorepo with a Next.js frontend and FastAPI backend, both backed by Supabase (PostgreSQL).

## Development Commands

### Setup
```bash
npm run install:all          # Install all frontend and backend dependencies
```

Backend specifically requires a Python venv:
```bash
cd backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt
```

### Running Locally
```bash
npm run dev                  # Run both frontend (port 3000) and backend (port 8000) concurrently
npm run dev:frontend         # Frontend only
npm run dev:backend          # Backend only (activates venv automatically)
```

Alternatively, use Docker:
```bash
docker-compose up --build
```

### Building
```bash
npm run build:frontend       # Production build of frontend
```

### Linting
```bash
cd frontend && npm run lint           # ESLint for frontend
cd backend && ruff check .           # Ruff linter for backend
cd backend && ruff format .          # Ruff formatter for backend
```

No test suite is currently configured.

## Environment Variables

**Backend** (`.env` in `backend/`):
- `SUPABASE_URL`, `SUPABASE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `SENTRY_DSN`, `SENTRY_TRACES_SAMPLE_RATE`, `SENTRY_ENVIRONMENT`

**Frontend** (`.env.local` in `frontend/`):
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:8000`)

## Architecture

### Frontend (`frontend/`)
Next.js 16 App Router, TypeScript (strict), Tailwind CSS + shadcn/ui, TanStack Query for data fetching, React Flow + Dagre for interactive graphs.

**Key data flow patterns:**
- **Courses, professors, events, jobs**: The frontend queries Supabase directly via `@supabase/ssr` — it does NOT go through FastAPI for these.
- **Clubs and majors**: Fetched from the FastAPI backend (`/api/clubs`, `/api/majors`).
- `lib/api.ts` defines API client functions but most are currently unused (the `/api/courses` and `/api/careers` FastAPI endpoints are not registered).

**Supabase clients** (two variants):
- `lib/supabase/browser.ts` — use in Client Components (uses cookies)
- `lib/supabase/server.ts` — use in Server Components

**Degrees section** (`app/degrees/`): Uses static TypeScript config files per degree program (not database-driven). React Flow visualizes prerequisite graphs and career paths.

### Backend (`backend/`)
FastAPI 0.115, Python 3.11+, Pydantic v2, Ruff for linting/formatting (line length 100).

**Registered routes only:**
- `GET/POST /api/clubs/*` — clubs router
- `GET /api/majors/*` — majors router
- `GET /`, `GET /health` — health checks

**Database client** (`app/db/client.py`):
- `get_db()` — anon key, subject to RLS (use for public reads)
- `get_db(admin=True)` — service role key, bypasses RLS (use for admin/scraper writes)

### Database (`supabase/`)
PostgreSQL via Supabase with Row-Level Security (RLS). Migrations are in `supabase/migrations/`. Edge functions handle email delivery (invite system). GitHub Actions workflows scrape academic data weekly and jobs hourly (`backend/scripts/`).

## Naming Conventions
- React components: PascalCase filenames and function names
- Next.js pages: kebab-case filenames
- TypeScript types/interfaces: PascalCase, defined in `frontend/src/types/`
- Course IDs: kebab-case strings (e.g., `"cse-030"`)
- Backend: snake_case (Python standard); Ruff enforces formatting

## Adding New Degree Content

Career paths live under `frontend/src/app/degrees/{degree}/careers/{career}/`:
- `data/careerPathConfig.ts` — root label, categories, course references
- `data/tierCourses.ts` — detailed course info with tier priorities (1=highest)
- `components/CareerPathGraph.tsx` — React Flow visualization component

Register new paths in the degree's sidebar component.
