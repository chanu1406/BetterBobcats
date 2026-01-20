-- Migration: Create Events System
-- Tables: events, event_majors, event_tags
-- RLS policies, indexes, triggers, and calendar query helpers

-- ============================================================================
-- 1. EVENTS TABLE - Migrate existing table to new schema
-- ============================================================================

-- First, rename existing columns if they exist (from old schema)
DO $$
BEGIN
  -- Rename start_at to starts_at if column exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'events' 
    AND column_name = 'start_at'
  ) THEN
    ALTER TABLE public.events RENAME COLUMN start_at TO starts_at;
  END IF;

  -- Rename end_at to ends_at if column exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'events' 
    AND column_name = 'end_at'
  ) THEN
    ALTER TABLE public.events RENAME COLUMN end_at TO ends_at;
  END IF;

  -- Rename url to online_url if column exists and online_url doesn't
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'events' 
    AND column_name = 'url'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'events' 
    AND column_name = 'online_url'
  ) THEN
    ALTER TABLE public.events RENAME COLUMN url TO online_url;
  END IF;

  -- Rename location to location_name if column exists and location_name doesn't
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'events' 
    AND column_name = 'location'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'events' 
    AND column_name = 'location_name'
  ) THEN
    ALTER TABLE public.events RENAME COLUMN location TO location_name;
  END IF;
END $$;

-- Add new columns (using IF NOT EXISTS via DO block)
DO $$
BEGIN
  -- Add timezone if not exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'events' AND column_name = 'timezone'
  ) THEN
    ALTER TABLE public.events ADD COLUMN timezone text NULL;
  END IF;

  -- Add location_type with default
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'events' AND column_name = 'location_type'
  ) THEN
    ALTER TABLE public.events ADD COLUMN location_type text NULL;
    -- Set default for existing rows
    UPDATE public.events SET location_type = CASE 
      WHEN online_url IS NOT NULL THEN 'online'
      WHEN location_name IS NOT NULL THEN 'on_campus'
      ELSE 'on_campus'
    END WHERE location_type IS NULL;
    -- Now set NOT NULL and add constraint
    ALTER TABLE public.events ALTER COLUMN location_type SET NOT NULL;
    ALTER TABLE public.events ADD CONSTRAINT events_location_type_check 
      CHECK (location_type IN ('on_campus','off_campus','online','hybrid'));
  END IF;

  -- Add location_address
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'events' AND column_name = 'location_address'
  ) THEN
    ALTER TABLE public.events ADD COLUMN location_address text NULL;
  END IF;

  -- Add visibility with default
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'events' AND column_name = 'visibility'
  ) THEN
    ALTER TABLE public.events ADD COLUMN visibility text NOT NULL DEFAULT 'public';
    ALTER TABLE public.events ADD CONSTRAINT events_visibility_check 
      CHECK (visibility IN ('public','members_only','unlisted'));
  END IF;

  -- Add status with default
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'events' AND column_name = 'status'
  ) THEN
    ALTER TABLE public.events ADD COLUMN status text NOT NULL DEFAULT 'published';
    ALTER TABLE public.events ADD CONSTRAINT events_status_check 
      CHECK (status IN ('draft','published','cancelled'));
  END IF;

  -- Add cancelled_reason
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'events' AND column_name = 'cancelled_reason'
  ) THEN
    ALTER TABLE public.events ADD COLUMN cancelled_reason text NULL;
  END IF;

  -- Add banner_url
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'events' AND column_name = 'banner_url'
  ) THEN
    ALTER TABLE public.events ADD COLUMN banner_url text NULL;
  END IF;

  -- Add thumbnail_url
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'events' AND column_name = 'thumbnail_url'
  ) THEN
    ALTER TABLE public.events ADD COLUMN thumbnail_url text NULL;
  END IF;

  -- Add is_all_majors with default
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'events' AND column_name = 'is_all_majors'
  ) THEN
    ALTER TABLE public.events ADD COLUMN is_all_majors boolean NOT NULL DEFAULT true;
  END IF;

  -- Add capacity
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'events' AND column_name = 'capacity'
  ) THEN
    ALTER TABLE public.events ADD COLUMN capacity int NULL;
  END IF;

  -- Add requires_rsvp with default
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'events' AND column_name = 'requires_rsvp'
  ) THEN
    ALTER TABLE public.events ADD COLUMN requires_rsvp boolean NOT NULL DEFAULT false;
  END IF;

  -- Add rsvp_url
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'events' AND column_name = 'rsvp_url'
  ) THEN
    ALTER TABLE public.events ADD COLUMN rsvp_url text NULL;
  END IF;

  -- Add is_featured with default
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'events' AND column_name = 'is_featured'
  ) THEN
    ALTER TABLE public.events ADD COLUMN is_featured boolean NOT NULL DEFAULT false;
  END IF;

  -- Add contact_email
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'events' AND column_name = 'contact_email'
  ) THEN
    ALTER TABLE public.events ADD COLUMN contact_email citext NULL;
  END IF;

  -- Add created_by with default
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'events' AND column_name = 'created_by'
  ) THEN
    ALTER TABLE public.events ADD COLUMN created_by uuid NULL DEFAULT auth.uid();
  END IF;

  -- Add updated_by
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'events' AND column_name = 'updated_by'
  ) THEN
    ALTER TABLE public.events ADD COLUMN updated_by uuid NULL;
  END IF;

  -- Ensure description has default
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'events' 
    AND column_name = 'description' AND column_default IS NULL
  ) THEN
    ALTER TABLE public.events ALTER COLUMN description SET DEFAULT '';
    UPDATE public.events SET description = '' WHERE description IS NULL;
    ALTER TABLE public.events ALTER COLUMN description SET NOT NULL;
  END IF;
