# Degrees Page Documentation

## Overview

The degrees page (`/degrees`) provides a navigation interface for exploring UC Merced degree programs. Users can select a degree from the sidebar to view related career fields and information.

## Page Structure

The page consists of three main sections:

1. **Header** - Contains logo and "Degrees @ UCM" title
2. **Sidebar** - Lists all available degree programs (left side)
3. **Content Area** - Displays welcome message or selected degree content (right side)

## Component Architecture

### Main Page Component
- **File:** `src/app/degrees/page.tsx`
- **Type:** Client component (uses `'use client'`)
- **Responsibility:** 
  - Manages selected degree state
  - Coordinates layout between header, sidebar, and content
  - Handles degree selection

### DegreesHeader Component
- **File:** `src/app/degrees/components/DegreesHeader.tsx`
- **Type:** Server component
- **Responsibility:**
  - Displays page header with logo
  - Shows "Degrees @ UCM" title with gradient styling (matches homepage)
  - Provides sticky navigation bar
- **Styling:**
  - Title uses `text-3xl md:text-4xl` with gradient from primary to accent
  - Matches homepage text styling for consistency

### DegreesSidebar Component
- **File:** `src/app/degrees/components/DegreesSidebar.tsx`
- **Type:** Client component
- **Props:**
  - `selectedDegree: string | null` - Currently selected degree
  - `onDegreeSelect: (degree: string) => void` - Callback when degree is clicked
- **Responsibility:**
  - Renders list of available degrees
  - Handles degree selection
  - Highlights active/selected degree
  - Provides navigation interface
- **Current Degrees:**
  - Currently displays only "CS/CSE" (Computer Science/Computer Science and Engineering)
- **Styling:**
  - Each degree is displayed as a distinct block with:
    - Border and rounded corners (`border border-border/50 rounded-md`)
    - Card background (`bg-card`)
    - Hover effects with primary color accents
    - Selected state uses primary background color

### DegreesContent Component
- **File:** `src/app/degrees/components/DegreesContent.tsx`
- **Type:** Server component
- **Props:**
  - `selectedDegree: string | null` - Currently selected degree
  - `selectedCareerPath: string | null` - Currently selected career path
- **Responsibility:**
  - Shows welcome message when no degree is selected
  - Displays prerequisite graph for CS/CSE when selected (no career path)
  - Shows career path content when a career path is selected
  - Shows placeholder for other degrees
- **Styling:**
  - Welcome title uses gradient text (`text-3xl md:text-4xl`) matching homepage style
  - Description text uses `text-xl md:text-2xl` with muted foreground color
  - Content is centered with max-width container

### PrerequisiteGraph Component
- **File:** `src/app/degrees/cs-cse/components/PrerequisiteGraph.tsx`
- **Type:** Client component (uses `'use client'`)
- **Dependencies:** React Flow (`reactflow`), Course data from `cseCourses.ts`
- **Responsibility:**
  - Displays interactive prerequisite graph for CS/CSE degree
  - Shows hierarchical tree structure with root node, category nodes, and course nodes
  - Provides clickable category nodes that toggle expanded state to show courses
  - Visualizes course prerequisites and relationships with color-coded nodes by year
  - Supports layout formatting to prevent overlapping when all branches are expanded
- **Structure:**
  - **Level 0 (Root):** Circular "CS/CSE" node at the top center (24x24px)
  - **Level 1 (Categories):** Six circular category nodes (20x20px) arranged horizontally:
    - Math, Writing, Physics, Spark, Engineering, CSE
  - **Level 2+ (Courses):** Rectangular course nodes displayed when categories are expanded
    - Math branch: MATH 021 → MATH 022 → (MATH 023, MATH 024, MATH 032/ENGR 080)
    - Writing branch: WRI 010 → WRI Upper Div
    - Physics branch: PHYS 008 + 008L → PHYS 009 + 009L
    - Spark branch: SPRK 010 or SPRK 001
    - Engineering branch: ENGR 091 → ENGR 065
    - CSE branch: CSE 022 → (CSE 015, CSE 024) → CSE 030 → (CSE 031, CSE 100) → CSE 120
- **Features:**
  - Interactive pan and zoom controls (React Flow built-in)
  - Clickable category nodes with toggle functionality (expand/collapse courses)
  - Visual feedback for expanded categories (solid border, darker background)
  - Hover effects on category nodes
  - **Draggable nodes**: All nodes can be dragged to reposition them on the graph
  - **Format layout button**: Toggles between compact (180px category spacing) and formatted (350px spacing) layouts
  - **Reset Positions button**: Restores nodes to their default layout positions (keeps expanded state)
  - **Reset Graph button**: Fully resets the graph (positions, expanded categories, layout format)
  - Year-based color coding for course nodes:
    - Year 1: Blue (`bg-blue-100`, `border-blue-300`)
    - Year 2: Green (`bg-green-100`, `border-green-300`)
    - Year 3: Amber (`bg-amber-100`, `border-amber-300`)
    - Year 4: Purple (`bg-purple-100`, `border-purple-300`)
