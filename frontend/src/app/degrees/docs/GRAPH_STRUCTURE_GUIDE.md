# Prerequisite Graph Structure Guide

This guide explains how the prerequisite graph visualization is built, so you can easily recreate it for new degrees.

## Overview

The prerequisite graph is an interactive visualization that shows:
- **Root Node**: The degree name (e.g., "CS/CSE")
- **Category Nodes**: Subject areas (Math, Writing, Physics, etc.)
- **Course Nodes**: Individual courses with prerequisite relationships
- **Edges**: Arrows showing prerequisite dependencies

## File Structure

```
degrees/
└── [degree-name]/
    ├── data/
    │   └── courses.ts          # Course data with prerequisites
    └── components/
        ├── PrerequisiteGraph.tsx  # Main graph component
        └── GraphLegend.tsx       # Color legend (optional)
```

## Step 1: Define Course Data

### File: `data/courses.ts`

Create a TypeScript file that exports an array of `Course` objects.

### Course Interface

```typescript
import { Course } from "@/types/course";

export const [degree]Courses: Course[] = [
  {
    id: "unique-course-id",        // Required: unique identifier (kebab-case)
    code: "COURSE 123",            // Required: course code
    name: "Course Name",           // Required: short name
    fullName: "COURSE 123: Course Name",  // Required: full display name
    year: 1,                       // Required: 1, 2, 3, or 4
    semester: "fall",              // Required: "fall" or "spring"
    prerequisites: ["prereq-id"],  // Required: array of course IDs (empty if none)
    isCategory: false,             // Optional: true for GenEd/Elective nodes
  },
  // ... more courses
];
```

### Important Rules

1. **IDs must be unique and kebab-case**: `"math-021"`, `"cse-022"`, `"wri-010"`
2. **Prerequisites reference other course IDs**: `prerequisites: ["math-021"]`
3. **Category nodes** (GenEd/Electives) should have `isCategory: true`
4. **Organize by year/semester** for easier maintenance

### Example Structure

```typescript
export const cseCourses: Course[] = [
  // First Year - Fall
  {
    id: "math-021",
    code: "MATH 021",
    name: "Calculus I",
    fullName: "MATH 021: Calculus I for Physical Sciences and Engineering",
    year: 1,
    semester: "fall",
    prerequisites: [],  // No prerequisites
  },
  {
    id: "math-022",
    code: "MATH 022",
    name: "Calculus II",
    fullName: "MATH 022: Calculus II for Physical Sciences and Engineering",
    year: 1,
    semester: "spring",
    prerequisites: ["math-021"],  // Requires MATH 021
  },
  // Category node example
  {
    id: "gened-b",
    code: "GenED B",
    name: "General Education Area B",
    fullName: "General Education Area B",
    year: 2,
    semester: "spring",
    prerequisites: ["cse-015", "cse-024", "engr-091"],
    isCategory: true,  // Marks as category node
  },
];
```

## Step 2: Create Graph Component

### File: `components/PrerequisiteGraph.tsx`

Copy the structure from `cs-cse/components/PrerequisiteGraph.tsx` and adapt it.

### Key Components

#### 1. Custom Node Types

```typescript
// Root Node - Circular, shows degree name
function RootNode({ data }: { data: { label: string } }) {
  return (
    <div className="w-24 h-24 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center shadow-lg relative">
      <Handle type="source" position={Position.Bottom} />
      <div className="text-base font-bold text-primary text-center">
        {data.label}
      </div>
    </div>
  );
}

// Category Node - Circular, clickable
function CategoryNode({ data }: { data: { label: string; isExpanded?: boolean; onToggle?: () => void } }) {
  // ... implementation
}

// Course Node - Rectangular, color-coded by year
function CourseNode({ data }: { data: { course: Course } }) {
  // ... implementation with year-based colors
}
```

#### 2. Category Definition

Define which categories you want to display:

