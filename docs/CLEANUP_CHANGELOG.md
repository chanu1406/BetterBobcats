# Cleanup Changelog

Summary of cleanup: unused code removed, documentation updated, comments added, structure clarified.

---

## Removed

### Unused / redundant code

- **`frontend/src/lib/supabase.ts`** — Removed. Single shared Supabase client using `@supabase/supabase-js`; only used by `FilterPanel`. Replaced with `createClient()` from `@/lib/supabase/browser` in that component so the app uses one pattern (browser vs server client) everywhere.

---

## Updated

### Documentation

- **README.md**
  - Admin bullet: added "events & calendar" to list of admin capabilities.
  - Project structure: admin folder comment now includes "events, maintenance".
  - Docs table: added row for `CLEAR_EMAIL_OUTBOX.sql`.

- **`frontend/src/app/admin/events/page.tsx`**
  - Page comment and Events card description updated to match current behavior: list all events, per-row Remove (no filters). Removed references to "Filter by past/upcoming, club, status" and "Select events."

- **`docs/INDEX.md`** (new)
  - Short index of docs in `docs/` with one-line purpose for each.

### Comments added (focused, not overwhelming)

- **`supabase/functions/send-emails/index.ts`** — File-level block: what the function does (outbox → Resend → sent/failed) and how it’s invoked.
- **`frontend/src/app/admin/events/components/AdminEventsManager.tsx`** — File-level: fetch once, table, per-row Remove; DB handles clubs/calendar/event_requests.
- **`frontend/src/lib/supabase/browser.ts`** — One-line: client for Client Components, cookies for auth.
- **`frontend/src/lib/supabase/server.ts`** — Shortened to one-line comments for `createClient` and `createPublicClient`.

---

## Structure / organization

- **Supabase client usage**
  - Client Components: `createClient()` from `@/lib/supabase/browser` (single pattern).
  - Server Components / Actions / Route Handlers: `createClient()` from `@/lib/supabase/server`.
  - No remaining use of the old `@/lib/supabase` singleton.

- **Admin Events & Calendar**
  - Single flow: load all events once → table → Remove per row. No filters, no bulk select, no refresh trigger in UI (simplified from previous version).

- **Docs**
  - `docs/` holds project docs; root README links to them. New `docs/INDEX.md` lists `docs/` contents.

---

## Not changed (intentionally)

- **Root-level completion/summary .md files** (e.g. `AUTOMOTIVE_EV_COMPLETE.md`, `CYBERSECURITY_*.md`, `MANUFACTURING_*.md`, `MECHANICAL_*.md`) — Left in place as reference. You can move them to `docs/archive/` or delete if no longer needed.
- **`supabase/migrations/`** — Files like `TEST_admin_email_trigger.sql`, `DIAGNOSE_admin_email.sql`, `CHECK_function_source.sql` are dev/diagnostic scripts; left in place. Supabase runs migrations by filename order; these names suggest they are not part of the numbered migration sequence.
- **Backend** — No code removed; only frontend and docs touched in this cleanup.

---

## File list (changes)

| Action   | Path |
|----------|------|
| Deleted  | `frontend/src/lib/supabase.ts` |
| Created  | `docs/INDEX.md` |
| Created  | `docs/CLEANUP_CHANGELOG.md` (this file) |
| Modified | `frontend/src/app/events/components/FilterPanel.tsx` (use browser Supabase client) |
| Modified | `frontend/src/app/admin/events/page.tsx` (copy + comments) |
| Modified | `frontend/src/app/admin/events/components/AdminEventsManager.tsx` (comment) |
| Modified | `frontend/src/lib/supabase/browser.ts` (comment) |
| Modified | `frontend/src/lib/supabase/server.ts` (comments) |
| Modified | `supabase/functions/send-emails/index.ts` (comment) |
| Modified | `README.md` (admin bullet, docs table, structure comment, docs index + cleanup changelog links) |