- **Styling:**
  - Root node: `w-24 h-24`, solid border, primary color
  - Category nodes: `w-20 h-20`, dashed border (collapsed) or solid border (expanded)
  - Course nodes: `min-w-[140px] max-w-[180px]`, compact padding (`px-2 py-1.5`), `text-xs`
  - Container height: 800px (fits all branches on one page)
  - Background grid pattern with React Flow Background component
  - Format layout button: Positioned top-right, primary color styling
- **Layout Configuration:**
  - Compact layout: 180px category spacing, 220px horizontal branch spacing
  - Formatted layout: 350px category spacing, 200px horizontal branch spacing (prevents overlap)
  - Vertical spacing: 140px between course levels
  - All branches start at y: 280px (below category nodes at y: 160px)

### Career Path Graph Component
- **File:** `src/app/degrees/cs-cse/careers/swe/components/CareerPathGraph.tsx`
- **Type:** Client component (uses `'use client'`)
- **Props:**
  - `onResetReady?: (resetFn: () => void) => void` - Callback to receive reset function
  - `onFormatReady?: (formatFn: () => void) => void` - Callback to receive format function
- **Responsibility:**
  - Displays interactive career path graph visualization
  - Shows root node (career name), tier nodes, and course nodes
  - Supports tier expansion/collapse by clicking tier nodes
  - All nodes are draggable - positions are saved automatically
  - Provides format and reset functionality via callbacks
- **Features:**
  - **Format Graph Button**: Repositions all nodes with increased spacing to prevent overlap
    - Increases tier spacing from 400px to 600px
    - Reduces courses per row from 3 to 2
    - Increases course spacing from 220px to 300px
    - Increases row spacing from 100px to 120px
  - **Reset Graph Button**: Fully resets graph to initial state
    - Collapses all expanded tiers
    - Clears all saved node positions
    - Returns to default layout
  - **Config-Driven**: Uses `careerPathConfig` for all content (reusable for all career paths)
- **Styling:**
  - Root node: Large circular node (`w-32 h-32`) with primary color
  - Tier nodes: Medium circular nodes (`w-24 h-24`) with dashed borders (collapsed) or solid borders (expanded)
  - Course nodes: Rectangular cards (`min-w-[180px] max-w-[200px]`) with course code and name
  - Container height: 800px
  - Background grid pattern with React Flow Background component

## State Management

The page uses React's `useState` hook to manage the selected degree:

```tsx
const [selectedDegree, setSelectedDegree] = useState<string | null>(null);
```

- **Initial state:** `null` (shows welcome message)
- **When degree selected:** Updates to degree code (e.g., "CS/CSE")
- **State flow:** Page component → Sidebar (displays selection) → Content (shows content)

## Adding New Degrees

To add a new degree to the sidebar:

1. Open `src/app/degrees/components/DegreesSidebar.tsx`
2. Add the degree code to the `degrees` array:

```tsx
const degrees = [
  "CS/CSE",
  "NEW_DEGREE", // Add here
];
```

3. Create a new directory structure for the degree:
   ```
   degrees/
   └── new-degree/        # Use kebab-case for directory name
       ├── data/
       │   └── courses.ts # Degree course data
       └── components/    # Degree-specific components (optional)
   ```

4. The degree will automatically appear in the sidebar as a new block with the same styling

**Note:** Currently only CS/CSE is fully implemented. Additional degrees should follow the same folder structure pattern.

## Adding Career Path Data

To add data for a career path:

1. Navigate to `src/app/degrees/cs-cse/careers/[career-id]/data/`
2. Create or update data files (e.g., `tierCourses.ts`, `careerPathConfig.ts`)
3. Export the data from an `index.ts` file for easy imports
4. Use the data in career-specific components or pages

Example structure for a CS/CSE career path:
```
cs-cse/
└── careers/
    └── swe/
        ├── data/
        │   ├── tierCourses.ts      # Course data organized by tiers
        │   ├── careerPathConfig.ts # Graph configuration
        │   └── index.ts            # Exports all data
        └── components/             # Optional career-specific components
            └── CareerPathGraph.tsx
```

**Note:** Career paths are organized under their respective degree folders. For example, CS/CSE careers are in `cs-cse/careers/`, and future degrees (like Biology) would have their own `biology/careers/` folder.

## Styling Guidelines

