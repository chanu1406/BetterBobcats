# JSX/TSX Quick Reference

A quick reference guide for understanding JSX and TSX syntax.

---

## 🎯 What is JSX/TSX?

**JSX = JavaScript + HTML mixed together**
- `.jsx` = JavaScript with HTML
- `.tsx` = TypeScript with HTML

**Think of it as:** HTML that can use JavaScript variables and logic.

---

## 📝 Basic Component Structure

```tsx
// 1. Import (if needed)
import Something from "./components/Something";

// 2. Define component function
export default function MyComponent() {
  // 3. Return JSX (HTML-like)
  return (
    <div className="...">
      <h1>Title</h1>
      <p>Content</p>
    </div>
  );
}
```

---

## 🔑 Key Concepts

### 1. Everything Must Return Something
```tsx
// ✅ Good - returns JSX
export default function Component() {
  return <div>Hello</div>;
}

// ❌ Bad - doesn't return anything
export default function Component() {
  <div>Hello</div>; // Missing return!
}
```

### 2. One Root Element (or use Fragment)
```tsx
// ✅ Good - one root element
return (
  <div>
    <h1>Title</h1>
    <p>Content</p>
  </div>
);

// ✅ Also good - Fragment (invisible wrapper)
return (
  <>
    <h1>Title</h1>
    <p>Content</p>
  </>
);
```

### 3. Self-Closing Tags
```tsx
// ✅ Good - self-closing
<img src="..." alt="..." />
<br />
<Component />

// ❌ Bad - not self-closing
<img src="..." alt="..."></img>
```

---

## 💡 Common Patterns

### Inserting Variables
```tsx
const name = "John";
return <h1>Hello {name}!</h1>; // Shows: Hello John!
```

### Conditional Rendering
```tsx
// Show if true
{isVisible && <div>Show this</div>}

// If/else
{isLoading ? <Spinner /> : <Content />}

// Multiple conditions
{status === "loading" && <Spinner />}
{status === "error" && <Error />}
{status === "success" && <Content />}
```

### Lists with .map()
```tsx
const items = ["Apple", "Banana", "Orange"];

{items.map((item) => (
  <div key={item}>{item}</div>
))}
```

### Click Handlers
```tsx
<button onClick={() => console.log("Clicked")}>
  Click Me
</button>
```

---

## 🎨 Styling

### Using className (Tailwind CSS)
```tsx
<div className="bg-blue-500 text-white px-4 py-2">
  Styled content
</div>
```

### Multiple Classes
```tsx
<div className="bg-blue-500 text-white px-4 py-2 rounded-lg">
  Multiple classes
</div>
```

### Conditional Classes
```tsx
<div className={`base-class ${isActive ? "active-class" : ""}`}>
  Conditional styling
</div>
```

---

## 📦 Props (Passing Data)

### Receiving Props
```tsx
interface Props {
  title: string;
  description?: string; // ? = optional
}

export default function Component({ title, description }: Props) {
  return (
    <div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
```

### Using Components with Props
```tsx
<Component title="Hello" description="World" />
<Component title="Hello" /> {/* description is optional */}
```

---

## 🔄 Common Mistakes

### ❌ Using `class` instead of `className`
```tsx
// ❌ Wrong
<div class="my-class">

// ✅ Correct
<div className="my-class">
```

### ❌ Forgetting `return`
```tsx
// ❌ Wrong
export default function Component() {
  <div>Hello</div>;
}

// ✅ Correct
export default function Component() {
  return <div>Hello</div>;
}
```

### ❌ Missing `key` in lists
```tsx
// ❌ Wrong
{items.map((item) => <div>{item}</div>)}

// ✅ Correct
{items.map((item) => <div key={item.id}>{item.name}</div>)}
```

---

## 📚 Learn More

- **W3Schools HTML**: https://www.w3schools.com/html/
- **W3Schools JavaScript**: https://www.w3schools.com/js/
- **React Docs**: https://react.dev/learn
- **Next.js Docs**: https://nextjs.org/docs










