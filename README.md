# BetterBobcats

An open-source platform for UC Merced students to explore academic programs, discover clubs, and plan their academic journey.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **Supabase** account and project (for database and storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BetterBobcats
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```
   
   This installs both frontend and backend dependencies.

3. **Set up environment variables**

   Create `backend/.env`:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

   Create `frontend/.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run database migrations**

   Apply migrations from `supabase/migrations/` to your Supabase project.

5. **Start the development servers**

   Option 1: Use the convenience script
   ```bash
   ./run-dev.sh
   ```

   Option 2: Use npm scripts
   ```bash
   npm run dev
   ```

   Option 3: Run separately
   ```bash
   # Terminal 1 - Backend
   npm run dev:backend
   
   # Terminal 2 - Frontend
   npm run dev:frontend
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## 📁 Project Structure

```
BetterBobcats/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API route handlers
│   │   ├── core/           # Core configuration
│   │   ├── db/             # Database client
│   │   ├── models/         # Pydantic models
│   │   ├── utils/          # Utility functions
│   │   └── main.py         # FastAPI application entry point
│   ├── docs/               # Backend documentation
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile          # Backend Docker image
│
├── frontend/                # Next.js frontend
│   ├── src/
│   │   ├── app/            # Next.js App Router pages
│   │   ├── components/     # Shared React components
│   │   ├── lib/            # Utility libraries
│   │   └── types/          # TypeScript type definitions
│   ├── docs/               # Frontend documentation
│   ├── package.json        # Node.js dependencies
│   └── Dockerfile          # Frontend Docker image
│
├── supabase/
│   └── migrations/         # Database migration files
│
├── docs/                    # Project-wide documentation
│   ├── database            # Database schema reference
│   └── TECH_STACK_ARCHITECTURE_REPORT.md
│
├── docker-compose.yml      # Docker orchestration
├── package.json            # Root package.json with dev scripts
└── run-dev.sh              # Development startup script
```

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15.1.0 (App Router)
- **UI Library:** React 19.0.0
- **Styling:** TailwindCSS 3.4.17
- **UI Components:** shadcn/ui
- **Visualization:** ReactFlow 11.11.4, dagre 0.8.5
- **Icons:** lucide-react
- **Language:** TypeScript 5.7.2

### Backend
- **Framework:** FastAPI 0.115.0
- **Runtime:** Python 3.11+
- **Validation:** Pydantic 2.12.0+
- **Database Client:** Supabase Python client
- **Code Quality:** Ruff 0.8.0

### Database & Infrastructure
- **Database:** PostgreSQL (via Supabase)
- **Storage:** Supabase Storage
- **Authentication:** Supabase Auth (partially implemented)
- **Migrations:** SQL files in `supabase/migrations/`

## 📚 Documentation

### Getting Started
- [Frontend Quick Start Guide](frontend/docs/QUICK_START.md)
- [Frontend Coding Standards](frontend/docs/CODING_STANDARDS.md)
- [Frontend Component Structure](frontend/docs/COMPONENT_STRUCTURE.md)

### Architecture & Design
- [Tech Stack & Architecture Report](docs/TECH_STACK_ARCHITECTURE_REPORT.md)
- [Database Schema Reference](docs/DATABASE_SCHEMA.md)
- [Backend Admin Authentication](backend/docs/ADMIN_AUTHENTICATION.md)

### Feature-Specific Documentation
- [Degrees Page Documentation](frontend/src/app/degrees/docs/DEGREES_PAGE.md)
- [Career Path Graph Guide](frontend/src/app/degrees/docs/CAREER_PATH_GRAPH_GUIDE.md)
- [Career Graph Build Guide](frontend/src/app/degrees/cs-cse/CAREER_GRAPH_BUILD_GUIDE.md)

## 🔌 API Endpoints

### Clubs
- `GET /api/clubs/` - List all clubs
- `POST /api/clubs/` - Create a new club (admin)
- `GET /api/clubs/{club_slug}` - Get club by slug
- `PATCH /api/clubs/{club_slug}` - Update club (admin)
- `DELETE /api/clubs/{club_slug}` - Delete club (admin)
- `POST /api/clubs/{club_slug}/upload-logo` - Upload club logo (admin)
- `POST /api/clubs/{club_slug}/upload-banner` - Upload club banner (admin)

### Majors
- `GET /api/majors/` - List all majors
- `GET /api/majors/{major_id}` - Get major by ID
- `POST /api/majors/` - Create a new major (admin)
- `PATCH /api/majors/{major_id}` - Update major (admin)
- `DELETE /api/majors/{major_id}` - Delete major (admin)

### Health
- `GET /` - Health check
- `GET /health` - Health check endpoint

Full API documentation available at `/docs` when the backend is running.

## 🐳 Docker Deployment

### Using Docker Compose

1. **Set up environment variables** (see Installation section)

2. **Build and start services**
   ```bash
   docker-compose up --build
   ```

3. **Access services**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000

### Individual Docker Images

Build backend:
```bash
cd backend
docker build -t betterbobcats-backend .
```

Build frontend:
```bash
cd frontend
docker build -t betterbobcats-frontend .
```

## 🔒 Authentication

### Admin Authentication (Development)

Currently uses hardcoded credentials for development:
- Username: `TheBetterBobcat`
- Password: `Bobcat1!`

**⚠️ Warning:** This is for development only. Production should use proper authentication with Supabase Auth.

### User Authentication

User authentication via Supabase Auth is partially implemented but not fully configured. See [Tech Stack Report](docs/TECH_STACK_ARCHITECTURE_REPORT.md) for implementation status.

## 🗄️ Database

The application uses PostgreSQL via Supabase. Database schema is defined in SQL migration files in `supabase/migrations/`.

### Key Tables
- `clubs` - Club information
- `majors` - Academic majors
- `club_majors` - Many-to-many relationship between clubs and majors
- `club_tags` - Tags associated with clubs
- `club_major_notes` - Notes about club-major relationships

See [Database Schema Reference](docs/DATABASE_SCHEMA.md) for complete schema documentation.

## 🧪 Development

### Backend Development

```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

### Frontend Development

```bash
cd frontend
npm run dev
```

### Code Quality

**Backend:**
- Linting: `ruff check`
- Formatting: `ruff format`

**Frontend:**
- Linting: `npm run lint`
- Type checking: TypeScript compiler

## 📝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly
4. Submit a pull request

### Code Style

- **Frontend:** Follow the [Coding Standards](frontend/docs/CODING_STANDARDS.md)
- **Backend:** Follow PEP 8, use type hints, format with Ruff

## 🐛 Known Issues & Limitations

- Admin authentication uses hardcoded credentials (development only)
- User authentication not fully implemented
- Email service not configured
- Some API endpoints lack proper authentication checks
- RLS policies only cover SELECT operations (INSERT/UPDATE/DELETE not protected)

See [Tech Stack Report](docs/TECH_STACK_ARCHITECTURE_REPORT.md) for detailed security considerations and recommendations.

## 📄 License

[Add your license here]

## 🙏 Acknowledgments

Built for UC Merced students by UC Merced students.