```typescript
const categories = ["Math", "Writing", "Physics", "Spark", "Engineering", "CSE"];
```

**Important**: Category names should match how you filter courses in your data.

#### 3. Course Filtering Logic

For each category, filter courses that belong to it:

```typescript
// Example: Math courses
const mathCategoryId = "category-math";
const isMathExpanded = expandedCategories.has(mathCategoryId);

if (isMathExpanded) {
  // Filter courses that start with "math-"
  const mathCourses = courses.filter((course) => course.id.startsWith("math-"));
  
  // Create nodes and edges
  mathCourses.forEach((course) => {
    // Create node
    mathCourseNodes.push({
      id: course.id,
      type: "course",
      data: { course },
      position: { x: 0, y: 0 },  // Will be positioned by layout function
    });
    
    // Create edges from prerequisites
    course.prerequisites.forEach((prereqId) => {
      mathCourseEdges.push({
        id: `${prereqId}-${course.id}`,
        source: prereqId,
        target: course.id,
        type: "smoothstep",
        animated: false,
        style: { stroke: "#94a3b8", strokeWidth: 2 },
      });
    });
  });
}
```

#### 4. Layout Algorithm

The `getLayoutedElements` function positions nodes:

```typescript
function getLayoutedElements(nodes: Node[], edges: Edge[], useFormattedLayout: boolean = false) {
  // 1. Position root node at top center
  const rootNode = nodes.find(n => n.type === "root");
  rootNode.position = { x: 0, y: 40 };
  
  // 2. Position category nodes in a row below root
  const categoryNodes = nodes.filter(n => n.type === "category");
  const categorySpacing = useFormattedLayout ? 350 : 180;
  const categoryStartX = -((categoryNodes.length - 1) * categorySpacing) / 2;
  categoryNodes.forEach((node, index) => {
    node.position = {
      x: categoryStartX + index * categorySpacing,
      y: 160,
    };
  });
  
  // 3. Position course nodes below their category
  // Use topological sort to determine levels
  // Position based on prerequisite depth
  // ... (see full implementation)
  
  return { nodes, edges };
}
```

### Layout Configuration

Adjust these values to fit your graph:

```typescript
// Category spacing
const categorySpacing = useFormattedLayout ? 350 : 180;  // Horizontal spacing between categories

// Course positioning
const verticalSpacing = 140;        // Vertical spacing between course levels
const horizontalSpacing = useFormattedLayout ? 200 : 220;  // Horizontal spacing within branches
let currentY = 280;                 // Starting Y position for courses
```

## Step 3: Integration

### File: `components/DegreesContent.tsx`

Add the graph to your degree page:

```typescript
import PrerequisiteGraph from "../[degree-name]/components/PrerequisiteGraph";
import GraphLegend from "../[degree-name]/components/GraphLegend";

// In your component:
if (selectedDegree === "[DEGREE_NAME]") {
  return (
    <div className="flex-1 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header content */}
        <GraphLegend />
        <PrerequisiteGraph />
      </div>
    </div>
  );
}
```

## Step 4: Category Filtering Strategy

You need to decide how to filter courses into categories. Common approaches:

### Approach 1: Prefix-based (Recommended)
```typescript
// Math courses: id starts with "math-"
const mathCourses = courses.filter(c => c.id.startsWith("math-"));

// CSE courses: id starts with "cse-"
const cseCourses = courses.filter(c => c.id.startsWith("cse-"));
```

### Approach 2: Category property
Add a `category` property to courses:
```typescript
{
  id: "math-021",
  // ... other fields
  category: "Math",
}
```

Then filter:
```typescript
const mathCourses = courses.filter(c => c.category === "Math");
```

### Approach 3: Code-based
```typescript
// Math courses: code starts with "MATH"
const mathCourses = courses.filter(c => c.code.startsWith("MATH"));
```

## Step 5: Year-Based Color Coding

