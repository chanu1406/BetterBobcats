# Career Path Graph Structure Guide

This guide explains how to create career path graph visualizations using the reusable, config-driven `CareerPathGraph` component.

## Overview

The career path graph is an interactive visualization that shows:
- **Root Node**: The career path name (e.g., "SWE", "Cybersecurity")
- **Category/Tier Nodes**: Organized tiers or categories (e.g., "TIER 1: MUST-TAKE", "TIER 2: BOOSTERS")
- **Course Nodes**: Individual recommended courses with expandable descriptions
- **Edges**: Arrows connecting root → categories → courses

## Key Design Principle: Config-Driven Architecture

The `CareerPathGraph` component is **completely generic and reusable**. It accepts a `CareerPathConfig` object that defines:
- What the root node says
- What categories/tiers exist
- What courses belong to each tier
- Course descriptions and optional resources

This means **one component works for all career paths** - you just provide different config files.

## File Structure

```
degrees/
├── components/
│   └── CareerPathGraph.tsx  # Shared, reusable component (generic)
├── careers/
│   └── [career-id]/
│       └── data/
│           ├── tierCourses.ts        # Course data with descriptions
│           └── careerPathConfig.ts  # Configuration object
└── types/
    └── careerPath.ts  # Shared types (TierCourse, CareerPathConfig, etc.)
```

## Step 1: Create Shared Types

The types are already defined in `src/types/careerPath.ts`. You'll use:
- `TierCourse` - For individual courses with descriptions
- `CareerPathCategory` - For tier/category definitions
- `CareerPathConfig` - The main configuration object

## Step 2: Define Course Data

### File: `careers/[career-id]/data/tierCourses.ts`

Create course data organized by tiers:

```typescript
import { TierCourse } from "@/types/careerPath";

export const tier1Courses: TierCourse[] = [
  {
    id: "cse-120",
    code: "CSE 120",
    name: "Software Engineering",
    fullName: "CSE 120: Software Engineering",
    description: "Team-based dev, SDLC, Git, real projects — *non-negotiable*",
    tier: 1,
    resources: [], // Optional: future bullet points
  },
  // ... more tier 1 courses
];

export const tier2Courses: TierCourse[] = [
  // Tier 2 courses
];

export const tier3Courses: TierCourse[] = [
  // Tier 3 courses
];
```

### TierCourse Interface

```typescript
interface TierCourse {
  id: string;              // Unique identifier (kebab-case)
  code: string;            // Course code (e.g., "CSE 120")
  name: string;            // Short name
  fullName: string;        // Full display name
  description: string;     // Why it's critical for this career path
  resources?: string[];    // Optional: future resources list
  tier: number;            // Tier number (1, 2, 3, etc.)
}
```

## Step 3: Create Configuration File

### File: `careers/[career-id]/data/careerPathConfig.ts`

This is the **key file** that tells the component what to display:

```typescript
import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";

export const [careerId]CareerPathConfig: CareerPathConfig = {
  // Root node label
  rootLabel: "SWE", // or "Cybersecurity", "ML/AI", etc.
  
  // Define categories/tiers
  categories: [
    { 
      id: "tier-1", 
      label: "TIER 1: MUST-TAKE for SWE", 
      emoji: "🟢" // Optional
    },
    { 
      id: "tier-2", 
      label: "TIER 2: STRONG SWE BOOSTERS", 
      emoji: "🟡" 
    },
    { 
      id: "tier-3", 
      label: "TIER 3: SWE-ADJACENT (Optional / Interest-Based)", 
      emoji: "🟠" 
    },
  ],
  
  // All courses for this career path
  courses: [...tier1Courses, ...tier2Courses, ...tier3Courses],
  
  // Optional: Intro text for categories
  categoryIntros: {
    "tier-1": "These are the **highest ROI courses** for SWE jobs...",
  },
};
```

### Important Notes:

1. **Category IDs must match tier numbers**: If you use `"tier-1"`, courses must have `tier: 1`
2. **Flexible tier structure**: You can have 2, 3, 4, or any number of tiers
3. **Emoji is optional**: Categories work fine without emojis
4. **Category intros are optional**: Only include if you want intro text

## Step 4: Use the Component

### File: `components/DegreesContent.tsx`