END $$;

-- Add check constraint for ends_at >= starts_at if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_schema = 'public' 
    AND table_name = 'events' 
    AND constraint_name = 'events_ends_after_starts'
  ) THEN
    ALTER TABLE public.events ADD CONSTRAINT events_ends_after_starts 
      CHECK (ends_at IS NULL OR ends_at >= starts_at);
  END IF;
END $$;

-- Ensure foreign key exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_schema = 'public' 
    AND table_name = 'events' 
    AND constraint_type = 'FOREIGN KEY'
    AND constraint_name LIKE '%club_id%'
  ) THEN
    ALTER TABLE public.events 
      ADD CONSTRAINT events_club_id_fkey 
      FOREIGN KEY (club_id) REFERENCES public.clubs(id) ON DELETE CASCADE;
  END IF;
END $$;

-- ============================================================================
-- 2. EVENT_MAJORS TABLE (many-to-many with majors)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.event_majors (
  event_id uuid NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  major_id uuid NOT NULL REFERENCES public.majors(id) ON DELETE RESTRICT,
  PRIMARY KEY (event_id, major_id)
);

-- ============================================================================
-- 3. EVENT_TAGS TABLE (simple tags)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.event_tags (
  event_id uuid NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  tag text NOT NULL,
  PRIMARY KEY (event_id, tag)
);

-- ============================================================================
-- 4. INDEXES (for calendar performance)
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_events_starts_at ON public.events(starts_at);
CREATE INDEX IF NOT EXISTS idx_events_club_id_starts_at ON public.events(club_id, starts_at);
CREATE INDEX IF NOT EXISTS idx_events_status_starts_at ON public.events(status, starts_at);
CREATE INDEX IF NOT EXISTS idx_events_visibility_starts_at ON public.events(visibility, starts_at);

-- Indexes for event_majors and event_tags lookups
CREATE INDEX IF NOT EXISTS idx_event_majors_event_id ON public.event_majors(event_id);
CREATE INDEX IF NOT EXISTS idx_event_majors_major_id ON public.event_majors(major_id);
CREATE INDEX IF NOT EXISTS idx_event_tags_event_id ON public.event_tags(event_id);

-- ============================================================================
-- 5. TRIGGER FUNCTION: Update updated_at and updated_by
-- ============================================================================

CREATE OR REPLACE FUNCTION public.set_events_updated()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  NEW.updated_at = now();
  NEW.updated_by = auth.uid();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_events_set_updated
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.set_events_updated();

-- ============================================================================
-- 6. TRIGGER FUNCTION: Normalize event tags to lower(trim(tag))
-- ============================================================================

CREATE OR REPLACE FUNCTION public.normalize_event_tag()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.tag := lower(trim(NEW.tag));
  IF NEW.tag = '' THEN
    RAISE EXCEPTION 'Event tag cannot be empty';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_normalize_event_tag
  BEFORE INSERT OR UPDATE ON public.event_tags
  FOR EACH ROW
  EXECUTE FUNCTION public.normalize_event_tag();

-- ============================================================================
-- 7. RLS POLICIES: EVENTS TABLE
-- ============================================================================

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (from remote schema)
DROP POLICY IF EXISTS "club_members_manage_events" ON public.events;
DROP POLICY IF EXISTS "club_members_select_events" ON public.events;
DROP POLICY IF EXISTS "club_officers_delete_events" ON public.events;
DROP POLICY IF EXISTS "club_officers_insert_events" ON public.events;
DROP POLICY IF EXISTS "club_officers_update_events" ON public.events;

-- SELECT: Allow if platform admin OR (published + public) OR (published + members_only/unlisted + user is member)
CREATE POLICY "events_select_platform_admin"
  ON public.events FOR SELECT
  TO authenticated, anon
  USING (public.is_platform_admin());

CREATE POLICY "events_select_public_published"
  ON public.events FOR SELECT
  TO authenticated, anon
  USING (
    status = 'published' AND visibility = 'public'
  );

