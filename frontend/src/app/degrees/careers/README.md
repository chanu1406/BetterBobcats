# Career Paths

This directory contains career-specific data and components for each career path within the CS/CSE degree program.

## Structure

Each career path has its own directory with:
- `data/` - Career-specific course recommendations, skills, and information
  - `tierCourses.ts` - Course data organized by tiers with descriptions
  - `careerPathConfig.ts` - Configuration object for the career path graph
- `components/` - Career-specific React components (optional, rarely needed)

## Current Career Paths

- `swe/` - Software Engineering (Generalist)
- `cybersecurity/` - Cybersecurity
- `ml-ai/` - Machine Learning / AI
- `data-science/` - Data Science / Data Analytics
- `systems/` - Systems / Infrastructure Engineering Pathway
- `embedded/` - Embedded Systems Engineering Pathway

## Config-Driven Architecture

**Important**: Career path graphs use a **config-driven architecture**. The `CareerPathGraph` component is generic and reusable - you just provide a configuration object.

### Standard File Structure

```
careers/
└── [career-id]/
    └── data/
        ├── tierCourses.ts        # Course data with descriptions
        └── careerPathConfig.ts   # Configuration object
```

### Required Files

1. **`tierCourses.ts`**: Defines courses organized by tiers
   ```typescript
   export const tier1Courses: TierCourse[] = [...];
   export const tier2Courses: TierCourse[] = [...];
   ```

2. **`careerPathConfig.ts`**: Main configuration object
   ```typescript
   export const [careerId]CareerPathConfig: CareerPathConfig = {
     rootLabel: "...",
     categories: [...],
     courses: [...],
   };
   ```

## Adding a New Career Path

1. Create a new directory: `careers/[career-id]/`
2. Add `data/` subdirectory
3. Create `tierCourses.ts` with course data (see SWE example)
4. Create `careerPathConfig.ts` with configuration (see SWE example)
5. Import and use in `DegreesContent.tsx`:
   ```typescript
   import { [careerId]CareerPathConfig } from "../careers/[career-id]/data/careerPathConfig";
   import CareerPathGraph from "./CareerPathGraph";
   
   <CareerPathGraph config={[careerId]CareerPathConfig} />
   ```

## Documentation

For detailed instructions, see:
- **`docs/CAREER_PATH_GRAPH_GUIDE.md`** - Complete guide for creating career path graphs
- **`src/types/careerPath.ts`** - Type definitions

## Key Principles

1. **One Component, Many Configs**: The `CareerPathGraph` component is shared and reusable
2. **Data-Driven**: All structure comes from config files, not hardcoded logic
3. **Type-Safe**: Use TypeScript types from `@/types/careerPath`
4. **Flexible**: Each career can have different tier structures and course organization

## Interactive Features

All career path graphs include:
- **Draggable Nodes**: All nodes can be repositioned by dragging
- **Format Layout**: Toggle between compact and formatted layouts to prevent overlaps
- **Reset Positions**: Button to restore nodes to default layout positions
- **Reset Graph**: Button to fully reset the graph (positions, expanded nodes, layout format)



