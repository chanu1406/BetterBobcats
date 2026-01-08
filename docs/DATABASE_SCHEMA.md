# BetterBobcats Database Schema

**Last Updated:** January 6, 2025  
**Database:** PostgreSQL (Supabase)  
**Schema:** `public`

> 📝 **Important:** This file documents the current database schema. Update this file whenever you make schema changes to migrations or add new tables.

---

## Table of Contents

- [Overview](#overview)
- [Tables](#tables)
  - [clubs](#clubs)
  - [majors](#majors)
  - [club_majors](#club_majors)
  - [club_tags](#club_tags)
  - [club_major_notes](#club_major_notes)
- [Relationships](#relationships)
- [Indexes](#indexes)
- [Row Level Security](#row-level-security)
- [Business Rules](#business-rules)
- [Planned Tables](#planned-tables)

---

## Overview

The BetterBobcats database stores information about UC Merced student clubs, majors, and their relationships. The schema is designed to support:

- **Club Discovery**: Students can find clubs relevant to their major
- **Tag-based Filtering**: Clubs can be categorized with tags
- **Major-Club Relationships**: Many-to-many relationships between clubs and majors
- **Notes**: Contextual notes about how clubs relate to specific majors

---

## Tables

### clubs

**Description:** Student clubs and organizations at UC Merced

| Column | Type | Nullable | Default | Constraints | Description |
|--------|------|----------|---------|-------------|-------------|
| `id` | `uuid` | NO | `gen_random_uuid()` | PRIMARY KEY | Unique identifier for the club |
| `name` | `text` | NO | - | - | Club name |
| `description` | `text` | NO | - | - | Club description |
| `website` | `text` | YES | - | - | Club website URL |
| `slug` | `text` | YES | - | UNIQUE | URL-friendly slug for the club |
| `is_active` | `boolean` | NO | `true` | - | Whether the club is currently active |
| `display_order` | `integer` | NO | `0` | - | Order for displaying clubs (lower numbers appear first) |
| `logo_url` | `text` | YES | - | - | URL to the club's logo image |
| `banner_url` | `text` | YES | - | - | URL to the club's banner image |
| `created_at` | `timestamptz` | NO | `now()` | - | Timestamp when the club was created |

**Relationships:**
- One-to-many with `club_majors` (via `club_id`)
- One-to-many with `club_tags` (via `club_id`)
- One-to-many with `club_major_notes` (via `club_id`)

**RLS Policies:**
- `Enable read access for all users` (SELECT) - Public read access

**Business Rules:**
- Club names should be unique within the system
- Only active clubs should be displayed in public listings
- Display order determines sorting (ascending, lower numbers first)

---

### majors

**Description:** Academic majors/degree programs at UC Merced

| Column | Type | Nullable | Default | Constraints | Description |
|--------|------|----------|---------|-------------|-------------|
| `id` | `uuid` | NO | `gen_random_uuid()` | PRIMARY KEY | Unique identifier for the major |
| `name` | `text` | NO | - | UNIQUE | Major name (must be unique) |
| `created_at` | `timestamptz` | NO | `now()` | - | Timestamp when the major was created |

**Relationships:**
- One-to-many with `club_majors` (via `major_id`)
- One-to-many with `club_major_notes` (via `major_id`)

**RLS Policies:**
- `Enable read access for all users` (SELECT) - Public read access

**Business Rules:**
- Major names must be unique
- Majors cannot be deleted if they have associated clubs

---

### club_majors

**Description:** Junction table linking clubs to majors (many-to-many relationship)

| Column | Type | Nullable | Default | Constraints | Description |
|--------|------|----------|---------|-------------|-------------|
| `club_id` | `uuid` | NO | - | PRIMARY KEY, FOREIGN KEY → `clubs(id)` ON DELETE CASCADE | Reference to clubs.id |
| `major_id` | `uuid` | NO | - | PRIMARY KEY, FOREIGN KEY → `majors(id)` ON DELETE CASCADE | Reference to majors.id |
| `created_at` | `timestamptz` | NO | `now()` | - | Timestamp when the relationship was created |

**Indexes:**
- `idx_club_majors_club_id` on `club_id` - For faster club lookups
- `idx_club_majors_major_id` on `major_id` - For faster major lookups

**Relationships:**
- Many-to-one with `clubs` (via `club_id`)
- Many-to-one with `majors` (via `major_id`)

**RLS Policies:**
- `Enable read access for all users` (SELECT) - Public read access

**Business Rules:**
- A club can be associated with multiple majors
- A major can have multiple clubs
- Deleting a club or major cascades to remove associations

---

### club_tags

**Description:** Tags associated with clubs for categorization and filtering

| Column | Type | Nullable | Default | Constraints | Description |
|--------|------|----------|---------|-------------|-------------|
| `club_id` | `uuid` | NO | - | PRIMARY KEY, FOREIGN KEY → `clubs(id)` | Reference to clubs.id |
| `tag` | `text` | NO | - | PRIMARY KEY | Tag name (e.g., 'STEM', 'Social', 'Professional') |
| `created_at` | `timestamptz` | NO | `now()` | - | Timestamp when the tag was added |

**Relationships:**
- Many-to-one with `clubs` (via `club_id`)

**Business Rules:**
- Tags are case-sensitive
- Same tag can be used across multiple clubs

---

### club_major_notes

**Description:** Notes about how a club relates to a specific major

| Column | Type | Nullable | Default | Constraints | Description |
|--------|------|----------|---------|-------------|-------------|
| `club_id` | `uuid` | NO | - | PRIMARY KEY, FOREIGN KEY → `clubs(id)` | Reference to clubs.id |
| `major_id` | `uuid` | NO | - | PRIMARY KEY, FOREIGN KEY → `majors(id)` | Reference to majors.id |
| `note` | `text` | NO | - | - | Note explaining the relationship between club and major |
| `created_at` | `timestamptz` | NO | `now()` | - | Timestamp when the note was created |

**Relationships:**
- Many-to-one with `clubs` (via `club_id`)
- Many-to-one with `majors` (via `major_id`)

---

## Relationships

### Entity Relationship Diagram

```
clubs                    majors
  │                        │
  │                        │
  ├─── club_majors ────────┤  (many-to-many)
  │                        │
  ├─── club_tags           │
  │                        │
  └─── club_major_notes ────┘  (many-to-many with notes)
```

### Relationship Summary

1. **clubs ↔ majors** (Many-to-Many)
   - **Through:** `club_majors` junction table
   - **Description:** Clubs can be associated with multiple majors, and majors can have multiple clubs

2. **clubs → club_tags** (One-to-Many)
   - **Description:** Each club can have multiple tags for categorization

3. **clubs ↔ majors** (Many-to-Many with Notes)
   - **Through:** `club_major_notes` junction table
   - **Description:** Clubs can have contextual notes about their relationship with specific majors

---

## Indexes

| Table | Index Name | Columns | Purpose |
|-------|------------|---------|---------|
| `club_majors` | `idx_club_majors_club_id` | `club_id` | Faster lookups of majors for a club |
| `club_majors` | `idx_club_majors_major_id` | `major_id` | Faster lookups of clubs for a major |

---

## Row Level Security

### Enabled Tables
- `clubs` - Public read access
- `majors` - Public read access
- `club_majors` - Public read access

### Policies

All enabled tables have the same policy:
- **Name:** `Enable read access for all users`
- **Operation:** SELECT
- **Policy:** `USING (true)` - Allows all users to read data

---

## Business Rules

### Clubs
- Club names should be unique within the system
- Only active clubs (`is_active = true`) should be displayed in public listings
- Display order determines sorting (ascending, lower numbers first)
- Clubs can be associated with multiple majors
- Clubs can have multiple tags

### Majors
- Major names must be unique
- Majors cannot be deleted if they have associated clubs (enforced by foreign key constraints)

### Club-Major Relationships
- A club can be associated with multiple majors
- A major can have multiple clubs
- Deleting a club or major cascades to remove associations in `club_majors`
- Notes can be added to explain the relationship between a club and major

### Tags
- Tags are case-sensitive
- Same tag can be used across multiple clubs
- Tags are stored as text (no predefined tag list)

---

## Planned Tables

The following tables are planned but not yet implemented:

### courses
- **Status:** Planned
- **Description:** Course catalog with prerequisites, semesters, and academic year
- **Notes:** Currently stored as JSON data in `backend/app/data/courses.py`, will be migrated to database

### degrees
- **Status:** Planned
- **Description:** Degree programs and their requirements
- **Notes:** Will link to courses and majors

### careers
- **Status:** Planned
- **Description:** Career paths and their associated courses
- **Notes:** Currently stored as JSON data, will be migrated to database

### roadmaps
- **Status:** Planned
- **Description:** User-created academic roadmaps
- **Notes:** Will link to users, courses, and degrees

### users
- **Status:** Planned
- **Description:** User accounts for personalized features
- **Notes:** Will use Supabase Auth integration

---

## Migration Files

The current schema is defined in the following migration files:

1. `supabase/migrations/20260102000000_create_clubs_tables.sql` - Initial schema creation
2. `supabase/migrations/20260102000001_update_club_websites.sql` - Website updates
3. `supabase/migrations/20260102000002_update_robotics_website.sql` - Robotics club update

---

## Usage Guidelines

### For Developers

1. **When adding a new table:**
   - Add the table definition to this file
   - Update the JSON schema file (`DATABASE_SCHEMA.json`)
   - Document relationships, indexes, and RLS policies

2. **When modifying existing tables:**
   - Update the relevant table section
   - Update the JSON schema file
   - Note any breaking changes

3. **When adding relationships:**
   - Update the Relationships section
   - Add foreign key constraints in migrations
   - Document cascade behaviors

### For AI/Code Generation

This schema can be used to:
- Generate TypeScript types for frontend
- Generate Pydantic models for backend
- Create API endpoints with proper validation
- Generate database queries
- Understand data relationships for feature development

---

## Related Files

- **JSON Schema:** `docs/DATABASE_SCHEMA.json` - Machine-readable schema definition
- **Migrations:** `supabase/migrations/` - SQL migration files
- **Backend Models:** `backend/app/models/` - Pydantic models (some not yet synced with DB)
- **Frontend Types:** `frontend/src/types/` - TypeScript type definitions

---

**Note:** Keep this file synchronized with actual database migrations. When in doubt, check the migration files in `supabase/migrations/`.