CREATE POLICY "events_select_members_only_for_members"
  ON public.events FOR SELECT
  TO authenticated
  USING (
    status = 'published' 
    AND visibility IN ('members_only', 'unlisted')
    AND EXISTS (
      SELECT 1 FROM public.club_memberships
      WHERE club_id = events.club_id
        AND user_id = auth.uid()
        AND role IN ('admin', 'officer', 'member')
    )
  );

-- INSERT: Allow if platform admin OR club officer/admin
CREATE POLICY "events_insert_platform_admin"
  ON public.events FOR INSERT
  TO authenticated
  WITH CHECK (public.is_platform_admin());

CREATE POLICY "events_insert_club_officer"
  ON public.events FOR INSERT
  TO authenticated
  WITH CHECK (
    public.is_club_officer(club_id) OR public.is_club_admin(club_id)
  );

-- UPDATE: Allow if platform admin OR club officer/admin
CREATE POLICY "events_update_platform_admin"
  ON public.events FOR UPDATE
  TO authenticated
  USING (public.is_platform_admin())
  WITH CHECK (public.is_platform_admin());

CREATE POLICY "events_update_club_officer"
  ON public.events FOR UPDATE
  TO authenticated
  USING (
    public.is_club_officer(club_id) OR public.is_club_admin(club_id)
  )
  WITH CHECK (
    public.is_club_officer(club_id) OR public.is_club_admin(club_id)
  );

-- DELETE: Allow if platform admin OR club officer/admin
CREATE POLICY "events_delete_platform_admin"
  ON public.events FOR DELETE
  TO authenticated
  USING (public.is_platform_admin());

CREATE POLICY "events_delete_club_officer"
  ON public.events FOR DELETE
  TO authenticated
  USING (
    public.is_club_officer(club_id) OR public.is_club_admin(club_id)
  );

-- ============================================================================
-- 8. RLS POLICIES: EVENT_MAJORS TABLE
-- ============================================================================

ALTER TABLE public.event_majors ENABLE ROW LEVEL SECURITY;

-- SELECT: Follow parent event visibility rules
CREATE POLICY "event_majors_select_platform_admin"
  ON public.event_majors FOR SELECT
  TO authenticated, anon
  USING (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = event_majors.event_id
        AND public.is_platform_admin()
    )
  );

CREATE POLICY "event_majors_select_follow_event"
  ON public.event_majors FOR SELECT
  TO authenticated, anon
  USING (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = event_majors.event_id
        AND (
          (events.status = 'published' AND events.visibility = 'public')
          OR (
            events.status = 'published'
            AND events.visibility IN ('members_only', 'unlisted')
            AND EXISTS (
              SELECT 1 FROM public.club_memberships
              WHERE club_id = events.club_id
                AND user_id = auth.uid()
                AND role IN ('admin', 'officer', 'member')
            )
          )
        )
    )
  );

-- INSERT/UPDATE/DELETE: Allow if platform admin OR club officer/admin of event's club
CREATE POLICY "event_majors_modify_platform_admin"
  ON public.event_majors FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = event_majors.event_id
        AND public.is_platform_admin()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = event_majors.event_id
        AND public.is_platform_admin()
    )
  );

CREATE POLICY "event_majors_modify_club_officer"
  ON public.event_majors FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = event_majors.event_id
        AND (public.is_club_officer(events.club_id) OR public.is_club_admin(events.club_id))
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = event_majors.event_id
        AND (public.is_club_officer(events.club_id) OR public.is_club_admin(events.club_id))
    )
  );

-- ============================================================================
-- 9. RLS POLICIES: EVENT_TAGS TABLE
-- ============================================================================

ALTER TABLE public.event_tags ENABLE ROW LEVEL SECURITY;

-- SELECT: Follow parent event visibility rules
CREATE POLICY "event_tags_select_platform_admin"
  ON public.event_tags FOR SELECT
  TO authenticated, anon
  USING (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = event_tags.event_id
        AND public.is_platform_admin()
    )
  );

CREATE POLICY "event_tags_select_follow_event"
  ON public.event_tags FOR SELECT
  TO authenticated, anon
  USING (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = event_tags.event_id
        AND (
          (events.status = 'published' AND events.visibility = 'public')
          OR (
            events.status = 'published'
            AND events.visibility IN ('members_only', 'unlisted')
            AND EXISTS (
              SELECT 1 FROM public.club_memberships
              WHERE club_id = events.club_id
                AND user_id = auth.uid()
                AND role IN ('admin', 'officer', 'member')
            )
          )
        )
    )
  );

-- INSERT/UPDATE/DELETE: Allow if platform admin OR club officer/admin of event's club
CREATE POLICY "event_tags_modify_platform_admin"
  ON public.event_tags FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = event_tags.event_id
        AND public.is_platform_admin()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = event_tags.event_id
        AND public.is_platform_admin()
    )
  );

