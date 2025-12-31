# Career Paths

This directory contains career-specific data and components for each career path within the CS/CSE degree program.

## Structure

Each career path has its own directory with:
- `data/` - Career-specific course recommendations, skills, and information
  - `tierCourses.ts` - Course data organized by tiers with descriptions
  - `careerPathConfig.ts` - Configuration object for the career path graph
- `components/` - Career-specific React components (optional, rarely needed)

## Current Career Paths

- `swe/` - Software Engineering (Generalist) ✅ **Complete with interactive graph**
- `cybersecurity/` - Cybersecurity ✅ **Complete with interactive graph**
- `ml-ai/` - Machine Learning / AI ✅ **Complete with interactive graph**
- `datascience/` - Data Science / Data Analytics ✅ **Complete with interactive graph**
- `systems/` - Systems / Infrastructure Engineering Pathway (Coming soon)
- `embedded/` - Embedded Systems Engineering Pathway (Coming soon)

### Documentation Available

Each completed career path includes:
- **Interactive Career Path Graph**: Visual tier-based course recommendations
- **Comprehensive README**: Career overview, course details, skills, resources
- **Tier System**: Courses organized by importance (Tier 1: Must-Take, Tier 2: Boosters, Tier 3: Optional)

**Completed**: SWE, Cybersecurity, ML/AI, Data Science  
**In Progress**: Systems, Embedded

## Config-Driven Architecture

**Important**: Career path graphs use a **config-driven architecture**. The `CareerPathGraph` component is generic and reusable - you just provide a configuration object.

### Standard File Structure

```
cs-cse/
└── careers/
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

1. Create a new directory: `cs-cse/careers/[career-id]/`
2. Add `data/` subdirectory
3. Create `tierCourses.ts` with course data (see SWE example)
4. Create `careerPathConfig.ts` with configuration (see SWE example)
5. Import and use in `DegreesContent.tsx`:
   ```typescript
   import CareerPathGraph from "../cs-cse/careers/[career-id]/components/CareerPathGraph";
   
   // Set up refs and handlers (same pattern as SWE)
   const resetCareerPathGraphRef = useRef<(() => void) | null>(null);
   const formatCareerPathGraphRef = useRef<(() => void) | null>(null);
   
   <CareerPathGraph 
     onResetReady={handleResetCareerPathReady.current}
     onFormatReady={handleFormatCareerPathReady.current}
   />
   ```
   
   Note: The component reads the config automatically from `careerPathConfig.ts` in the same directory.

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
- **Tier Expansion**: Click tier nodes to expand/collapse and show their courses
- **Course Expansion**: Click any course node to open an expanded card with detailed information
  - Shows course name, description, and optional expanded details (credits, prerequisites, learning outcomes, topics, career relevance, additional notes)
  - Close via X button, clicking outside, or pressing Escape key
- **Draggable Nodes**: All nodes can be repositioned by dragging - positions are saved automatically
- **Format Graph**: Button that automatically repositions all nodes with wider spacing to prevent overlap
  - Increases tier spacing from 400px to 600px
  - Reduces courses per row from 3 to 2
  - Increases course spacing from 220px to 300px
  - Increases row spacing from 100px to 120px
- **Reset Graph**: Button that fully resets the graph to initial state (collapses all tiers, closes course cards, clears positions)



