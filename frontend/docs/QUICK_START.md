# Quick Start Guide - Component Structure

## 🎯 What Was Set Up

The homepage now has its own components folder following **Option 1** structure.

## 📁 Current Structure

```
frontend/src/app/
├── page.tsx                    # Homepage (imports components)
├── components/                 # Homepage-specific components
│   ├── HeroSection.tsx        # Top banner section (includes logo and navigation links)
│   ├── FeaturesSection.tsx    # Features display (available but not currently used)
│   └── Navigation.tsx          # Header navigation (available but not currently used)
├── layout.tsx
└── globals.css
```

## 🚀 How It Works

### 1. The Homepage (`page.tsx`)

The homepage currently imports and uses only the HeroSection component:

```tsx
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
    </main>
  );
}
```

**Note:** The `HeroSection` component includes the logo and navigation links within it, so separate `Navigation` and `FeaturesSection` components are available but not currently used on the homepage.

### 2. Components Live Next to the Page

Each component is in `src/app/components/`:
- `HeroSection.tsx` - The welcome banner (currently used, includes logo and navigation)
- `FeaturesSection.tsx` - Shows platform features (available but not currently used)
- `Navigation.tsx` - Header navigation (available but not currently used)

### 3. Import Path

From `page.tsx`, import components using relative paths:
```tsx
import HeroSection from "./components/HeroSection";
```

The `./` means "same folder level", so `./components/` finds the components folder next to `page.tsx`.

## 📝 Adding More Components

To add a new homepage component:

1. **Create the file:**
   ```
   src/app/components/YourNewComponent.tsx
   ```

2. **Write the component:**
   ```tsx
   export default function YourNewComponent() {
     return (
       <div>
         {/* Your content */}
       </div>
     );
   }
   ```

3. **Import and use in `page.tsx`:**
   ```tsx
   import YourNewComponent from "./components/YourNewComponent";
   
   export default function Home() {
     return (
       <main>
         {/* ... other components ... */}
         <YourNewComponent />
       </main>
     );
   }
   ```

## 🎓 Creating Pages for Majors

When you create pages for each major (like Computer Science), follow the same pattern:

```
src/app/degrees/[major]/
├── page.tsx                    # Major page
└── components/                 # Major-specific components
    ├── MajorHeader.tsx
    ├── CourseList.tsx
    └── RequirementsCard.tsx
```

**Example major page:**
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

## 🔄 Shared vs Page-Specific Components

### Page-Specific (like homepage components)
- **Location:** `src/app/components/` (next to the page)
- **Use when:** Component is ONLY used on that one page
- **Example:** `HeroSection` is only on homepage

### Shared Components
- **Location:** `src/components/ui/` or `src/components/shared/`
- **Use when:** Component is used on MULTIPLE pages
- **Example:** `Button`, `Card` used everywhere
- **Import:** `import Button from "@/components/ui/Button"`

## ✅ Key Rules

1. **Each page = its own components folder**
   - Homepage → `src/app/components/`
   - Major pages → `src/app/degrees/[major]/components/`

2. **Keep components close to where they're used**
   - If homepage-only → `src/app/components/`
   - If used everywhere → `src/components/ui/`

3. **Simple imports**
   - Same page: `import Component from "./components/Component"`
   - Shared: `import Component from "@/components/ui/Component"`

## 📚 Full Documentation

See `COMPONENT_STRUCTURE.md` for complete documentation with examples and best practices.

## 🎉 You're Ready!

The structure is set up. You can now:
- ✅ Edit homepage components in `src/app/components/`
- ✅ Add new components to that folder
- ✅ Follow the same pattern for other pages
- ✅ Use shared components from `src/components/ui/` when needed


