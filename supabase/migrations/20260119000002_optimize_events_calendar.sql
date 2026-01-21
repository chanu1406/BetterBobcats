-- Migration: Optimize Events Calendar Queries
-- Creates RPC function for server-side filtering and adds indexes
-- Part of Performance Optimization Roadmap items 2.1, 2.2

-- ============================================================================
-- 1. INDEXES FOR EVENTS CALENDAR
-- ============================================================================

-- Index for events calendar filtering (already exists but verify)
CREATE INDEX IF NOT EXISTS idx_events_starts_visibility_status 
ON public.events(starts_at, visibility, status);

-- Index for event majors (already exists but verify)
CREATE INDEX IF NOT EXISTS idx_event_majors_event_id 
ON public.event_majors(event_id);

-- Index for event tags (already exists but verify)
CREATE INDEX IF NOT EXISTS idx_event_tags_event_id 
ON public.event_tags(event_id);

-- ============================================================================
-- 2. RPC FUNCTION: GET_EVENTS_FOR_RANGE
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_events_for_range(
  p_start_date timestamp with time zone,
  p_end_date timestamp with time zone,
  p_major_ids uuid[] DEFAULT NULL,
  p_tags text[] DEFAULT NULL,
  p_club_ids uuid[] DEFAULT NULL,
  p_location_types text[] DEFAULT NULL,
  p_search_query text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'auth'
STABLE
AS $$
DECLARE
  v_events jsonb;
BEGIN
  -- Build events with tags and majors included
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', e.id,
      'club_id', e.club_id,
      'club_name', c.name,
      'title', e.title,
      'description', e.description,
      'starts_at', e.starts_at,
      'ends_at', e.ends_at,
      'location_name', e.location_name,
      'location_address', e.location_address,
      'location_type', e.location_type,
      'online_url', e.online_url,
      'visibility', e.visibility,
      'status', e.status,
      'banner_url', e.banner_url,
      'thumbnail_url', e.thumbnail_url,
      'timezone', e.timezone,
      'is_all_majors', e.is_all_majors,
      'capacity', e.capacity,
      'requires_rsvp', e.requires_rsvp,
      'rsvp_url', e.rsvp_url,
      'is_featured', e.is_featured,
      'created_at', e.created_at,
      'updated_at', e.updated_at,
      'created_by', e.created_by,
      'updated_by', e.updated_by,
      'tags', COALESCE(
        (
          SELECT jsonb_agg(et.tag)
          FROM public.event_tags et
          WHERE et.event_id = e.id
        ),
        '[]'::jsonb
      ),
      'major_ids', COALESCE(
        (
          SELECT jsonb_agg(em.major_id::text)
          FROM public.event_majors em
          WHERE em.event_id = e.id
        ),
        '[]'::jsonb
      )
    ) ORDER BY e.starts_at ASC
  ) INTO v_events
  FROM public.events e
  INNER JOIN public.clubs c ON e.club_id = c.id
  WHERE e.status = 'published'
    AND e.visibility = 'public'
    AND e.starts_at >= p_start_date
    AND e.starts_at <= p_end_date
    -- Filter by majors
    AND (
      p_major_ids IS NULL 
      OR e.is_all_majors = true
      OR EXISTS (
        SELECT 1 FROM public.event_majors em
        WHERE em.event_id = e.id
          AND em.major_id = ANY(p_major_ids)
      )
    )
    -- Filter by tags
    AND (
      p_tags IS NULL
      OR EXISTS (
        SELECT 1 FROM public.event_tags et
        WHERE et.event_id = e.id
          AND et.tag = ANY(p_tags)
      )
    )
    -- Filter by clubs
    AND (
      p_club_ids IS NULL
      OR e.club_id = ANY(p_club_ids)
    )
    -- Filter by location types
    AND (
      p_location_types IS NULL
      OR e.location_type = ANY(p_location_types)
    )
    -- Filter by search query
    AND (
      p_search_query IS NULL
      OR p_search_query = ''
      OR e.title ILIKE '%' || p_search_query || '%'
      OR e.description ILIKE '%' || p_search_query || '%'
      OR c.name ILIKE '%' || p_search_query || '%'
      OR EXISTS (
        SELECT 1 FROM public.event_tags et
        WHERE et.event_id = e.id
          AND et.tag ILIKE '%' || p_search_query || '%'
      )
    );

  RETURN COALESCE(v_events, '[]'::jsonb);
END;
$$;

-- Grant execute permission to authenticated and anon users
GRANT EXECUTE ON FUNCTION public.get_events_for_range(timestamp with time zone, timestamp with time zone, uuid[], text[], uuid[], text[], text) TO authenticated, anon;
