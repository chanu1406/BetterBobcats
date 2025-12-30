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
- **Root Node**: The career path name (e.g., "Cybersecurity", "ML/AI")
- **Tier Nodes**: Organized tiers/categories (e.g., "TIER 1: MUST-TAKE", "TIER 2: RECOMMENDED")
- **Course Nodes**: Individual recommended courses displayed when tiers are expanded
- **Interactive Features**: Click to expand/collapse tiers, drag nodes, format layout, reset graph

### How It Works

The system uses a **config-driven architecture**:
1. You create data files (`tierCourses.ts`, `careerPathConfig.ts`)
2. You copy the component file from SWE and update the import path
3. The component automatically reads your config and displays the graph
4. No code changes needed in the component itself (only the import path)

### File Structure Overview

```
cs-cse/
├── careers/
│   ├── swe/                    ⚠️ DO NOT MODIFY - Reference only
│   │   ├── components/
│   │   │   └── CareerPathGraph.tsx
│   │   └── data/
│   │       ├── tierCourses.ts
│   │       ├── careerPathConfig.ts
│   │       └── index.ts
│   │
│   └── [your-career-id]/      ✅ CREATE THIS
│       ├── components/
│       │   └── CareerPathGraph.tsx   (copy from SWE)
│       └── data/
│           ├── tierCourses.ts         (create new)
│           ├── careerPathConfig.ts    (create new)
│           └── index.ts               (create new)
│
└── components/
    └── DegreesContent.tsx      ⚠️ MODIFY - Add your career path
```

---

## 📁 Files You Will Create

When creating a new career path (e.g., "cybersecurity"), you will create the following files:

### Required Files

1. **`cs-cse/careers/[career-id]/components/CareerPathGraph.tsx`**
   - Copy from `swe/components/CareerPathGraph.tsx`
   - Only change the import path for the config

2. **`cs-cse/careers/[career-id]/data/tierCourses.ts`**
   - New file with your course data
   - Organized by tiers (tier1Courses, tier2Courses, etc.)

3. **`cs-cse/careers/[career-id]/data/careerPathConfig.ts`**
   - New file with your configuration
   - Defines root label, categories, and combines all courses

4. **`cs-cse/careers/[career-id]/data/index.ts`**
   - New file that exports your config and courses
   - Simple re-export file

---

## 📝 Files You Will Modify

### Single File to Modify

**`cs-cse/components/DegreesContent.tsx`**

You will add a new conditional block for your career path, following the exact pattern used for SWE.

**Location**: Around line 180-230 (after the SWE section)

---

## ⛔ Files You MUST NOT Touch

**NEVER modify these files** when creating a new career path:

1. ❌ `cs-cse/careers/swe/` - **ENTIRE DIRECTORY** (Reference implementation only)
2. ❌ `cs-cse/components/PrerequisiteGraph.tsx` (Different graph type)
3. ❌ `cs-cse/components/GraphLegend.tsx` (Used for prerequisite graph, not career paths)
4. ❌ `cs-cse/data/courses.ts` (Prerequisite graph data, different purpose)
5. ❌ `src/types/careerPath.ts` (Shared types - do not modify unless adding new fields)

---

## 🚀 Step-by-Step Implementation

### Step 1: Choose Your Career ID

**Choose a kebab-case identifier** for your career path. This will be used in:
- Directory name
- File names
- Import paths
- Conditional checks in DegreesContent

**Examples:**
- `cybersecurity` (not `cyber-security` or `cybersecurity-path`)
- `ml-ai` (not `mlai` or `machine-learning-ai`)
- `data-science` (not `dataScience` or `data_science`)

**Rule**: Use lowercase letters and hyphens only. No underscores, no camelCase, no spaces.

---

### Step 2: Create Directory Structure

Create the following directory structure:

```bash
cs-cse/careers/[your-career-id]/
├── components/
└── data/
```

**Example for Cybersecurity:**
```bash
cs-cse/careers/cybersecurity/
├── components/
└── data/
```

**Do NOT create these directories inside `swe/`**. Create them as siblings to `swe/`.

---

### Step 3: Create tierCourses.ts File

**File Path**: `cs-cse/careers/[your-career-id]/data/tierCourses.ts`

This file contains all course recommendations organized by tiers.

#### File Template

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
  {
    id: "cse-xxx",                    // REQUIRED: Unique kebab-case ID
    code: "CSE XXX",                  // REQUIRED: Course code
    name: "Course Name",              // REQUIRED: Short course name
    fullName: "CSE XXX: Course Name", // REQUIRED: Full display name
    description: "Why this course matters for this career", // REQUIRED: Brief description
    tier: 1,                          // REQUIRED: Must match tier number (1, 2, 3, etc.)
  },
  // Add more Tier 1 courses...
];

