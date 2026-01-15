# Database Schema Reference

This document provides a comprehensive reference for the BetterBobcats database schema. The actual schema is managed through SQL migrations in `supabase/migrations/`.

**⚠️ WARNING:** This schema dump is for reference only. Table order and constraints may not be valid for execution. Always use migration files to modify the database.

## Schema Overview

The database uses PostgreSQL via Supabase and includes the following main entities:

- **Clubs** - Student organizations and clubs
- **Majors** - Academic majors at UC Merced
- **Club-Major Relationships** - Many-to-many associations between clubs and majors
- **Club Requests** - Club approval and submission workflow
- **Club Memberships** - Club member management with role-based access
- **Club Invites** - Email-based invitation system for club members
- **Events** - Club event management
- **Platform Admins** - Platform administrator management
- **Email Outbox** - Email queue for asynchronous email delivery

## Core Tables

### Clubs (`clubs`)
Primary table for storing club/organization information.

**Key Fields:**
- `id` (uuid, PK) - Unique identifier
- `name` (text) - Club name
- `description` (text) - Club description
- `slug` (text, UNIQUE) - URL-friendly identifier
- `website` (text) - Club website URL
- `logo_url` (text) - Club logo image URL
- `banner_url` (text) - Club banner image URL
- `is_active` (boolean, default: true) - Whether the club is active
- `display_order` (integer, default: 0) - Display ordering
- `created_at` (timestamptz) - Creation timestamp

**Relationships:**
- One-to-many with `club_majors`, `club_tags`, `club_memberships`, `club_invites`, `events`
- Many-to-many with `majors` via `club_majors`

### Majors (`majors`)
Academic majors at UC Merced.

**Key Fields:**
- `id` (uuid, PK) - Unique identifier
- `name` (text, UNIQUE) - Major name
- `created_at` (timestamptz) - Creation timestamp

**Relationships:**
- Many-to-many with `clubs` via `club_majors`

### Club-Major Junction Tables

#### `club_majors`
Links clubs to majors (many-to-many relationship).

**Key Fields:**
- `club_id` (uuid, FK → clubs.id)
- `major_id` (uuid, FK → majors.id)
- `created_at` (timestamptz)

**Constraints:**
- Composite primary key: (`club_id`, `major_id`)

#### `club_major_notes`
Stores notes about club-major relationships.

**Key Fields:**
- `club_id` (uuid, FK → clubs.id)
- `major_id` (uuid, FK → majors.id)
- `note` (text) - Note content
- `created_at` (timestamptz)

**Constraints:**
- Composite primary key: (`club_id`, `major_id`)

#### `club_tags`
Tags associated with clubs for categorization and search.

**Key Fields:**
- `club_id` (uuid, FK → clubs.id)
- `tag` (text) - Tag name
- `created_at` (timestamptz)

**Constraints:**
- Composite primary key: (`club_id`, `tag`)

### Club Memberships (`club_memberships`)
Manages club membership with role-based access control.

**Key Fields:**
- `id` (uuid, PK) - Unique identifier
- `club_id` (uuid, FK → clubs.id)
- `user_id` (uuid, FK → auth.users.id)
- `role` (text, default: 'officer') - Role: 'admin', 'officer', or 'member'
- `created_at` (timestamptz)

**Constraints:**
- Unique constraint: (`club_id`, `user_id`)
- Role values: 'admin', 'officer', 'member'

**Relationships:**
- Many-to-one with `clubs`
- Many-to-one with `auth.users`

### Club Invites (`club_invites`)
Email-based invitation system for inviting users to clubs.

**Key Fields:**
- `id` (uuid, PK) - Unique identifier
- `club_id` (uuid, FK → clubs.id)
- `email` (citext) - Invitee email address (case-insensitive)
- `role` (text, default: 'officer') - Role to assign upon acceptance
- `request_id` (uuid, FK → club_requests.id, nullable) - Related club request
- `created_at` (timestamptz)
- `created_by` (uuid, FK → auth.users.id, nullable)
- `accepted_at` (timestamptz, nullable) - When invite was accepted
- `accepted_by` (uuid, FK → auth.users.id, nullable) - User who accepted

**Constraints:**
- Unique constraint: (`club_id`, `email`)

**Indexes:**
- `club_invites_club_id_idx` on `club_id`
- `club_invites_email_idx` on `email`
- `club_invites_accepted_at_idx` on `accepted_at`

### Club Requests (`club_requests`)
Manages club submission and approval workflow.

