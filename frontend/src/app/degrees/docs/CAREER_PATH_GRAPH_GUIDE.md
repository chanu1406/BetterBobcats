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
├── cs-cse/
│   └── careers/
│       └── [career-id]/
│           └── data/
│               ├── tierCourses.ts        # Course data with descriptions
│               └── careerPathConfig.ts  # Configuration object
└── types/
    └── careerPath.ts  # Shared types (TierCourse, CareerPathConfig, etc.)
```

## Step 1: Create Shared Types

The types are already defined in `src/types/careerPath.ts`. You'll use:
- `TierCourse` - For individual courses with descriptions
- `CareerPathCategory` - For tier/category definitions
- `CareerPathConfig` - The main configuration object

## Step 2: Define Course Data

### File: `cs-cse/careers/[career-id]/data/tierCourses.ts`

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
    expandedInfo: { // Optional: detailed information for expanded course card
      credits: 4,
      prerequisites: "CSE 30 or equivalent programming experience",
      learningOutcomes: [
        "Understand software development lifecycle",
        "Work effectively in teams",
        "Use version control systems",
      ],
      topics: [
        "Agile methodologies",
        "Git and version control",
        "Code reviews",
        "Testing strategies",
      ],
      careerRelevance: "Essential for all software engineering roles. Builds foundational skills in collaboration and professional development practices.",
      realWorldApplications: [
        "Working in teams at companies like Google, Microsoft, or startups",
        "Using Git/GitHub for version control in professional codebases",
        "Following agile/scrum methodologies in real product development",
      ],
      resources: {
        videos: [
          "https://youtube.com/watch?v=HkdAHXoRtos",  // Git tutorial
          "https://youtube.com/watch?v=Z9QbYZh1YXY",  // Agile overview
        ],
        websites: [
          "https://git-scm.com/doc",  // Official Git documentation
          "https://www.atlassian.com/agile",  // Agile guide
        ],
        tools: ["Git", "GitHub", "Jira", "Slack"],  // Software/tools used
      },
      additionalNotes: "This course provides hands-on experience with real-world software development workflows.",
    },
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

### Understanding expandedInfo Fields

When adding `expandedInfo` to courses, here's what each field should contain:

- **`credits`** (number): Number of credits/units for the course
  - Example: `4`

- **`prerequisites`** (string): Human-readable prerequisites
  - Example: `"CSE 30 or equivalent programming experience"`

- **`learningOutcomes`** (array of strings): What students will learn or be able to do
  - Example: `["Work effectively in teams", "Use Git professionally", "Understand SDLC"]`
  - Each item should be a clear, actionable learning goal

- **`topics`** (array of strings): Topics covered in the course
  - Example: `["Agile methodologies", "Git and version control", "Code reviews"]`
  - List the main topics/subjects covered

- **`careerRelevance`** (string): Why this course matters for the career path
  - Example: `"Essential for all software engineering roles. Builds foundational skills..."`
  - Should be 1-3 sentences explaining the career connection

- **`realWorldApplications`** (array of strings): Examples of how this is used in industry
  - Example: `["Working in teams at Google/Microsoft", "Using Git in professional codebases"]`
  - Each item should be a specific, real-world use case or scenario

- **`resources.videos`** (array of strings): YouTube links, video tutorials, online courses
  - Example: `["https://youtube.com/watch?v=HkdAHXoRtos", "https://coursera.org/learn/..."]`
  - Full URLs to video content

- **`resources.websites`** (array of strings): Documentation, articles, official sites
  - Example: `["https://git-scm.com/doc", "https://github.com/"]`
  - Full URLs to helpful websites

- **`resources.tools`** (array of strings): Software, tools, platforms used
  - Example: `["Git", "GitHub", "Jira", "Slack"]`
  - Just the tool names (not URLs)

- **`additionalNotes`** (string): Any additional information
  - Example: `"This course provides hands-on experience with real-world workflows."`
  - Optional extra context

### TierCourse Interface

```typescript
interface TierCourse {
  id: string;              // Unique identifier (kebab-case)
  code: string;            // Course code (e.g., "CSE 120")
  name: string;            // Short name
  fullName: string;        // Full display name
  description: string;     // Why it's critical for this career path
  resources?: string[];    // Optional: future resources list (legacy field)
  tier: number;            // Tier number (1, 2, 3, etc.)
  prerequisites?: string[]; // Optional: array of course IDs that this course requires
  expandedInfo?: {         // Optional: detailed information shown in expanded course card
    credits?: number;      // Number of credits/units (e.g., 4)
    prerequisites?: string; // Human-readable prerequisites (e.g., "CSE 30 or equivalent")
    learningOutcomes?: string[]; // What you'll learn - array of strings
      // Example: ["Work effectively in teams", "Use Git professionally"]
    topics?: string[]; // Topics covered - array of strings
      // Example: ["Agile methodologies", "Git and version control"]
    careerRelevance?: string; // How it relates to the career path - single paragraph
      // Example: "Essential for all software engineering roles..."
    realWorldApplications?: string[]; // Examples of industry use - array of strings
      // Example: ["Working in teams at Google/Microsoft", "Using Git in professional codebases"]
    resources?: {          // Learning resources with links
      videos?: string[];   // YouTube links, video tutorials - array of URLs
        // Example: ["https://youtube.com/watch?v=...", "https://coursera.org/..."]
      websites?: string[]; // Documentation, articles, official sites - array of URLs
        // Example: ["https://git-scm.com/doc", "https://github.com/"]
      tools?: string[];     // Software, tools, platforms used - array of tool names
        // Example: ["Git", "GitHub", "Jira", "Slack"]
    };
    additionalNotes?: string; // Any additional information - single paragraph
  };
}
```

## Step 3: Create Configuration File

### File: `cs-cse/careers/[career-id]/data/careerPathConfig.ts`

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

The `CareerPathGraph` component is used directly in the `DegreesContent` component. It requires callbacks for reset and format functionality:

```typescript
import CareerPathGraph from "../cs-cse/careers/swe/components/CareerPathGraph";

