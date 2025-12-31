# Cybersecurity Career Path - Technical Implementation

## 📋 Overview

This document details the technical implementation of the Cybersecurity career path graph visualization. It follows the exact pattern established by the SWE reference implementation.

---

## 📁 File Structure

```
frontend/src/app/degrees/cs-cse/careers/cybersecurity/
├── README.md                           # Career path documentation (you are here)
├── components/
│   └── CareerPathGraph.tsx            # Graph visualization component
└── data/
    ├── index.ts                       # Re-exports
    ├── tierCourses.ts                 # Course data organized by tiers
    └── careerPathConfig.ts            # Graph configuration
```

---

## 🔧 Implementation Details

### 1. Course Data (`data/tierCourses.ts`)

**Purpose**: Define all courses organized by priority tiers.

**Structure**:
```typescript
import { TierCourse } from "@/types/careerPath";

// Tier 1: Must-Take (6 courses)
export const tier1Courses: TierCourse[] = [
  {
    id: "cybersec-cse-178",              // Unique ID with career prefix
    code: "CSE 178",                     // Course code
    name: "Computers and Networks Security",
    fullName: "CSE 178: Computers and Networks Security",
    description: "Direct security concepts: threats, attacks, defenses",
    tier: 1,                             // Must match category tier number
  },
  // ... more courses
];

// Tier 2: Strong Boosters (6 courses)
export const tier2Courses: TierCourse[] = [/* ... */];

// Tier 3: Optional (5 courses)
export const tier3Courses: TierCourse[] = [/* ... */];
```

**Key Requirements**:
- ✅ All course IDs must be unique across ALL career paths (use `cybersec-` prefix)
- ✅ Tier numbers (1, 2, 3) must match category IDs in config ("tier-1", "tier-2", "tier-3")
- ✅ All required fields must be present: `id`, `code`, `name`, `fullName`, `description`, `tier`
- ✅ Use kebab-case for IDs: `cybersec-cse-178`, not `cybersec_cse_178`

**Total Courses**: 17 courses (6 + 6 + 5)

---

### 2. Configuration (`data/careerPathConfig.ts`)

**Purpose**: Define the structure and metadata for the career path graph.

**Structure**:
```typescript
import { CareerPathConfig } from "@/types/careerPath";
import { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";

export const cybersecurityCareerPathConfig: CareerPathConfig = {
  rootLabel: "Cybersecurity",           // Root node label
  
  categories: [
    { 
      id: "tier-1",                     // Must match tier number in courses
      label: "TIER 1: ESSENTIAL SECURITY FOUNDATIONS", 
      emoji: "🟢" 
    },
    { 
      id: "tier-2", 
      label: "TIER 2: ADVANCED SECURITY TOPICS", 
      emoji: "🟡" 
    },
    { 
      id: "tier-3", 
      label: "TIER 3: SECURITY-ADJACENT (Optional)", 
      emoji: "🟠" 
    },
  ],
  
  courses: [
    ...tier1Courses,                    // Spread all tier arrays
    ...tier2Courses,
    ...tier3Courses,
  ],
  
  categoryIntros: {
    "tier-1": "These are the **highest priority courses** for cybersecurity careers.",
    "tier-2": "These courses deepen security expertise and make you stand out.",
    "tier-3": "Good if aligned with interests, not required for cybersecurity.",
  },
};
```

**Key Requirements**:
- ✅ Export name must be `cybersecurityCareerPathConfig` (camelCase)
- ✅ Category IDs must follow pattern: `"tier-1"`, `"tier-2"`, `"tier-3"`
- ✅ The number after "tier-" must match course tier numbers
- ✅ All tier arrays must be spread into `courses` array
- ✅ `categoryIntros` is optional but recommended

---

### 3. Index File (`data/index.ts`)

**Purpose**: Provide convenient exports for importing data.

**Structure**:
```typescript
export { cybersecurityCareerPathConfig } from "./careerPathConfig";
export { tier1Courses, tier2Courses, tier3Courses } from "./tierCourses";
```

---

### 4. Graph Component (`components/CareerPathGraph.tsx`)