**Key Fields:**
- `id` (uuid, PK) - Unique identifier
- `name` (text) - Proposed club name
- `description` (text) - Club description
- `website` (text, nullable)
- `slug_candidate` (text, nullable) - Proposed slug
- `contact_email` (text) - Contact email for club owner
- `officer_emails` (text[], default: []) - Array of officer emails
- `officer_phones` (text[], default: []) - Array of officer phone numbers
- `logo_url` (text, nullable)
- `banner_url` (text, nullable)
- `status` (text, default: 'pending') - Status: 'pending', 'approved', 'rejected'
- `admin_message` (text, nullable) - Admin review message
- `reviewed_at` (timestamptz, nullable) - When request was reviewed
- `reviewed_by` (uuid, FK → auth.users.id, nullable) - Admin who reviewed
- `submitted_by` (uuid, FK → auth.users.id, nullable) - User who submitted
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

**Constraints:**
- Status check: `status IN ('pending', 'approved', 'rejected')`

**Indexes:**
- `club_requests_status_idx` on `status`
- `club_requests_created_at_idx` on `created_at` (DESC)

#### Club Request Related Tables

**`club_request_majors`** - Majors associated with a club request
- Composite PK: (`request_id`, `major_id`)

**`club_request_major_notes`** - Notes about major relationships in requests
- Composite PK: (`request_id`, `major_id`)

**`club_request_tags`** - Tags associated with a club request
- Composite PK: (`request_id`, `tag`)

### Events (`events`)
Club event management.

**Key Fields:**
- `id` (uuid, PK) - Unique identifier
- `club_id` (uuid, FK → clubs.id)
- `title` (text) - Event title
- `description` (text, nullable) - Event description
- `location` (text, nullable) - Event location
- `start_at` (timestamptz) - Event start time
- `end_at` (timestamptz, nullable) - Event end time
- `url` (text, nullable) - Event URL
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

**Indexes:**
- `events_club_id_start_at_idx` on (`club_id`, `start_at` DESC)

### Platform Admins (`platform_admins`)
Platform administrator management.

**Key Fields:**
- `user_id` (uuid, PK, FK → auth.users.id) - Admin user ID
- `created_at` (timestamptz)

### Email Outbox (`email_outbox`)
Email queue for asynchronous email delivery.

**Key Fields:**
- `id` (uuid, PK) - Unique identifier
- `to_email` (citext) - Recipient email address
- `template` (text) - Email template name
- `payload` (jsonb, default: {}) - Template variables
- `status` (text, default: 'pending') - Status: 'pending', 'sending', 'sent', 'failed'
- `attempt_count` (integer, default: 0) - Number of send attempts
- `last_attempt_at` (timestamptz, nullable) - Last attempt timestamp
- `sent_at` (timestamptz, nullable) - When email was successfully sent
- `error` (text, nullable) - Error message if failed
- `idempotency_key` (text, UNIQUE) - Prevents duplicate sends
- `created_at` (timestamptz)
- `created_by` (uuid, FK → auth.users.id, nullable)

**Constraints:**
- Status check: `status IN ('pending', 'sending', 'sent', 'failed')`
- Unique constraint on `idempotency_key`

**Indexes:**
- `email_outbox_status_idx` on `status`
- `email_outbox_to_email_idx` on `to_email`
- `email_outbox_pending_idx` on `created_at` WHERE `status = 'pending'`

## Database Functions

The schema includes numerous PostgreSQL functions for business logic:

### Club Management Functions
- `accept_club_invite(p_invite_id)` - Accept a club invitation
- `deactivate_club(p_club_id)` - Deactivate a club (admin only)
- `reactivate_club(p_club_id)` - Reactivate a club (admin only)
- `hard_delete_club(p_club_id)` - Permanently delete a club (admin only)

### Membership Functions
- `list_club_members(p_club_id, p_limit, p_offset)` - List club members
- `remove_club_member(p_club_id, p_user_id)` - Remove a member
- `set_club_member_role(p_club_id, p_user_id, p_role)` - Change member role

### Club Request Functions
- `approve_club_request(p_request_id, p_slug_override)` - Approve a club request
- `reject_club_request(p_request_id, p_admin_message)` - Reject a club request
- `resubmit_club_request(p_request_id)` - Resubmit a rejected request
- `can_edit_club_request(p_request_id)` - Check if user can edit request
- `cleanup_rejected_club_requests(p_older_than_days, p_dry_run)` - Cleanup old rejected requests
- `list_rejected_club_requests_for_cleanup(p_older_than_days, p_limit, p_offset)` - List requests for cleanup

