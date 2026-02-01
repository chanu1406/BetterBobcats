# BetterBobcats

An open-source platform for UC Merced students to explore academic programs, discover clubs, manage memberships, and plan their academic journey.

## Features

- **Degrees** — Prerequisite and career-path graphs for CS/CSE, COGS, Electrical Engineering, Political Science, and Mechanical Engineering. Interactive React Flow graphs with course details, tier views, and format/reset controls.
- **Clubs** — Browse clubs (filter by major), view public club profiles (`/clubs/[slug]`), request new clubs, and track your requests.
- **Events** — Campus-wide event calendar (month/week/list), filters, and event request board.
- **Dashboard** — Personalized dashboard of your club memberships, with per-club pages for profile, events, members, and requests. Club officers and admins can manage events and members.
- **Invites** — Accept club invites via email link (`/invites`).
- **Auth** — Sign up, log in, password reset, and email verification via Supabase Auth.
- **Admin** — Platform admins can manage clubs, club requests, majors, and maintenance (login at `/admin/login`).

## Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **Supabase** project (database, auth, optional storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BetterBobcats
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```
   This sets up the backend venv and installs frontend npm packages.

3. **Environment variables**

   **Backend** `backend/.env`:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

   **Frontend** `frontend/.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database migrations**

   Apply migrations to your Supabase project (e.g. via [Supabase CLI](https://supabase.com/docs/guides/cli)):
   ```bash
   npx supabase db push
   ```

5. **Run development servers**

   **Option A — Recommended (script)**
   ```bash
   ./run-dev.sh
   ```
   Starts backend and frontend, with `NODE_OPTIONS=--max-old-space-size=4096` for the frontend to avoid memory issues when using the Degrees page.

   **Option B — npm**
   ```bash
   npm run dev
   ```

   **Option C — Separate terminals**
   ```bash
   npm run dev:backend   # Terminal 1
   npm run dev:frontend  # Terminal 2
   ```

6. **Open the app**
   - Frontend: http://localhost:3000  
   - Backend API: http://localhost:8000  
   - API docs: http://localhost:8000/docs  

## Project Structure

```
BetterBobcats/
├── backend/                 # FastAPI API
│   ├── app/
│   │   ├── api/             # Route handlers
│   │   ├── core/            # Config
│   │   ├── db/              # DB client
│   │   ├── models/          # Pydantic models
│   │   └── utils/
│   ├── docs/
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/                # Next.js App Router
│   ├── src/
│   │   ├── app/             # Routes and pages
│   │   │   ├── admin/       # Admin UI (clubs, requests, majors)
│   │   │   ├── auth/        # Login, signup, reset, etc.
│   │   │   ├── clubs/       # Browse, [slug], request, my-requests
│   │   │   ├── dashboard/   # User + club dashboards
│   │   │   ├── degrees/     # Degrees + career graphs
│   │   │   ├── events/      # Event calendar
│   │   │   └── invites/     # Invite acceptance
│   │   ├── components/      # Shared UI
│   │   ├── lib/             # API, auth, Supabase, etc.
│   │   └── types/
│   ├── docs/
│   ├── package.json
│   └── Dockerfile
│
├── supabase/
│   ├── migrations/          # SQL migrations
│   ├── functions/           # Edge functions (e.g. send-emails)
│   └── config.toml
│
├── docs/                    # Project docs
├── docker-compose.yml
├── package.json             # Root scripts
├── run-dev.sh               # Dev startup
└── run-prod.sh              # Production startup
```

## Tech Stack

| Layer        | Technologies |
|-------------|--------------|
| **Frontend**| Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui, React Flow, TanStack Query, Supabase JS |
| **Backend** | FastAPI, Python 3.11+, Pydantic, Supabase Python client |
| **Data**    | PostgreSQL (Supabase), RLS, migrations in `supabase/migrations/` |
| **Auth**    | Supabase Auth (email/password, Magic Link, etc.) |

## Documentation

| Doc | Description |
|-----|-------------|
| [Database Schema](docs/DATABASE_SCHEMA.md) | Tables, RLS, functions |
| [Performance Optimization Roadmap](docs/PERFORMANCE_OPTIMIZATION_ROADMAP.md) | Optimizations, RPCs, caching, indexes |
| [Memory Troubleshooting](docs/MEMORY_TROUBLESHOOTING.md) | Dev crashes / OOM when running Degrees |
| [Email Troubleshooting](docs/EMAIL_TROUBLESHOOTING.md) | Email delivery and templates |
| [Production Setup](PRODUCTION_SETUP.md) | Supabase, env, deploy |
| [Frontend Quick Start](frontend/docs/QUICK_START.md) | Frontend setup and conventions |
| [Frontend Coding Standards](frontend/docs/CODING_STANDARDS.md) | Code style and structure |
| [Backend Admin Auth](backend/docs/ADMIN_AUTHENTICATION.md) | Admin authentication |

## API Overview

- **Clubs:** `GET/POST /api/clubs/`, `GET/PATCH/DELETE /api/clubs/{slug}`, logo/banner uploads  
- **Majors:** `GET/POST /api/majors/`, `GET/PATCH/DELETE /api/majors/{id}`  
- **Health:** `GET /`, `GET /health`  

Full interactive docs at **http://localhost:8000/docs** when the backend is running.

## Docker

```bash
docker-compose up --build
```

Frontend: http://localhost:3000 — Backend: http://localhost:8000  

See `docker-compose.yml` and [Production Setup](PRODUCTION_SETUP.md) for production-focused configuration.

## Development

- **Backend:** `cd backend && source venv/bin/activate && uvicorn app.main:app --reload --port 8000`  
- **Frontend:** `cd frontend && npm run dev`  
- **Linting:** Backend — `ruff check` / `ruff format`; Frontend — `npm run lint`  

## Known Limitations

- Admin auth uses credentials defined in backend config (see [Backend Admin Auth](backend/docs/ADMIN_AUTHENTICATION.md)); production should use a proper auth strategy.
- Email sending depends on Resend (or configured provider) and Supabase Edge Functions; see [Email Troubleshooting](docs/EMAIL_TROUBLESHOOTING.md) and [Production Setup](PRODUCTION_SETUP.md).

## License

[Add your license here]

---

Built for UC Merced students.