**Purpose**: Render the interactive graph visualization.

**Key Changes from SWE Template**:

1. **Import Statement** (Line ~26):
```typescript
// Changed from:
import { sweCareerPathConfig } from "../data/careerPathConfig";

// To:
import { cybersecurityCareerPathConfig } from "../data/careerPathConfig";
```

2. **Root Node Component Name** (Line ~33):
```typescript
// Changed from:
function SWERootNode({ data }: { data: { label: string } }) {

// To:
function CybersecurityRootNode({ data }: { data: { label: string } }) {
```

3. **Node Types Definition** (Line ~93):
```typescript
const nodeTypes = {
  root: CybersecurityRootNode,  // Changed from SWERootNode
  tier: TierNode,
  course: CourseNode,
};
```

4. **Root Node ID** (All occurrences):
```typescript
// Changed from "swe-root" to "cybersecurity-root":

// Line ~132:
id: "cybersecurity-root",

// Line ~161:
id: `cybersecurity-root-${tierNode.id}`,
source: "cybersecurity-root",

// Line ~315:
newPositions["cybersecurity-root"] = { x: 0, y: 40 };
```

5. **Config References** (Throughout):
```typescript
// Changed all references from:
sweCareerPathConfig

// To:
cybersecurityCareerPathConfig
```

6. **Footer Text** (Line ~461):
```typescript
Career path graph for Cybersecurity
```

**Everything Else**: Remains identical to SWE implementation (no logic changes).

---

## 🔌 Integration (`DegreesContent.tsx`)

### Required Changes

1. **Import Component**:
```typescript
import CybersecurityCareerPathGraph from "../cs-cse/careers/cybersecurity/components/CareerPathGraph";
```

2. **Add Refs and State**:
```typescript
const resetCybersecurityGraphRef = useRef<(() => void) | null>(null);
const formatCybersecurityGraphRef = useRef<(() => void) | null>(null);
const [resetCybersecurityReady, setResetCybersecurityReady] = useState(false);
const [formatCybersecurityReady, setFormatCybersecurityReady] = useState(false);
```

3. **Add Handler Functions**:
```typescript
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
```

4. **Add Cleanup in useEffect**:
```typescript
setResetCybersecurityReady(false);
setFormatCybersecurityReady(false);
resetCybersecurityGraphRef.current = null;
formatCybersecurityGraphRef.current = null;
```

5. **Add Career Description**:
```typescript
const careerDescriptions: Record<string, string> = {
  cybersecurity: "Cybersecurity professionals protect systems, networks, and data...",
};
```

6. **Add Conditional Render Block**:
```typescript
if (selectedCareerPath === "cybersecurity") {
  return (
    <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
      {/* Header */}
      {/* Format and Reset buttons */}
      <CybersecurityCareerPathGraph 
        onResetReady={handleResetCybersecurityReady.current}
        onFormatReady={handleFormatCybersecurityReady.current}
      />
    </div>
  );
}
```

---

## 🎨 Graph Features

### Interactive Elements

1. **Root Node**:
   - Circular node at top
   - Label: "Cybersecurity"
   - Size: 128px × 128px
   - Border: 2px primary color

2. **Tier Nodes**:
   - 3 circular nodes below root
   - Size: 96px × 96px
   - Emojis: 🟢 (Tier 1), 🟡 (Tier 2), 🟠 (Tier 3)
   - Spacing: 400px horizontal (600px when formatted)
   - Click to expand/collapse courses

3. **Course Nodes**:
   - Rectangular cards
   - Size: 180-200px wide, auto height
   - Display: Course code + name
   - Layout: 3 per row (2 when formatted)
   - Spacing: 220px horizontal, 100px vertical (increased when formatted)

### User Interactions

1. **Expand/Collapse**:
   - Click any tier node to show/hide its courses
   - State persists during session

2. **Drag Nodes**:
   - All nodes are draggable
   - Positions saved automatically
   - Persist until reset

3. **Format Graph**:
   - Increases spacing to prevent overlap
   - Changes layout from 3 to 2 courses per row
   - Sets `isFormatted` flag to true
   - Recalculates all positions

