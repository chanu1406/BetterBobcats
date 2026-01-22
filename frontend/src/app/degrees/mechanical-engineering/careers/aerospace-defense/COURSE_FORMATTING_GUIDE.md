# Course Detail Modal Formatting Guide
## Aerospace / Defense Engineer Career Path

This document describes the formatting patterns and styling conventions used in the course detail modal for the Aerospace / Defense Engineer career path. Use this as a reference when creating or updating similar course detail components.

---

## Overview

The course detail modal displays comprehensive information about a course when clicked in the career path graph. It uses a consistent design system with specific typography, spacing, colors, and emoji usage.

---

## Modal Structure

### Container
- **Background overlay**: `fixed inset-0 bg-black/50` (semi-transparent black backdrop)
- **Modal card**: `bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto`
- **Padding**: `p-6` (24px padding on all sides)
- **Z-index**: `z-50` (ensures modal appears above other content)

---

## Header Section

### Course Code & Name
```tsx
<h3 className="text-2xl font-bold text-slate-900">
  {selectedCourse.code}
</h3>
<p className="text-lg text-slate-700 mt-1">
  {selectedCourse.name}
</p>
```

**Styling:**
- Course code: `text-2xl font-bold text-slate-900`
- Course name: `text-lg text-slate-700 mt-1`
- Layout: Flex container with `items-start justify-between`

### Close Button
```tsx
<button className="text-slate-400 hover:text-slate-600 transition-colors">
  {/* SVG X icon */}
</button>
```

**Styling:**
- Default: `text-slate-400`
- Hover: `hover:text-slate-600`
- Transition: `transition-colors`
- Icon size: `w-6 h-6`

---

## Content Sections

### Section Container
```tsx
<div className="space-y-4">
  {/* All sections */}
</div>
```

**Spacing:** `space-y-4` (16px vertical spacing between sections)

### Section Headings
```tsx
<h4 className="font-semibold text-slate-900 mb-2">
  Section Title
</h4>
```

**Styling:**
- Font: `font-semibold`
- Color: `text-slate-900`
- Margin bottom: `mb-2` (8px)

### Section Content
```tsx
<p className="text-slate-700">
  Content text
</p>
```

**Styling:**
- Color: `text-slate-700`
- No additional font weight (inherits default)

---

## Specific Section Formats

### 1. Description
- **Heading**: "Description"
- **Content**: Plain paragraph text
- **Styling**: Standard section format

### 2. Credits
- **Heading**: "Credits"
- **Content**: `{credits} units`
- **Styling**: Standard section format

### 3. Career Relevance
- **Heading**: "Career Relevance"
- **Content**: Plain paragraph text
- **Styling**: Standard section format

### 4. Real-World Applications
- **Heading**: "Real-World Applications"
- **Content**: Unordered list
- **List styling**: 
  ```tsx
  <ul className="list-disc list-inside space-y-1 text-slate-700">
  ```
- **List items**: No additional styling, just text content

### 5. Learning Outcomes
- **Heading**: "Learning Outcomes"
- **Content**: Unordered list
- **List styling**: Same as Real-World Applications
  ```tsx
  <ul className="list-disc list-inside space-y-1 text-slate-700">
  ```

### 6. Key Topics (Optional)
- **Heading**: "Key Topics"
- **Content**: Badge/pill components
- **Container**: `flex flex-wrap gap-2`
- **Badge styling**:
  ```tsx
  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
    {topic}
  </span>
  ```
- **Badge details**:
  - Padding: `px-3 py-1`
  - Background: `bg-primary/10` (10% opacity primary color)
  - Text: `text-primary`
  - Shape: `rounded-full`
  - Size: `text-sm`

---

## Resources Section

### Container
```tsx
<div className="space-y-3">
  {/* Resource subsections */}
</div>
```

**Spacing:** `space-y-3` (12px vertical spacing between resource types)

### Resource Subsection Headings
```tsx
<h5 className="font-medium text-slate-800 mb-1">📹 Videos</h5>
<h5 className="font-medium text-slate-800 mb-1">🌐 Websites</h5>
<h5 className="font-medium text-slate-800 mb-1">🛠️ Tools</h5>
```

**Styling:**
- Font: `font-medium`
- Color: `text-slate-800`
- Margin bottom: `mb-1` (4px)
- **Emojis**: Inline with text (no special font-family needed)

**Emoji Usage:**
- 📹 Videos
- 🌐 Websites
- 🛠️ Tools

### Videos & Websites Lists
```tsx
<ul className="space-y-1">
  <li>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-800 underline text-sm break-all"
    >
      {url}
    </a>
  </li>
</ul>
```

**Link Styling:**
- Default color: `text-blue-600`
- Hover color: `hover:text-blue-800`
- Underline: Always visible (`underline`)
- Size: `text-sm`
- Text wrapping: `break-all` (allows long URLs to break)
- List spacing: `space-y-1` (4px between items)

**Accessibility:**
- `target="_blank"` (opens in new tab)
- `rel="noopener noreferrer"` (security best practice)

### Tools Display
```tsx
<div className="flex flex-wrap gap-2">
  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
    {tool}
  </span>
</div>
```

**Container:**
- Layout: `flex flex-wrap gap-2`
- Allows tools to wrap to multiple lines

**Tool Badge Styling:**
- Padding: `px-3 py-1`
- Background: `bg-slate-100` (light gray)
- Text: `text-slate-700`
- Shape: `rounded-full`
- Size: `text-sm`
- Gap: `gap-2` (8px between badges)

**Note:** Tools use a different style than Key Topics:
- Tools: `bg-slate-100 text-slate-700` (neutral gray)
- Key Topics: `bg-primary/10 text-primary` (colored with primary theme)

