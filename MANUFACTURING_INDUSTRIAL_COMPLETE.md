# Manufacturing / Industrial / Systems Engineer Career Path - Complete Recreation

## Summary

The Manufacturing / Industrial / Systems Engineer career path graph component has been **completely recreated from scratch** to match the exact pattern, structure, and visual style of the working Mechanical Design Engineer career path.

## Changes Made

### 1. File Recreation
- **Deleted**: Old corrupted `/frontend/src/app/degrees/mechanical-engineering/careers/manufacturing-industrial/components/CareerPathGraph.tsx`
- **Created**: New `/frontend/src/app/degrees/mechanical-engineering/careers/manufacturing-industrial/components/CareerPathGraph.tsx` (736 lines)

### 2. Component Structure (Now Matches Mechanical Design)

#### Custom Node Components
✅ **Root Node**: Circular, gradient background, primary border
✅ **Tier Node**: Circular, emoji support, dashed border (collapsed) / solid border (expanded)
✅ **Course Node**: Rectangular, course code + name display

#### State Management
✅ `expandedTiers` - Track which tiers are expanded
✅ `nodePositions` - Save custom node positions
✅ `isDragging` - Track drag state
✅ `nodesState` / `edgesState` - Internal React Flow state
✅ `isFormatted` - Track formatting state for dynamic spacing
✅ `selectedCourse` - Track selected course for modal overlay

#### Graph Features
✅ **Format Graph**: Recalculates positions with wider spacing (600px tier spacing, 300px course spacing, 2 courses per row)
✅ **Reset Graph**: Clears all state and returns to initial view
✅ **Drag and Drop**: Nodes are draggable with position saving
✅ **Click to Expand**: Click tier nodes to expand/collapse courses
✅ **Course Modal**: Click course nodes to open detailed information overlay
✅ **ESC Key**: Close course modal with Escape key

#### Visual Style
✅ Grid background with lines pattern (`#e2e8f0`, 16px gap)
✅ Tier nodes with colored emoji indicators (🟢 🟡 🟠)
✅ Tier labels with tier number and descriptor (e.g., "TIER 1\nMUST-TAKE")
✅ Dashed borders for collapsed tiers, solid borders for expanded tiers
✅ Smooth animations and transitions
✅ Consistent color scheme matching other ME career paths

#### Layout Algorithm
✅ Root node centered at top (x: 0, y: 40)
✅ Tier nodes spread horizontally below root (y: 220)
✅ Dynamic tier spacing: 400px (default) → 600px (formatted)
✅ Course nodes arranged in grid below their tier
✅ Dynamic course spacing: 220px → 300px (formatted)
✅ Courses per row: 3 (default) → 2 (formatted)
✅ Smart centering of course nodes relative to parent tier

### 3. Data Files (Already Correct)

#### careerPathConfig.ts
- Root label: "Manufacturing / Industrial Engineer"
- 3 tiers with correct labels and emojis
- Course references from tierCourses.ts

#### tierCourses.ts
- Tier 1 (🟢): ME 121, ENGR 143, ENGR 155
- Tier 2 (🟡): ENGR 080, ME 135, EE 110
- Tier 3 (🟠): EE 140, EE 155

### 4. Integration (Already Complete)

#### DegreesSidebar.tsx
✅ Manufacturing / Industrial Engineer listed in ME career paths

#### DegreesContent.tsx
✅ Import statement for ManufacturingIndustrialCareerPathGraph
✅ Career path description
✅ Graph rendering with Format/Reset button integration
✅ Proper callback handling for Format and Reset functions

## Verification Checklist

Before testing in browser, verify:

- [x] No TypeScript errors in CareerPathGraph.tsx
- [x] No TypeScript errors in other ME career path components
- [x] careerPathConfig.ts exports correct tier configuration
- [x] tierCourses.ts has valid tier 1, 2, 3 course data
- [x] DegreesContent.tsx imports and renders the graph
- [x] DegreesSidebar.tsx includes the career path
- [x] Format/Reset buttons properly integrated

## Browser Testing Steps

1. **Start Development Server**
   ```bash
   cd /Users/sakethbandi/Desktop/betterBobcats/frontend
   npm run dev
   ```

2. **Navigate to Career Path**
   - Go to http://localhost:3000/degrees
   - Select "Mechanical Engineering" from degree dropdown
   - Select "Manufacturing / Industrial Engineer" from sidebar

3. **Test Graph Features**
   - ✓ Graph loads with root node and 3 tier nodes
   - ✓ Tier nodes show colored emojis (🟢 🟡 🟠)
   - ✓ Tier nodes show labels (e.g., "TIER 1\nMUST-TAKE")
   - ✓ Collapsed tiers have dashed borders
   - ✓ Click a tier node to expand → shows course nodes below
   - ✓ Expanded tiers have solid borders
   - ✓ Course nodes show course code and name
   - ✓ Click a course node → opens modal with course details
   - ✓ ESC key closes course modal
   - ✓ Drag nodes to reposition them
   - ✓ Click "Format Graph" → spreads out nodes with wider spacing
   - ✓ Click "Reset Graph" → returns to initial state
   - ✓ Grid background visible
   - ✓ Smooth animations and transitions

4. **Compare with Mechanical Design Engineer**
   - Switch to "Mechanical Design Engineer" career path
   - Verify both graphs have identical visual style
   - Verify both have same tier node appearance
   - Verify both have same course node appearance
   - Verify both have same grid background
   - Verify both Format/Reset buttons work identically

## Expected Visual Match

The Manufacturing / Industrial Engineer graph should now be **visually indistinguishable** from the Mechanical Design Engineer graph in terms of:

- Layout and spacing
- Node shapes and sizes
- Colors and borders
- Background pattern
- Animations and transitions
- Format/Reset behavior
- Course modal appearance

The only differences should be:
- Root node label text
- Tier course content
- Number of courses per tier

## Files Modified

1. `/frontend/src/app/degrees/mechanical-engineering/careers/manufacturing-industrial/components/CareerPathGraph.tsx` - **RECREATED FROM SCRATCH**

## Files Verified (No Changes)

1. `/frontend/src/app/degrees/mechanical-engineering/careers/manufacturing-industrial/data/careerPathConfig.ts`
2. `/frontend/src/app/degrees/mechanical-engineering/careers/manufacturing-industrial/data/tierCourses.ts`
3. `/frontend/src/app/degrees/components/DegreesContent.tsx`
4. `/frontend/src/app/degrees/components/DegreesSidebar.tsx`

## Status

✅ **COMPLETE** - Manufacturing / Industrial Engineer career path graph has been completely recreated to match the Mechanical Design Engineer pattern.

All TypeScript errors resolved. Ready for browser testing.
