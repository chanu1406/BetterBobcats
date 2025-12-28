# Component Structure Guide

## 📁 How Our Frontend is Organized

This document explains how components are organized in the BetterBobcats frontend, making it easy for developers to collaborate and find what they need.

---

## 🎯 The Big Idea

**Each page has its own components folder.** This keeps everything organized and makes it easy for multiple developers to work on different pages without conflicts.

---

## 📂 Folder Structure

```
src/
├── app/                              # Next.js pages (routes)
│   ├── page.tsx                      # Homepage (/)
│   ├── components/                   # Homepage-specific components
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   └── Navigation.tsx
│   │
│   ├── degrees/
│   │   ├── page.tsx                  # All degrees page (/degrees)
│   │   └── components/               # Degrees listing components
│   │       └── DegreeGrid.tsx
│   │
│   └── degrees/[major]/              # Dynamic route for each major
│       ├── page.tsx                  # Individual major page
│       └── components/               # Major-specific components
│           ├── MajorHeader.tsx
│           └── CourseList.tsx
│
├── components/                       # SHARED components (used everywhere)
│   ├── ui/                           # Reusable UI pieces
│   │   ├── Button.tsx                # Used on many pages
│   │   └── Card.tsx                  # Used on many pages
│   └── shared/                       # Shared feature components
│       └── Footer.tsx
│
├── lib/                              # Utility functions
└── types/                            # TypeScript type definitions
```

---

## 🔑 Key Concepts

### 1. **Page Components** (`src/app/components/`)

**What:** Components that are ONLY used on the homepage.

**Where:** `src/app/components/`

**Example:**
- `HeroSection.tsx` - The big banner at the top
- `FeaturesSection.tsx` - Shows platform features
- `Navigation.tsx` - Header navigation (if only on homepage)

**Why:** If a component is only used on one page, keep it close to that page!

---

### 2. **Shared Components** (`src/components/`)

**What:** Components used on MULTIPLE pages.

**Where:** `src/components/ui/` or `src/components/shared/`

**Example:**
- `Button.tsx` - Used on homepage, degrees page, major pages, etc.
- `Card.tsx` - Used to display degrees, careers, etc.
- `Footer.tsx` - Appears on every page

**Why:** If multiple pages use it, put it in the shared folder so everyone can import it.

---

### 3. **Page Files** (`src/app/page.tsx`)

**What:** The actual page that shows up at a URL.

**Where:** `src/app/page.tsx` (for homepage) or `src/app/[folder]/page.tsx` (for other pages)

**Example:**
- `src/app/page.tsx` → Shows at `http://localhost:3000/`
- `src/app/degrees/page.tsx` → Shows at `http://localhost:3000/degrees`
- `src/app/degrees/[major]/page.tsx` → Shows at `http://localhost:3000/degrees/computer-science`

**What it does:** Imports components and arranges them on the page.

---

## 🚀 How to Use This Structure

### Creating a New Page

**Example: Creating a page for Computer Science major**

1. **Create the folder structure:**
   ```
   src/app/degrees/[major]/
   ├── page.tsx
   └── components/
   ```

2. **Create the page file:**
   ```tsx
   // src/app/degrees/[major]/page.tsx
   import MajorHeader from "./components/MajorHeader";
   import CourseList from "./components/CourseList";
   
   export default function MajorPage({ params }: { params: { major: string } }) {
     return (
       <div>
         <MajorHeader majorName={params.major} />
         <CourseList major={params.major} />
       </div>
     );
   }
   ```

3. **Create page-specific components:**
   ```tsx
   // src/app/degrees/[major]/components/MajorHeader.tsx
   export default function MajorHeader({ majorName }: { majorName: string }) {
     return (
       <div>
         <h1>{majorName}</h1>
         {/* Major-specific content */}
       </div>
     );
   }
   ```

4. **Use shared components when needed:**
   ```tsx
   // In any component file
   import Button from "@/components/ui/Button";
   import Card from "@/components/ui/Card";
   ```

---

## 📝 Import Paths

### Importing from Same Page's Components Folder