4. **Reset Graph**:
   - Collapses all expanded tiers
   - Clears all saved positions
   - Resets `isFormatted` flag
   - Returns to initial state

---

## 🧪 Testing Checklist

### Functional Tests

- [ ] Graph displays when "Cybersecurity" is selected
- [ ] Root node shows "Cybersecurity" label
- [ ] 3 tier nodes appear with correct emojis (🟢🟡🟠)
- [ ] Clicking tier nodes expands/collapses courses
- [ ] All 17 courses appear in correct tiers:
  - [ ] Tier 1: 6 courses
  - [ ] Tier 2: 6 courses
  - [ ] Tier 3: 5 courses
- [ ] Course cards show code and name correctly
- [ ] All nodes can be dragged
- [ ] Node positions persist after dragging
- [ ] Format button increases spacing and prevents overlap
- [ ] Reset button collapses all and resets positions
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Build succeeds without warnings

### Visual Tests

- [ ] Graph fits viewport at default zoom
- [ ] No node overlap in default state
- [ ] No node overlap after formatting
- [ ] Edges connect correctly (root → tiers → courses)
- [ ] Styling matches SWE graph
- [ ] Responsive on different screen sizes

### Integration Tests

- [ ] Career appears in sidebar under CS/CSE
- [ ] Clicking "Cybersecurity" loads graph page
- [ ] Career description displays correctly
- [ ] Format/Reset buttons are enabled
- [ ] Switching to other career paths works
- [ ] Switching back to Cybersecurity preserves state

---

## 📊 Data Summary

### Course Distribution

| Tier | Count | Purpose |
|------|-------|---------|
| Tier 1 | 6 | Must-take core security courses |
| Tier 2 | 6 | Strong boosters for specialization |
| Tier 3 | 5 | Optional security-adjacent courses |
| **Total** | **17** | Complete cybersecurity curriculum |

### Course IDs

All course IDs use the prefix `cybersec-` to ensure uniqueness:

**Tier 1**: `cybersec-cse-178`, `cybersec-cse-160`, `cybersec-cse-150`, `cybersec-cse-031`, `cybersec-cse-130`, `cybersec-cse-120`

**Tier 2**: `cybersec-cse-168`, `cybersec-cse-179`, `cybersec-cse-111`, `cybersec-cse-177`, `cybersec-cse-140`, `cybersec-cse-108`

**Tier 3**: `cybersec-cse-175`, `cybersec-cse-176`, `cybersec-cse-162`, `cybersec-cse-185`, `cybersec-cse-107`

---

## 🐛 Common Issues & Solutions

### Issue: Courses Don't Appear
**Cause**: Tier number mismatch  
**Solution**: Ensure category ID number matches course tier number exactly

### Issue: "Cannot find module" Error
**Cause**: Wrong import path  
**Solution**: Use `../data/careerPathConfig` from components folder

### Issue: Graph Shows "SWE" Data
**Cause**: Import still points to SWE config  
**Solution**: Update import to `cybersecurityCareerPathConfig`

### Issue: Format/Reset Buttons Disabled
**Cause**: Handlers not registered  
**Solution**: Verify `onResetReady` and `onFormatReady` props are passed

### Issue: Duplicate Course IDs
**Cause**: Reused IDs from SWE  
**Solution**: All IDs must use `cybersec-` prefix

---

## 🔄 Update History

| Date | Change | Notes |
|------|--------|-------|
| 2025-12-30 | Initial implementation | Complete Cybersecurity career path with 17 courses |
| 2025-12-30 | Documentation created | Technical implementation guide |

---

## 📚 References

- **Main Guide**: `/frontend/src/app/degrees/cs-cse/CAREER_GRAPH_BUILD_GUIDE.md`
- **Type Definitions**: `/frontend/src/types/careerPath.ts`
- **Reference Implementation**: `/frontend/src/app/degrees/cs-cse/careers/swe/`
- **Integration File**: `/frontend/src/app/degrees/components/DegreesContent.tsx`

---

**Status**: ✅ Complete and Production-Ready  
**Last Updated**: December 30, 2025  
**Maintained By**: Better Bobcats Team
