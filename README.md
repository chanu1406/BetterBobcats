# BetterBobcats

An open-source platform for UC Merced students to explore degree programs, career paths, and create personalized academic roadmaps.

## 🚀 Project Status

**Current Phase:** Core Features Implemented ✅  
The project has implemented core features including:
- ✅ Homepage with hero section
- ✅ Degrees page with CS/CSE degree program
- ✅ Interactive prerequisite graph visualization
- ✅ Six complete career path graphs (SWE, Cybersecurity, ML/AI, Data Science, Systems/Infrastructure, Embedded Systems)
- ✅ Student clubs page with filtering
- ✅ Interactive course exploration with detailed information

**In Progress:**
- Additional degree programs beyond CS/CSE
- Backend API integration
- User roadmap/planning features

## 🏗️ Architecture

This project uses a **monorepo structure** with separate frontend and backend applications:

```
better-bobcats/
├── backend/          # FastAPI backend
├── frontend/         # Next.js frontend
└── docker-compose.yml
```

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn/UI
- **State Management:** React Query
- **Icons:** Lucide React
- **Graph Visualization:** React Flow (interactive prerequisite graphs)

### Backend
- **Framework:** FastAPI (Python 3.11+)
- **Server:** Uvicorn
- **Validation:** Pydantic v2
- **Database:** Supabase (PostgreSQL)
- **Linting:** Ruff

### DevOps
- **Containerization:** Docker + Docker Compose
- **CI/CD:** TBD

## 📦 Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for local development)
- Python 3.11+ (for local development)

### Setup with Docker (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/better-bobcats.git
   cd better-bobcats
   ```

2. **Set up environment variables:**
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   # Edit backend/.env with your Supabase credentials

   # Frontend
   cp frontend/.env.example frontend/.env
   ```

3. **Build and run with Docker Compose:**
   ```bash
   docker-compose build
   docker-compose up
   ```

4. **Access the applications:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Local Development (Without Docker)

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

### Backend (`/backend`)
```
backend/
├── app/
│   ├── main.py              # FastAPI application entry point
│   ├── api/                 # API routes (TODO)
│   ├── core/
│   │   └── config.py        # Configuration settings
│   ├── models/              # Pydantic models
│   │   ├── degree.py
│   │   ├── career.py
│   │   └── roadmap.py
│   └── db/
│       └── client.py        # Supabase client (TODO)
├── requirements.txt
├── Dockerfile
└── pyproject.toml          # Ruff configuration
```

### Frontend (`/frontend`)
```
frontend/
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── page.tsx        # Homepage
│   │   ├── layout.tsx      # Root layout
│   │   ├── globals.css     # Global styles
│   │   ├── components/     # Homepage components
│   │   ├── degrees/        # Degrees page and CS/CSE content
│   │   │   ├── page.tsx    # Main degrees page
│   │   │   ├── components/ # Degrees page components
│   │   │   └── cs-cse/     # CS/CSE degree content
│   │   │       ├── components/ # Prerequisite graph components
│   │   │       ├── careers/    # Career path implementations
│   │   │       └── data/       # Course data
│   │   └── clubs/         # Student clubs page
│   ├── components/         # Shared components (currently empty)
│   ├── lib/                # Utility functions and API clients
│   │   ├── api.ts          # Backend API client
│   │   ├── supabase.ts     # Supabase client
│   │   └── utils.ts        # Utility functions
│   └── types/              # TypeScript type definitions
│       ├── degree.ts
│       ├── career.ts
│       ├── careerPath.ts
│       ├── course.ts
│       └── roadmap.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── components.json         # Shadcn/UI config
└── Dockerfile
```

## 🔧 Development Commands

### Backend
```bash
# Run tests (TODO)
pytest

# Lint code
ruff check .

# Format code
ruff format .
```

### Frontend
```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📝 Data Models

The platform revolves around several core entities:

1. **Degree** - UC Merced degree programs (CS/CSE implemented)
2. **Career Path** - Career paths with tiered course recommendations (6 paths implemented)
3. **Course** - Course information with prerequisites, descriptions, and metadata
4. **Club** - Student organizations with major associations
5. **Roadmap Items** - Personalized academic planning (planned)

## 🎯 Current Features

### Implemented Pages
- **Homepage** (`/`) - Landing page with hero section
- **Degrees** (`/degrees`) - Browse degree programs
  - CS/CSE degree with prerequisite graph
  - Six career paths with interactive graphs
- **Clubs** (`/clubs`) - Student organizations with filtering

### Career Paths Available
1. Software Engineering (Generalist)
2. Cybersecurity
3. Machine Learning / AI
4. Data Science / Data Analytics
5. Systems / Infrastructure Engineering
6. Embedded Systems Engineering

Each career path includes:
- Interactive tier-based course graph
- Detailed course descriptions
- Learning outcomes and career relevance
- Resource links and recommendations

## 🤝 Contributing

This is an open-source project for UC Merced students. Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

TBD

## 🙏 Acknowledgments

- UC Merced Community
- Open-source contributors

---

**📌 Note:** The frontend is actively developed with core features implemented. Backend API integration and additional degree programs are in progress.