```tsx
// From: src/app/page.tsx
// To: src/app/components/HeroSection.tsx
import HeroSection from "./components/HeroSection";
```

### Importing from Shared Components

```tsx
// From: Anywhere
// To: src/components/ui/Button.tsx
import Button from "@/components/ui/Button";
```

**Note:** The `@/` is a shortcut that means `src/`. It's configured in `tsconfig.json`.

---

## 🎨 Component Examples

### Page-Specific Component (Homepage)

```tsx
// src/app/components/HeroSection.tsx
export default function HeroSection() {
  return (
    <section className="...">
      <h1>Welcome to BetterBobcats</h1>
      {/* Homepage-specific hero content */}
    </section>
  );
}
```

### Shared Component

```tsx
// src/components/ui/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className="...">
      {children}
    </button>
  );
}
```

---

## ✅ Decision Guide: Where Should My Component Go?

Ask yourself:

1. **Is this component used on only ONE page?**
   - ✅ YES → Put it in that page's `components/` folder
   - ❌ NO → Continue to question 2

2. **Is this component used on MULTIPLE pages?**
   - ✅ YES → Put it in `src/components/ui/` or `src/components/shared/`

**Examples:**

| Component | Used On | Location |
|-----------|---------|----------|
| `HeroSection` | Homepage only | `src/app/components/` |
| `MajorHeader` | Major pages only | `src/app/degrees/[major]/components/` |
| `Button` | Everywhere | `src/components/ui/` |
| `Footer` | Every page | `src/components/shared/` |

---

## 🤝 Collaboration Benefits

### Multiple Developers Working Together

**Scenario:** Three developers working on different pages

- **Developer A** works on: `src/app/components/HeroSection.tsx` (homepage)
- **Developer B** works on: `src/app/degrees/[major]/components/CourseList.tsx` (major pages)
- **Developer C** works on: `src/components/ui/Button.tsx` (shared component)

**Result:** 
- ✅ No merge conflicts (different files)
- ✅ Easy to find components (organized by page)
- ✅ Clear ownership (each page has its own folder)

---

## 🎯 Best Practices

1. **Keep components close to where they're used**
   - If it's homepage-only → `src/app/components/`
   - If it's major-page-only → `src/app/degrees/[major]/components/`

2. **Use shared components for reusable UI**
   - Buttons, cards, modals → `src/components/ui/`

3. **Name components clearly**
   - ✅ `HeroSection.tsx` (clear purpose)
   - ❌ `Section1.tsx` (unclear)

4. **One component per file**
   - Easier to find and maintain

5. **Keep page.tsx files simple**
   - They should mostly import and arrange components
   - Put logic in the components themselves

---

## 📚 Quick Reference

| What | Where | Example |
|------|-------|---------|
| Homepage | `src/app/page.tsx` | Main landing page |
| Homepage components | `src/app/components/` | HeroSection, FeaturesSection |
| Other pages | `src/app/[folder]/page.tsx` | Degrees page, Major page |
| Page-specific components | `src/app/[folder]/components/` | MajorHeader, CourseList |
| Shared components | `src/components/ui/` | Button, Card, Modal |
| Shared features | `src/components/shared/` | Footer, Navigation (if used everywhere) |

---

## 🚦 Getting Started

1. **To work on the homepage:**
   - Edit: `src/app/page.tsx`
   - Add components: `src/app/components/YourComponent.tsx`
   - Import: `import YourComponent from "./components/YourComponent"`

2. **To create a new page:**
   - Create folder: `src/app/your-page/`
   - Create: `src/app/your-page/page.tsx`
   - Create: `src/app/your-page/components/` folder
   - Add components to that folder

3. **To create a shared component:**
   - Create: `src/components/ui/YourComponent.tsx`
   - Import anywhere: `import YourComponent from "@/components/ui/YourComponent"`

---

## 💡 Summary

- **Each page = its own components folder**
- **Shared components = `src/components/`**
- **Keep it organized = easy collaboration**
- **Simple rule: If only one page uses it, keep it with that page!**

---

**Questions?** Check the code examples above or look at existing components for reference!


