# Memory / Mac Crash Troubleshooting

If running the dev server (`./run-dev.sh` or `npm run dev`) causes your Mac to freeze, spin the fan, or kill the process (often with no clear error), it’s usually **Node.js running out of memory**.

## Why it happens

- **Next.js dev** watches files, compiles on demand, and keeps caches.
- The **Degrees** page lazy-loads **CareerPathGraph** components (React Flow) via `next/dynamic`. Each graph uses canvas/SVG and can use a lot of memory when loaded.
- **Backend (uvicorn) + frontend (Next.js)** both run at once.
- Node’s default heap is often ~1.5–2 GB. Heavy dev workloads can exceed that; macOS may then kill the process or the system can feel unresponsive.

## Fixes applied in this project

1. **Larger Node heap**  
   The frontend dev script and `run-dev.sh` set:
   ```bash
   NODE_OPTIONS="--max-old-space-size=4096"
   ```
   This raises the limit to 4 GB. Adjust (e.g. `8192`) if you still see issues.

2. **Next.js memory optimizations**  
   `next.config` enables:
   ```js
   experimental: { webpackMemoryOptimizations: true }
   ```
   This reduces peak memory use during compilation (with a small build-time cost).

## If you still crash or freeze

### 1. Clear Next.js cache and restart

```bash
cd frontend
rm -rf .next
npm run dev
```

### 2. Run only what you need

- **Frontend only** (when you don’t need the API):
  ```bash
  cd frontend && npm run dev
  ```
- **Backend only**:
  ```bash
  cd backend && source venv/bin/activate && uvicorn app.main:app --reload --port 8000
  ```

### 3. Close other heavy apps

Reduce memory pressure from Chrome (especially many tabs), Docker, Zoom, etc. while running dev.

### 4. Increase heap further

If you have enough RAM, try 6–8 GB:

```bash
NODE_OPTIONS="--max-old-space-size=8192" npm run dev
```

Or change the `dev` script in `frontend/package.json` to use `8192` instead of `4096`.

### 5. Check usage

- **Activity Monitor**: filter by “Node” or “next” and watch memory.
- **Debug heap** (optional):
  ```bash
  NODE_OPTIONS="--max-old-space-size=4096 --inspect" npm run dev
  ```
  Then use Chrome DevTools → Memory to inspect heap usage.

## Dynamic imports (implemented)

The Degrees page uses **`next/dynamic`** to lazy-load each **CareerPathGraph** component. Only the graph for the currently selected career path is loaded; the rest are fetched when the user navigates to them. This reduces initial bundle size and memory use when viewing the degrees section.