// In your component:
const resetCareerPathGraphRef = useRef<(() => void) | null>(null);
const formatCareerPathGraphRef = useRef<(() => void) | null>(null);
const [resetCareerPathReady, setResetCareerPathReady] = useState(false);
const [formatCareerPathReady, setFormatCareerPathReady] = useState(false);

const handleResetCareerPathReady = useRef((handler: () => void) => {
  resetCareerPathGraphRef.current = handler;
  requestAnimationFrame(() => {
    setResetCareerPathReady(true);
  });
});

const handleFormatCareerPathReady = useRef((handler: () => void) => {
  formatCareerPathGraphRef.current = handler;
  requestAnimationFrame(() => {
    setFormatCareerPathReady(true);
  });
});

if (selectedCareerPath === "swe") {
  return (
    <div>
      {/* ... header content ... */}
      
      {/* Format and Reset buttons */}
      <div className="mb-6 flex justify-end gap-3">
        <button
          onClick={() => {
            if (formatCareerPathReady && formatCareerPathGraphRef.current) {
              formatCareerPathGraphRef.current();
            }
          }}
          className="..."
        >
          Format Graph
        </button>
        <button
          onClick={() => {
            if (resetCareerPathReady && resetCareerPathGraphRef.current) {
              resetCareerPathGraphRef.current();
            }
          }}
          className="..."
        >
          Reset Graph
        </button>
      </div>
      
      <CareerPathGraph 
        onResetReady={handleResetCareerPathReady.current}
        onFormatReady={handleFormatCareerPathReady.current}
      />
    </div>
  );
}
```

## Step 5: How It Works

### Component Behavior:

1. **Root Node**: Displays the career path name (e.g., "SWE") - configured via `careerPathConfig.rootLabel`
2. **Tier/Category Nodes**: Creates nodes from `config.categories` - circular nodes with emoji indicators
3. **Course Expansion**: When a tier node is clicked, shows courses with matching `tier` number below it
4. **Draggable Nodes**: All nodes can be dragged to reposition them on the graph
5. **Format Graph Button**: Repositions all nodes with increased spacing to prevent overlap:
   - Increases tier spacing from 400px to 600px
   - Reduces courses per row from 3 to 2
   - Increases course spacing from 220px to 300px
   - Increases row spacing from 100px to 120px
6. **Reset Graph Button**: Fully resets the graph:
   - Collapses all expanded tiers
   - Clears all saved node positions
   - Returns to initial unopened state

### Node Structure:

- **Root Node**: Large circular node with primary color styling
- **Tier Nodes**: Medium circular nodes with dashed borders (collapsed) or solid borders (expanded)
- **Course Nodes**: Rectangular cards displaying course code and name (clickable to expand)

### Course Expansion Feature:

When you click on a course node, an expanded card overlay appears showing:
- **Class Name**: Full course name at the top
- **Description**: Why the course matters for this career path
- **Expanded Information** (if provided):
  - Credits (units)
  - Prerequisites (human-readable)
  - Learning Outcomes
  - Topics Covered
  - Career Relevance
  - Real World Applications (examples of industry use)
  - Resources (videos, websites, tools with clickable links)
  - Additional Notes

**Closing the Card**: 
- Click the X button in the top-right corner
- Click outside the card (on the backdrop)
- Press the Escape key

### Interactive Features:

- **Tier Expansion**: Click tier nodes to expand/collapse and show their courses
- **Course Expansion**: Click any course node to open an expanded card with detailed information
- **Node Dragging**: Click and drag any node to reposition it. Positions are saved automatically.
- **Format Graph**: Click to automatically reposition all nodes with wider spacing to prevent overlap
- **Reset Graph**: Click to fully reset the graph to its initial state (collapses all tiers, closes course cards, clears positions)

## Example: Adding a New Career Path

### 1. Create Directory Structure

```
cs-cse/
└── careers/
    └── cybersecurity/
        └── data/
            ├── tierCourses.ts
            └── careerPathConfig.ts