CREATE POLICY "event_tags_modify_club_officer"
  ON public.event_tags FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = event_tags.event_id
        AND (public.is_club_officer(events.club_id) OR public.is_club_admin(events.club_id))
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = event_tags.event_id
        AND (public.is_club_officer(events.club_id) OR public.is_club_admin(events.club_id))
    )
  );

-- ============================================================================
-- 10. CALENDAR QUERY HELPERS
-- ============================================================================

-- List public events for a date range (for global calendar)
CREATE OR REPLACE FUNCTION public.list_public_events(
  p_start timestamptz,
  p_end timestamptz
)
RETURNS TABLE (
  id uuid,
  club_id uuid,
  club_name text,
  title text,
  starts_at timestamptz,
  ends_at timestamptz,
  location_name text,
  location_type text,
  banner_url text,
  status text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'auth'
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    e.id,
    e.club_id,
    c.name AS club_name,
    e.title,
    e.starts_at,
    e.ends_at,
    e.location_name,
    e.location_type,
    e.banner_url,
    e.status
  FROM public.events e
  INNER JOIN public.clubs c ON c.id = e.club_id
  WHERE e.status = 'published'
    AND e.visibility = 'public'
    AND (
      -- Event starts in range
      (e.starts_at >= p_start AND e.starts_at < p_end)
      -- OR event ends in range
      OR (e.ends_at IS NOT NULL AND e.ends_at >= p_start AND e.ends_at < p_end)
      -- OR event spans the entire range
      OR (e.starts_at < p_start AND (e.ends_at IS NULL OR e.ends_at >= p_end))
    )
  ORDER BY e.starts_at ASC;
END;
$$;

-- List events for a specific club (includes all visibility levels based on membership)
CREATE OR REPLACE FUNCTION public.list_club_events(
  p_club_id uuid,
  p_start timestamptz,
  p_end timestamptz
)
RETURNS TABLE (
  id uuid,
  club_id uuid,
  club_name text,
  title text,
  starts_at timestamptz,
  ends_at timestamptz,
  location_name text,
  location_type text,
  banner_url text,
  status text,
  visibility text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'auth'
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    e.id,
    e.club_id,
    c.name AS club_name,
    e.title,
    e.starts_at,
    e.ends_at,
    e.location_name,
    e.location_type,
    e.banner_url,
    e.status,
    e.visibility
  FROM public.events e
  INNER JOIN public.clubs c ON c.id = e.club_id
  WHERE e.club_id = p_club_id
    AND e.status = 'published'
    AND (
      -- Public events visible to everyone
      e.visibility = 'public'
      -- OR user is platform admin
      OR public.is_platform_admin()
      -- OR user is member/officer/admin of the club (can see members_only and unlisted)
      OR EXISTS (
        SELECT 1 FROM public.club_memberships
        WHERE club_id = p_club_id
          AND user_id = auth.uid()
          AND role IN ('admin', 'officer', 'member')
      )
    )
    AND (
      -- Event starts in range
      (e.starts_at >= p_start AND e.starts_at < p_end)
      -- OR event ends in range
      OR (e.ends_at IS NOT NULL AND e.ends_at >= p_start AND e.ends_at < p_end)
      -- OR event spans the entire range
      OR (e.starts_at < p_start AND (e.ends_at IS NULL OR e.ends_at >= p_end))
    )
  ORDER BY e.starts_at ASC;
END;
$$;

-- ============================================================================
-- 11. GRANTS
-- ============================================================================

-- Grant table access
GRANT SELECT, INSERT, UPDATE, DELETE ON public.events TO authenticated;
GRANT SELECT ON public.events TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.event_majors TO authenticated;
GRANT SELECT ON public.event_majors TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.event_tags TO authenticated;
GRANT SELECT ON public.event_tags TO anon;

-- Grant function execution
GRANT EXECUTE ON FUNCTION public.list_public_events(timestamptz, timestamptz) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.list_club_events(uuid, timestamptz, timestamptz) TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.set_events_updated() TO authenticated;
GRANT EXECUTE ON FUNCTION public.normalize_event_tag() TO authenticated;

-- ============================================================================
-- NOTES
-- ============================================================================

-- Storage bucket "event-media" is already created and public.
-- Events table stores banner_url and thumbnail_url as text URLs pointing to storage.
-- Storage policies should be implemented separately if needed.
-- 
-- When is_all_majors=true, event_majors rows may be empty.
-- When is_all_majors=false, app logic should enforce at least one major (not DB constraint).
-- 
-- Tags are normalized to lower(trim(tag)) via trigger.
-- 
-- Cancelled events are still readable (status='cancelled' but visibility rules apply).
-- Frontend should display cancelled status appropriately.