Courses are automatically color-coded by year:

```typescript
const yearColors: Record<number, { bg: string; border: string }> = {
  1: { bg: "bg-blue-100", border: "border-blue-300" },      // First Year - Blue
  2: { bg: "bg-green-100", border: "border-green-300" },    // Second Year - Green
  3: { bg: "bg-amber-100", border: "border-amber-300" },     // Third Year - Amber
  4: { bg: "bg-purple-100", border: "border-purple-300" }, // Fourth Year - Purple
};
```

## Step 6: Handling Special Cases

### Category Nodes (GenEd/Electives)

Category nodes represent groups of courses:

```typescript
{
  id: "major-technical-elective",
  code: "Major Technical Elective",
  name: "Major Technical Elective",
  fullName: "Major Technical Elective",
  year: 3,
  semester: "fall",
  prerequisites: [
    "cse-030",
    "cse-100",
    // ... multiple prerequisites
  ],
  isCategory: true,  // Important!
}
```

### Courses with Multiple Prerequisites

Simply list all prerequisite IDs:

```typescript
{
  id: "cse-030",
  prerequisites: ["cse-015", "cse-024"],  // Requires both
}
```

### Courses with No Prerequisites

Use an empty array:

```typescript
{
  id: "math-021",
  prerequisites: [],  // No prerequisites
}
```

## Step 7: Testing Your Graph

1. **Check all course IDs are unique**
2. **Verify prerequisite IDs exist** in your course list
3. **Test category expansion** - click each category node
4. **Check layout** - use "Format Layout" button if nodes overlap
5. **Verify colors** - ensure courses show correct year colors

## Common Patterns

### Pattern 1: Linear Prerequisites
```
MATH 021 → MATH 022 → MATH 023
```

### Pattern 2: Branching Prerequisites
```
CSE 030 → CSE 031
       → CSE 100
```

### Pattern 3: Multiple Prerequisites
```
CSE 015 ─┐
         ├→ CSE 030
CSE 024 ─┘
```

## Troubleshooting

### Nodes Don't Appear
- Check that category is expanded
- Verify course filtering logic matches your ID pattern
- Ensure course IDs match prerequisite references

### Nodes Overlap
- Use "Format Layout (No Overlap)" button
- Adjust `categorySpacing` and `horizontalSpacing` values
- Increase `verticalSpacing` for more room

### Edges Missing
- Verify prerequisite IDs exist in course list
- Check that prerequisite courses are also in the same expanded category (if filtering by category)
- Ensure `Handle` components are present on nodes

### Wrong Colors
- Verify `year` property is 1, 2, 3, or 4
- Check `yearColors` mapping in `CourseNode` component

## Example: Adding a New Degree

1. **Create directory structure**:
   ```
   degrees/
   └── new-degree/
       ├── data/
       │   └── courses.ts
       └── components/
           └── PrerequisiteGraph.tsx
   ```

2. **Copy and adapt** `PrerequisiteGraph.tsx` from CS/CSE

3. **Update**:
   - Root node label
   - Category names
   - Course filtering logic
   - Import path for courses data

4. **Add to** `DegreesContent.tsx`:
   ```typescript
   if (selectedDegree === "New Degree") {
     return (
       // ... render graph
     );
   }
   ```

## Key Files Reference

- **Course Type**: `src/types/course.ts`
- **CS/CSE Example**: `degrees/cs-cse/components/PrerequisiteGraph.tsx`
- **CS/CSE Data**: `degrees/cs-cse/data/courses.ts`
- **React Flow Docs**: https://reactflow.dev/

## Best Practices

1. **Consistent ID naming**: Use kebab-case and include subject prefix
2. **Organize data**: Group courses by year/semester in comments
3. **Test incrementally**: Add one category at a time
4. **Document categories**: Add comments explaining category filtering logic
5. **Keep it simple**: Start with core courses, add electives later

