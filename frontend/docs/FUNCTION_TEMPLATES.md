# Function Templates - Copy & Paste

Ready-to-use templates for common patterns. Copy, paste, and customize!

---

## 📄 Basic Page Component

```tsx
import Component1 from "./components/Component1";
import Component2 from "./components/Component2";

/**
 * [Page Name] Page Component
 * Located at: [file path]
 * URL: [route URL]
 */
export default function PageName({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Component1 />
        <Component2 />
      </div>
    </main>
  );
}
```

---

## 🧩 Basic Component (No Props)

```tsx
/**
 * [Component Name] Component
 * [Brief description of what it does]
 * Used on: [which page(s)]
 */
export default function ComponentName() {
  return (
    <div className="...">
      {/* Your content here */}
    </div>
  );
}
```

---

## 🧩 Component with Props

```tsx
/**
 * [Component Name] Component
 * [Brief description]
 * Used on: [which page(s)]
 */
interface ComponentProps {
  title: string;
  description?: string; // ? means optional
}

export default function ComponentName({ title, description }: ComponentProps) {
  return (
    <div className="...">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
```

---

## 📋 Component with List/Array

```tsx
/**
 * [Component Name] Component
 * Displays a list of items
 */
interface Item {
  id: string;
  name: string;
}

interface ComponentProps {
  items: Item[];
}

export default function ComponentName({ items }: ComponentProps) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <div key={item.id} className="p-4 border rounded">
          {item.name}
        </div>
      ))}
    </div>
  );
}
```

---

## 🔗 Component with Link (Navigation)

```tsx
import Link from "next/link";

/**
 * [Component Name] Component
 * Displays clickable links
 */
export default function ComponentName() {
  return (
    <div>
      <Link href="/degrees" className="text-blue-500 hover:underline">
        Go to Degrees
      </Link>
    </div>
  );
}
```

---

## 🎨 Component with Conditional Rendering

```tsx
/**
 * [Component Name] Component
 * Shows different content based on conditions
 */
interface ComponentProps {
  isLoading: boolean;
  data?: string;
}

export default function ComponentName({ isLoading, data }: ComponentProps) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data ? <p>{data}</p> : <p>No data available</p>}
    </div>
  );
}
```

---

## 🎯 Dynamic Route Page Component

```tsx
import Component1 from "./components/Component1";

/**
 * [Page Name] Page Component
 * Dynamic route: /path/[param]
 * Located at: src/app/path/[param]/page.tsx
 */
export default function PageName({ 
  params 
}: { 
  params: { param: string } 
}) {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1>{params.param}</h1>
        <Component1 param={params.param} />
      </div>
    </main>
  );
}
```

---

## 📝 How to Use Templates

1. **Copy the template** that matches what you need
2. **Replace placeholders:**
   - `[Component Name]` → Your component name
   - `[Brief description]` → What it does
   - `[which page(s)]` → Where it's used
3. **Customize the JSX** inside the return statement
4. **Add your props** if needed
5. **Add styling** with Tailwind classes

---

## 💡 Tips

- Start with the basic template, then add complexity
- Always add comments explaining what the component does
- Use TypeScript interfaces for props (better error checking)
- Keep components focused on one thing