```typescript
import CareerPathGraph from "./CareerPathGraph";
import { sweCareerPathConfig } from "../careers/swe/data/careerPathConfig";

// In your component:
if (selectedCareerPath === "swe") {
  return (
    <div>
      {/* ... header content ... */}
      <CareerPathGraph 
        config={sweCareerPathConfig}
        useFormattedLayoutExternal={useFormattedLayout}
        onLayoutChange={setUseFormattedLayout}
      />
    </div>
  );
}
```

## Step 5: How It Works

### Component Behavior:

1. **Root Node**: Displays `config.rootLabel`
2. **Category Nodes**: Creates nodes from `config.categories`
3. **Course Expansion**: When a category is clicked, shows courses with matching `tier`
4. **Course Details**: When a course is clicked, expands to show `description` and optional `resources`

### Course Node States:

- **Collapsed**: Shows only course name (compact)
- **Expanded**: Shows course name + description + resources (if any)

## Example: Adding a New Career Path

### 1. Create Directory Structure

```
careers/
└── cybersecurity/
    └── data/
        ├── tierCourses.ts
        └── careerPathConfig.ts
```

### 2. Define Courses

```typescript
// careers/cybersecurity/data/tierCourses.ts
export const tier1Courses: TierCourse[] = [
  {
    id: "cse-140",
    code: "CSE 140",
    name: "Network Security",
    fullName: "CSE 140: Network Security",
    description: "Fundamentals of securing network infrastructure",
    tier: 1,
  },
  // ... more courses
];
```

### 3. Create Config

```typescript
// careers/cybersecurity/data/careerPathConfig.ts
export const cybersecurityCareerPathConfig: CareerPathConfig = {
  rootLabel: "Cybersecurity",
  categories: [
    { id: "tier-1", label: "TIER 1: ESSENTIAL SECURITY", emoji: "🔒" },
    { id: "tier-2", label: "TIER 2: ADVANCED SECURITY", emoji: "🛡️" },
  ],
  courses: [...tier1Courses, ...tier2Courses],
};
```

### 4. Use in DegreesContent

```typescript
import { cybersecurityCareerPathConfig } from "../careers/cybersecurity/data/careerPathConfig";

if (selectedCareerPath === "cybersecurity") {
  return (
    <CareerPathGraph config={cybersecurityCareerPathConfig} />
  );
}
```

## Customization Options

### Different Tier Structures

You're not limited to 3 tiers:

```typescript
// Example: 2-tier structure
categories: [
  { id: "tier-1", label: "ESSENTIAL", emoji: "⭐" },
  { id: "tier-2", label: "RECOMMENDED", emoji: "💡" },
]

// Example: 4-tier structure
categories: [
  { id: "tier-1", label: "CORE", emoji: "🟢" },
  { id: "tier-2", label: "IMPORTANT", emoji: "🟡" },
  { id: "tier-3", label: "BENEFICIAL", emoji: "🟠" },
  { id: "tier-4", label: "OPTIONAL", emoji: "⚪" },
]
```

### Category Naming

Categories don't have to be "tier-X". You can use any ID:

```typescript
categories: [
  { id: "core-skills", label: "Core Skills", emoji: "🎯" },
  { id: "advanced-topics", label: "Advanced Topics", emoji: "🚀" },
]

// Then in tierCourses.ts, use matching identifiers:
courses: [
  { id: "cse-120", tier: "core-skills", ... }, // Note: tier would need to be string
]
```

**Note**: The current implementation expects numeric tiers. For non-tier structures, you'd need to modify the filtering logic in `CareerPathGraph.tsx`.

## Best Practices

1. **Consistent Naming**: Use kebab-case for IDs (`tier-1`, not `tier_1`)
2. **Clear Descriptions**: Make descriptions concise but informative
3. **Organize by Tier**: Keep tier courses in separate arrays for clarity
4. **Type Safety**: Always import types from `@/types/careerPath`
5. **Reusability**: Remember - the component is generic, only config changes

## Troubleshooting

### Courses Don't Appear
- Check that category ID matches tier number (e.g., `"tier-1"` → `tier: 1`)
- Verify category is expanded (click the category node)
- Ensure courses are included in `config.courses` array

### Wrong Courses Showing
- Verify `tier` property matches category ID pattern
- Check that courses are filtered correctly in the component

### Layout Issues
- Use "Format Layout (No Overlap)" button
- Adjust spacing in `getLayoutedElements` if needed

## Related Documentation

- See `GRAPH_STRUCTURE_GUIDE.md` for prerequisite graph structure
- See `DEGREES_PAGE.md` for overall page structure
- See `careers/README.md` for career path organization