### Color Scheme
- Uses existing Tailwind color variables:
  - `text-primary` - For headings and active states
  - `bg-primary` - For selected degree background
  - `text-muted-foreground` - For secondary text
  - `hover:bg-primary/10` - For hover states
  - Gradient text: `bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent`

### Typography
- **Header Title:** `text-3xl md:text-4xl` with gradient styling (matches homepage)
- **Welcome Title:** `text-3xl md:text-4xl` with gradient styling
- **Description Text:** `text-xl md:text-2xl` with muted foreground
- All titles use the same gradient effect as the homepage for visual consistency

### Layout
- **Header:** Sticky positioning, full width, border-bottom
- **Sidebar:** Fixed width (256px), sticky positioning, border-right
  - Degree items styled as individual blocks with borders and rounded corners
  - Spacing between items (`space-y-1`)
- **Content:** Flexible width, centered content with max-width (`max-w-4xl`)

### Sidebar Block Styling
- Each degree appears as a distinct block:
  - Border: `border border-border/50`
  - Rounded corners: `rounded-md`
  - Background: `bg-card` (unselected) or `bg-primary` (selected)
  - Padding: `px-4 py-3`
  - Hover effects: `hover:bg-primary/10 hover:text-primary hover:border-primary/30`

### Responsive Design
- Sidebar stacks vertically on mobile (future enhancement)
- Content area adjusts to available space
- Header remains sticky across all screen sizes
- Text sizes are responsive (`md:` breakpoints)

## Prerequisite Graph Feature

### Overview
The CS/CSE degree page includes an interactive prerequisite graph visualization that shows the course structure in a hierarchical tree format.

### Graph Structure
1. **Root Node:** "CS/CSE" - Circular node at the top center
2. **Category Nodes:** Six subject categories arranged horizontally below the root:
   - Math
   - Writing
   - Physics
   - Spark
   - Engineering
   - CSE

### Interactive Features
- **Clickable Categories:** Category nodes can be clicked to toggle their expanded state
- **Visual Feedback:** Expanded categories show solid borders and darker backgrounds
- **Draggable Nodes:** All nodes (root, categories, courses) can be dragged to reposition them
- **Pan & Zoom:** Users can pan and zoom the graph using React Flow controls
- **Arrows:** Arrows connect the root node to each category node and show prerequisite relationships
- **Format Layout:** Toggle button to switch between compact and formatted layouts (prevents overlaps)
- **Reset Positions:** Button to restore all nodes to their default calculated positions
- **Reset Graph:** Button to fully reset the graph to its original state (all nodes collapsed, default positions, default layout)

### Data Structure
- Course data is stored in `src/app/degrees/cs-cse/data/courses.ts`
- Course types are defined in `src/types/course.ts`
- Graph uses React Flow for rendering and layout
- Each course includes: id, code, name, fullName, year, semester, prerequisites array

### Folder Structure
The degrees page uses an organized folder structure for scalability:

```
degrees/
├── components/          # Shared components
│   ├── DegreesHeader.tsx
│   ├── DegreesSidebar.tsx
│   ├── DegreesContent.tsx
│   └── CareerPathGraph.tsx  # Reusable career path graph (config-driven)
├── cs-cse/             # CS/CSE degree-specific content
│   ├── data/
│   │   └── courses.ts  # All CS/CSE course data
│   ├── components/
│   │   ├── PrerequisiteGraph.tsx
│   │   └── GraphLegend.tsx
│   └── careers/        # CS/CSE career path-specific content
│       ├── swe/       # Software Engineering
│       │   ├── components/
│       │   │   └── CareerPathGraph.tsx
│       │   └── data/
│       │       ├── tierCourses.ts        # SWE course data
│       │       └── careerPathConfig.ts  # SWE graph configuration
│       ├── cybersecurity/ # Cybersecurity
│       ├── ml-ai/      # Machine Learning / AI
│       ├── data-science/  # Data Science / Analytics
│       ├── systems/   # Systems / Infrastructure Engineering
│       └── embedded/  # Embedded Systems Engineering
└── docs/              # Documentation
```

Each career path directory contains:
- `data/` - Career-specific data
  - `tierCourses.ts` - Course recommendations organized by tiers with descriptions
  - `careerPathConfig.ts` - Configuration object for the career path graph visualization
- `components/` - Career-specific React components (optional, rarely needed)

**Note**: Career path graphs use a **config-driven architecture**. The `CareerPathGraph` component is shared and reusable - each career path just provides its own configuration file. See `CAREER_PATH_GRAPH_GUIDE.md` for details.

### Branch Structure Details

