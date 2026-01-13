# Complete Guide: Building Prerequisite Graphs for New Degrees

## 🎯 Purpose of This Guide

This guide provides **extremely detailed, step-by-step instructions** for creating a new degree prerequisite graph visualization. It is designed to be comprehensive enough that LLMs and developers can follow it without needing to reference the CS/CSE implementation or ask clarifying questions.

**IMPORTANT**: The CS/CSE degree (`cs-cse/`) serves as the reference implementation. **DO NOT MODIFY** any files in the `cs-cse/` directory when creating a new degree.

---

## 📋 Table of Contents

1. [Overview and Architecture](#overview-and-architecture)
2. [Critical Rule: No Cross-Category Prerequisites](#critical-rule-no-cross-category-prerequisites)
3. [Files You Will Create](#files-you-will-create)
4. [Files You Will Modify](#files-you-will-modify)
5. [Files You MUST NOT Touch](#files-you-must-not-touch)
6. [Step-by-Step Implementation](#step-by-step-implementation)
7. [Code Templates](#code-templates)
8. [Integration Steps](#integration-steps)
9. [Export Positions Button](#461-export-positions-button-for-setting-custom-layouts) (in Step 4.6.1)
10. [Common Issues and Solutions](#common-issues-and-solutions)
11. [Rules and Best Practices](#rules-and-best-practices)
12. [Testing Checklist](#testing-checklist)

---

## 🏗️ Overview and Architecture

### What You're Building

A prerequisite graph is an interactive visualization that shows:
- **Root Node**: The degree name (e.g., "CS/CSE", "Biology", "Chemistry")
- **Category Nodes**: Subject areas/categories (e.g., "Math", "Writing", "Physics", "CSE")
- **Course Nodes**: Individual courses organized by category
- **Edges**: Arrows showing prerequisite relationships **within each category only**
- **Interactive Features**: Click to expand/collapse categories, drag nodes, format layout, reset graph

### How It Works

The system uses a **category-based architecture**:
1. You create a `courses.ts` file with all courses and their prerequisites
2. You copy and adapt the `PrerequisiteGraph.tsx` component from CS/CSE
3. You define categories and filter courses into those categories
4. The component displays courses organized by category with prerequisite relationships
5. **Critical**: Prerequisite edges only connect courses within the same category

### File Structure Overview

```
degrees/
├── cs-cse/                    ⚠️ DO NOT MODIFY - Reference only
│   ├── data/
│   │   └── courses.ts
│   ├── components/
│   │   ├── PrerequisiteGraph.tsx
│   │   └── GraphLegend.tsx
│   └── careers/
│
└── [your-degree-id]/          ✅ CREATE THIS
    ├── data/
    │   └── courses.ts         (create new)
    └── components/
        ├── PrerequisiteGraph.tsx  (copy from CS/CSE and adapt)
        └── GraphLegend.tsx        (copy from CS/CSE, optional)
```

---

## ⚠️ Critical Rule: No Cross-Category Prerequisites

### The Rule

**Prerequisite graphs MUST NOT show cross-category prerequisites.**

When a course requires a prerequisite from a different category, **do not create an edge between them in the graph**. Each category branch should only show prerequisites within that same category.

### Examples

**✅ CORRECT:**
- CSE 030 requires CSE 015 and CSE 024 → Create edges: `cse-015 → cse-030` and `cse-024 → cse-030`
- MATH 022 requires MATH 021 → Create edge: `math-021 → math-022`
- PHYS 009 requires PHYS 008 → Create edge: `phys-008 → phys-009`

**❌ INCORRECT:**
- CSE 030 might require MATH 021 in real life, but **do NOT create an edge** `math-021 → cse-030`
- ENGR 065 might require MATH 022, but **do NOT create an edge** `math-022 → engr-065`

### Why This Rule Exists

The graph structure shows courses organized by category. Each category branch (Math, Writing, Physics, CSE, etc.) is independent and shows the hierarchical structure **within that subject area only**. This keeps the visualization clean and focused.

### Implementation

In the `PrerequisiteGraph.tsx` component, when creating edges for prerequisites, you must filter:

```typescript
// CORRECT: Only create edges for prerequisites within the same category
course.prerequisites.forEach((prereqId) => {
  // Only create edge if prerequisite is also in the same category
  if (prereqId.startsWith("cse-")) {  // For CSE category
    cseCourseEdges.push({
      id: `${prereqId}-${course.id}`,
      source: prereqId,
      target: course.id,
      // ...
    });
  }
});

// WRONG: Creating edges for all prerequisites (cross-category)
course.prerequisites.forEach((prereqId) => {
  cseCourseEdges.push({  // ❌ This would create cross-category edges
    id: `${prereqId}-${course.id}`,
    source: prereqId,
    target: course.id,
  });
});
```

### Course Data vs. Graph Display

**Important Distinction**: 

- **Course Data (`courses.ts`)**: Can include ALL prerequisites in the `prerequisites` array, including cross-category ones, for data completeness and accuracy.

- **Graph Visualization**: The `PrerequisiteGraph.tsx` component **filters out cross-category prerequisites** when creating edges. **Only same-category prerequisite edges are created and displayed in the graph**.

**Result**: Even if your course data includes `prerequisites: ["bio-101", "math-021"]`, the graph will ONLY show an edge from `bio-101` (if it's in the same category). The `math-021` prerequisite is ignored when creating edges. **No cross-category edges will appear in the graph visualization.**

---

## 📁 Files You Will Create

When creating a new degree (e.g., "Biology"), you will create the following files:

### Required Files

1. **`degrees/[degree-id]/data/courses.ts`**
   - New file with all course data
   - Contains course information and prerequisites
   - Can include cross-category prerequisites in data (filtering happens in component)

2. **`degrees/[degree-id]/components/PrerequisiteGraph.tsx`**
   - Copy from `cs-cse/components/PrerequisiteGraph.tsx`
   - Adapt for your degree's categories and course filtering logic
   - Update root node ID and label
   - Update category definitions
   - Update course filtering logic for each category
   - **Important**: Implement prerequisite filtering to prevent cross-category edges

3. **`degrees/[degree-id]/components/GraphLegend.tsx` (Optional)**
   - Copy from `cs-cse/components/GraphLegend.tsx`
   - Usually doesn't need changes (shows year color legend)

---

## 📝 Files You Will Modify

### Files to Modify

1. **`degrees/components/DegreesSidebar.tsx`**
   - Add your degree to the `degrees` array

2. **`degrees/components/DegreesContent.tsx`**
   - Add import for your PrerequisiteGraph component
   - Add conditional rendering for your degree
   - Add reset handlers (follow the pattern used for CS/CSE)

---

## ⛔ Files You MUST NOT Touch

**NEVER modify these files** when creating a new degree:

1. ❌ `degrees/cs-cse/` - **ENTIRE DIRECTORY** (Reference implementation only)
2. ❌ `degrees/components/DegreesHeader.tsx` (Shared component)
3. ❌ `degrees/components/DegreesSidebar.tsx` structure (Only add to array, don't modify component logic)
4. ❌ `src/types/course.ts` (Shared types - do not modify unless adding new fields)

---

## 🚀 Step-by-Step Implementation

### Placeholder Conventions

Throughout this guide, you'll see placeholders that need to be replaced:

- **`[degree-id]`**: Your kebab-case degree identifier (e.g., `biology`, `chemistry`, `psychology`)
  - Used in: directory names, file paths, import paths, conditional checks, root node IDs
  - Format: lowercase letters and hyphens only

- **`[DegreeName]`**: Your degree name in PascalCase (e.g., `Biology`, `Chemistry`)
  - Used in: React component names, variable names
  - Format: PascalCase

- **`[degreeName]`**: Your degree name in camelCase (e.g., `biology`, `chemistry`)
  - Used in: TypeScript variable names
  - Format: camelCase

**Example Mapping**:
- Degree ID: `biology` → DegreeName: `Biology` → degreeName: `biology`
- Degree ID: `cs-cse` → DegreeName: `CSCSE` → degreeName: `csCse`

---

### Step 1: Choose Your Degree ID

Choose a kebab-case identifier for your degree. This will be used in:
- Directory name
- File paths
- Import paths
- Conditional checks in DegreesContent
- Root node ID in graph

**Examples:**
- `biology` (not `Biology` or `bio`)
- `chemistry` (not `Chemistry` or `chem`)
- `psychology` (not `Psychology` or `psych`)

**Rule**: Use lowercase letters and hyphens only. No underscores, no camelCase, no spaces.

---

### Step 2: Create Directory Structure

Create the following directory structure:

```bash
degrees/[your-degree-id]/
├── data/
└── components/
```

**Example for Biology:**
```bash
degrees/biology/
├── data/
└── components/
```

**Do NOT create these directories inside `cs-cse/`**. Create them as siblings to `cs-cse/`.

---

### Step 3: Create courses.ts File

**File Path**: `degrees/[your-degree-id]/data/courses.ts`

This file contains all course data for your degree.

#### File Template

```typescript
/**
 * [Degree Name] Course Data
 * Contains all courses and their prerequisites for the [Degree Name] degree program
 */
import { Course } from "@/types/course";

export const [degreeName]Courses: Course[] = [
  // Organize by year and semester for easier maintenance
  
  // First Year - Fall
  {
    id: "course-id-1",              // Required: unique kebab-case identifier
    code: "COURSE 101",             // Required: course code (e.g., "BIOL 101")
    name: "Course Name",            // Required: short course name
    fullName: "COURSE 101: Course Name",  // Required: full display name
    year: 1,                        // Required: 1, 2, 3, or 4
    semester: "fall",               // Required: "fall" or "spring"
    prerequisites: [],              // Required: array of course IDs (empty if none)
    isCategory: false,              // Optional: true for GenEd/Elective category nodes
  },
  
  // First Year - Spring
  {
    id: "course-id-2",
    code: "COURSE 102",
    name: "Course Name 2",
    fullName: "COURSE 102: Course Name 2",
    year: 1,
    semester: "spring",
    prerequisites: ["course-id-1"],  // References other course IDs
  },
  
  // ... more courses
];
```

#### Important Rules for Course Data

1. **IDs must be unique and kebab-case**: `"bio-101"`, `"chem-201"`, `"psych-150"`
2. **Prerequisites reference other course IDs**: `prerequisites: ["bio-101", "bio-102"]`
3. **Cross-category prerequisites in data are allowed but NOT displayed**: You can include cross-category prerequisites in your course data (e.g., a Biology course requiring MATH 021) for data completeness. However, **the graph component will filter these out when creating edges** - **NO cross-category edges will appear in the graph visualization**. Only same-category prerequisite edges are created and displayed.
4. **Category nodes** (GenEd/Electives) should have `isCategory: true`
5. **Organize by year/semester** for easier maintenance

#### Course ID Naming Convention

Use a prefix that matches your category:
- Biology courses: `"bio-101"`, `"bio-102"`
- Chemistry courses: `"chem-201"`, `"chem-202"`
- Math courses: `"math-021"`, `"math-022"`
- Writing courses: `"wri-010"`, `"wri-upper-div"`

This prefix is used in the graph component to filter courses by category.

#### Example: Biology Degree

```typescript
/**
 * Biology Course Data
 * Contains all courses and their prerequisites for the Biology degree program
 */
import { Course } from "@/types/course";

export const biologyCourses: Course[] = [
  // First Year - Fall
  {
    id: "bio-101",
    code: "BIOL 101",
    name: "General Biology I",
    fullName: "BIOL 101: General Biology I",
    year: 1,
    semester: "fall",
    prerequisites: [],
  },
  {
    id: "math-021",
    code: "MATH 021",
    name: "Calculus I",
    fullName: "MATH 021: Calculus I for Physical Sciences and Engineering",
    year: 1,
    semester: "fall",
    prerequisites: [],
  },
  
  // First Year - Spring
  {
    id: "bio-102",
    code: "BIOL 102",
    name: "General Biology II",
    fullName: "BIOL 102: General Biology II",
    year: 1,
    semester: "spring",
    prerequisites: ["bio-101"],  // Only same-category prerequisite shown in graph
  },
  {
    id: "math-022",
    code: "MATH 022",
    name: "Calculus II",
    fullName: "MATH 022: Calculus II for Physical Sciences and Engineering",
    year: 1,
    semester: "spring",
    prerequisites: ["math-021"],  // Only same-category prerequisite shown in graph
  },
  
  // Note: bio-102 might require math-021 in real life, but the graph will NOT show that edge
  // because it's cross-category. Even if you include "math-021" in the prerequisites array,
  // the graph component filters it out when creating edges. Only same-category prerequisites
  // (like "bio-101") will have edges displayed in the graph visualization.
];
```

---

### Step 4: Copy and Adapt PrerequisiteGraph Component

**File Path**: `degrees/[your-degree-id]/components/PrerequisiteGraph.tsx`

#### 4.1: Copy the File

Copy `degrees/cs-cse/components/PrerequisiteGraph.tsx` to your new directory.

#### 4.2: Update Import Statement

Change the import to use your courses data:

```typescript
// OLD (CS/CSE)
import { cseCourses } from "../data/courses";

// NEW (Your Degree)
import { [degreeName]Courses } from "../data/courses";
```

#### 4.3: Update Root Node ID and Label

Find the root node creation (around line 676) and update:

```typescript
// OLD (CS/CSE)
const rootNode: Node = {
  id: "cs-cse-root",
  type: "root",
  data: { label: "CS/CSE" },
  position: { x: 0, y: 0 },
};

// NEW (Your Degree)
const rootNode: Node = {
  id: "[degree-id]-root",  // e.g., "biology-root"
  type: "root",
  data: { label: "[Degree Name]" },  // e.g., "Biology"
  position: { x: 0, y: 0 },
};
```

Also update the root node lookup in `getLayoutedElements`:

```typescript
// OLD
const rootNode = nodes.find((n) => n.id === "cs-cse-root");

// NEW
const rootNode = nodes.find((n) => n.id === "[degree-id]-root");
```

#### 4.4: Define Your Categories

Define which categories you want to display. This should match how you've organized your courses in `courses.ts`.

```typescript
// Example categories for Biology degree
const categories = ["Biology", "Math", "Chemistry", "Physics", "Writing"];

// Create category nodes
const categoryNodes: Node[] = categories.map((category, index) => ({
  id: `category-${category.toLowerCase()}`,
  type: "category",
  data: {
    label: category,
    isExpanded: expandedCategories.has(`category-${category.toLowerCase()}`),
    onToggle: () => handleCategoryToggle(`category-${category.toLowerCase()}`),
  },
  position: { x: 0, y: 0 },
}));
```

#### 4.5: Update Course Filtering Logic

For each category, you need to:
1. Filter courses that belong to that category (based on course ID prefix)
2. Create course nodes
3. Create prerequisite edges (ONLY for prerequisites within the same category)

**Template for each category branch:**

```typescript
// Example: Biology category
const biologyCategoryId = "category-biology";
const isBiologyExpanded = expandedCategories.has(biologyCategoryId);

const biologyCourseNodes: Node[] = [];
const biologyCourseEdges: Edge[] = [];

if (isBiologyExpanded) {
  // 1. Filter courses for this category (courses starting with "bio-")
  // ⚠️ IMPORTANT: If using generic patterns (like "upper-div", "elective"), 
  // exclude other category prefixes to avoid overlapping filters
  const filteredBiologyCourses = courses.filter((course) => 
    course.id.startsWith("bio-")
  );
  
  // 2. Create course nodes
  filteredBiologyCourses.forEach((course) => {
    biologyCourseNodes.push({
      id: course.id,
      type: "course",
      data: { course },
      position: { x: 0, y: 0 },
    });
  });

  // 3. Create prerequisite edges (ONLY same-category prerequisites)
  filteredBiologyCourses.forEach((course) => {
    if (course.prerequisites.length === 0) {
      // Course with no prerequisites connects from category
      biologyCourseEdges.push({
        id: `${biologyCategoryId}-${course.id}`,
        source: biologyCategoryId,
        target: course.id,
        type: "smoothstep",
        animated: false,
        style: { stroke: "#94a3b8", strokeWidth: 2 },
      });
    } else {
      // Course with prerequisites - ONLY create edges for same-category prerequisites
      course.prerequisites.forEach((prereqId) => {
        // ⚠️ CRITICAL: Only create edge if prerequisite is also a Biology course
        if (prereqId.startsWith("bio-")) {
          biologyCourseEdges.push({
            id: `${prereqId}-${course.id}`,
            source: prereqId,
            target: course.id,
            type: "smoothstep",
            animated: false,
            style: { stroke: "#94a3b8", strokeWidth: 2 },
          });
        }
        // If prereqId starts with "math-", "chem-", etc., DO NOT create an edge
      });
    }
  });
}
```

**Repeat this pattern for each category** (Math, Chemistry, Physics, Writing, etc.).

**⚠️ Special Case: Generic Patterns in Course IDs**

If your course IDs use generic patterns that might overlap with other categories (e.g., "upper-div", "lower-div", "elective"), you must exclude other category prefixes:

```typescript
// Example: POLI category with upper-division courses
// Problem: Both POLI and Writing have "upper-div" in their IDs
// - POLI: "poli-upper-div-american"
// - Writing: "wri-upper-div"

// ❌ WRONG - Catches courses from Writing category too
const allPoliCourses = courses.filter((course) => 
  course.id.startsWith("poli-") || course.id.includes("upper-div")
);

// ✅ CORRECT - Excludes Writing courses
const allPoliCourses = courses.filter((course) => 
  course.id.startsWith("poli-") || (course.id.includes("upper-div") && !course.id.startsWith("wri-"))
);
```

**Apply this pattern in BOTH places:**
1. Course creation (in `useMemo` when filtering `courses`)
2. Layout positioning (in `getLayoutedElements` when filtering `courseNodes`)

#### 4.6: Update Layout Function

The `getLayoutedElements` function needs to be adapted for your specific course structure. The CS/CSE version has hardcoded logic for specific courses (MATH 021, MATH 022, CSE 022, etc.).

You have two options:

**Option A: Generic Layout (Recommended for simpler structures)**
- Use a generic level-based layout algorithm
- Position courses based on prerequisite depth/level
- More flexible but less precise

**Option B: Specific Layout (For complex structures)**
- Hardcode positions for specific courses (like CS/CSE does)
- More precise control but requires more maintenance
- Follow the CS/CSE pattern if your structure is similarly complex

For most degrees, **Option A (generic layout)** is recommended. You can simplify the layout function to use prerequisite depth.

#### 4.6.1: Export Positions Button (For Setting Custom Layouts)

When creating a prerequisite graph, you may want to manually arrange nodes to prevent overlap and create an optimal layout. The graph component includes an **"Export Positions"** button that allows you to export the current node positions after manually dragging them into place.

**How to Use Export Positions:**

1. **Enable the Export Button**:
   - The export functionality is already built into the `PrerequisiteGraph` component
   - Add the export handler to `DegreesContent.tsx` following the pattern for reset handlers:

   ```typescript
   // Add ref for export positions
   const export[DegreeName]PositionsRef = useRef<(() => void) | null>(null);

   // Add handler
   const handleExport[DegreeName]PositionsReady = useRef((handler: () => void) => {
     export[DegreeName]PositionsRef.current = handler;
   });
   ```

2. **Add Export Button to GraphLegend**:
   - The `GraphLegend` component accepts an `onExportPositionsClick` prop
   - Pass the export handler to the legend:

   ```typescript
   <[DegreeName]GraphLegend 
     onExportPositionsClick={export[DegreeName]PositionsRef.current || undefined}
     // ... other props
   />
   ```

3. **Pass Export Handler to PrerequisiteGraph**:
   - Add `onExportPositionsReady` prop to your PrerequisiteGraph component:

   ```typescript
   <[DegreeName]PrerequisiteGraph 
     onExportPositionsReady={handleExport[DegreeName]PositionsReady.current}
     // ... other props
   />
   ```

4. **Export Positions**:
   - Navigate to your degree page in the browser
   - Expand all categories to show all course nodes
   - Manually drag nodes to their desired positions (arrange them to prevent overlap)
   - Click the **"Export Positions"** button in the graph legend
   - The positions will be:
     - Logged to the browser console
     - Automatically copied to your clipboard
   - You'll get a JSON object with all node positions

5. **Use Exported Positions in Code**:
   - Copy the exported JSON from the console
   - Create a constant in your `PrerequisiteGraph.tsx` file:

   ```typescript
   // Predefined optimal positions when formatted layout is active
   // These positions were manually arranged to prevent overlap
   const FORMATTED_LAYOUT_POSITIONS: Record<string, { x: number; y: number }> = {
     "[degree-id]-root": { x: 0, y: 40 },
     "category-[category-1]": { x: -180, y: 160 },
     "category-[category-2]": { x: 0, y: 160 },
     "category-[category-3]": { x: 180, y: 160 },
     "course-id-1": { x: -461, y: 270 },
     // ... paste all your exported positions here
   };
   ```

6. **Update Layout Function to Use Predefined Positions**:
   - In the `getLayoutedElements` function, check for predefined positions when formatted layout is active:

   ```typescript
   // Position root node
   if (rootNode) {
     if (useFormattedLayout && FORMATTED_LAYOUT_POSITIONS[rootNode.id]) {
       rootNode.position = FORMATTED_LAYOUT_POSITIONS[rootNode.id];
     } else {
       rootNode.position = savedPositions[rootNode.id] || { x: 0, y: 40 };
     }
   }

   // Position category nodes
   if (useFormattedLayout) {
     categoryNodes.forEach((node) => {
       if (FORMATTED_LAYOUT_POSITIONS[node.id]) {
         node.position = FORMATTED_LAYOUT_POSITIONS[node.id];
       } else {
         node.position = savedPositions[node.id] || { x: 0, y: 160 };
       }
     });
   }

   // Position course nodes (similar pattern for each category)
   if (useFormattedLayout && FORMATTED_LAYOUT_POSITIONS[courseNode.id]) {
     courseNode.position = FORMATTED_LAYOUT_POSITIONS[courseNode.id];
   } else {
     // Use calculated or saved position
   }
   ```

**Benefits of Using Export Positions:**
- Allows developers to manually arrange nodes for optimal layout
- Prevents overlap when all categories are expanded
- Creates a consistent, professional appearance
- Positions are saved in code, so they're always used when formatted layout is active

**Note**: The formatted layout is automatically enabled when any category is expanded, so your predefined positions will be used by default when users expand categories.

#### 4.7: Update Component Export

The component export should remain the same. No changes needed unless you're renaming the component.

---

### Step 5: Copy GraphLegend Component (Optional)

**File Path**: `degrees/[your-degree-id]/components/GraphLegend.tsx`

Copy `degrees/cs-cse/components/GraphLegend.tsx` to your directory. Usually no changes are needed - it shows the year color legend which is the same for all degrees.

---

### Step 6: Add Degree to Sidebar

**File**: `degrees/components/DegreesSidebar.tsx`

Add your degree to the `degrees` array:

```typescript
const degrees = [
  "CS/CSE",
  "[Your Degree Name]",  // Add here (e.g., "Biology")
];
```

---

### Step 7: Integrate into DegreesContent

**File**: `degrees/components/DegreesContent.tsx`

#### 7.1: Add Import

Add import for your PrerequisiteGraph component at the top:

```typescript
import [DegreeName]PrerequisiteGraph from "../[degree-id]/components/PrerequisiteGraph";
import [DegreeName]GraphLegend from "../[degree-id]/components/GraphLegend";
```

#### 7.2: Add Reset and Export Handlers

Add refs and handlers for reset and export functionality (follow the CS/CSE pattern):

```typescript
// Add refs
const reset[DegreeName]GraphRef = useRef<(() => void) | null>(null);
const fullReset[DegreeName]GraphRef = useRef<(() => void) | null>(null);
const export[DegreeName]PositionsRef = useRef<(() => void) | null>(null);

// Add state
const [reset[DegreeName]Ready, setReset[DegreeName]Ready] = useState(false);
const [fullReset[DegreeName]Ready, setFullReset[DegreeName]Ready] = useState(false);

// Add handlers
const handleReset[DegreeName]Ready = useRef((handler: () => void) => {
  reset[DegreeName]GraphRef.current = handler;
  requestAnimationFrame(() => {
    setReset[DegreeName]Ready(true);
  });
});

const handleFullReset[DegreeName]Ready = useRef((handler: () => void) => {
  fullReset[DegreeName]GraphRef.current = handler;
  requestAnimationFrame(() => {
    setFullReset[DegreeName]Ready(true);
  });
});

const handleExport[DegreeName]PositionsReady = useRef((handler: () => void) => {
  export[DegreeName]PositionsRef.current = handler;
});
```

#### 7.3: Add Conditional Rendering

Add conditional rendering for your degree (follow the CS/CSE pattern):

```typescript
// Find the section where CS/CSE is rendered and add your degree nearby
else if (selectedDegree === "[Your Degree Name]" && !selectedCareerPath) {
  return (
    <div className="w-full">
      <[DegreeName]PrerequisiteGraph
        onResetReady={handleReset[DegreeName]Ready.current}
        onFullResetReady={handleFullReset[DegreeName]Ready.current}
        onExportPositionsReady={handleExport[DegreeName]PositionsReady.current}
      />
      <[DegreeName]GraphLegend
        onResetPositions={() => {
          if (reset[DegreeName]Ready && reset[DegreeName]GraphRef.current) {
            reset[DegreeName]GraphRef.current();
          }
        }}
        onFullReset={() => {
          if (fullReset[DegreeName]Ready && fullReset[DegreeName]GraphRef.current) {
            fullReset[DegreeName]GraphRef.current();
          }
        }}
        onExportPositionsClick={export[DegreeName]PositionsRef.current || undefined}
      />
    </div>
  );
}
```

---

## 📋 Code Templates

### Complete courses.ts Template

See Step 3 for the complete template with examples.

### Complete PrerequisiteGraph.tsx Adaptation Checklist

- [ ] Copy file from `cs-cse/components/PrerequisiteGraph.tsx`
- [ ] Update import to use your courses data
- [ ] Update root node ID (search for `"cs-cse-root"` and replace)
- [ ] Update root node label
- [ ] Update root node lookup in `getLayoutedElements`
- [ ] Define your categories array
- [ ] Update category node creation
- [ ] For each category:
  - [ ] Filter courses (e.g., `course.id.startsWith("bio-")`)
  - [ ] Create course nodes
  - [ ] Create prerequisite edges with filtering (e.g., `if (prereqId.startsWith("bio-"))`)
- [ ] Combine all category nodes and edges
- [ ] Update layout function (use generic or specific layout)
- [ ] **Add export positions functionality** (see Section 4.6.1):
  - [ ] Add `onExportPositionsReady` prop to component interface
  - [ ] Add export positions handler and ref
  - [ ] Add `exportNodePositions` function
  - [ ] Expose export function via `useEffect` and `onExportPositionsReady`
  - [ ] Add export button to GraphLegend component
  - [ ] Add export handler to DegreesContent.tsx
- [ ] Test thoroughly

---

## ✅ Integration Steps Summary

1. Create directory structure: `degrees/[degree-id]/data/` and `degrees/[degree-id]/components/`
2. Create `courses.ts` with all course data
3. Copy and adapt `PrerequisiteGraph.tsx`
4. Copy `GraphLegend.tsx` (optional, usually no changes)
5. Add degree to `DegreesSidebar.tsx`
6. Add imports, handlers, and conditional rendering to `DegreesContent.tsx`
7. Test the implementation

---

## 🐛 Common Issues and Solutions

### Issue: Cross-category prerequisites showing in graph

**Problem**: You're creating edges for prerequisites that belong to different categories. Cross-category edges should NEVER appear in the graph.

**Solution**: Make sure you're filtering prerequisites when creating edges. The filter ensures ONLY same-category prerequisites create edges:

```typescript
// CORRECT - Only creates edges for same-category prerequisites
if (prereqId.startsWith("bio-")) {  // Only Biology courses
  edges.push({ source: prereqId, target: course.id });
}
// Cross-category prerequisites (math-, chem-, etc.) are ignored - no edge created

// WRONG - Creates edges for ALL prerequisites (including cross-category)
edges.push({ source: prereqId, target: course.id });  // ❌ This creates cross-category edges!
```

**Result**: With the correct filtering, cross-category prerequisites in your data are ignored when creating edges. Only same-category prerequisites create visible edges in the graph.

### Issue: Courses not appearing when category is expanded

**Problem**: Course filtering logic doesn't match your course ID prefix.

**Solution**: Check that your filter matches your course ID prefix:

```typescript
// If your courses have IDs like "bio-101", "bio-102"
const filteredCourses = courses.filter((course) => course.id.startsWith("bio-"));

// If your courses have IDs like "biology-101", "biology-102"
const filteredCourses = courses.filter((course) => course.id.startsWith("biology-"));
```

### Issue: Course positioned incorrectly or appearing in wrong category

**Problem**: Overlapping filter patterns cause courses from one category to be caught by another category's filter. This is especially common when multiple categories use similar ID patterns (e.g., both have "upper-div" in their IDs).

**Example Bug**: 
- Writing course: `"wri-upper-div"`
- POLI course filter: `n.id.startsWith("poli-") || n.id.includes("upper-div")`
- Result: `wri-upper-div` gets positioned in both Writing AND POLI sections, causing it to appear far from where it should be.

**Solution**: Make filters more specific by excluding other categories:

```typescript
// ❌ WRONG - Too broad, catches courses from other categories
const allPoliCourses = courseNodes.filter((n) => 
  n.id.startsWith("poli-") || n.id.includes("upper-div")
);
// This catches: "poli-upper-div-*" AND "wri-upper-div" ❌

// ✅ CORRECT - Excludes courses from other categories
const allPoliCourses = courseNodes.filter((n) => 
  n.id.startsWith("poli-") || (n.id.includes("upper-div") && !n.id.startsWith("wri-"))
);
// This catches: "poli-upper-div-*" but NOT "wri-upper-div" ✅
```

**Best Practice**: When using generic patterns (like "upper-div", "lower-div", "elective"), always exclude other category prefixes:

```typescript
// Pattern: Include your category OR (generic pattern AND NOT other categories)
const filteredCourses = courseNodes.filter((n) => 
  n.id.startsWith("your-prefix-") || 
  (n.id.includes("generic-pattern") && !n.id.startsWith("other-category-"))
);
```

**Where to fix**: Check BOTH places where courses are filtered:
1. **Layout positioning function** (`getLayoutedElements`) - filters `courseNodes`
2. **Course creation** (in `useMemo`) - filters `courses` array

### Issue: Root node not found error

**Problem**: Root node ID mismatch between creation and lookup.

**Solution**: Make sure the root node ID is consistent:

```typescript
// When creating root node
id: "[degree-id]-root"

// When looking up root node
nodes.find((n) => n.id === "[degree-id]-root")
```

### Issue: Categories not expanding

**Problem**: Category toggle handler not set up correctly.

**Solution**: Make sure category nodes have the correct `onToggle` callback:

```typescript
data: {
  label: category,
  isExpanded: expandedCategories.has(`category-${category.toLowerCase()}`),
  onToggle: () => handleCategoryToggle(`category-${category.toLowerCase()}`),
}
```

---

## 📐 Rules and Best Practices

### Prerequisite Filtering Rule (CRITICAL)

1. **Always filter prerequisites by category prefix** when creating edges
2. **Never create edges between different categories**
3. **Each category branch is independent**

### Course ID Naming

1. Use consistent prefixes for each category (e.g., `"bio-"`, `"math-"`, `"chem-"`)
2. Use kebab-case for all IDs
3. Keep IDs unique across all courses

### Category Organization

1. Organize courses into logical categories (by subject area)
2. Each category should have a clear prefix pattern
3. Categories should be mutually exclusive (a course belongs to one category)

### Layout Strategy

1. Use generic layout for simpler structures
2. Use specific layout only if you need precise control (like CS/CSE)
3. Test layout with all categories expanded

---

## ✅ Testing Checklist

- [ ] All courses appear when their category is expanded
- [ ] Prerequisites show correctly within each category
- [ ] **NO cross-category prerequisite edges appear in the graph** (even if cross-category prerequisites exist in course data)
- [ ] Root node displays correctly
- [ ] Category nodes expand/collapse correctly
- [ ] Course nodes are color-coded by year
- [ ] Draggable nodes work correctly
- [ ] Format layout button works
- [ ] Reset positions button works
- [ ] Reset graph button works (full reset)
- [ ] **Export positions button works** (logs positions to console and copies to clipboard)
- [ ] Graph displays correctly in DegreesContent
- [ ] No console errors
- [ ] TypeScript compiles without errors
- [ ] **After manual positioning: Export positions and verify they can be used to set FORMATTED_LAYOUT_POSITIONS**

---

## 📚 Related Documentation

- [Degrees Page Documentation](DEGREES_PAGE.md) - Overall degrees page structure
- [Career Path Graph Guide](../cs-cse/CAREER_GRAPH_BUILD_GUIDE.md) - For career path graphs (different type)
- [Graph Structure Guide](GRAPH_STRUCTURE_GUIDE.md) - Additional graph structure details

---

## ❓ Questions to Ask Before Starting

Before creating a new degree prerequisite graph, you should ask the following questions to ensure you have all necessary information:

### Basic Information

1. **Degree Identification**:
   - What is the degree name? (e.g., "Biology", "Chemistry", "Psychology")
   - What should the degree ID be? (kebab-case identifier, e.g., `biology`, `chemistry`)
   - Is this degree already listed in the sidebar, or does it need to be added?

2. **Course Data Availability**:
   - Do you have a complete list of all courses required for this degree?
   - Are course codes and names available for all courses?
   - Do you have prerequisite information for each course?
   - Are course years and semesters (fall/spring) available?

### Category Organization

3. **Category Structure**:
   - How should courses be organized into categories? (e.g., by subject: Biology, Math, Chemistry, Physics)
   - What categories are needed for this degree?
   - Should categories match existing patterns (Math, Writing, etc.) or are custom categories needed?
   - Are there any special category types (e.g., GenEd, Electives) that need special handling?

4. **Course ID Prefixes**:
   - What prefix should be used for each category's course IDs? (e.g., `bio-` for Biology, `chem-` for Chemistry)
   - Do course IDs need to follow a specific naming convention?
   - Are there any existing course IDs in the codebase that might conflict?

### Prerequisites

5. **Prerequisite Relationships**:
   - Are all prerequisites clearly defined for each course?
   - Are there any cross-category prerequisites in the data? (Remember: these can exist in data but won't show as edges in the graph)
   - Do any courses have circular dependencies that need to be resolved?
   - Are there any courses with no prerequisites (entry-level courses)?

### Layout and Display

6. **Graph Layout Preferences**:
   - Do you prefer a generic layout (automatic positioning) or a specific layout (manual positioning for complex structures)?
   - Are there any specific courses that need special positioning?
   - How many courses are in each category? (This helps determine if a simple or complex layout is needed)

7. **Visual Requirements**:
   - Should the graph use the same year color coding as CS/CSE? (Year 1-4 colors)
   - Are there any custom styling requirements?
   - Should the GraphLegend component be included? (Usually yes, but confirm)

### Integration

8. **Sidebar and Navigation**:
   - Should this degree appear in the sidebar navigation?
   - What should the display name be in the sidebar? (May differ from internal ID)
   - Are there any career paths associated with this degree that need to be considered?

9. **Existing Implementation**:
   - Does any part of this degree already exist in the codebase?
   - Are there any existing files or components that should be referenced?
   - Is this a new degree or an update to an existing one?

### Data Completeness

10. **Course Information**:
    - For each course, do you have:
      - Course code (e.g., "BIOL 101")
      - Course name (e.g., "General Biology I")
      - Full display name
      - Year (1-4)
      - Semester (fall/spring)
      - Prerequisites (list of course IDs)
    - Is all course data ready, or will it need to be created/filled in manually?

11. **Data Source**:
    - Where is the course data coming from? (University catalog, existing documentation, manual entry)
    - Is the data in a specific format that needs conversion?
    - Will the data be provided or does it need to be researched?

### Technical Details

12. **Implementation Approach**:
    - Should this follow the CS/CSE implementation pattern exactly, or are there custom requirements?
    - Are there any unique features or requirements for this degree's graph?
    - Will this degree have career paths that also need to be created?

13. **Testing and Validation**:
    - Are there any known issues or edge cases with the course data?
    - Should the implementation be tested against a specific reference?
    - Are there any validation requirements for the course data?

### Timeline and Scope

14. **Scope Clarification**:
    - Should this include just the prerequisite graph, or also career paths?
    - Is this a complete implementation or a partial/initial version?
    - Are there any features that should be deferred to a later phase?

15. **Reference and Examples**:
    - Should I reference the CS/CSE implementation as a guide?
    - Are there any other degree implementations that should be used as reference?
    - Do you have any examples or mockups of how this should look?

---

**Note**: If you're an LLM assisting with implementation, ask these questions before starting to ensure you have all necessary information. Missing information can lead to incomplete implementations or the need for significant rework.

---

**End of Guide**