/**
 * 🟡 TIER 2: [Tier Description]
 * [Explanation of what makes these Tier 2 courses]
 */
export const tier2Courses: TierCourse[] = [
  {
    id: "cse-yyy",
    code: "CSE YYY",
    name: "Another Course",
    fullName: "CSE YYY: Another Course",
    description: "Why this course is recommended",
    tier: 2,                          // Must be 2 for Tier 2
  },
  // Add more Tier 2 courses...
];

/**
 * 🟠 TIER 3: [Tier Description]
 * [Explanation of what makes these Tier 3 courses]
 */
export const tier3Courses: TierCourse[] = [
  {
    id: "cse-zzz",
    code: "CSE ZZZ",
    name: "Optional Course",
    fullName: "CSE ZZZ: Optional Course",
    description: "Why this course might be useful",
    tier: 3,                          // Must be 3 for Tier 3
  },
  // Add more Tier 3 courses...
];

// If you need more tiers, add them:
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

3. **All fields are required** (except `resources` and `prerequisites` if not using them)

4. **Use kebab-case for IDs**: `cse-120`, not `cse_120` or `cse120`

5. **Keep descriptions concise**: 1-2 sentences max

#### Real Example (Cybersecurity)

```typescript
/**
 * Cybersecurity Tier Courses Data
 * Course recommendations organized by tier for Cybersecurity career path
 */

import { TierCourse } from "@/types/careerPath";

/**
 * 🟢 TIER 1: ESSENTIAL SECURITY FOUNDATIONS
 * Core security courses required for all cybersecurity roles
 */
export const tier1Courses: TierCourse[] = [
  {
    id: "cybersec-cse-130",
    code: "CSE 130",
    name: "Cryptography",
    fullName: "CSE 130: Cryptography",
    description: "Foundational crypto concepts, encryption, hashing - essential for security",
    tier: 1,
  },
  {
    id: "cybersec-cse-178",
    code: "CSE 178",
    name: "Computers & Network Security",
    fullName: "CSE 178: Computers & Network Security",
    description: "Network defense, systems security, vulnerability assessment",
    tier: 1,
  },
];

/**
 * 🟡 TIER 2: ADVANCED SECURITY TOPICS
 * Specialized courses that strengthen cybersecurity expertise
 */
export const tier2Courses: TierCourse[] = [
  {
    id: "cybersec-cse-150",
    code: "CSE 150",
    name: "Operating Systems",
    fullName: "CSE 150: Operating Systems",
    description: "Understanding OS internals for security analysis",
    tier: 2,
  },
];

/**
 * 🟠 TIER 3: SECURITY-ADJACENT (Optional)
 * Useful but not required for cybersecurity careers
 */
export const tier3Courses: TierCourse[] = [
  {
    id: "cybersec-cse-165",
    code: "CSE 165",
    name: "Introduction to Object-Oriented Programming",
    fullName: "CSE 165: Introduction to Object-Oriented Programming",
    description: "Only if OOP fundamentals need strengthening",
    tier: 3,
  },
];
```

---

### Step 4: Create careerPathConfig.ts File

**File Path**: `cs-cse/careers/[your-career-id]/data/careerPathConfig.ts`

This file defines the structure and configuration of your career path graph.

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

**File Path**: `cs-cse/careers/[your-career-id]/components/CareerPathGraph.tsx`

**Action**: Copy the entire file from `cs-cse/careers/swe/components/CareerPathGraph.tsx`

**Then modify ONLY this line** (around line 26):

```typescript
// OLD (from SWE):
import { sweCareerPathConfig } from "../data/careerPathConfig";

// NEW (for your career):
import { [careerId]CareerPathConfig } from "../data/careerPathConfig";
```

**Then modify ONLY this line** (around line 106):

```typescript
// OLD (from SWE):
const rootNode: Node = {
  id: "swe-root",
  type: "root",
  data: { label: sweCareerPathConfig.rootLabel },
  // ...
};

// NEW (for your career):
const rootNode: Node = {
  id: "[career-id]-root",  // Change this to your career ID + "-root"
  type: "root",
  data: { label: [careerId]CareerPathConfig.rootLabel },
  // ...
};
```

**Then modify ONLY these references** (search for "swe-root" and replace with "[career-id]-root"):

- Around line 106: `id: "swe-root"` → `id: "[career-id]-root"`
- Around line 135: `id: "swe-root-${tierNode.id}"` → `id: "[career-id]-root-${tierNode.id}"`
- Around line 154: `source: "swe-root"` → `source: "[career-id]-root"`
- Around line 297: `newPositions["swe-root"]` → `newPositions["[career-id]-root"]`