```

### 2. Define Courses

```typescript
// cs-cse/careers/cybersecurity/data/tierCourses.ts
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
// cs-cse/careers/cybersecurity/data/careerPathConfig.ts
export const cybersecurityCareerPathConfig: CareerPathConfig = {
  rootLabel: "Cybersecurity",
  categories: [
    { id: "tier-1", label: "TIER 1: ESSENTIAL SECURITY", emoji: "🔒" },
    { id: "tier-2", label: "TIER 2: ADVANCED SECURITY", emoji: "🛡️" },
  ],
  courses: [...tier1Courses, ...tier2Courses],
};
```

### 4. Create Component File

The `CareerPathGraph` component is shared and reused across all career paths. Each career path should have its own component file that imports the shared component, but currently all career paths use the same component directly.

**File**: `cs-cse/careers/[career-id]/components/CareerPathGraph.tsx`

For new career paths, you can either:
- Reuse the existing SWE component (it's config-driven, so it works for all)
- Copy the component and customize if needed

### 5. Use in DegreesContent

```typescript
import CareerPathGraph from "../cs-cse/careers/cybersecurity/components/CareerPathGraph";

// Set up refs and handlers (same pattern as SWE)
const resetCareerPathGraphRef = useRef<(() => void) | null>(null);
const formatCareerPathGraphRef = useRef<(() => void) | null>(null);

if (selectedCareerPath === "cybersecurity") {
  return (
    <div>
      {/* Format and Reset buttons */}
      <div className="mb-6 flex justify-end gap-3">
        <button onClick={() => formatCareerPathGraphRef.current?.()}>
          Format Graph
        </button>
        <button onClick={() => resetCareerPathGraphRef.current?.()}>
          Reset Graph
        </button>
      </div>
      
      <CareerPathGraph 
        onResetReady={handleResetCareerPathReady.current}
        onFormatReady={handleFormatCareerPathReady.current}
      />
    </div>
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
6. **Expanded Info**: Include `expandedInfo` for better user experience. Recommended minimum fields:
   - `credits` - Number of credits/units
   - `careerRelevance` - Why this course matters for the career
   - `realWorldApplications` - Examples of industry/real-world use (array)
   - `learningOutcomes` - What students will learn (array)
   - `resources` - Videos, websites, and tools with clickable links
7. **Resources Format**: Use the structured `resources` object with `videos`, `websites`, and `tools` arrays for better organization

## Troubleshooting

### Courses Don't Appear
- Check that category ID matches tier number (e.g., `"tier-1"` → `tier: 1`)
- Verify category is expanded (click the category node)
- Ensure courses are included in `config.courses` array

### Wrong Courses Showing
- Verify `tier` property matches category ID pattern
- Check that courses are filtered correctly in the component

### Layout Issues
- Use "Format Graph" button to automatically reposition nodes with wider spacing to prevent overlap
- Use "Reset Graph" button to fully reset the graph (collapses all tiers, clears positions, returns to initial state)
- Nodes are automatically positioned - if overlap occurs after expanding tiers, click "Format Graph" again
- Spacing values are defined in the `useMemo` calculation: `tierSpacing`, `courseSpacing`, `rowSpacing`, `coursesPerRow`

## Related Documentation

- See `GRAPH_STRUCTURE_GUIDE.md` for prerequisite graph structure
- See `DEGREES_PAGE.md` for overall page structure
- See `cs-cse/careers/README.md` for career path organization


