# ⚠️ Critical Areas - Do Not Modify Without Team Discussion

## 🔴 NEVER TOUCH (Core Infrastructure)

These files control the entire application. Changing them can break everything.

### `src/app/layout.tsx`
- **What it does:** Root layout that wraps all pages
- **Why critical:** Affects every single page in the app
- **If you need to change:** Discuss with team first

### `tsconfig.json`
- **What it does:** TypeScript configuration
- **Why critical:** Controls how TypeScript works across entire project
- **If you need to change:** Must understand TypeScript config deeply

### `next.config.ts`
- **What it does:** Next.js framework configuration
- **Why critical:** Controls how Next.js builds and runs
- **If you need to change:** Requires Next.js expertise

### `tailwind.config.ts`
- **What it does:** Tailwind CSS configuration
- **Why critical:** Controls all styling system
- **If you need to change:** Affects all components using Tailwind

---

## 🟡 CONSULT BEFORE CHANGING

These affect multiple parts of the app. Check with team before modifying.

### `src/components/ui/*`
- **What it does:** Shared UI components used everywhere
- **Why consult:** Changes affect all pages using these components
- **Examples:** Button, Card, Modal components
- **Process:** Discuss changes, get approval, then modify

### `src/lib/utils.ts`
- **What it does:** Utility functions used across the app
- **Why consult:** Many components depend on these functions
- **Process:** Check who uses it, discuss changes

### `src/types/*`
- **What it does:** TypeScript type definitions
- **Why consult:** Changing types affects all code using them
- **Process:** Ensure all affected code is updated together

---

## ✅ SAFE TO MODIFY

These are safe to work on without consultation.

### Page Files
- `src/app/[any-page]/page.tsx` - Individual pages
- `src/app/[any-page]/components/*` - Page-specific components

### Content/Data
- Data files (JSON, etc.)
- Content files (markdown, etc.)

### New Components
- Creating new page-specific components
- Creating new shared components (but check if similar exists first)

---

## 📋 Process for Critical Changes

If you need to modify a critical area:

1. **Document the need**
   - Why do you need to change it?
   - What problem does it solve?

2. **Discuss with team**
   - Explain the change
   - Get feedback
   - Get approval

3. **Make the change**
   - Follow coding standards
   - Add comments
   - Test thoroughly

4. **Update documentation**
   - Update relevant docs
   - Add notes about the change

---

## 🆘 If You're Unsure

**When in doubt, ask!**

- Is this file critical? → Check this document
- Should I modify this? → Ask team
- Will this break things? → Test first, or ask

**Better to ask than to break the app!**



















