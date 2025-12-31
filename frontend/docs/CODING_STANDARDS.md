# Coding Standards & Rules

## 🎯 Core Principles
1. Each page = its own components folder
2. Keep page.tsx files simple (just imports & layout)
3. One component per file
4. Always add comments explaining what code does

---

## 📝 File Naming Rules

### Components
- **Format:** PascalCase.tsx
- **Examples:** 
  - ✅ `DegreeGrid.tsx`
  - ✅ `MajorHeader.tsx`
  - ❌ `degree-grid.tsx`
  - ❌ `majorHeader.tsx`

### Pages
- **Format:** lowercase.tsx
- **Examples:**
  - ✅ `page.tsx`
  - ❌ `Page.tsx`

### Types
- **Format:** lowercase.ts
- **Examples:**
  - ✅ `degree.ts`
  - ✅ `career.ts`

---

## 🔧 Function Structure Rules

### Component Function Template
```tsx
/**
 * [Component Name] Component
 * [What it does - one sentence]
 * Used on: [which page(s)]
 */
export default function ComponentName({ prop1, prop2 }: PropsType) {
  // 1. Data/logic at top
  const data = "something";
  
  // 2. Return JSX at bottom
  return (
    <div>
      {/* Content */}
    </div>
  );
}
```

### Page Function Template
```tsx
/**
 * [Page Name] Page Component
 * Located at: [file path]
 * URL: [route URL]
 */
export default function PageName({ params }: { params: ParamsType }) {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Import and arrange components here */}
      </div>
    </main>
  );
}
```

---

## 📋 Comment Rules

### Always Comment:
- ✅ What the component does
- ✅ Where it's used
- ✅ What props it expects
- ✅ Complex logic

### Comment Format:
```tsx
/**
 * Component description
 * Used on: [page name]
 */
export default function Component() {
  // Inline comment for complex logic
  const result = complexCalculation();
  
  return <div>{result}</div>;
}
```

---

## 🎨 Styling Rules

### Use Tailwind CSS Classes
```tsx
// ✅ Good
<div className="bg-blue-500 text-white px-4 py-2">

// ❌ Bad (don't use inline styles)
<div style={{ backgroundColor: 'blue' }}>
```

### Common Tailwind Patterns:
- Spacing: `px-4 py-2` (padding), `mb-4` (margin-bottom)
- Colors: `bg-blue-500`, `text-white`
- Layout: `flex`, `grid`, `container mx-auto`

---

## 🚫 Critical Rules

### NEVER:
- ❌ Modify shared components without team discussion
- ❌ Create components without comments
- ❌ Use inline styles (use Tailwind classes)
- ❌ Put logic directly in page.tsx (put in components)

### ALWAYS:
- ✅ Check CRITICAL_AREAS.md before touching core files
- ✅ Follow the component structure (page-specific vs shared)
- ✅ Use TypeScript types for props
- ✅ Add comments explaining what code does

---

## 📁 Import Rules

### Page-Specific Components
```tsx
// From same page's components folder
import Component from "./components/Component";
```

### Shared Components
```tsx
// From shared components folder
import Button from "@/components/ui/Button";
```

### Types
```tsx
// From types folder
import { Degree } from "@/types/degree";
```

---

## ✅ Code Quality Checklist

Before submitting code, check:
- [ ] Component has a comment explaining what it does
- [ ] Props have TypeScript types
- [ ] Uses Tailwind classes (not inline styles)
- [ ] Follows naming conventions
- [ ] One component per file
- [ ] page.tsx is simple (just imports & layout)















