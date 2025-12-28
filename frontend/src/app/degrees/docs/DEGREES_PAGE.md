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
- **Responsibility:**
  - Shows welcome message when no degree is selected
  - Displays degree-specific content when a degree is selected
  - Currently shows placeholder "TBD" content
- **Styling:**
  - Welcome title uses gradient text (`text-3xl md:text-4xl`) matching homepage style
  - Description text uses `text-xl md:text-2xl` with muted foreground color
  - Content is centered with max-width container

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

3. The degree will automatically appear in the sidebar as a new block with the same styling

**Note:** Currently only CS/CSE is implemented. Additional degrees can be added following the same pattern.

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

## Future Enhancements

1. **Dynamic Routes:** Convert to `/degrees/[major]` route structure
2. **Career Fields:** Display actual career fields for selected degree
3. **Tree Diagrams:** Add visual tree diagrams for career paths
4. **Resources:** Add resources section for each degree
5. **Search/Filter:** Add search functionality for degrees
6. **Mobile Menu:** Collapsible sidebar for mobile devices

## Related Documentation

- See `COMPONENT_STRUCTURE.md` for overall component organization
- See `CODING_STANDARDS.md` for coding guidelines
- See `FUNCTION_TEMPLATES.md` for component templates

