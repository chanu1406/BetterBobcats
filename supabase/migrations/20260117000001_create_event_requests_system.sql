-- Migration: Create Event Requests System
-- Tables: event_requests, event_request_tags, event_request_votes
-- View: event_requests_with_counts
-- Add request_id column to events table

-- ============================================================================
-- 1. EVENT_REQUESTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.event_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  description text NOT NULL,
  major_id uuid NULL REFERENCES public.majors(id) ON DELETE RESTRICT,
  is_all_majors boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'fulfilled', 'closed')),
  fulfilled_event_id uuid NULL REFERENCES public.events(id) ON DELETE SET NULL,
  created_by uuid NOT NULL DEFAULT auth.uid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz NULL,
  deleted_by uuid NULL,
  delete_reason text NULL
);

-- ============================================================================
-- 2. EVENT_REQUEST_TAGS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.event_request_tags (
  request_id uuid NOT NULL REFERENCES public.event_requests(id) ON DELETE CASCADE,
  tag text NOT NULL,
  PRIMARY KEY (request_id, tag)
);

-- Trigger to normalize tags to lower(trim(tag))
CREATE OR REPLACE FUNCTION public.normalize_event_request_tag()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.tag := lower(trim(NEW.tag));
  IF NEW.tag = '' THEN
    RAISE EXCEPTION 'Event request tag cannot be empty';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_normalize_event_request_tag
  BEFORE INSERT OR UPDATE ON public.event_request_tags
  FOR EACH ROW
  EXECUTE FUNCTION public.normalize_event_request_tag();

-- ============================================================================
-- 3. EVENT_REQUEST_VOTES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.event_request_votes (
  request_id uuid NOT NULL REFERENCES public.event_requests(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (request_id, user_id)
);

-- ============================================================================
-- 4. ADD request_id COLUMN TO EVENTS TABLE
-- ============================================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'events' 
    AND column_name = 'request_id'
  ) THEN
    ALTER TABLE public.events ADD COLUMN request_id uuid NULL REFERENCES public.event_requests(id) ON DELETE SET NULL;
  END IF;
END $$;

-- ============================================================================
-- 5. INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_event_requests_status_created_at ON public.event_requests(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_event_requests_is_all_majors_major_id ON public.event_requests(is_all_majors, major_id);
CREATE INDEX IF NOT EXISTS idx_event_requests_fulfilled_event_id ON public.event_requests(fulfilled_event_id);
CREATE INDEX IF NOT EXISTS idx_event_requests_created_by ON public.event_requests(created_by);
CREATE INDEX IF NOT EXISTS idx_event_requests_deleted_at ON public.event_requests(deleted_at) WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_event_request_votes_request_id ON public.event_request_votes(request_id);
CREATE INDEX IF NOT EXISTS idx_event_request_votes_user_id ON public.event_request_votes(user_id);

CREATE INDEX IF NOT EXISTS idx_events_request_id ON public.events(request_id);

-- ============================================================================
-- 6. VIEW: EVENT_REQUESTS_WITH_COUNTS
-- ============================================================================

CREATE OR REPLACE VIEW public.event_requests_with_counts AS
SELECT 
  er.id,
  er.description,
  er.major_id,
  er.is_all_majors,
  er.status,
  er.fulfilled_event_id,
  er.created_by,
  er.created_at,
  er.deleted_at,
  er.deleted_by,
  er.delete_reason,
  COALESCE(vote_counts.vote_count, 0)::int AS vote_count,
  COALESCE(ARRAY_AGG(DISTINCT ert.tag) FILTER (WHERE ert.tag IS NOT NULL), ARRAY[]::text[]) AS tags
FROM public.event_requests er
LEFT JOIN (
  SELECT request_id, COUNT(*)::int AS vote_count
  FROM public.event_request_votes
  GROUP BY request_id
) vote_counts ON vote_counts.request_id = er.id
LEFT JOIN public.event_request_tags ert ON ert.request_id = er.id
GROUP BY 
  er.id,
  er.description,
  er.major_id,
  er.is_all_majors,
  er.status,
  er.fulfilled_event_id,
  er.created_by,
  er.created_at,
  er.deleted_at,
  er.deleted_by,
  er.delete_reason,
  vote_counts.vote_count;

-- Grant access to view
GRANT SELECT ON public.event_requests_with_counts TO authenticated, anon;

-- ============================================================================
-- NOTES
-- ============================================================================
-- RLS policies and RPC functions will be added in subsequent migrations
-- Tags are normalized to lower(trim(tag)) via trigger
-- Soft delete is supported via deleted_at column
-- Vote counts are computed via view for performance