---

## Footer Section

### Close Button
```tsx
<div className="mt-6 flex justify-end">
  <button
    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
  >
    Close
  </button>
</div>
```

**Container:**
- Margin top: `mt-6` (24px)
- Layout: `flex justify-end` (right-aligned)

**Button Styling:**
- Padding: `px-4 py-2`
- Background: `bg-primary`
- Text: `text-primary-foreground`
- Shape: `rounded-lg`
- Hover: `hover:bg-primary/90` (90% opacity on hover)
- Transition: `transition-colors`

---

## Color Palette

### Text Colors
- **Primary headings**: `text-slate-900` (darkest)
- **Section headings**: `text-slate-900` (semibold)
- **Subsection headings**: `text-slate-800` (medium)
- **Body text**: `text-slate-700` (standard)
- **Links**: `text-blue-600` (default), `text-blue-800` (hover)
- **Close button icon**: `text-slate-400` (default), `text-slate-600` (hover)

### Background Colors
- **Modal overlay**: `bg-black/50` (50% opacity black)
- **Modal card**: `bg-white`
- **Tool badges**: `bg-slate-100`
- **Topic badges**: `bg-primary/10` (10% opacity primary)
- **Primary button**: `bg-primary`

---

## Typography Scale

- **Course code**: `text-2xl` (24px)
- **Course name**: `text-lg` (18px)
- **Section headings**: Default size with `font-semibold`
- **Subsection headings**: Default size with `font-medium`
- **Body text**: Default size (16px)
- **Links**: `text-sm` (14px)
- **Badges**: `text-sm` (14px)

---

## Spacing System

- **Section container**: `space-y-4` (16px)
- **Resource container**: `space-y-3` (12px)
- **List items**: `space-y-1` (4px)
- **Badge gap**: `gap-2` (8px)
- **Section heading margin**: `mb-2` (8px)
- **Subsection heading margin**: `mb-1` (4px)
- **Footer margin**: `mt-6` (24px)
- **Modal padding**: `p-6` (24px)

---

## Responsive Behavior

- **Modal width**: `max-w-2xl` (672px max width)
- **Modal height**: `max-h-[80vh]` (80% of viewport height)
- **Overflow**: `overflow-y-auto` (scrollable if content exceeds height)
- **Padding on mobile**: `p-4` (from parent container)

---

## Accessibility Features

1. **Close button**: `aria-label="Close"` for screen readers
2. **External links**: `rel="noopener noreferrer"` for security
3. **Keyboard navigation**: ESC key closes modal (handled in parent component)
4. **Focus management**: Modal traps focus when open
5. **Color contrast**: All text meets WCAG contrast requirements

---

## Code Structure Pattern

```tsx
{selectedCourse.expandedInfo?.sectionName && (
  <div>
    <h4 className="font-semibold text-slate-900 mb-2">
      Section Title
    </h4>
    {/* Section content */}
  </div>
)}
```

**Pattern:**
- Conditional rendering with optional chaining (`?.`)
- Section wrapper div
- Consistent heading format
- Content follows heading

---

## Best Practices

1. **Always use conditional rendering** for optional sections
2. **Maintain consistent spacing** using Tailwind's space utilities
3. **Use semantic HTML** (h3, h4, h5, ul, li, a, button)
4. **Include accessibility attributes** (aria-label, rel, target)
5. **Follow the color palette** for consistency
6. **Keep emojis inline** with text (no special formatting needed)
7. **Use break-all** for long URLs to prevent overflow
8. **Maintain consistent badge styles** (different colors for different purposes)

---

## Example: Complete Resources Section

```tsx
{selectedCourse.expandedInfo?.resources && (
  <div>
    <h4 className="font-semibold text-slate-900 mb-2">
      Resources
    </h4>
    <div className="space-y-3">
      {/* Videos */}
      {selectedCourse.expandedInfo.resources.videos && 
       selectedCourse.expandedInfo.resources.videos.length > 0 && (
        <div>
          <h5 className="font-medium text-slate-800 mb-1">📹 Videos</h5>
          <ul className="space-y-1">
            {selectedCourse.expandedInfo.resources.videos.map((video, index) => (
              <li key={index}>
                <a
                  href={video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline text-sm break-all"
                >
                  {video}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Websites */}
      {selectedCourse.expandedInfo.resources.websites && 
       selectedCourse.expandedInfo.resources.websites.length > 0 && (
        <div>
          <h5 className="font-medium text-slate-800 mb-1">🌐 Websites</h5>
          <ul className="space-y-1">
            {selectedCourse.expandedInfo.resources.websites.map((website, index) => (
              <li key={index}>
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline text-sm break-all"
                >
                  {website}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Tools */}
      {selectedCourse.expandedInfo.resources.tools && 
       selectedCourse.expandedInfo.resources.tools.length > 0 && (
        <div>
          <h5 className="font-medium text-slate-800 mb-1">🛠️ Tools</h5>
          <div className="flex flex-wrap gap-2">
            {selectedCourse.expandedInfo.resources.tools.map((tool, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
)}
```

---

## Summary

This formatting guide ensures consistency across all course detail modals. Key principles:

- **Consistent spacing** using Tailwind's space utilities
- **Semantic color usage** (slate for text, blue for links, primary for accents)
- **Clear visual hierarchy** (different font weights and sizes)
- **Accessible design** (proper ARIA labels, keyboard support)
- **Responsive layout** (flexible width, scrollable content)
- **Emoji integration** (inline with text, no special formatting)

Follow these patterns when creating or updating course detail components to maintain design consistency across the application.
