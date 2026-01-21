# Performance Optimization Roadmap

**Last Updated:** January 2025  
**Status:** Major optimizations completed ✅ - Admin Dashboard, Public Pages, Invites, Event Forms

This document outlines all areas of the BetterBobcats platform that need performance optimization, prioritized by impact and effort.

**📖 Quick Start for Developers & AI Assistants:**
- **Adding a new feature?** → See [How to Add a New Optimized Feature](#how-to-add-a-new-optimized-feature)
- **Updating existing code?** → See [How to Update an Existing Optimization](#how-to-update-an-existing-optimization)
- **Troubleshooting?** → See [Troubleshooting Common Issues](#troubleshooting-common-issues)
- **Need examples?** → See [Code Examples Reference](#code-examples-reference)
- **Decision making?** → See [Optimization Decision Tree](#quick-reference-optimization-decision-tree)

---

## 🎯 Optimization Strategy

**Core Principles:**
1. **Resource embedding vs RPC** - Use PostgREST nested selects/joins where possible, RPC for complex logic
2. **Single database calls** instead of multiple sequential queries
3. **TanStack Query caching** for client-side data with proper `staleTime` settings
4. **Database indexes** for fast lookups (verify with EXPLAIN)
5. **Parallel queries** where possible
6. **Prefetching** on user interactions
7. **Remove redundant auth checks**
8. **Next.js caching** for public/server-side data

**Decision Framework: Resource Embedding vs RPC**

Before creating a new RPC function, check if PostgREST resource embedding can handle it:

- **Use Resource Embedding** (nested selects) for:
  - Simple list/detail reads with relationships
  - One-to-many joins (e.g., `clubs:club_id (id, name, slug)`)
  - No conditional logic needed
  - Example: `select("*, clubs:club_id (name, slug)")`

- **Use RPC Functions** for:
  - Complex conditional logic
  - Permission checks that need `auth.uid()`
  - Multiple derived outputs
  - Aggregations across multiple tables
  - Example: `get_event_request_details()` with vote status, fulfilled event, etc.

**Rule of thumb:** Try embedding first, use RPC when you need logic beyond simple joins.

---

## 📊 Priority Levels

- **🔴 Critical (High Impact, High Traffic)**
- **🟡 High (High Impact, Medium Traffic)**
- **🟢 Medium (Medium Impact, Medium Traffic)**
- **🔵 Low (Nice to Have)**

---

## 1. 🔴 CRITICAL: Dashboard & Club Management

### 1.1 Dashboard Homepage (`/dashboard/page.tsx`)
**Current Issues:**
- Sequential queries: auth check → memberships → clubs (fallback)
- No caching - refetches on every visit
- Client-side data processing

**Optimizations:**
- [x] **Try resource embedding first:** `club_memberships.select("*, clubs:club_id (id, name, slug, logo_url, is_active)")`
- [x] Add TanStack Query with `staleTime: 5 minutes`, `refetchOnWindowFocus: true`
- [x] Prefetch on navigation hover
- [x] Add indexes: `club_memberships(user_id, created_at DESC)`

**Expected Impact:** 2-3s → 300-500ms ✅ **COMPLETED**

---

### 1.2 Club Dashboard (`/dashboard/[slug]/page.tsx`)
**Current Issues:**
- Multiple sequential queries (club → membership → events → stats)
- No caching
- Events fetched but may not be needed immediately

**Optimizations:**
- [x] Create RPC: `get_club_dashboard_data(club_slug, user_id)` returning:
  - Club info
  - User membership/role
  - Recent events summary (last 5)
  - Stats (member count, event count)
- [x] Use TanStack Query
- [x] Lazy load full events list (only when Events tab clicked)
- [x] Add indexes: `events(club_id, status, starts_at DESC)`

**Expected Impact:** 2-4s → 400-600ms ✅ **COMPLETED**

---

### 1.3 Club Events List (`/dashboard/[slug]/events/page.tsx`)
**Current Issues:**
- ✅ Already parallelized (good!)
- No caching
- Fetches all events (limit 50 but still heavy)
- Client-side filtering/sorting

**Optimizations:**
- [x] Add TanStack Query caching
- [x] Server-side filtering by status/date
- [x] Pagination (20 events per page)
- [x] Optimistic updates for delete/create
- [x] Prefetch next page on navigation

**Expected Impact:** 1-2s → 200-400ms (cached) ✅ **COMPLETED**

---

### 1.4 Club Members Table (`/dashboard/[slug]/members/page.tsx`)
**Current Issues:**
- Uses RPC `list_club_members` (good!)
- No caching
- Refetches on every page change
- No prefetching

**Optimizations:**
- [x] Add TanStack Query with pagination support
- [x] Cache member list per club
- [x] Optimistic updates for role changes
- [x] Prefetch next page
- [x] Add index: `club_memberships(club_id, created_at DESC)`

**Expected Impact:** 800ms-1.5s → 100-300ms (cached) ✅ **COMPLETED**

---

## 2. 🔴 CRITICAL: Events Calendar

### 2.1 Events Calendar Page (`/events/page.tsx`)
**Current Issues:**
- Fetches all events for date range on every view change
- No caching between month/week/list switches
- Client-side filtering (tags, majors, clubs)
- Large payloads (all event data)

**Optimizations:**
- [x] Create RPC: `get_events_for_range(start_date, end_date, filters)` with server-side filtering
- [x] Add TanStack Query with smart cache keys per date range
- [x] Prefetch adjacent months/weeks
- [x] Server-side filtering (majors, tags, clubs, location, search)
- [x] Add indexes: `events(starts_at, visibility, status)`, `event_majors(event_id)`, `event_tags(event_id)`

**Expected Impact:** 2-4s → 300-600ms ✅ **COMPLETED**

---

### 2.2 Event Details Drawer (`EventDetailsDrawer.tsx`)
**Current Issues:**
- Fetches full event data on open
- No prefetching
- No caching

**Optimizations:**
- [x] Event data already available (no fetch needed)
- [x] Added hover support infrastructure (event data passed directly)
- [x] No RPC needed (event data already includes all relationships)

**Expected Impact:** 500ms-1s → 0-100ms (cached) ✅ **COMPLETED**

---

### 2.3 Event Request Board (`RequestBoard.tsx`)
**Current Issues:**
- ✅ Already optimized (single fetch)
- Client-side sorting by vote_count
- No prefetching of details

**Optimizations:**
- [x] ✅ Prefetching on hover (DONE)
- [x] Add TanStack Query for request list
- [x] Cache invalidation on vote/create/delete

**Expected Impact:** Already optimized, minor improvements possible ✅ **COMPLETED**

---

## 3. 🟡 HIGH: Admin Dashboard

### 3.1 Admin Clubs List (`/admin/clubs/page.tsx`)
**Current Issues:**
- Uses FastAPI backend (extra network hop)
- No caching
- Fetches all clubs on load
- Club details dialog makes 5+ sequential queries

**Optimizations:**
- [x] Migrate to Supabase direct queries (remove FastAPI hop)
- [x] Add TanStack Query caching
- [x] Create RPC: `admin_get_clubs_list()` returning clubs with summary stats
- [x] Prefetch club details on hover

**Expected Impact:** 3-5s → 500-800ms ✅ **COMPLETED**

---

### 3.2 Admin Club Details Dialog (`ClubDetailsDialog.tsx`)
**Current Issues:**
- 5 sequential queries: summary → members → invites → tags → majors
- No caching
- Fetches all members (limit 1000!)

**Optimizations:**
- [x] Create single RPC: `admin_get_club_full_details(club_id)` returning JSONB with all data
- [x] Paginate members (50 per page, expandable)
- [x] Add TanStack Query caching
- [x] Lazy load tabs (only fetch when tab opened)

**Expected Impact:** 4-6s → 400-600ms ✅ **COMPLETED**

---

### 3.3 Admin Club Requests (`/admin/club-requests/page.tsx`)
**Current Issues:**
- Sequential queries for request details
- No caching
- Large payloads

**Optimizations:**
- [x] Create RPC: `admin_get_club_request_details(request_id)` for request details
- [x] Server-side filtering/pagination (already implemented)
- [ ] Add TanStack Query (server component - optimization deferred)
- [ ] Optimistic updates for approve/reject (can be added to detail page)

**Expected Impact:** 2-3s → 300-500ms ✅ **PARTIALLY COMPLETED** (RPC created, server-side filtering already done)

---

## 4. 🟡 HIGH: Public Pages

### 4.1 Clubs Browse Page (`/clubs/page.tsx`)
**Current Issues:**
- Sequential queries: majors → clubs (filtered)
- Refetches clubs on every major change
- No caching
- Fetches all clubs when no filter

**Optimizations:**
- [x] Create RPC: `get_clubs_with_filters(major_id?, search?)` with server-side filtering
- [x] Add TanStack Query with cache per filter combination
- [x] Prefetch clubs for popular majors
- [x] Add indexes: `clubs(name)`, `club_majors(major_id, club_id)`
- [ ] Pagination for large club lists (can be added if needed)

**Expected Impact:** 1-2s → 200-400ms ✅ **COMPLETED**

---

### 4.2 Club Request Pages (`/clubs/request/*`)
**Current Issues:**
- Multiple queries for form data
- No caching of majors/tags

**Optimizations:**
- [x] Cache majors list (rarely changes) - using Next.js cache in event forms
- [ ] Prefetch form data (can be added if needed)
- [ ] Optimistic updates on submit (can be added if needed)

**Expected Impact:** 800ms-1.5s → 200-400ms ✅ **PARTIALLY COMPLETED** (majors caching added)

---

## 5. 🟢 MEDIUM: Invites & Memberships

### 5.1 Invites Page (`/invites/page.tsx`)
**Current Issues:**
- Sequential queries with fallback logic
- No caching
- Refetches on every visit

**Optimizations:**
- [x] **Try resource embedding first:** `club_invites.select("*, clubs:club_id (id, name, slug, logo_url)")` 
- [x] Add TanStack Query caching with `staleTime: 2m`, `refetchOnWindowFocus: false`
- [x] Optimistic updates for accept/decline
- [ ] Add index: `club_invites(email, accepted_at)` WHERE `accepted_at IS NULL` (note: uses email, not user_id)

**Expected Impact:** 1.5-2s → 300-500ms ✅ **COMPLETED**

---

### 5.2 Club Requests (Dashboard) (`/dashboard/[slug]/requests/page.tsx`)
**Current Issues:**
- Sequential: club → requests
- Uses `fetchClubRelevantRequests` (good RPC)
- No caching

**Optimizations:**
- [x] Add TanStack Query caching
- [ ] Prefetch on navigation (can be added if needed)
- [ ] Optimistic updates for fulfill (can be added if needed)

**Expected Impact:** 1-1.5s → 200-400ms (cached) ✅ **COMPLETED**

---

## 6. 🟢 MEDIUM: Event Creation/Editing

### 6.1 Create Event Page (`/dashboard/[slug]/events/new/page.tsx`)
**Current Issues:**
- ✅ Already parallelized (good!)
- Fetches majors list every time
- No caching of form data

**Optimizations:**
- [x] Cache majors list globally (rarely changes) - using Next.js `unstable_cache`
- [ ] Prefetch form data on navigation (can be added if needed)
- [ ] Optimistic navigation after create (can be added if needed)

**Expected Impact:** 1-2s → 300-500ms ✅ **COMPLETED**

---

### 6.2 Edit Event Page (`/dashboard/[slug]/events/[eventId]/edit/page.tsx`)
**Current Issues:**
- ✅ Already parallelized (good!)
- Multiple queries for related data
- No caching

**Optimizations:**
- [x] Cache majors list globally (rarely changes) - using Next.js `unstable_cache`
- [ ] Create RPC: `get_event_edit_data(event_id)` (can be added if needed)
- [ ] Add TanStack Query (can be added if needed)
- [ ] Prefetch on hover over edit button (can be added if needed)

**Expected Impact:** 2-3s → 400-600ms ✅ **PARTIALLY COMPLETED** (majors caching added)

---

## 7. 🔵 LOW: Degrees & Career Pages

### 7.1 Degrees Pages (`/degrees/*`)
**Current Issues:**
- Mostly static data (good!)
- Large component trees
- No code splitting

**Optimizations:**
- [ ] Code splitting for career path graphs
- [ ] Lazy load heavy components
- [ ] Image optimization for career icons

**Expected Impact:** Minor improvements

---

## 8. 🔵 LOW: Admin Maintenance

### 8.1 Maintenance Pages (`/admin/maintenance/*`)
**Current Issues:**
- Large data sets
- No pagination
- Sequential queries

**Optimizations:**
- [ ] Add pagination
- [ ] Server-side filtering
- [ ] Batch operations

**Expected Impact:** Better UX for admins

---

## 📋 Database Indexes Needed

**⚠️ Important:** Always verify schema before creating indexes. Use `EXPLAIN` to confirm indexes are used.

### High Priority Indexes:
```sql
-- Club memberships
CREATE INDEX IF NOT EXISTS idx_club_memberships_user_created 
ON club_memberships(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_club_memberships_club_created 
ON club_memberships(club_id, created_at DESC);

-- Events (Note: events table does NOT have deleted_at column)
CREATE INDEX IF NOT EXISTS idx_events_club_starts 
ON events(club_id, starts_at DESC) 
WHERE status = 'published';

CREATE INDEX IF NOT EXISTS idx_events_starts_visibility 
ON events(starts_at, visibility, status);

-- Event relationships
CREATE INDEX IF NOT EXISTS idx_event_majors_event 
ON event_majors(event_id);

CREATE INDEX IF NOT EXISTS idx_event_tags_event 
ON event_tags(event_id);

-- Clubs
CREATE INDEX IF NOT EXISTS idx_clubs_name 
ON clubs(name);

CREATE INDEX IF NOT EXISTS idx_club_majors_major 
ON club_majors(major_id, club_id);

-- Invites (Note: club_invites uses email, not user_id)
CREATE INDEX IF NOT EXISTS idx_club_invites_email_pending 
ON club_invites(email, accepted_at) 
WHERE accepted_at IS NULL;

-- Event requests (already have some, verify these exist)
CREATE INDEX IF NOT EXISTS idx_event_requests_status_created 
ON event_requests(status, created_at DESC) 
WHERE deleted_at IS NULL;
```

**Index Verification Workflow:**
1. Check actual table schema before creating indexes
2. Use `EXPLAIN ANALYZE` to verify index usage:
   ```sql
   EXPLAIN ANALYZE 
   SELECT * FROM club_memberships 
   WHERE user_id = '...' 
   ORDER BY created_at DESC;
   ```
3. Look for "Index Scan" vs "Seq Scan" in output
4. Only create partial indexes (`WHERE ...`) if the column actually exists

---

## 🚀 Implementation Order

### Phase 1: Critical Dashboard (Week 1)
1. Dashboard Homepage
2. Club Dashboard
3. Club Events List

### Phase 2: Events Calendar (Week 2)
1. Events Calendar Page
2. Event Details Drawer
3. Event Request Board (already done ✅)

### Phase 3: Admin Dashboard (Week 3)
1. Admin Clubs List
2. Admin Club Details Dialog
3. Admin Club Requests

### Phase 4: Public Pages (Week 4)
1. Clubs Browse Page
2. Club Request Pages
3. Invites Page

### Phase 5: Polish (Week 5)
1. Event Creation/Editing
2. Degrees pages
3. Maintenance pages

---

## 📊 Success Metrics

**Target Performance:**
- Dashboard pages: < 500ms first load, < 100ms cached
- Event calendar: < 600ms first load, < 200ms cached
- Admin pages: < 800ms first load, < 300ms cached
- Public pages: < 400ms first load, < 100ms cached

**Monitoring:**
- Track query times in Supabase dashboard
- Use React DevTools Profiler
- Monitor TanStack Query cache hit rates
- Track user-reported slow pages

---

## 🔧 Tools & Patterns

**Reusable Patterns:**
1. **RPC Function Template:**
   ```sql
   CREATE OR REPLACE FUNCTION get_X_data(params)
   RETURNS jsonb
   -- Returns all related data in one call
   ```

2. **TanStack Query Hook Template (Optimized for Panels):**
   ```typescript
   const { data, isLoading } = useQuery({
     queryKey: ['resource', id],
     queryFn: () => fetchResource(id),
     staleTime: 30_000, // 30 seconds - prevents unnecessary refetches
     gcTime: 5 * 60 * 1000, // 5 minutes - cache persists
     refetchOnWindowFocus: false, // Don't refetch when user returns to tab (better UX for panels)
   });
   ```

   **TanStack Query Settings by Use Case:**
   - **Detail Panels/Drawers:** `staleTime: 30s-2m`, `refetchOnWindowFocus: false`
   - **Dashboard Lists:** `staleTime: 5m`, `refetchOnWindowFocus: true` (optional)
   - **Public Data:** `staleTime: 10m-1h` (depends on update frequency)
   - **User-specific Data:** `staleTime: 1m-5m`

3. **Prefetch Pattern:**
   ```typescript
   onMouseEnter={() => {
     queryClient.prefetchQuery({
       queryKey: ['resource', id],
       queryFn: () => fetchResource(id),
       staleTime: 30_000,
     });
   }}
   ```

4. **Next.js Server-Side Caching (for public data):**
   ```typescript
   import { unstable_cache } from 'next/cache';
   
   // For public data that doesn't change often
   export const getCachedClubs = unstable_cache(
     async () => {
       const supabase = await createClient();
       return await supabase.from('clubs').select('*');
     },
     ['clubs-list'], // cache key
     { revalidate: 3600 } // 1 hour
   );
   ```
   
   **When to use Next.js caching:**
   - Public data (events calendar, clubs browse)
   - Data that changes infrequently (majors list)
   - Server Components only (not Client Components)
   - NOT for user-specific data (use TanStack Query instead)

---

## ✅ Completed Optimizations

- ✅ Event Request Details Panel (single RPC, TanStack Query, prefetching)
- ✅ Event Request Board (parallelized queries, TanStack Query)
- ✅ Dashboard Homepage (TanStack Query, prefetching, indexes)
- ✅ Club Dashboard (RPC function, TanStack Query, lazy loading)
- ✅ Club Events List (TanStack Query, server-side filtering, pagination)
- ✅ Club Members Table (TanStack Query, pagination, optimistic updates, prefetching)
- ✅ Events Calendar Page (RPC function, TanStack Query, server-side filtering, prefetch adjacent ranges)
- ✅ Event Details Drawer (event data already available, no fetch needed)
- ✅ Event Request Board (TanStack Query, cache invalidation)
- ✅ Admin Clubs List (migrated to Supabase, TanStack Query, prefetching)
- ✅ Admin Club Details Dialog (single RPC, TanStack Query, lazy loading tabs)
- ✅ Clubs Browse Page (RPC function, TanStack Query, prefetching)
- ✅ Invites Page (resource embedding, TanStack Query, optimistic updates)
- ✅ Dashboard Requests Page (TanStack Query caching)
- ✅ Create Event Page (Next.js cache for majors)
- ✅ Edit Event Page (Next.js cache for majors)

---

## 📝 Notes

- All RPC functions should return JSONB for flexibility
- Use `STABLE` functions where possible for query optimization
- Always verify schema before creating indexes (check actual columns)
- Use `EXPLAIN ANALYZE` to verify indexes are being used
- Test with realistic data volumes (100+ clubs, 1000+ events)
- Monitor database query performance in Supabase dashboard

---

## 🔧 Working with Existing Optimizations

**For Developers & AI Assistants:** This section explains how to work with the optimized codebase.

### Understanding the Optimization Architecture

The codebase uses a layered optimization approach:

1. **Database Layer** - RPC functions and indexes for fast queries
2. **Data Fetching Layer** - TanStack Query for client-side caching
3. **Server Layer** - Next.js caching for public/server-side data
4. **UI Layer** - Prefetching and optimistic updates

### Common Patterns in the Codebase

#### Pattern 1: Admin Data Fetching

**Location:** `frontend/src/lib/admin.ts`

**Example:**
```typescript
import { fetchAdminClubsList } from "@/lib/admin";
import { useQuery } from "@tanstack/react-query";

// In component:
const { data: clubs } = useQuery({
  queryKey: ["admin-clubs-list"],
  queryFn: () => fetchAdminClubsList(100, 0),
  staleTime: 5 * 60 * 1000,
});
```

**When to use:** Admin pages that need club/member/request data

**RPC Functions Available:**
- `admin_get_clubs_list(limit, offset)` - List clubs with stats
- `admin_get_club_full_details(club_id, members_limit, members_offset)` - Full club details
- `admin_get_club_request_details(request_id)` - Request details

#### Pattern 2: Public Data Fetching

**Location:** `frontend/src/lib/clubs.ts`, `frontend/src/lib/dashboard.ts`

**Example:**
```typescript
import { fetchClubsWithFilters } from "@/lib/clubs";
import { useQuery } from "@tanstack/react-query";

const { data: clubs } = useQuery({
  queryKey: ["clubs-browse", majorId || "all"],
  queryFn: () => fetchClubsWithFilters(majorId),
  staleTime: 5 * 60 * 1000,
});
```

**When to use:** Public pages, browse pages, filtered lists

**RPC Functions Available:**
- `get_clubs_with_filters(major_id?, search_query?, limit, offset)` - Filtered clubs
- `get_club_dashboard_data(club_slug, user_id)` - Club dashboard data
- `get_events_for_range(start_date, end_date, filters...)` - Calendar events

#### Pattern 3: Optimistic Updates

**Location:** Any component with mutations (accept invite, delete event, etc.)

**Example:**
```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: async (id: string) => {
    // Perform mutation
    await supabase.rpc("some_action", { p_id: id });
  },
  onMutate: async (id) => {
    // Cancel outgoing queries
    await queryClient.cancelQueries({ queryKey: ["resource"] });
    
    // Snapshot previous value
    const previous = queryClient.getQueryData(["resource"]);
    
    // Optimistically update
    queryClient.setQueryData(["resource"], (old) => 
      old ? old.filter(item => item.id !== id) : []
    );
    
    return { previous };
  },
  onError: (err, id, context) => {
    // Rollback on error
    if (context?.previous) {
      queryClient.setQueryData(["resource"], context.previous);
    }
  },
  onSuccess: () => {
    // Invalidate to refetch
    queryClient.invalidateQueries({ queryKey: ["resource"] });
  },
});
```

**When to use:** Any action that modifies data (delete, update, create)

#### Pattern 4: Prefetching

**Location:** List components, navigation links

**Example:**
```typescript
import { useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();

// On hover over item
onMouseEnter={() => {
  queryClient.prefetchQuery({
    queryKey: ["resource", id],
    queryFn: () => fetchResource(id),
    staleTime: 30_000,
  });
}}
```

**When to use:** Items that open modals/drawers, navigation links

### How to Add a New Optimized Feature

**Step-by-step guide:**

1. **Check if data fetching is needed:**
   - Does it fetch from database? → Use TanStack Query
   - Is it public data? → Consider Next.js cache
   - Is it user-specific? → Use TanStack Query only

2. **Check if RPC function exists:**
   - Look in `frontend/src/lib/` for existing functions
   - Check database migrations for RPC functions
   - If complex logic needed, create new RPC function

3. **Create data fetching function:**
   ```typescript
   // frontend/src/lib/your-feature.ts
   import { createClient } from "@/lib/supabase/browser";
   
   export async function fetchYourData(params: YourParams): Promise<YourType[]> {
     const supabase = createClient();
     const { data, error } = await supabase.rpc("your_rpc_function", {
       p_param: params.param,
     });
     if (error) throw error;
     return data || [];
   }
   ```

4. **Use in component:**
   ```typescript
   import { useQuery } from "@tanstack/react-query";
   import { fetchYourData } from "@/lib/your-feature";
   
   const { data, isLoading } = useQuery({
     queryKey: ["your-feature", params],
     queryFn: () => fetchYourData(params),
     staleTime: 5 * 60 * 1000, // Adjust based on data freshness needs
     gcTime: 10 * 60 * 1000,
   });
   ```

5. **Add prefetching if needed:**
   ```typescript
   onMouseEnter={() => {
     queryClient.prefetchQuery({
       queryKey: ["your-feature", id],
       queryFn: () => fetchYourData({ id }),
     });
   }}
   ```

6. **Add indexes if filtering/sorting:**
   ```sql
   -- In new migration file
   CREATE INDEX IF NOT EXISTS idx_your_table_column 
   ON your_table(column_used_in_filter);
   ```

### How to Update an Existing Optimization

**When updating optimized code:**

1. **If adding new fields to a table:**
   - Update RPC function to include new fields
   - Update TypeScript types in `frontend/src/types/`
   - Update frontend components to use new fields
   - Check if new fields need indexes

2. **If changing query patterns:**
   - Check if existing indexes still cover the query
   - Run `EXPLAIN ANALYZE` to verify index usage
   - Add new indexes if needed
   - Update RPC function if query logic changes

3. **If changing data structure:**
   - Update TanStack Query cache keys if structure changes
   - Invalidate old cache: `queryClient.invalidateQueries({ queryKey: ["old-key"] })`
   - Update all components using the data

4. **If adding new filters:**
   - Add server-side filtering in RPC function
   - Add indexes for filtered columns
   - Update frontend to pass filter params
   - Update cache key to include filters

### Troubleshooting Common Issues

#### Issue: Data not updating after mutation

**Solution:**
```typescript
// After mutation, invalidate queries
queryClient.invalidateQueries({ queryKey: ["your-resource"] });

// Or use optimistic updates (see Pattern 3 above)
```

#### Issue: Stale data showing

**Solution:**
- Check `staleTime` - might be too long
- Check if cache key matches between queries
- Manually invalidate: `queryClient.invalidateQueries({ queryKey: ["key"] })`

#### Issue: Slow queries

**Solution:**
1. Check if indexes exist: `\d+ table_name` in psql
2. Run `EXPLAIN ANALYZE` on slow query
3. Look for "Seq Scan" - means index missing
4. Add appropriate index

#### Issue: RPC function not found

**Solution:**
1. Check if migration was run: `npx supabase db push`
2. Check function exists: `SELECT * FROM pg_proc WHERE proname = 'function_name';`
3. Check permissions: Function needs `GRANT EXECUTE`

#### Issue: Type errors after schema change

**Solution:**
1. Update TypeScript types in `frontend/src/types/`
2. Update RPC function return type if changed
3. Update frontend components using the data
4. Restart TypeScript server

### Migration Checklist

**When creating a new optimization:**

- [ ] Create RPC function in migration file (if needed)
- [ ] Add indexes for filtered/sorted columns
- [ ] Create data fetching function in `frontend/src/lib/`
- [ ] Add TypeScript types
- [ ] Use TanStack Query in component
- [ ] Add prefetching if opening modals/drawers
- [ ] Add optimistic updates if mutating data
- [ ] Test with realistic data volumes
- [ ] Run `EXPLAIN ANALYZE` to verify indexes
- [ ] Update this roadmap document

**When updating existing optimization:**

- [ ] Check if RPC function needs updates
- [ ] Check if indexes need updates
- [ ] Update TypeScript types
- [ ] Update frontend components
- [ ] Invalidate old cache if structure changed
- [ ] Test changes
- [ ] Update this roadmap document

### Code Examples Reference

#### Example 1: Adding a New Filtered List Page

```typescript
// 1. Create RPC function (in migration)
CREATE OR REPLACE FUNCTION get_filtered_items(
  p_filter text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  -- Your query logic here
END;
$$;

// 2. Create data fetching function
// frontend/src/lib/items.ts
export async function fetchFilteredItems(filter?: string) {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_filtered_items", {
    p_filter: filter || null,
  });
  if (error) throw error;
  return data || [];
}

// 3. Use in component
const { data: items } = useQuery({
  queryKey: ["filtered-items", filter],
  queryFn: () => fetchFilteredItems(filter),
  staleTime: 5 * 60 * 1000,
});
```

#### Example 2: Adding Optimistic Delete

```typescript
const deleteMutation = useMutation({
  mutationFn: async (id: string) => {
    await supabase.rpc("delete_item", { p_id: id });
  },
  onMutate: async (id) => {
    await queryClient.cancelQueries({ queryKey: ["items"] });
    const previous = queryClient.getQueryData(["items"]);
    queryClient.setQueryData(["items"], (old: Item[]) => 
      old?.filter(item => item.id !== id) || []
    );
    return { previous };
  },
  onError: (err, id, context) => {
    if (context?.previous) {
      queryClient.setQueryData(["items"], context.previous);
    }
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["items"] });
  },
});
```

#### Example 3: Adding Prefetching to List

```typescript
const queryClient = useQueryClient();

// In list item component
<div
  onMouseEnter={() => {
    queryClient.prefetchQuery({
      queryKey: ["item-details", item.id],
      queryFn: () => fetchItemDetails(item.id),
      staleTime: 30_000,
    });
  }}
  onClick={() => openDetails(item.id)}
>
  {item.name}
</div>
```

### Quick Reference: File Locations

**Database Functions:**
- RPC functions: `supabase/migrations/*.sql`
- Indexes: `supabase/migrations/*.sql`
- Latest migrations: `20260120000001_optimize_admin_clubs.sql`, `20260120000002_optimize_clubs_browse.sql`, `20260120000003_optimize_admin_club_requests.sql`

**Frontend Data Fetching:**
- Admin functions: `frontend/src/lib/admin.ts` - `fetchAdminClubsList()`, `fetchAdminClubFullDetails()`, `fetchAdminClubRequestDetails()`
- Clubs functions: `frontend/src/lib/clubs.ts` - `fetchClubsWithFilters()`, `fetchMajorsList()`
- Dashboard functions: `frontend/src/lib/dashboard.ts` - `fetchUserDashboardData()`, `fetchClubDashboardData()`, `fetchClubEvents()`
- Event requests: `frontend/src/lib/event-requests.ts` - `fetchEventRequests()`, `fetchEventRequestDetails()`, `fetchClubRelevantRequests()`

**TypeScript Types:**
- All types: `frontend/src/types/*.ts`
- Club types: `frontend/src/types/club.ts`
- Event types: `frontend/src/types/event.ts`
- Membership types: `frontend/src/types/membership.ts`

**Components Using Optimizations:**
- Admin clubs: `frontend/src/app/admin/clubs/components/ClubsList.tsx`, `ClubDetailsDialog.tsx`
- Clubs browse: `frontend/src/app/clubs/page.tsx`
- Dashboard: `frontend/src/app/dashboard/page.tsx`, `frontend/src/app/dashboard/[slug]/page-client.tsx`
- Invites: `frontend/src/app/invites/page.tsx`
- Events: `frontend/src/app/events/page.tsx`, `frontend/src/app/events/components/RequestBoard.tsx`

**TanStack Query Configuration:**
- Provider: `frontend/src/lib/react-query.tsx`
- Default settings: `staleTime: 60s`, `gcTime: 5m`, `refetchOnWindowFocus: false`

### AI Assistant Guidelines

**When working with this codebase, follow these rules:**

1. **Always check for existing RPC functions** before creating new database queries
2. **Use TanStack Query** for all client-side data fetching (never use `useState` + `useEffect` for data)
3. **Check existing patterns** in `frontend/src/lib/` before creating new fetching functions
4. **Verify schema** before creating indexes (check if columns exist)
5. **Use resource embedding** when possible, RPC functions only when needed
6. **Add prefetching** to items that open modals/drawers
7. **Add optimistic updates** to mutations (delete, update, create)
8. **Update this roadmap** when adding new optimizations

**Common mistakes to avoid:**
- ❌ Creating multiple sequential queries instead of single RPC
- ❌ Using `useState` + `useEffect` instead of TanStack Query
- ❌ Forgetting to add indexes for filtered columns
- ❌ Not invalidating cache after mutations
- ❌ Creating RPC functions when resource embedding would work
- ❌ Not checking existing patterns before implementing

## 🔄 Maintaining Optimizations Over Time

**As you add features and fields, optimizations need updates:**

### When to Review/Update Optimizations

1. **After Adding New Database Fields:**
   - [ ] Check if new fields need indexes (especially if used in WHERE/ORDER BY)
   - [ ] Update RPC functions to include new fields in responses
   - [ ] Verify existing indexes still cover query patterns
   - [ ] Run `EXPLAIN ANALYZE` on affected queries

2. **After Adding New Features:**
   - [ ] Check if new pages/components need optimization
   - [ ] Review if new queries follow optimization patterns (single call, caching)
   - [ ] Add new slow pages to this roadmap
   - [ ] Update TanStack Query cache keys if data structure changes

3. **After Schema Changes:**
   - [ ] Verify all indexes still match actual columns
   - [ ] Update partial indexes (`WHERE ...`) if conditions change
   - [ ] Check if RPC functions need updates for new relationships
   - [ ] Review resource embedding opportunities for new joins

4. **After Performance Issues Reported:**
   - [ ] Add to roadmap if not already listed
   - [ ] Measure baseline with EXPLAIN ANALYZE
   - [ ] Apply optimization patterns
   - [ ] Document solution in this file

### Checklist for New Features

When adding a new feature, ask:

- [ ] **Does it fetch data?** → Use TanStack Query with appropriate `staleTime`
- [ ] **Does it fetch related data?** → Try resource embedding first, RPC if needed
- [ ] **Does it filter/sort?** → Server-side filtering, add indexes if needed
- [ ] **Is it user-specific?** → TanStack Query caching (not Next.js cache)
- [ ] **Is it public data?** → Consider Next.js caching + TanStack Query
- [ ] **Does it open panels/drawers?** → Add prefetching on hover
- [ ] **Does it make multiple queries?** → Combine into single RPC or parallelize
- [ ] **Are there new WHERE clauses?** → Add indexes for those columns

### Updating This Roadmap

**When to update:**
- After completing an optimization (mark as ✅)
- After adding new slow pages (add to appropriate priority section)
- After schema changes (update index suggestions)
- After discovering new optimization patterns (add to Tools & Patterns)
- Quarterly review of all optimizations

**How to update:**
1. Test current performance (measure baseline)
2. Identify bottlenecks (EXPLAIN ANALYZE, React Profiler)
3. Apply optimization patterns from this doc
4. Document changes here
5. Update "Last Updated" date at top

### Common Pitfalls to Avoid

- ❌ **Adding fields without updating RPC functions** → Missing data in responses
- ❌ **Adding WHERE clauses without indexes** → Slow sequential scans
- ❌ **Forgetting to update cache keys** → Stale data or cache misses
- ❌ **Not verifying indexes with EXPLAIN** → Creating unused indexes
- ❌ **Using RPC when embedding would work** → Unnecessary complexity
- ❌ **Not setting staleTime** → Unnecessary refetches
- ❌ **Caching user-specific data in Next.js** → Data leaks between users

### Quick Reference: Optimization Decision Tree

```
New Feature/Page
│
├─ Does it fetch data?
│  ├─ Yes → Use TanStack Query
│  │  ├─ User-specific? → staleTime: 1-5m, refetchOnWindowFocus: false
│  │  └─ Public? → staleTime: 10m-1h, consider Next.js cache
│  │
│  └─ No → Skip caching
│
├─ Does it fetch related data?
│  ├─ Simple joins? → Try resource embedding first
│  └─ Complex logic? → Use RPC function
│
├─ Does it filter/sort?
│  ├─ Yes → Server-side filtering + indexes
│  └─ No → Skip
│
├─ Does it open panels/drawers?
│  ├─ Yes → Add prefetching on hover
│  └─ No → Skip
│
└─ Does it make multiple queries?
   ├─ Yes → Combine into single call (RPC or parallelize)
   └─ No → Already optimized
```

## 🔍 Performance Debugging Workflow

**"Measure → Fix → Verify" Loop for Every Critical Optimization:**

1. **Measure Baseline:**
   - Use React DevTools Profiler (record render times)
   - Check browser Network tab (query times, payload sizes)
   - Note user-reported slow pages
   - Use Supabase Dashboard → Database → Query Performance

2. **Analyze Database Queries (CRITICAL STEP):**
   ```sql
   -- Check if indexes are used
   EXPLAIN ANALYZE 
   SELECT * FROM club_memberships 
   WHERE user_id = '...' 
   ORDER BY created_at DESC;
   
   -- Look for:
   -- ✅ "Index Scan using idx_club_memberships_user_created" (GOOD)
   -- ❌ "Seq Scan on club_memberships" (BAD - need index)
   -- Check "Planning Time" and "Execution Time"
   ```

3. **Verify RPC Performance:**
   ```sql
   EXPLAIN ANALYZE
   SELECT * FROM get_user_dashboard_data('user-id-here');
   
   -- Check execution plan for:
   -- - Index usage
   -- - Nested loop vs hash join (hash is usually faster)
   -- - Sequential scans (should be avoided)
   ```

4. **Fix Based on EXPLAIN Output:**
   - If Seq Scan found → add appropriate index
   - If nested loop slow → consider rewriting query
   - If RPC slow → optimize SQL inside function
   - Re-run EXPLAIN to verify fix

5. **Test with Realistic Data:**
   - Use production-like data volumes (100+ clubs, 1000+ events)
   - Test edge cases (empty results, large datasets, filters)
   - Measure before/after times

6. **Monitor After Deployment:**
   - Supabase Dashboard → Database → Query Performance
   - React DevTools → Profiler (component render times)
   - TanStack Query DevTools (cache hit rates, query times)
   - User feedback on perceived speed

**Key Metrics to Track:**
- Database query time (target: < 100ms for simple queries, < 500ms for complex)
- Component render time (target: < 16ms for 60fps)
- Cache hit rate (target: > 80% for frequently accessed data)
- Time to interactive (TTI) for pages

## 🚀 Advanced Optimizations (Future Scale)

### Materialized Views for Heavy Aggregates

If read-heavy pages become bottlenecks (calendar with vote counts, member counts, etc.), consider materialized views:

```sql
-- Example: Pre-computed event request board
CREATE MATERIALIZED VIEW event_requests_board_cache AS
SELECT 
  er.*,
  COUNT(erv.user_id) as vote_count,
  -- other aggregates
FROM event_requests er
LEFT JOIN event_request_votes erv ON erv.request_id = er.id
GROUP BY er.id;

-- Refresh periodically or on-demand
REFRESH MATERIALIZED VIEW event_requests_board_cache;
```

**When to use:**
- Heavy aggregations (counts, sums across multiple tables)
- Read-heavy pages with complex joins
- Data that doesn't need real-time accuracy
- After other optimizations still show slow queries

**Trade-offs:**
- Faster reads (pre-computed)
- Stale data until refresh
- Storage overhead
- Refresh strategy needed