#### Real Example (Cybersecurity)

Copy the file, then change:

```typescript
// Line ~26:
import { cybersecurityCareerPathConfig } from "../data/careerPathConfig";

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

// Line ~297 (in handleFormat):
newPositions["cybersecurity-root"] = { x: 0, y: 40 };
```

**IMPORTANT**: 
- Keep all other code exactly the same
- Don't change component structure, styling, or logic
- Only change the config import and root node ID references

---

### Step 7: Integrate into DegreesContent.tsx

**File Path**: `cs-cse/components/DegreesContent.tsx`

**Action**: Add a new conditional block for your career path, following the exact pattern used for SWE.

#### Step 7a: Add Import

Find the imports section (around line 8-11) and add:

```typescript
import CareerPathGraph from "../cs-cse/careers/[your-career-id]/components/CareerPathGraph";
```

#### Step 7b: Add Refs and State

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

#### Step 7c: Add Handler Functions

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

#### Step 7d: Add Cleanup in useEffect

Find the useEffect that cleans up refs (around line 68-80) and add:

```typescript
setReset[CareerName]Ready(false);
setFormat[CareerName]Ready(false);
reset[CareerName]GraphRef.current = null;
format[CareerName]GraphRef.current = null;
```

#### Step 7e: Add Conditional Render Block

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

```typescript
/**
 * [Career Name] Tier Courses Data
 * Course recommendations organized by tier for [Career Name] career path
 */

import { TierCourse } from "@/types/careerPath";

export const tier1Courses: TierCourse[] = [
  {
    id: "[unique-id-1]",
    code: "CSE XXX",
    name: "Course Name",
    fullName: "CSE XXX: Course Name",
    description: "Description",
    tier: 1,
  },
];

export const tier2Courses: TierCourse[] = [
  {
    id: "[unique-id-2]",
    code: "CSE YYY",
    name: "Another Course",
    fullName: "CSE YYY: Another Course",
    description: "Description",
    tier: 2,
  },
];

export const tier3Courses: TierCourse[] = [
  {
    id: "[unique-id-3]",
    code: "CSE ZZZ",
    name: "Third Course",
    fullName: "CSE ZZZ: Third Course",
    description: "Description",
    tier: 3,
  },
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

### Step 1: Verify Career ID is in Sidebar

**File**: `cs-cse/components/DegreesSidebar.tsx`

Check that your career ID exists in the `careerPaths` object:

```typescript
const careerPaths: Record<string, { id: string; name: string }[]> = {
  "CS/CSE": [
    // ...
    { id: "[your-career-id]", name: "[Display Name]" },
  ],
};
```

If it's missing, add it. The ID must match what you use in `DegreesContent.tsx`.

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

3. **Using SWE component file**
   - ❌ Accidentally using `swe/components/CareerPathGraph.tsx` instead of your copy
   - ✅ Fix: Ensure you're importing from your career's component folder

**Debug Checklist**:
- [ ] Import path points to your `data/careerPathConfig.ts`
- [ ] Variable name matches your export name
- [ ] All references to `sweCareerPathConfig` replaced with your config name
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

**Debug Checklist**:
- [ ] All course IDs are unique across entire codebase
- [ ] Use career prefix if reusing course codes from other careers
- [ ] No duplicate IDs within same `tierCourses.ts` file

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

2. **Manual spacing adjustment** (if needed)
   - In `CareerPathGraph.tsx`, find spacing constants (around line 180-182):
     ```typescript
     const coursesPerRow = isFormatted ? 2 : 3;
     const courseSpacing = isFormatted ? 300 : 220;
     const rowSpacing = isFormatted ? 120 : 100;
     ```
   - Adjust these values if needed (but Format button should handle it)

**Note**: Format button increases spacing automatically. If overlap persists, check:
- [ ] Format button is working (check console for errors)
- [ ] Enough space in viewport (try zooming out)
- [ ] Not too many courses per row (Format reduces to 2 per row)

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
- [ ] Format Graph button works (repositions with wider spacing)
- [ ] Reset Graph button works (collapses all, resets positions)
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

1. ✅ Create directory: `cs-cse/careers/[career-id]/`
2. ✅ Create `data/tierCourses.ts` with course data
3. ✅ Create `data/careerPathConfig.ts` with configuration
4. ✅ Create `data/index.ts` with exports
5. ✅ Copy `components/CareerPathGraph.tsx` from SWE
6. ✅ Update import and root node ID in copied component
7. ✅ Add integration code to `DegreesContent.tsx`
8. ✅ Verify career ID in `DegreesSidebar.tsx`
9. ✅ Test all functionality

**Estimated Time**: 30-60 minutes for experienced developers, 1-2 hours for first-time setup.

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

