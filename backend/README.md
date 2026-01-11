# BetterBobcats Backend

FastAPI backend for the BetterBobcats platform.

## Overview

The backend provides a REST API for managing clubs, majors, and other platform data. It uses FastAPI for the API framework, Pydantic for data validation, and Supabase as the database client.

## Quick Start

### Prerequisites

- Python 3.11+
- Supabase project with configured database

### Installation

1. **Create virtual environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**

   Create `.env` file:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Run the server**
   ```bash
   uvicorn app.main:app --reload
   ```

   The API will be available at http://localhost:8000

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application entry point
│   ├── api/                 # API route handlers
│   │   ├── __init__.py
│   │   ├── clubs.py         # Clubs API endpoints
│   │   └── majors.py        # Majors API endpoints
│   ├── core/                # Core configuration
│   │   ├── __init__.py
│   │   └── config.py        # Application settings
│   ├── db/                  # Database client
│   │   ├── __init__.py
│   │   └── client.py        # Supabase client wrapper
│   ├── models/              # Pydantic data models
│   │   ├── __init__.py
│   │   ├── club.py          # Club data models
│   │   ├── career.py        # Career path models (for future use)
│   │   └── course.py        # Course models (for future use)
│   └── utils/               # Utility functions
│       ├── __init__.py
│       └── slug.py          # Slug generation utility
├── docs/                    # Backend documentation
│   └── ADMIN_AUTHENTICATION.md
├── requirements.txt         # Python dependencies
├── pyproject.toml          # Ruff configuration
└── Dockerfile              # Docker image definition
```

## API Routes

### Clubs API (`/api/clubs`)

- `GET /api/clubs/` - List all clubs
- `POST /api/clubs/` - Create a new club (admin only)
- `GET /api/clubs/{club_slug}` - Get club by slug
- `PATCH /api/clubs/{club_slug}` - Update club (admin only)
- `DELETE /api/clubs/{club_slug}` - Delete club (admin only)
- `POST /api/clubs/{club_slug}/upload-logo` - Upload club logo (admin only)
- `POST /api/clubs/{club_slug}/upload-banner` - Upload club banner (admin only)

### Majors API (`/api/majors`)

- `GET /api/majors/` - List all majors
- `GET /api/majors/{major_id}` - Get major by ID
- `POST /api/majors/` - Create a new major (admin only)
- `PATCH /api/majors/{major_id}` - Update major (admin only)
- `DELETE /api/majors/{major_id}` - Delete major (admin only)

### Health Checks

- `GET /` - Health check endpoint
- `GET /health` - Health check endpoint

## API Documentation

When the server is running, interactive API documentation is available at:

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## Database

The backend uses Supabase (PostgreSQL) for data storage. The database client is configured in `app/db/client.py`.

### Database Client

The `get_db()` function provides access to the Supabase client:

```python
from app.db.client import get_db
from supabase import Client

# Public client (subject to RLS)
db: Client = get_db(admin=False)

# Admin client (bypasses RLS)
db: Client = get_db(admin=True)
```

**⚠️ Security Note:** Use the admin client only when necessary and with proper authentication checks.

## Data Models

Pydantic models are defined in `app/models/`:

- `Club` - Club data structure
- `ClubCreate` - Club creation payload
- `CareerPathConfig`, `TierCourse` - Career path models (for future use)
- `Course` - Course models (for future use)

## File Storage

Club assets (logos, banners) are stored in Supabase Storage:

- **Bucket:** `club-assets`
- **Logo path:** `clubs/{club_slug}/logo.png`
- **Banner path:** `clubs/{club_slug}/banner.jpg`

Files are uploaded via the upload endpoints and public URLs are generated for frontend use.

## Authentication

Currently, admin authentication uses hardcoded credentials (development only):

- Username: `TheBetterBobcat`
- Password: `Bobcat1!`

**⚠️ Warning:** This is for development only. Production should implement proper authentication.

See [Admin Authentication Documentation](docs/ADMIN_AUTHENTICATION.md) for details.

## Development

### Code Quality

The project uses Ruff for linting and formatting:

```bash
# Check for errors
ruff check .

# Format code
ruff format .
```

Configuration is in `pyproject.toml`.

### Running Tests

Tests can be added to a `tests/` directory and run with pytest:

```bash
pytest
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Supabase project URL | Yes |
| `SUPABASE_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes (for admin operations) |

## Docker

Build the Docker image:

```bash
docker build -t betterbobcats-backend .
```

Run the container:

```bash
docker run -p 8000:8000 --env-file .env betterbobcats-backend
```

Or use docker-compose from the project root.

## Dependencies

Key dependencies:

- **fastapi** (0.115.0) - Web framework
- **uvicorn** (0.32.0) - ASGI server
- **pydantic** (2.12.0+) - Data validation
- **supabase** (2.27.0+) - Database client
- **python-multipart** (0.0.9) - File upload support
- **ruff** (0.8.0) - Code quality

See `requirements.txt` for the complete list.

## Related Documentation

- [Admin Authentication](docs/ADMIN_AUTHENTICATION.md) - Authentication system documentation
- [Tech Stack Report](../docs/TECH_STACK_ARCHITECTURE_REPORT.md) - Overall architecture documentation
- [Database Schema](../docs/DATABASE_SCHEMA.md) - Database schema reference