### Admin Functions
- `admin_get_club_summary(p_club_id)` - Get club summary (admin only)
- `admin_list_club_invites(p_club_id)` - List club invites (admin only)
- `admin_list_club_majors(p_club_id)` - List club majors (admin only)
- `admin_list_club_members(p_club_id)` - List club members (admin only)
- `admin_list_club_tags(p_club_id)` - List club tags (admin only)

### Utility Functions
- `is_platform_admin()` - Check if current user is platform admin
- `is_club_admin(p_club_id)` - Check if user is club admin
- `is_club_officer(p_club_id)` - Check if user is club officer
- `is_club_member(p_club_id)` - Check if user is club member
- `current_user_email()` - Get current user's email from JWT
- `auth_email()` - Get email from auth context
- `role_rank(p_role)` - Get numeric rank for role (admin=2, officer=1, member=0)

### Trigger Functions
- `set_updated_at()` - Auto-update `updated_at` timestamp
- `enforce_membership_role_precedence()` - Prevent role downgrades
- `prevent_non_admin_request_admin_field_updates()` - Protect admin-only fields
- `touch_club_request(p_request_id)` - Update request timestamp
- `touch_club_request_from_child()` - Update parent request when child changes

## Row Level Security (RLS)

RLS is **extensively implemented** across all tables with comprehensive policies for SELECT, INSERT, UPDATE, and DELETE operations.

### Public Read Access
The following tables allow public read access:
- `clubs` (active clubs only)
- `majors`
- `club_majors`
- `club_major_notes`
- `club_tags`
- `events`

### Authenticated User Access
Authenticated users can:
- Read their own club memberships
- Read their own club invites (by email)
- Read and manage their own club requests
- Read club request related data for their own requests

### Club Member Access
Club members can:
- Manage club majors and major notes
- Manage club tags
- Manage events (with role-based restrictions)
- Update club information (officers and admins only)
- View club memberships (admins only)

### Club Officer/Admin Access
Club officers and admins have additional permissions:
- Insert, update, and delete events
- Update club information
- View full member lists with emails

### Platform Admin Access
Platform admins have full access to:
- All clubs (including inactive)
- All club requests
- All memberships
- All invites
- All majors
- Email outbox
- Platform admin management

### RLS Policies Summary

| Table | Public Read | Authenticated | Club Member | Club Officer | Platform Admin |
|-------|-------------|---------------|-------------|--------------|----------------|
| `clubs` | Active only | Own requests | Update own | Update own | Full access |
| `majors` | Yes | - | - | - | Full access |
| `club_majors` | Yes | - | Manage | Manage | Full access |
| `club_major_notes` | Yes | - | Manage | Manage | Full access |
| `club_tags` | Yes | - | Manage | Manage | Full access |
| `club_memberships` | No | Own only | - | View (admin) | Full access |
| `club_invites` | No | Own (by email) | - | - | Full access |
| `club_requests` | No | Own | - | - | Full access |
| `events` | Yes | - | Manage | Manage | Full access |
| `platform_admins` | No | Own only | - | - | Full access |
| `email_outbox` | No | No | No | No | Full access |

## Triggers

### Automatic Timestamp Updates
- `trg_club_requests_set_updated_at` - Updates `updated_at` on `club_requests`
- `trg_touch_request_majors` - Updates parent request when majors change
- `trg_touch_request_tags` - Updates parent request when tags change
- `trg_touch_request_major_notes` - Updates parent request when notes change

### Business Logic Triggers
- `trg_membership_role_precedence` - Prevents role downgrades and enforces role hierarchy
- `trg_prevent_non_admin_request_admin_field_updates` - Protects admin-only fields in requests

## Indexes

The schema includes optimized indexes for common query patterns:

- **Club invites**: `club_id`, `email`, `accepted_at`
- **Memberships**: `club_id`, `user_id` (unique), `user_id`
- **Club requests**: `status`, `created_at` (DESC)
- **Events**: `club_id`, `start_at` (DESC)
- **Email outbox**: `status`, `to_email`, `created_at` (WHERE status = 'pending')
- **Club majors**: `club_id`, `major_id`

## Migrations

Database schema changes should be made through migration files in `supabase/migrations/`. Migration files are named with timestamps: `YYYYMMDDHHMMSS_description.sql`.

**Current Migration:**
- `20260115101728_remote_schema.sql` - Complete schema dump from remote database

## Related Documentation

- [Tech Stack & Architecture Report](TECH_STACK_ARCHITECTURE_REPORT.md) - Detailed architecture and security considerations
- [Backend API Documentation](../backend/docs/) - API endpoint documentation
- [Admin Authentication](../backend/docs/ADMIN_AUTHENTICATION.md) - Admin authentication system
