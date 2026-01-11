# Complete Guide: Building Career Path Graphs for New Careers

## 🎯 Purpose of This Guide

This guide provides **extremely detailed, step-by-step instructions** for creating a new career path graph visualization. It is designed to be comprehensive enough that LLMs and developers can follow it without needing to reference the SWE implementation or ask clarifying questions.

**IMPORTANT**: The SWE career path (`swe/`) serves as the reference implementation. **DO NOT MODIFY** any files in the `swe/` directory when creating a new career path.

---

## 📋 Table of Contents

1. [Overview and Architecture](#overview-and-architecture)
2. [Files You Will Create](#files-you-will-create)
3. [Files You Will Modify](#files-you-will-modify)
4. [Files You MUST NOT Touch](#files-you-must-not-touch)
5. [Step-by-Step Implementation](#step-by-step-implementation)
6. [Code Templates](#code-templates)
7. [Integration Steps](#integration-steps)
8. [Common Issues and Solutions](#common-issues-and-solutions)
9. [Rules and Best Practices](#rules-and-best-practices)
10. [Testing Checklist](#testing-checklist)

---

## 🏗️ Overview and Architecture

### What You're Building

A career path graph is an interactive visualization that shows:
- **Root Node**: The career path name (e.g., "Cybersecurity", "ML/AI", "UX/UI Design")
- **Tier Nodes**: Organized tiers/categories (e.g., "TIER 1: MUST-TAKE", "TIER 2: RECOMMENDED")
- **Course Nodes**: Individual recommended courses displayed when tiers are expanded
- **Interactive Features**: Click to expand/collapse tiers, click courses to view details, drag nodes, format layout, reset graph

**IMPORTANT**: Career paths are **NOT timeline-based**. They do **NOT** include:
- ❌ Year recommendations (no "Year 1", "Year 2", etc.)
- ❌ Semester recommendations (no "Fall", "Spring")
- ❌ Course sequencing by academic year

Career paths are **tier-based charts** that organize courses by **importance/priority** (TIER 1 = most important, TIER 2 = recommended, etc.), not by when to take them. They show **which courses are recommended** for a career path, not **when** to take them.

### How It Works

The system uses a **config-driven architecture**:
1. You create data files (`tierCourses.ts`, `careerPathConfig.ts`)
2. You copy the component file from SWE (reference implementation) and update the import path
3. The component automatically reads your config and displays the graph
4. No code changes needed in the component itself (only the import path)

### File Structure Overview

**IMPORTANT**: Career paths can be created for **ANY degree**, not just CS/CSE. The structure is the same for all degrees:

```
degrees/
├── [degree-id]/              # e.g., cs-cse, cogs, biology
│   ├── careers/
│   │   ├── [reference-career]/     ⚠️ DO NOT MODIFY - Reference only
│   │   │   ├── components/
│   │   │   │   └── CareerPathGraph.tsx
│   │   │   └── data/
│   │   │       ├── tierCourses.ts
│   │   │       ├── careerPathConfig.ts
│   │   │       └── index.ts
│   │   │
│   │   └── [your-career-id]/      ✅ CREATE THIS
│   │       ├── components/
│   │       │   └── CareerPathGraph.tsx   (copy from reference career)
│   │       └── data/
│   │           ├── tierCourses.ts         (create new)
│   │           ├── careerPathConfig.ts    (create new)
│   │           └── index.ts               (create new)
│   │
│   └── components/           # Degree-specific components (prerequisite graphs, etc.)
│
└── components/               # Shared across all degrees
    └── DegreesContent.tsx    ⚠️ MODIFY - Add your career path
```

**Examples**:
- **CS/CSE careers**: `degrees/cs-cse/careers/[career-id]/` (reference: `swe/`)
- **COGS careers**: `degrees/cogs/careers/[career-id]/` (reference: `ux-ui/` or any existing COGS career)
- **Other degrees**: `degrees/[degree-id]/careers/[career-id]/` (reference: use SWE from CS/CSE or any existing career)

**Note**: For CS/CSE, use `swe/` as the reference. For other degrees, you can use any existing career path from any degree as a reference (SWE from CS/CSE is a good default choice).

---

## 📁 Files You Will Create

When creating a new career path, you will create the following files:

### Required Files

**File Path Pattern**: `degrees/[degree-id]/careers/[career-id]/`

1. **`degrees/[degree-id]/careers/[career-id]/components/CareerPathGraph.tsx`**
   - Copy from a reference career (e.g., `cs-cse/careers/swe/components/CareerPathGraph.tsx` for CS/CSE)
   - Only change the import path for the config
   - For CS/CSE: Copy from `swe/components/CareerPathGraph.tsx`
   - For COGS: Copy from any existing COGS career (e.g., `ux-ui/components/CareerPathGraph.tsx`) or use SWE as reference
   - For other degrees: Use SWE from CS/CSE as reference, or any existing career

2. **`degrees/[degree-id]/careers/[career-id]/data/tierCourses.ts`**
   - New file with your course data
   - Organized by tiers (tier1Courses, tier2Courses, etc.)

3. **`degrees/[degree-id]/careers/[career-id]/data/careerPathConfig.ts`**
   - New file with your configuration
   - Defines root label, categories, and combines all courses

4. **`degrees/[degree-id]/careers/[career-id]/data/index.ts`**
   - New file that exports your config and courses
   - Simple re-export file

**Examples**:
- CS/CSE career: `degrees/cs-cse/careers/cybersecurity/...`
- COGS career: `degrees/cogs/careers/ux-ui/...`
- Future degree: `degrees/biology/careers/research/...`

---

## 📝 Files You Will Modify

### Single File to Modify

**`degrees/components/DegreesContent.tsx`** (shared file for all degrees)

You will add a new conditional block for your career path, following the exact pattern used for existing careers.

**Location**: 
- For CS/CSE careers: Around line 180-230 (after the SWE section)
- For COGS careers: Around line 600-900 (in the COGS career path sections)
- For other degrees: Add in the appropriate section for that degree

**Note**: This is a shared file used by all degrees. Be careful to add your career path in the correct degree section.

---

## ⛔ Files You MUST NOT Touch

**NEVER modify these files** when creating a new career path:

1. ❌ Reference career directories - **DO NOT MODIFY** (e.g., `cs-cse/careers/swe/`, `cogs/careers/ux-ui/`)
   - These serve as reference implementations only
   - For CS/CSE: Use `swe/` as reference
   - For COGS: Use any existing COGS career as reference
2. ❌ Prerequisite graph components (e.g., `PrerequisiteGraph.tsx`, `GraphLegend.tsx`)
   - These are for prerequisite graphs, not career path graphs
3. ❌ Course data files for prerequisite graphs (e.g., `degrees/[degree-id]/data/courses.ts`)
   - Different purpose (prerequisite graphs vs career path graphs)
4. ❌ `src/types/careerPath.ts` (Shared types - do not modify unless adding new fields)
5. ❌ Existing career paths (unless you're explicitly updating that specific career)

---

## 🚀 Step-by-Step Implementation

### Placeholder Conventions

Throughout this guide, you'll see placeholders that need to be replaced with your actual values:

- **`[career-id]`** or **`[your-career-id]`**: Your kebab-case career identifier (e.g., `cybersecurity`, `ml-ai`, `data-science`)
  - Used in: directory names, file paths, import paths, conditional checks, root node IDs
  - Format: lowercase letters and hyphens only (e.g., `cybersecurity`, NOT `Cybersecurity` or `cyber_security`)

- **`[CareerName]`**: Your career name in PascalCase (e.g., `Cybersecurity`, `MLAI`, `DataScience`)
  - Used in: React component function names, variable names, TypeScript identifiers
  - Format: PascalCase, no spaces or hyphens (e.g., `Cybersecurity`, NOT `cybersecurity` or `cyber-security`)

- **`[careerId]`**: Your career ID in camelCase (e.g., `cybersecurity`, `mlAi`, `dataScience`)
  - Used in: TypeScript variable names, config export names
  - Format: camelCase (e.g., `cybersecurityCareerPathConfig`, NOT `CybersecurityCareerPathConfig`)

**Example Mapping**:
- Career ID: `cybersecurity` → CareerName: `Cybersecurity` → careerId: `cybersecurity`
- Career ID: `ml-ai` → CareerName: `MLAI` → careerId: `mlAi`
- Career ID: `data-science` → CareerName: `DataScience` → careerId: `dataScience`

**IMPORTANT**: When replacing placeholders:
1. Replace ALL instances of the same placeholder consistently
2. Use the exact same value across all files
3. Check for typos - a single character difference will break the integration

---

### Step 1: Choose Your Career ID and Determine Your Degree

**First, identify which degree this career belongs to:**
- CS/CSE careers: `degrees/cs-cse/careers/[career-id]/`
- COGS careers: `degrees/cogs/careers/[career-id]/`
- Other degrees: `degrees/[degree-id]/careers/[career-id]/`

**Then choose a kebab-case identifier** for your career path. This will be used in:
- Directory name
- File names
- Import paths
- Conditional checks in DegreesContent
- Sidebar navigation (must match `careerPaths` object in `DegreesSidebar.tsx`)

**Examples:**
- CS/CSE: `cybersecurity`, `ml-ai`, `data-science`, `systems-infra`
- COGS: `ux-ui`, `data-analyst`, `market-research`, `human-resources`
- Other degrees: Choose appropriate identifiers for that degree's careers

**Rule**: Use lowercase letters and hyphens only. No underscores, no camelCase, no spaces.

**Important**: Make sure your career ID matches what's defined in `degrees/components/DegreesSidebar.tsx` in the `careerPaths` object for your degree.

---

### Step 2: Create Directory Structure

Create the following directory structure for your degree:

```bash
degrees/[degree-id]/careers/[your-career-id]/
├── components/
└── data/
```

**Examples:**

**CS/CSE career:**
```bash
degrees/cs-cse/careers/cybersecurity/
├── components/
└── data/
```

**COGS career:**
```bash
degrees/cogs/careers/ux-ui/
├── components/
└── data/
```

**Other degree career:**
```bash
degrees/biology/careers/research/
├── components/
└── data/
```

**Do NOT create these directories inside an existing career directory**. Create them as siblings to existing careers in the same degree folder.

**Reference careers** (do not modify):
- CS/CSE: `degrees/cs-cse/careers/swe/` (use as reference)
- COGS: `degrees/cogs/careers/ux-ui/` or any existing COGS career (use as reference)

---

### Step 3: Create tierCourses.ts File

**File Path**: `degrees/[degree-id]/careers/[your-career-id]/data/tierCourses.ts`

This file contains all course recommendations organized by tiers.

**IMPORTANT**: 
- **NO Year/Semester Information**: Career paths do NOT include year or semester recommendations. Courses are organized by **tiers (priority/importance)**, not by when to take them. Do NOT include `year` or `semester` fields - these are only used in prerequisite graphs, not career paths.
- **Course Node IDs**: Course nodes in the graph use the format `course-${course.id}` (e.g., if your course has `id: "cse-120"`, the node ID will be `"course-cse-120"`). This is handled automatically by the component - you don't need to add the prefix yourself.
- **Manual Data Entry**: All course data must be filled out manually. Copy the structure template below for each course and fill in the actual information.

#### File Template Structure

```typescript
/**
 * [Career Name] Tier Courses Data
 * Course recommendations organized by tier for [Career Name] career path
 */

import { TierCourse } from "@/types/careerPath";

/**
 * 🟢 TIER 1: [Tier Description]
 * [Explanation of what makes these Tier 1 courses]
 */
export const tier1Courses: TierCourse[] = [
  // COPY THE STRUCTURE BELOW FOR EACH COURSE - FILL OUT ALL FIELDS MANUALLY
  {
    id: "unique-course-id",           // REQUIRED: Unique kebab-case ID
    code: "CSE XXX",                  // REQUIRED: Course code (e.g., "CSE 120")
    name: "Course Name",              // REQUIRED: Short course name
    fullName: "CSE XXX: Course Name", // REQUIRED: Full display name
    description: "Brief description of why this course matters", // REQUIRED: 1-2 sentences
    tier: 1,                          // REQUIRED: Must match tier number (1, 2, 3, etc.)
    expandedInfo: {                   // OPTIONAL but RECOMMENDED: Detailed info shown when course is clicked
      credits: 4,                     // REQUIRED in expandedInfo: Number of credits/units
      careerRelevance: "1-3 sentences explaining why this course matters for this career path", // REQUIRED in expandedInfo
      realWorldApplications: [        // REQUIRED in expandedInfo: Array of strings with examples
        "Example 1 of industry/real-world use",
        "Example 2 of industry/real-world use",
        "Example 3 of industry/real-world use",
      ],
      learningOutcomes: [             // REQUIRED in expandedInfo: Array of strings
        "What students will learn or be able to do",
        "Another learning outcome",
        "Another learning outcome",
      ],
      topics: [                       // OPTIONAL: Topics covered in the course (array of strings)
        "Topic 1",
        "Topic 2",
        "Topic 3",
      ],
      resources: {                    // OPTIONAL but RECOMMENDED: Learning resources with links
        videos: [                     // Array of YouTube/video URLs
          "https://youtube.com/watch?v=...",
          "https://youtube.com/watch?v=...",
        ],
        websites: [                   // Array of documentation/article URLs
          "https://example.com",
          "https://example.com",
        ],
        tools: [                      // Array of tool/software names (not URLs)
          "Tool Name 1",
          "Tool Name 2",
        ],
      },
      additionalNotes: "Optional additional information", // OPTIONAL: Any extra context
    },
  },
  
  // COPY THE STRUCTURE ABOVE FOR EACH ADDITIONAL COURSE IN THIS TIER
  // Fill out all fields manually for each course
  {
    id: "another-unique-id",
    code: "CSE YYY",
    name: "Another Course Name",
    fullName: "CSE YYY: Another Course Name",
    description: "Description for this course",
    tier: 1,
    expandedInfo: {
      credits: 4,
      careerRelevance: "Why this course matters",
      realWorldApplications: [
        "Real-world example 1",
        "Real-world example 2",
      ],
      learningOutcomes: [
        "Learning outcome 1",
        "Learning outcome 2",
      ],
      // ... fill out remaining fields
    },
  },
  
  // Add more courses by copying the structure and filling in the data...
];

/**
 * 🟡 TIER 2: [Tier Description]
 * [Explanation of what makes these Tier 2 courses]
 */
export const tier2Courses: TierCourse[] = [
  // COPY THE SAME STRUCTURE AS TIER 1 - FILL OUT MANUALLY FOR EACH COURSE
  {
    id: "unique-tier2-course-id",
    code: "CSE YYY",
    name: "Course Name",
    fullName: "CSE YYY: Course Name",
    description: "Brief description",
    tier: 2,                          // Must be 2 for Tier 2
    expandedInfo: {
      credits: 4,
      careerRelevance: "Why this course matters",
      realWorldApplications: [
        "Example 1",
        "Example 2",
      ],
      learningOutcomes: [
        "Outcome 1",
        "Outcome 2",
      ],
      // ... fill out remaining fields
    },
  },
  // Copy structure for more Tier 2 courses...
];

/**
 * 🟠 TIER 3: [Tier Description]
 * [Explanation of what makes these Tier 3 courses]
 */
export const tier3Courses: TierCourse[] = [
  // COPY THE SAME STRUCTURE - FILL OUT MANUALLY FOR EACH COURSE
  {
    id: "unique-tier3-course-id",
    code: "CSE ZZZ",
    name: "Course Name",
    fullName: "CSE ZZZ: Course Name",
    description: "Brief description",
    tier: 3,                          // Must be 3 for Tier 3
    expandedInfo: {
      credits: 4,
      careerRelevance: "Why this course matters",
      realWorldApplications: [
        "Example 1",
        "Example 2",
      ],
      learningOutcomes: [
        "Outcome 1",
        "Outcome 2",
      ],
      // ... fill out remaining fields
    },
  },
  // Copy structure for more Tier 3 courses...
];

// If you need more tiers, add them using the same structure:
// export const tier4Courses: TierCourse[] = [...];
// export const tier5Courses: TierCourse[] = [...];
```

#### Critical Rules for tierCourses.ts

1. **IDs must be unique across ALL career paths**
   - ❌ BAD: `cse-120` (already used in SWE)
   - ✅ GOOD: `cybersecurity-cse-130` or `cse-130-cybersec`

2. **Tier numbers must match category IDs**
   - If you have `tier-1` in config, courses must have `tier: 1`
   - If you have `tier-2` in config, courses must have `tier: 2`
   - **Mismatch = courses won't show up**

3. **All basic fields are required** and must be filled out manually
   - `id`, `code`, `name`, `fullName`, `description`, `tier` are all required - fill with actual data
   - `expandedInfo` is optional but highly recommended - if included, all fields within it must be filled manually with actual information

4. **Use kebab-case for IDs**: `cse-120`, not `cse_120` or `cse120`

5. **Keep descriptions concise**: 1-2 sentences max

6. **Recommended expandedInfo fields** (fill out manually for each course):
   - `credits` (number) - REQUIRED: Number of credits/units (e.g., `4`)
   - `careerRelevance` (string) - REQUIRED: Why this course matters for the career (1-3 sentences, write manually)
   - `realWorldApplications` (array) - REQUIRED: Examples of industry use (array of strings, fill manually, e.g., `["Working at Google/Microsoft", "Using Git professionally"]`)
   - `learningOutcomes` (array) - REQUIRED: What students will learn (array of strings, fill manually, e.g., `["Work in teams", "Use Git professionally"]`)
   - `topics` (array) - OPTIONAL: Topics covered in the course (array of strings, fill manually)
   - `resources` (object) - OPTIONAL but RECOMMENDED: Learning resources (fill manually):
     - `videos` (array of URLs) - YouTube links, tutorials (e.g., `["https://youtube.com/watch?v=..."]`)
     - `websites` (array of URLs) - Documentation, articles (e.g., `["https://git-scm.com/doc"]`)
     - `tools` (array of names) - Software/tools used (e.g., `["Git", "GitHub"]`) - tool names only, not URLs
   - `additionalNotes` (string) - OPTIONAL: Any additional information (fill manually)

**⚠️ REMINDER**: All fields in `expandedInfo` must be filled out manually with actual course information. Do not leave placeholder values.

#### Real Example Reference

For reference, see the actual implementations in:
- `cs-cse/careers/swe/data/tierCourses.ts` - SWE tier courses (reference implementation)
- `cs-cse/careers/cybersecurity/data/tierCourses.ts` - Cybersecurity tier courses
- `cs-cse/careers/ml-ai/data/tierCourses.ts` - ML/AI tier courses

These files show the complete structure with all fields filled out. Use them as examples of what the final data should look like, but **always copy the structure template from this guide and fill in your own data manually**.

**Note**: The examples above show the structure but with placeholder/simplified data. For actual implementations, refer to the real files listed above to see how all fields are filled out with complete information.

---

### Step 4: Create careerPathConfig.ts File

**File Path**: `cs-cse/careers/[your-career-id]/data/careerPathConfig.ts`

This file defines the structure and configuration of your career path graph.

**IMPORTANT**: 
- **For Career Path Graphs**: Use the career name as `rootLabel` (e.g., "SWE", "Cybersecurity", "ML/AI")
- **For Major Prerequisite Graphs**: Use the major name as `rootLabel` (e.g., "COGS", "CS/CSE")

#### File Template

```typescript
/**
 * [Career Name] Career Path Configuration
 * Configures the career path graph visualization for [Career Name]
 */

import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";

export const [careerId]CareerPathConfig: CareerPathConfig = {
  rootLabel: "[Career Name]",  // REQUIRED: What appears in the root node
  categories: [
    {
      id: "tier-1",                    // REQUIRED: Must match tier number pattern
      label: "TIER 1: [Description]",  // REQUIRED: Display label
      emoji: "🟢",                     // OPTIONAL: Emoji indicator
    },
    {
      id: "tier-2",
      label: "TIER 2: [Description]",
      emoji: "🟡",
    },
    {
      id: "tier-3",
      label: "TIER 3: [Description]",
      emoji: "🟠",
    },
    // Add more tiers if needed...
  ],
  courses: [
    ...tier1Courses,
    ...tier2Courses,
    ...tier3Courses,
    // Add more tier arrays if you created them...
  ],
  categoryIntros: {
    "tier-1": "Optional markdown description for Tier 1",
    "tier-2": "Optional markdown description for Tier 2",
    "tier-3": "Optional markdown description for Tier 3",
  },
};
```

#### Critical Rules for careerPathConfig.ts

1. **Export name must be**: `[careerId]CareerPathConfig`
   - Use camelCase for the export name
   - Example: `cybersecurityCareerPathConfig`, `mlAiCareerPathConfig`, `dataScienceCareerPathConfig`

2. **Category IDs must follow pattern**: `"tier-1"`, `"tier-2"`, `"tier-3"`, etc.
   - The number after "tier-" must match the tier number in your courses
   - `"tier-1"` → courses with `tier: 1`
   - `"tier-2"` → courses with `tier: 2`

3. **Import all tier arrays** you created in `tierCourses.ts`

4. **Spread all tier arrays** in the `courses` array

5. **categoryIntros is optional** - you can omit it entirely if not needed

#### Real Example (Cybersecurity)

```typescript
/**
 * Cybersecurity Career Path Configuration
 * Configures the career path graph visualization for Cybersecurity
 */

import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";

export const cybersecurityCareerPathConfig: CareerPathConfig = {
  rootLabel: "Cybersecurity",
  categories: [
    { id: "tier-1", label: "TIER 1: ESSENTIAL SECURITY FOUNDATIONS", emoji: "🟢" },
    { id: "tier-2", label: "TIER 2: ADVANCED SECURITY TOPICS", emoji: "🟡" },
    { id: "tier-3", label: "TIER 3: SECURITY-ADJACENT (Optional)", emoji: "🟠" },
  ],
  courses: [...tier1Courses, ...tier2Courses, ...tier3Courses],
  categoryIntros: {
    "tier-1": "These are the **highest priority courses** for cybersecurity careers. Core security knowledge.",
    "tier-2": "These courses deepen security expertise and make you stand out.",
    "tier-3": "Good if aligned with interests, not required for cybersecurity.",
  },
};
```

---

### Step 5: Create index.ts File

**File Path**: `cs-cse/careers/[your-career-id]/data/index.ts`

Simple re-export file for convenience.

#### File Template

```typescript
/**
 * [Career Name] Career Path Data
 * Exports all data related to the [Career Name] career path
 */

export { [careerId]CareerPathConfig } from "./careerPathConfig";
export { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";
```

#### Real Example (Cybersecurity)

```typescript
/**
 * Cybersecurity Career Path Data
 * Exports all data related to the Cybersecurity career path
 */

export { cybersecurityCareerPathConfig } from "./careerPathConfig";
export { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";
```

---

### Step 6: Copy CareerPathGraph Component

**File Path**: `degrees/[degree-id]/careers/[your-career-id]/components/CareerPathGraph.tsx`

**Action**: Copy the entire file from a reference career:
- **CS/CSE careers**: Copy from `degrees/cs-cse/careers/swe/components/CareerPathGraph.tsx`
- **COGS careers**: Copy from `degrees/cogs/careers/ux-ui/components/CareerPathGraph.tsx` or any existing COGS career
- **Other degrees**: Copy from `degrees/cs-cse/careers/swe/components/CareerPathGraph.tsx` (SWE is a good reference) or any existing career

**Then modify ONLY this line** (around line 26):

```typescript
// OLD (from SWE):
import { sweCareerPathConfig } from "../data/careerPathConfig";

// NEW (for your career):
import { [careerId]CareerPathConfig } from "../data/careerPathConfig";
```

**Then modify the root node component function name** (around line 34-44):

```typescript
// OLD (from SWE):
function SWERootNode({ data }: { data: { label: string } }) {
  // ...
}

// NEW (for your career):
function [CareerName]RootNode({ data }: { data: { label: string } }) {
  // ... (keep implementation the same, only change function name)
}
```

**Then update the nodeTypes object** (around line 88-93):

```typescript
// OLD (from SWE):
const nodeTypes = {
  root: SWERootNode,
  tier: TierNode,
  course: CourseNode,
};

// NEW (for your career):
const nodeTypes = {
  root: [CareerName]RootNode,  // Use your renamed function
  tier: TierNode,
  course: CourseNode,
};
```

**Then modify the root node definition** (around line 106):

```typescript
// OLD (from SWE):
const rootNode: Node = {
  id: "swe-root",
  type: "root",
  data: { label: sweCareerPathConfig.rootLabel },
  position: nodePositions["swe-root"] || { x: 0, y: 40 },
};

// NEW (for your career):
const rootNode: Node = {
  id: "[career-id]-root",  // Change this to your career ID + "-root"
  type: "root",
  data: { label: [careerId]CareerPathConfig.rootLabel },
  position: nodePositions["[career-id]-root"] || { x: 0, y: 40 },
};
```

**Then modify ALL "swe-root" references** (search for "swe-root" and replace with "[career-id]-root"):

- Around line 106: `id: "swe-root"` → `id: "[career-id]-root"`
- Around line 147: `nodePositions["swe-root"]` → `nodePositions["[career-id]-root"]`
- Around line 135: `id: "swe-root-${tierNode.id}"` → `id: "[career-id]-root-${tierNode.id}"`
- Around line 154: `source: "swe-root"` → `source: "[career-id]-root"`
- Around line 336: `newPositions["swe-root"]` → `newPositions["[career-id]-root"]`
- Around line 400: `id: "swe-root"` → `id: "[career-id]-root"` (in handleFormat function)

**IMPORTANT**: 
- **Root node label**: For **career path graphs**, use the career name (e.g., "SWE", "Cybersecurity", "ML/AI")
- **Root node label**: For **major prerequisite graphs**, use the major name (e.g., "COGS", "CS/CSE")
- The root node function name should match your career/major (e.g., `SWERootNode`, `CybersecurityRootNode`, `COGSRootNode`)

#### Real Example (Cybersecurity)

Copy the file, then change:

```typescript
// Line ~26:
import { cybersecurityCareerPathConfig } from "../data/careerPathConfig";

// Line ~34 (rename root node function):
function CybersecurityRootNode({ data }: { data: { label: string } }) {
  return (
    <div className="w-32 h-32 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center shadow-lg relative">
      <Handle type="source" position={Position.Bottom} />
      <div className="text-lg font-bold text-primary text-center">
        {data.label}
      </div>
    </div>
  );
}

// Line ~88 (update nodeTypes):
const nodeTypes = {
  root: CybersecurityRootNode,  // Changed from SWERootNode
  tier: TierNode,
  course: CourseNode,
};

// Line ~106:
const rootNode: Node = {
  id: "cybersecurity-root",
  type: "root",
  data: { label: cybersecurityCareerPathConfig.rootLabel },
  position: nodePositions["cybersecurity-root"] || { x: 0, y: 40 },
};

// Line ~135 (in tierEdges):
const tierEdges: Edge[] = tierNodes.map((tierNode) => ({
  id: `cybersecurity-root-${tierNode.id}`,
  source: "cybersecurity-root",
  target: tierNode.id,
  // ...
}));

// Line ~336 (in handleFormat):
newPositions["cybersecurity-root"] = { x: 0, y: 40 };

// Line ~400 (in handleFormat, recalculated root node):
const rootNode: Node = {
  id: "cybersecurity-root",
  type: "root",
  data: { label: cybersecurityCareerPathConfig.rootLabel },
  position: newPositions["cybersecurity-root"],
};
```

**IMPORTANT**: 
- Keep all other code exactly the same
- Don't change component structure, styling, or logic
- Only change: config import, root node function name, root node ID references, and nodeTypes mapping
- The Background component uses `variant={"lines" as any}` for a grid-line pattern (this is standard for all career path graphs)
- **Course node IDs**: Course nodes use the format `course-${course.id}` (e.g., `course-cse-120`). This is handled automatically by the component.

---

### Step 7: Add Career Path to Sidebar Navigation

**File Path**: `degrees/components/DegreesSidebar.tsx` (shared file for all degrees)

**Action**: Verify your career ID exists in the sidebar navigation. If missing, add it to the appropriate degree's career paths array.

#### Step 7a: Locate the careerPaths Object

Find the `careerPaths` object (around line 31-50):

```typescript
const careerPaths: Record<string, { id: string; name: string }[]> = {
  "CS/CSE": [
    { id: "resumes", name: "Resumes" },
    { id: "alumni", name: "Alumni" },
    { id: "swe", name: "SWE (Generalist)" },
    { id: "cybersecurity", name: "Cybersecurity" },
    // ... more career paths
  ],
  "COGS": [
    // ... COGS career paths
  ],
};
```

#### Step 7b: Add Your Career Path Entry

Add your career path to the appropriate degree array:

```typescript
const careerPaths: Record<string, { id: string; name: string }[]> = {
  "CS/CSE": [
    // ... existing entries ...
    { id: "[career-id]", name: "[Display Name]" },  // Add this line
  ],
};
```

**IMPORTANT**:
- The `id` field MUST match your career ID exactly (e.g., `"cybersecurity"`, `"ml-ai"`)
- The `id` must match what you use in `DegreesContent.tsx` conditional check
- The `name` field is the display name shown in the sidebar (can include spaces and special characters)
- Add it to the correct degree array (`"CS/CSE"` or `"COGS"`)

#### Real Example (Cybersecurity)

```typescript
const careerPaths: Record<string, { id: string; name: string }[]> = {
  "CS/CSE": [
    { id: "resumes", name: "Resumes" },
    { id: "alumni", name: "Alumni" },
    { id: "swe", name: "SWE (Generalist)" },
    { id: "cybersecurity", name: "Cybersecurity" },  // Added this
    // ... rest of entries
  ],
};
```

**Note**: If your career path is already listed in the sidebar, skip this step. Just verify the ID matches.

---

### Step 8: Integrate into DegreesContent.tsx

**File Path**: `cs-cse/components/DegreesContent.tsx`

**Action**: Add a new conditional block for your career path, following the exact pattern used for SWE.

#### Step 8a: Add Import

Find the imports section (around line 8-25) and add:

```typescript
// For CS/CSE careers:
import CareerPathGraph from "../cs-cse/careers/[your-career-id]/components/CareerPathGraph";

// For COGS careers:
import CareerPathGraph from "../cogs/careers/[your-career-id]/components/CareerPathGraph";

// For other degrees:
import CareerPathGraph from "../[degree-id]/careers/[your-career-id]/components/CareerPathGraph";
```

#### Step 8b: Add Refs and State

Find where SWE refs are defined (around line 26-33) and add similar ones for your career:

```typescript
// Add these after the SWE refs:
const reset[CareerName]GraphRef = useRef<(() => void) | null>(null);
const format[CareerName]GraphRef = useRef<(() => void) | null>(null);
const [reset[CareerName]Ready, setReset[CareerName]Ready] = useState(false);
const [format[CareerName]Ready, setFormat[CareerName]Ready] = useState(false);
```

**Example for Cybersecurity:**
```typescript
const resetCybersecurityGraphRef = useRef<(() => void) | null>(null);
const formatCybersecurityGraphRef = useRef<(() => void) | null>(null);
const [resetCybersecurityReady, setResetCybersecurityReady] = useState(false);
const [formatCybersecurityReady, setFormatCybersecurityReady] = useState(false);
```

#### Step 8c: Add Handler Functions

Find where SWE handlers are defined (around line 52-66) and add:

```typescript
const handleReset[CareerName]Ready = useRef((handler: () => void) => {
  reset[CareerName]GraphRef.current = handler;
  requestAnimationFrame(() => {
    setReset[CareerName]Ready(true);
  });
});

const handleFormat[CareerName]Ready = useRef((handler: () => void) => {
  format[CareerName]GraphRef.current = handler;
  requestAnimationFrame(() => {
    setFormat[CareerName]Ready(true);
  });
});
```

#### Step 8d: Add Cleanup in useEffect

Find the useEffect that cleans up refs (around line 68-80) and add:

```typescript
setReset[CareerName]Ready(false);
setFormat[CareerName]Ready(false);
reset[CareerName]GraphRef.current = null;
format[CareerName]GraphRef.current = null;
```

#### Step 8e: Add Conditional Render Block

Find the SWE conditional block (around line 181-230) and add a similar one AFTER it:

```typescript
// Show [Career Name] career path with graph
if (selectedCareerPath === "[career-id]") {
  return (
    <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
            {careerPathNames[selectedCareerPath]} - {selectedDegree}
          </h2>
          <p className="text-black mb-5">
            Career pathway information and recommended courses
          </p>
          {careerDescriptions[selectedCareerPath] && (
            <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
              {careerDescriptions[selectedCareerPath]}
            </p>
          )}
        </div>
        
        {/* Format and Reset buttons */}
        <div className="mb-6 flex justify-end gap-3">
          <button
            onClick={() => {
              if (format[CareerName]Ready && format[CareerName]GraphRef.current) {
                format[CareerName]GraphRef.current();
              }
            }}
            className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
              format[CareerName]Ready && format[CareerName]GraphRef.current
                ? "text-primary hover:text-primary/80 border-primary/20 hover:border-primary/40 cursor-pointer bg-primary/5 hover:bg-primary/10"
                : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
            }`}
            title={format[CareerName]Ready && format[CareerName]GraphRef.current ? "Format graph to prevent overlap" : "Waiting for format handler..."}
          >
            Format Graph
          </button>
          <button
            onClick={() => {
              if (reset[CareerName]Ready && reset[CareerName]GraphRef.current) {
                reset[CareerName]GraphRef.current();
              }
            }}
            className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
              reset[CareerName]Ready && reset[CareerName]GraphRef.current
                ? "text-destructive hover:text-destructive/80 border-destructive/20 hover:border-destructive/40 cursor-pointer bg-destructive/5 hover:bg-destructive/10"
                : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
            }`}
            title={reset[CareerName]Ready && reset[CareerName]GraphRef.current ? "Reset career path graph view" : "Waiting for reset handler..."}
          >
            Reset Graph
          </button>
        </div>
        
        <div className="mb-10">
          <CareerPathGraph 
            onResetReady={handleReset[CareerName]Ready.current}
            onFormatReady={handleFormat[CareerName]Ready.current}
          />
        </div>
      </div>
    </div>
  );
}
```

**IMPORTANT**: 
- Copy the entire SWE block exactly
- Replace `swe` with `[career-id]` in the condition
- Replace `[CareerName]` with your actual career name (PascalCase) in variable names
- Keep all styling and structure identical

#### Real Example (Cybersecurity)

```typescript
// At top with imports:
import CareerPathGraph from "../cs-cse/careers/cybersecurity/components/CareerPathGraph";

// With refs (after SWE refs):
const resetCybersecurityGraphRef = useRef<(() => void) | null>(null);
const formatCybersecurityGraphRef = useRef<(() => void) | null>(null);
const [resetCybersecurityReady, setResetCybersecurityReady] = useState(false);
const [formatCybersecurityReady, setFormatCybersecurityReady] = useState(false);

// With handlers (after SWE handlers):
const handleResetCybersecurityReady = useRef((handler: () => void) => {
  resetCybersecurityGraphRef.current = handler;
  requestAnimationFrame(() => {
    setResetCybersecurityReady(true);
  });
});

const handleFormatCybersecurityReady = useRef((handler: () => void) => {
  formatCybersecurityGraphRef.current = handler;
  requestAnimationFrame(() => {
    setFormatCybersecurityReady(true);
  });
});

// In useEffect cleanup:
setResetCybersecurityReady(false);
setFormatCybersecurityReady(false);
resetCybersecurityGraphRef.current = null;
formatCybersecurityGraphRef.current = null;

// Conditional block (after SWE block):
if (selectedCareerPath === "cybersecurity") {
  return (
    <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="max-w-7xl mx-auto">
        {/* ... same structure as SWE ... */}
        <CareerPathGraph 
          onResetReady={handleResetCybersecurityReady.current}
          onFormatReady={handleFormatCybersecurityReady.current}
        />
      </div>
    </div>
  );
}
```

---

## 🔧 Code Templates

### Complete File Templates

#### tierCourses.ts Template

**⚠️ IMPORTANT**: Copy the structure template below for EACH course and fill in all fields manually.

```typescript
/**
 * [Career Name] Tier Courses Data
 * Course recommendations organized by tier for [Career Name] career path
 * 
 * NOTE: All course data must be filled out manually. Copy the structure template for each course.
 */

import { TierCourse } from "@/types/careerPath";

export const tier1Courses: TierCourse[] = [
  // COPY THIS STRUCTURE FOR EACH COURSE - FILL OUT ALL FIELDS MANUALLY
  {
    id: "",                             // FILL: Unique kebab-case ID
    code: "",                           // FILL: Course code (e.g., "CSE 120")
    name: "",                           // FILL: Short course name
    fullName: "",                       // FILL: Full display name
    description: "",                    // FILL: Brief 1-2 sentence description
    tier: 1,                            // FILL: Tier number
    expandedInfo: {                     // FILL: All fields with actual information
      credits: 0,                       // FILL: Number of credits
      careerRelevance: "",              // FILL: 1-3 sentences
      realWorldApplications: [          // FILL: Array of use case strings
        "",
        "",
      ],
      learningOutcomes: [               // FILL: Array of outcome strings
        "",
        "",
      ],
      topics: [                         // FILL (OPTIONAL): Array of topic strings
        "",
      ],
      resources: {                      // FILL (OPTIONAL but recommended)
        videos: [                       // FILL: Array of video URLs
          "",
        ],
        websites: [                     // FILL: Array of website URLs
          "",
        ],
        tools: [                        // FILL: Array of tool names
          "",
        ],
      },
      additionalNotes: "",              // FILL (OPTIONAL): Additional context
    },
  },
  // Copy structure above for more Tier 1 courses...
];

export const tier2Courses: TierCourse[] = [
  // Copy the same structure template for each Tier 2 course
  {
    id: "",
    code: "",
    name: "",
    fullName: "",
    description: "",
    tier: 2,
    expandedInfo: {
      credits: 0,
      careerRelevance: "",
      realWorldApplications: [],
      learningOutcomes: [],
      // ... fill out all fields
    },
  },
  // Copy structure for more Tier 2 courses...
];

export const tier3Courses: TierCourse[] = [
  // Copy the same structure template for each Tier 3 course
  {
    id: "",
    code: "",
    name: "",
    fullName: "",
    description: "",
    tier: 3,
    expandedInfo: {
      credits: 0,
      careerRelevance: "",
      realWorldApplications: [],
      learningOutcomes: [],
      // ... fill out all fields
    },
  },
  // Copy structure for more Tier 3 courses...
];
```

#### careerPathConfig.ts Template

```typescript
/**
 * [Career Name] Career Path Configuration
 * Configures the career path graph visualization for [Career Name]
 */

import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";

export const [careerId]CareerPathConfig: CareerPathConfig = {
  rootLabel: "[Career Name]",
  categories: [
    { id: "tier-1", label: "TIER 1: [Description]", emoji: "🟢" },
    { id: "tier-2", label: "TIER 2: [Description]", emoji: "🟡" },
    { id: "tier-3", label: "TIER 3: [Description]", emoji: "🟠" },
  ],
  courses: [...tier1Courses, ...tier2Courses, ...tier3Courses],
};
```

#### index.ts Template

```typescript
/**
 * [Career Name] Career Path Data
 * Exports all data related to the [Career Name] career path
 */

export { [careerId]CareerPathConfig } from "./careerPathConfig";
export { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";
```

---

## 🔗 Integration Steps

**Note**: The integration steps (Steps 7-8) are now included in the main Step-by-Step Implementation section above. This section is kept for reference but the detailed instructions are in Steps 7-8.

### Step 2: Verify Career Description

**File**: `cs-cse/components/DegreesContent.tsx`

Check that `careerDescriptions` and `careerPathNames` objects include your career:

```typescript
const careerDescriptions: Record<string, string> = {
  "[your-career-id]": "Description text...",
};

const careerPathNames: Record<string, string> = {
  "[your-career-id]": "Display Name",
};
```

---

## 🐛 Common Issues and Solutions

### Issue 1: Courses Don't Appear When Tier is Expanded

**Symptoms**: Click tier node, but no courses show up below it.

**Causes & Solutions**:

1. **Tier number mismatch**
   - ❌ Category ID is `"tier-1"` but courses have `tier: 2`
   - ✅ Fix: Ensure category ID number matches course tier number
   - Check: `careerPathConfig.ts` category IDs vs `tierCourses.ts` tier numbers

2. **Missing courses in config**
   - ❌ Courses defined in `tierCourses.ts` but not spread in `careerPathConfig.ts`
   - ✅ Fix: Ensure all tier arrays are spread in the `courses` array:
     ```typescript
     courses: [...tier1Courses, ...tier2Courses, ...tier3Courses],
     ```

3. **Wrong root node ID**
   - ❌ Component uses `"swe-root"` but you need `"[career-id]-root"`
   - ✅ Fix: Update all `"swe-root"` references in `CareerPathGraph.tsx`

**Debug Checklist**:
- [ ] Category ID format: `"tier-1"`, `"tier-2"`, etc.
- [ ] Course tier numbers: `1`, `2`, `3`, etc. (must match)
- [ ] All tier arrays imported in `careerPathConfig.ts`
- [ ] All tier arrays spread in `courses` array
- [ ] Root node ID is `"[career-id]-root"` not `"swe-root"`

---

### Issue 2: "Cannot find module" Error

**Symptoms**: Build error or runtime error about missing module.

**Causes & Solutions**:

1. **Wrong import path**
   - ❌ `import { config } from "./data/careerPathConfig";` (missing parent directory)
   - ✅ Fix: Use `import { config } from "../data/careerPathConfig";` (from components folder)

2. **File doesn't exist**
   - ❌ Created `tierCourses.ts` but forgot to create `careerPathConfig.ts`
   - ✅ Fix: Verify all required files exist:
     - `components/CareerPathGraph.tsx`
     - `data/tierCourses.ts`
     - `data/careerPathConfig.ts`
     - `data/index.ts`

3. **Export name mismatch**
   - ❌ Importing `cybersecurityConfig` but exported `cybersecurityCareerPathConfig`
   - ✅ Fix: Ensure import name matches export name exactly

**Debug Checklist**:
- [ ] All files created in correct locations
- [ ] Import paths use correct relative paths (`../` from components folder)
- [ ] Export names match import names exactly
- [ ] File extensions included (`.ts`, not `.tsx` for data files)

---

### Issue 3: Format/Reset Buttons Don't Work

**Symptoms**: Buttons are disabled or don't do anything when clicked.

**Causes & Solutions**:

1. **Missing handler registration**
   - ❌ Forgot to pass `onResetReady` or `onFormatReady` to component
   - ✅ Fix: Ensure component receives both props:
     ```typescript
     <CareerPathGraph 
       onResetReady={handleReset[CareerName]Ready.current}
       onFormatReady={handleFormat[CareerName]Ready.current}
     />
     ```

2. **Handler not defined**
   - ❌ Forgot to create `handleReset[CareerName]Ready` or `handleFormat[CareerName]Ready`
   - ✅ Fix: Add both handler functions following SWE pattern

3. **Ref not initialized**
   - ❌ Ref is `null` because handler never called
   - ✅ Fix: Component should call `onResetReady` and `onFormatReady` in useEffect

**Debug Checklist**:
- [ ] Both `onResetReady` and `onFormatReady` props passed to component
- [ ] Handler functions defined (`handleReset[CareerName]Ready`, `handleFormat[CareerName]Ready`)
- [ ] Refs defined (`reset[CareerName]GraphRef`, `format[CareerName]GraphRef`)
- [ ] State defined (`reset[CareerName]Ready`, `format[CareerName]Ready`)
- [ ] Component calls the callbacks in useEffect (check CareerPathGraph.tsx)

---

### Issue 4: Graph Shows SWE Data Instead of Your Data

**Symptoms**: Graph displays "SWE" as root and SWE courses.

**Causes & Solutions**:

1. **Forgot to update import**
   - ❌ Still importing `sweCareerPathConfig` in your `CareerPathGraph.tsx`
   - ✅ Fix: Change import to your config:
     ```typescript
     import { [careerId]CareerPathConfig } from "../data/careerPathConfig";
     ```

2. **Forgot to update config usage**
   - ❌ Still using `sweCareerPathConfig.rootLabel`
   - ✅ Fix: Change to `[careerId]CareerPathConfig.rootLabel`

3. **Forgot to rename root node function**
   - ❌ Still using `SWERootNode` function name
   - ✅ Fix: Rename to match your career/major:
     ```typescript
     // For career paths:
     function CybersecurityRootNode({ data }: { data: { label: string } }) { ... }
     
     // For major graphs:
     function COGSRootNode({ data }: { data: { label: string } }) { ... }
     ```
   - Then update `nodeTypes` to use your renamed function

4. **Using SWE component file**
   - ❌ Accidentally using `swe/components/CareerPathGraph.tsx` instead of your copy
   - ✅ Fix: Ensure you're importing from your career's component folder

**Debug Checklist**:
- [ ] Import path points to your `data/careerPathConfig.ts`
- [ ] Variable name matches your export name
- [ ] All references to `sweCareerPathConfig` replaced with your config name
- [ ] Root node function renamed (e.g., `SWERootNode` → `CybersecurityRootNode` or `COGSRootNode`)
- [ ] `nodeTypes` object updated to use renamed root node function
- [ ] All `"swe-root"` references replaced with `"[career-id]-root"` or `"[major-id]-root"`
- [ ] Import in `DegreesContent.tsx` points to your component folder

---

### Issue 5: Duplicate Course IDs Error

**Symptoms**: Build error or warning about duplicate IDs.

**Causes & Solutions**:

1. **Reused SWE course IDs**
   - ❌ Using `"cse-120"` which is already used in SWE
   - ✅ Fix: Use unique IDs with career prefix:
     ```typescript
     id: "cybersecurity-cse-130",  // Instead of just "cse-130"
     ```

2. **Duplicate IDs within same career**
   - ❌ Two courses with same `id` in same `tierCourses.ts`
   - ✅ Fix: Ensure all IDs are unique within the file

3. **Course Node ID Format**
   - **Note**: Course nodes in the graph automatically use the format `course-${course.id}`
   - If your course has `id: "cse-120"`, the node ID becomes `"course-cse-120"`
   - This prefix is added automatically - you only need to ensure the base `id` is unique

**Debug Checklist**:
- [ ] All course IDs are unique across entire codebase (base IDs, before `course-` prefix)
- [ ] Use career prefix if reusing course codes from other careers
- [ ] No duplicate IDs within same `tierCourses.ts` file
- [ ] Remember: Course node IDs are `course-${course.id}` - check for conflicts with this format

---

### Issue 6: TypeScript Type Errors

**Symptoms**: TypeScript compiler errors about missing properties or type mismatches.

**Causes & Solutions**:

1. **Missing required fields**
   - ❌ Course object missing `tier` property
   - ✅ Fix: Ensure all required fields present (see TierCourse type):
     - `id`, `code`, `name`, `fullName`, `description`, `tier`

2. **Wrong type for tier**
   - ❌ `tier: "1"` (string) instead of `tier: 1` (number)
   - ✅ Fix: Tier must be a number, not a string

3. **Config structure mismatch**
   - ❌ Missing `rootLabel` or `categories` in config
   - ✅ Fix: Follow `CareerPathConfig` interface exactly

**Debug Checklist**:
- [ ] All required TierCourse fields present
- [ ] `tier` is a number (1, 2, 3) not string ("1", "2", "3")
- [ ] Config follows CareerPathConfig interface
- [ ] Import types from `@/types/careerPath`

---

### Issue 7: Graph Layout Issues (Overlapping Nodes)

**Symptoms**: When tiers are expanded, course nodes overlap each other.

**Solutions**:

1. **Use Format Graph button**
   - Click "Format Graph" button to automatically reposition nodes with wider spacing
   - Spacing values are automatically adjusted based on graph size

2. **Reference starting spacing values** (adjust based on your graph size):
   - In `CareerPathGraph.tsx`, find spacing constants (around line 152-164):
     ```typescript
     // Normal (unformatted) spacing:
     const tierSpacing = 400;        // Horizontal spacing between tier nodes
     const coursesPerRow = 3;        // Number of courses per row
     const courseSpacing = 220;      // Horizontal spacing between courses
     const rowSpacing = 100;         // Vertical spacing between course rows
     
     // Formatted spacing (when Format button is clicked):
     const tierSpacing = 600;        // Increased horizontal spacing between tiers
     const coursesPerRow = 2;        // Reduced to 2 per row
     const courseSpacing = 300;      // Increased horizontal spacing between courses
     const rowSpacing = 120;         // Increased vertical spacing between rows
     ```
   - **Adjust these values based on your graph size**: If you have many courses or tiers, increase spacing values. If you have few courses, you may decrease them.

**Note**: Format button increases spacing automatically. Spacing should be adjusted based on:
- Number of tiers (more tiers = wider tier spacing)
- Number of courses per tier (more courses = wider course spacing, fewer per row)
- Overall graph size (larger graphs may need more spacing)
- If overlap persists, check:
  - [ ] Format button is working (check console for errors)
  - [ ] Enough space in viewport (try zooming out)
  - [ ] Spacing values are appropriate for your graph size

---

## 📜 Rules and Best Practices

### Naming Conventions

1. **Career ID**: Use kebab-case, lowercase only
   - ✅ `cybersecurity`, `ml-ai`, `data-science`
   - ❌ `Cybersecurity`, `ML-AI`, `data_science`, `cyberSecurity`

2. **Export Names**: Use camelCase
   - ✅ `cybersecurityCareerPathConfig`
   - ❌ `cybersecurity-career-path-config`, `CybersecurityCareerPathConfig`

3. **File Names**: Match career ID or use standard names
   - ✅ `tierCourses.ts`, `careerPathConfig.ts`, `index.ts`
   - ❌ `courses.ts`, `config.ts`, `data.ts`

4. **Component Names**: Use PascalCase
   - ✅ `CareerPathGraph` (already defined, don't change)

5. **Course IDs**: Use kebab-case with career prefix if needed
   - ✅ `cybersecurity-cse-130`, `ml-ai-cse-175`
   - ❌ `cse-130`, `CSE_130`, `cse130` (if already used elsewhere)

### File Organization Rules

1. **Never modify SWE files**: `swe/` directory is reference only
2. **Keep structure consistent**: Follow SWE structure exactly
3. **One component per career**: Each career has its own `CareerPathGraph.tsx` copy
4. **Separate data files**: Keep `tierCourses.ts` and `careerPathConfig.ts` separate

### Code Quality Rules

1. **Type safety**: Always import types from `@/types/careerPath`
2. **Consistent formatting**: Match SWE code style
3. **Comments**: Add JSDoc comments at top of files
4. **No hardcoding**: All data comes from config files

### Data Quality Rules

1. **Unique IDs**: Course IDs must be unique across all careers
2. **Tier matching**: Category IDs must match tier numbers exactly
3. **Complete data**: All required fields must be present
4. **Descriptive labels**: Labels should be clear and informative

---

## ✅ Testing Checklist

After creating your career path graph, verify the following:

### Basic Functionality
- [ ] Graph displays when career path is selected
- [ ] Root node shows correct career name
- [ ] Tier nodes appear below root node
- [ ] Clicking tier node expands/collapses courses
- [ ] Courses appear in correct tier when expanded
- [ ] Courses show correct code and name

### Interactive Features
- [ ] Nodes can be dragged and repositioned
- [ ] Node positions persist after drag
- [ ] Clicking a course node opens expanded card
- [ ] Expanded card shows course name, description, and expanded info (if provided)
- [ ] Expanded card can be closed via X button, backdrop click, or Escape key
- [ ] Format Graph button works (repositions with wider spacing)
- [ ] Reset Graph button works (collapses all, closes course cards, resets positions)
- [ ] Buttons are enabled and clickable

### Data Verification
- [ ] All courses from `tierCourses.ts` appear in graph
- [ ] Courses appear in correct tiers
- [ ] No duplicate courses
- [ ] Root label matches config
- [ ] Tier labels match config

### Integration
- [ ] Career appears in sidebar navigation
- [ ] Selecting career shows graph (not prerequisite graph)
- [ ] Career description displays (if configured)
- [ ] No console errors
- [ ] Build completes without errors

### Edge Cases
- [ ] Empty tier (no courses) doesn't break graph
- [ ] Single course in tier displays correctly
- [ ] Many courses (10+) don't cause overlap (after Format)
- [ ] Graph works after multiple expand/collapse cycles
- [ ] Format works even if nodes were manually dragged

---

## 📚 Additional Resources

### Reference Files

1. **SWE Implementation** (Reference only - do not modify):
   - `cs-cse/careers/swe/components/CareerPathGraph.tsx`
   - `cs-cse/careers/swe/data/tierCourses.ts`
   - `cs-cse/careers/swe/data/careerPathConfig.ts`

2. **Type Definitions**:
   - `src/types/careerPath.ts` - TypeScript interfaces

3. **Integration Example**:
   - `cs-cse/components/DegreesContent.tsx` - See SWE integration (lines 181-230)

### Documentation

- `docs/CAREER_PATH_GRAPH_GUIDE.md` - High-level overview
- `careers/README.md` - Career paths organization
- This guide - Detailed implementation instructions

---

## 🎓 Quick Start Summary

**Minimum Steps to Create a New Career Path:**

1. ✅ Identify which degree this career belongs to (CS/CSE, COGS, or other)
2. ✅ Choose your career ID (kebab-case)
3. ✅ Verify career ID exists in `DegreesSidebar.tsx` (or add it to the appropriate degree's careerPaths array)
4. ✅ Create directory: `degrees/[degree-id]/careers/[career-id]/`
5. ✅ Create `data/tierCourses.ts` with course data
   - **Copy the structure template for each course**
   - **Fill out all fields manually** with actual course information
6. ✅ Create `data/careerPathConfig.ts` with configuration
7. ✅ Create `data/index.ts` with exports
8. ✅ Copy `components/CareerPathGraph.tsx` from reference career
   - CS/CSE: Copy from `swe/`
   - COGS: Copy from `ux-ui/` or any existing COGS career
   - Other: Copy from SWE or any existing career
9. ✅ Update import, root node function name, and root node ID in copied component
10. ✅ Add integration code to `DegreesContent.tsx` (in the appropriate degree section)
11. ✅ Test all functionality

**Estimated Time**: 
- Structure setup: 30-60 minutes
- Data entry (filling out tier courses manually): 1-3 hours depending on number of courses
- Total: 2-4 hours for complete implementation with all course data

---

## 🆘 Getting Help

If you encounter issues not covered in this guide:

1. **Check the SWE implementation** - It's the reference
2. **Compare file structures** - Ensure yours matches SWE exactly
3. **Check console errors** - TypeScript and runtime errors provide clues
4. **Verify types** - Ensure all data matches TypeScript interfaces
5. **Test incrementally** - Create one tier at a time to isolate issues

---

**Last Updated**: Based on current SWE implementation
**Maintained By**: Development Team
**Questions**: Refer to SWE implementation or this guide