#### Math Branch
- **Level 2:** MATH 021 (Calculus I) - Year 1
- **Level 3:** MATH 022 (Calculus II) - Year 1, requires MATH 021
- **Level 4:** Three parallel courses - Year 2, all require MATH 022:
  - MATH 023 (Vector Calculus)
  - MATH 024 (Linear Algebra and Differential Equations)
  - MATH 032 or ENGR 080 (Probability and Statistics / Statistical Modeling)

#### Writing Branch
- **Level 2:** WRI 010 (College Reading and Composition) - Year 1
- **Level 3:** General Education: Writing in the Discipline - Year 3, requires WRI 010

#### Physics Branch
- **Level 2:** PHYS 008 + PHYS 008L (Introductory Physics I) - Year 3
- **Level 3:** PHYS 009 + PHYS 009L (Introductory Physics II) - Year 3, requires PHYS 008

#### Spark Branch
- **Level 2:** SPRK 010 or SPRK 001 (Spark Seminar) - Year 1

#### Engineering Branch
- **Level 2:** ENGR 091 (Professional Development) - Year 1
- **Level 3:** ENGR 065 (Circuit Theory) - Year 4, requires ENGR 091

#### CSE Branch
- **Level 1:** CSE 022 (Introduction to Programming) - Year 1
- **Level 2:** Two parallel courses - Year 1, both require CSE 022:
  - CSE 015 (Discrete Mathematics)
  - CSE 024 (Advanced Programming)
- **Level 3:** CSE 030 (Data Structures) - Year 2, requires both CSE 015 and CSE 024
- **Level 4:** Two parallel courses - Year 2, both require CSE 030:
  - CSE 031 (Computer Organization and Assembly Language)
  - CSE 100 (Algorithm Design and Analysis)
- **Level 5:** CSE 120 (Software Engineering) - Year 4, requires both CSE 031 and CSE 100

### Implementation Status
- ✅ Root node (CS/CSE)
- ✅ Category nodes (6 categories)
- ✅ Edge connections with arrows
- ✅ Toggle functionality for categories
- ✅ Course nodes for all branches (Math, Writing, Physics, Spark, Engineering, CSE)
- ✅ Year-based color coding for course nodes
- ✅ Prerequisite relationship visualization
- ✅ Format layout button for preventing overlaps
- ✅ Draggable nodes with position persistence
- ✅ Reset Positions button
- ✅ Reset Graph button (full reset)
- ✅ Compact node sizes optimized for single-page display

## Future Enhancements

1. **Dynamic Routes:** Convert to `/degrees/[major]` route structure
2. **Course Details:** Add tooltips or popovers with course information (credits, description, schedule)
3. **Resources:** Add resources section for each degree (textbooks, study guides, tutoring)
4. **Search/Filter:** Add search functionality for degrees and courses
5. **Mobile Menu:** Collapsible sidebar for mobile devices
6. **Export/Print:** Allow users to export or print the prerequisite graph
7. **Course Filtering:** Filter courses by year, semester, or requirements
8. **Interactive Course Selection:** Highlight prerequisite chains when hovering over courses
9. **Performance Optimization:** Virtualize large graphs for better performance with many courses
10. **Accessibility:** Improve keyboard navigation and screen reader support

## Career Path Graphs

Career path pages use the reusable `CareerPathGraph` component with a config-driven architecture:

- **Component**: `components/CareerPathGraph.tsx` (shared, generic)
- **Configuration**: Each career path provides a `careerPathConfig.ts` file
- **Course Data**: Each career path provides a `tierCourses.ts` file with course descriptions

### Key Features:
- **Tier Expansion**: Click tier nodes to expand/collapse and show their courses
- **Tier-Based Organization**: Courses organized into tiers (e.g., Tier 1, Tier 2, Tier 3) with emoji indicators
- **Draggable Nodes**: All nodes can be repositioned by dragging - positions are saved automatically
- **Format Graph**: Button that automatically repositions all nodes with wider spacing to prevent overlap
- **Reset Graph**: Button that fully resets graph to initial state (collapses all tiers, clears positions)
- **Reusable**: Same component works for all career paths via config-driven architecture
- **Type-Safe**: Uses shared types from `src/types/careerPath.ts`
- **Automatic Layout**: Nodes are positioned automatically based on tier structure and expansion state

For detailed instructions on creating career path graphs, see **`CAREER_PATH_GRAPH_GUIDE.md`**.

## Related Documentation

- See `CAREER_PATH_GRAPH_GUIDE.md` for career path graph creation guide
- See `GRAPH_STRUCTURE_GUIDE.md` for prerequisite graph structure
- See `COMPONENT_STRUCTURE.md` for overall component organization
- See `CODING_STANDARDS.md` for coding guidelines
- See `FUNCTION_TEMPLATES.md` for component templates

