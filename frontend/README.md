# BetterBobcats Frontend

Next.js frontend for the BetterBobcats platform.

## Overview

The frontend is built with Next.js 15.1.0 using the App Router, React 19, TypeScript, and TailwindCSS. It provides a modern, interactive interface for students to explore clubs, majors, and academic programs.

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**

   Create `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

   The application will be available at http://localhost:3000

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   ├── admin/             # Admin pages
│   │   ├── clubs/             # Clubs pages
│   │   ├── degrees/           # Degrees and career paths
│   │   └── components/        # Page-specific components
│   ├── components/            # Shared components (currently empty)
│   ├── lib/                   # Utility libraries
│   │   ├── api.ts            # API client functions
│   │   ├── utils.ts          # Utility functions
│   │   └── supabase/         # Supabase client setup
│   └── types/                # TypeScript type definitions
├── public/                    # Static assets
├── docs/                      # Frontend documentation
├── package.json              # Dependencies and scripts
├── tailwind.config.ts        # TailwindCSS configuration
├── tsconfig.json             # TypeScript configuration
└── next.config.ts            # Next.js configuration
```

## Key Features

### Pages

- **Homepage** (`/`) - Landing page with hero section and features
- **Clubs** (`/clubs`) - Browse and filter clubs by major
- **Degrees** (`/degrees`) - Explore academic programs and career paths
  - CS/CSE degree with prerequisite graphs
  - COGS degree with prerequisite graphs
  - Career path visualizations for various fields
- **Admin** (`/admin`) - Administrative dashboard (protected)
  - Club management
  - Major management

### Components

The application uses a component-based architecture with:
- **Shared components** in `src/components/` (for reuse across pages)
- **Page-specific components** in `src/app/[page]/components/`
- **UI components** from shadcn/ui

### Data Fetching

- **API Client** (`src/lib/api.ts`) - Functions for backend API calls
- **Supabase Client** (`src/lib/supabase/`) - Direct database queries where appropriate
- **Server Actions** (`src/app/admin/actions.ts`) - Next.js server actions for authentication

## Documentation

Comprehensive documentation is available in the `docs/` directory:

- [Quick Start Guide](docs/QUICK_START.md) - Getting started with development
- [Coding Standards](docs/CODING_STANDARDS.md) - Code style and best practices
- [Component Structure](docs/COMPONENT_STRUCTURE.md) - Component organization patterns
- [Function Templates](docs/FUNCTION_TEMPLATES.md) - Reusable code templates
- [JSX/TSX Basics](docs/JSX_TSX_BASICS.md) - React syntax guide
- [Critical Areas](docs/CRITICAL_AREAS.md) - Important concepts
- [What You Need to Know](docs/WHAT_YOU_NEED_TO_KNOW.md) - Essential information

## Styling

The application uses TailwindCSS for styling with:
- Utility-first CSS classes
- Custom color scheme (configured in `tailwind.config.ts`)
- Responsive design patterns
- shadcn/ui component library

## TypeScript

The project is fully typed with TypeScript. Type definitions are in `src/types/`:
- `club.ts` - Club types
- `major.ts` - Major types
- `course.ts` - Course types
- `career.ts` - Career types
- `careerPath.ts` - Career path graph types
- `degree.ts` - Degree types
- `roadmap.ts` - Roadmap types

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

- **ESLint** - Configured with Next.js recommended rules
- **TypeScript** - Strict type checking enabled
- **Prettier** - Code formatting (if configured)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |

## Dependencies

Key dependencies:

- **next** (15.1.0) - React framework
- **react** (19.0.0) - UI library
- **typescript** (5.7.2) - Type safety
- **tailwindcss** (3.4.17) - CSS framework
- **@supabase/ssr** (0.8.0) - Supabase SSR support
- **@supabase/supabase-js** (2.89.0) - Supabase client
- **reactflow** (11.11.4) - Graph visualization
- **dagre** (0.8.5) - Graph layout

See `package.json` for the complete list.

## Docker

Build the Docker image:

```bash
docker build -t betterbobcats-frontend .
```

Run the container:

```bash
docker run -p 3000:3000 --env-file .env.local betterbobcats-frontend
```

Or use docker-compose from the project root.

## Related Documentation

- [Main README](../README.md) - Project overview
- [Tech Stack Report](../docs/TECH_STACK_ARCHITECTURE_REPORT.md) - Architecture documentation
- [Database Schema](../docs/DATABASE_SCHEMA.md) - Database reference
