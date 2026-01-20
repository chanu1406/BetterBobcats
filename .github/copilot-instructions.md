
# BetterBobcats - GitHub Copilot Context & Instructions

## Project Overview
BetterBobcats is an open-source educational platform for UC Merced students to explore degree programs, discover career paths, and create personalized academic roadmaps. The platform helps students make informed decisions about their academic journey and career development.

## Current State & Architecture

### Development Phase
- **Status**: Scaffolding Complete ✅ | Business Logic Pending
- **Architecture**: Monorepo with separate frontend/backend
- **Data**: Static JSON/TypeScript files (backend integration planned)

### Tech Stack

#### Frontend (Next.js)
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/UI components
- **State Management**: React Query (planned)
- **Graphs**: React Flow for interactive visualizations
- **Icons**: Lucide React

#### Backend (FastAPI)
- **Framework**: FastAPI with Uvicorn
- **Language**: Python 3.11+
- **Validation**: Pydantic v2
- **Database**: Supabase (PostgreSQL) - planned
- **Linting**: Ruff

#### Infrastructure
- **Containerization**: Docker + Docker Compose
- **CI/CD**: Planned

## Key Components & Features

### Core Pages
- **Homepage (`/`)**: Hero section with navigation to degrees
- **Degrees Page (`/degrees`)**: Main exploration interface with sidebar navigation

### Interactive Visualizations
- **Prerequisite Graphs**: Show course dependencies and academic progression
- **Career Path Graphs**: Tiered course recommendations for specific careers
- **Features**: Drag nodes, expand/collapse tiers, click for course details

### Data Structure

#### Course Model
```typescript
interface Course {
  id: string;           // e.g., "cse-030"
  code: string;         // e.g., "CSE 030"
  name: string;         // e.g., "Data Structures"
  fullName: string;     // e.g., "CSE 030: Data Structures"
  year: 1|2|3|4;        // Academic year
  semester: "fall"|"spring";
  prerequisites: string[]; // Array of course IDs
  isCategory?: boolean;    // For GenEd/Elective categories
  category?: string;       // e.g., "Math", "CSE", "Engineering"
}
```

#### Career Path Model
```typescript
interface TierCourse {
  id: string;
  code: string;
  name: string;
  fullName: string;
  description: string;     // Why this course matters for the career
  tier: number;           // Priority tier (1=highest, 2=important, 3=optional)
  prerequisites?: string[];
  expandedInfo?: {
    credits?: number;
    learningOutcomes?: string[];
    topics?: string[];
    careerRelevance?: string;
  };
}
```

### Implemented Career Paths
- **Cybersecurity**: Security foundations, cryptography, network defense
- **Software Engineering (SWE)**: Generalist programming and system design
- **Machine Learning/AI**: Algorithms, data processing, model deployment
- **Data Science**: Statistics, data analysis, visualization

## Development Guidelines

### Frontend Patterns
- **Component Structure**: Use functional components with TypeScript
- **Styling**: Tailwind CSS classes, Shadcn/UI components
- **State Management**: React hooks (useState, useEffect)
- **Graph Components**: React Flow with custom node types
- **File Organization**: Feature-based structure under `/src/app/`

### Naming Conventions
- **Components**: PascalCase (e.g., `CareerPathGraph.tsx`)
- **Files**: kebab-case for pages, camelCase for components
- **Types**: PascalCase interfaces, camelCase properties
- **IDs**: kebab-case (e.g., `"cse-030"`, `"tier-1"`)

### Code Style
- **Imports**: Group by type (React, external libs, internal components)
- **Types**: Define interfaces in `/types/` directory
- **Comments**: JSDoc for components, inline for complex logic
- **Error Handling**: Try/catch blocks, proper TypeScript error types

## Common Development Tasks

### Adding New Career Paths
1. Create data directory: `careers/{career}/data/`
2. Add `careerPathConfig.ts` with root label, categories, and course references
3. Create `tierCourses.ts` with detailed course information
4. Add component: `careers/{career}/components/CareerPathGraph.tsx`
5. Update sidebar in `DegreesSidebar.tsx`

### Adding New Courses
1. Add to `courses.ts` with proper prerequisites
2. Update career path `tierCourses.ts` if relevant
3. Test prerequisite graph visualization

### Backend API Development
1. Define Pydantic models in `app/models/`
2. Create API routes in `app/api/`
3. Add database queries in `app/db/`
4. Update frontend to use API endpoints

### Graph Customization
- **Node Types**: Custom components for root, tier, and course nodes
- **Layout**: Automatic positioning with manual override capability
- **Interactions**: Click handlers for expansion, modal details, drag positioning

## Current Limitations & TODOs

### High Priority
- Backend API implementation (currently skeleton only)
- Database integration with Supabase
- Dynamic data loading (replace static files)

### Medium Priority
- User authentication and personalization
- Roadmap creation and saving
- Additional degree programs beyond CS/CSE

### Future Features
- Alumni networking platform
- Resume builder for CS/CSE students
- Course enrollment tracking
- Career outcome analytics

## GitHub Copilot Assistance Guidelines

When suggesting code:

1. **Follow Existing Patterns**: Match the established architecture and naming conventions
2. **Type Safety**: Always include proper TypeScript types and interfaces
3. **Component Structure**: Use the established component patterns with proper props interfaces
4. **Graph Logic**: Understand React Flow patterns for node/edge management
5. **Data Flow**: Recognize static data vs. planned API integration
6. **Error Handling**: Include appropriate error boundaries and loading states
7. **Accessibility**: Consider ARIA labels and keyboard navigation

## Project Context for Copilot

- **Audience**: UC Merced students (undergraduate focus)
- **Purpose**: Academic planning and career guidance
- **Tone**: Educational, encouraging, professional
- **Design**: Clean, modern, accessible interface
- **Performance**: Optimize for smooth graph interactions
- **Scalability**: Design for multiple degrees and career paths

This platform helps students visualize their academic journey and make informed decisions about their future careers in tech and engineering fields.
```

---
applyTo: '**'
---


WHENEVER I USE THE --C7 FLAG OR --CONTEXT7 GET RELEVANT DOCS USING UR MCP CONTEXT7 TOOL 
ADN FETCH INFORMATION THAT IS NEEDED

WHENEVER I USE THE --SEQ USE UR SEQUENTIAL THINKING MCP SERVER AND THINK THROUGH THE TASK
AT HAND FOR ME AND REASON
