-- Migration: Create Event Request RLS Policies
-- RLS policies for event_requests, event_request_tags, event_request_votes

-- ============================================================================
-- 1. ENABLE RLS
-- ============================================================================

ALTER TABLE public.event_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_request_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_request_votes ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 2. EVENT_REQUESTS RLS POLICIES
-- ============================================================================

-- SELECT: Public can read non-deleted open/fulfilled requests
CREATE POLICY "event_requests_select_public"
  ON public.event_requests FOR SELECT
  TO authenticated, anon
  USING (
    deleted_at IS NULL
    AND status IN ('open', 'fulfilled')
  );

-- SELECT: Platform admin can read all
CREATE POLICY "event_requests_select_platform_admin"
  ON public.event_requests FOR SELECT
  TO authenticated
  USING (public.is_platform_admin());

-- SELECT: Creator can read their own requests (including deleted)
CREATE POLICY "event_requests_select_creator"
  ON public.event_requests FOR SELECT
  TO authenticated
  USING (created_by = auth.uid());

-- INSERT: Authenticated users can insert
CREATE POLICY "event_requests_insert_authenticated"
  ON public.event_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- UPDATE: Disallow direct updates (only via RPC)
-- No UPDATE policy - updates must go through fulfill_event_request RPC

-- DELETE: Disallow direct deletes (only via RPC)
-- No DELETE policy - deletes must go through delete_event_request RPC

-- ============================================================================
-- 3. EVENT_REQUEST_TAGS RLS POLICIES
-- ============================================================================

-- SELECT: Public can read tags for visible requests
CREATE POLICY "event_request_tags_select_public"
  ON public.event_request_tags FOR SELECT
  TO authenticated, anon
  USING (
    EXISTS (
      SELECT 1 FROM public.event_requests
      WHERE event_requests.id = event_request_tags.request_id
        AND deleted_at IS NULL
        AND status IN ('open', 'fulfilled')
    )
  );

-- SELECT: Platform admin can read all
CREATE POLICY "event_request_tags_select_platform_admin"
  ON public.event_request_tags FOR SELECT
  TO authenticated
  USING (public.is_platform_admin());

-- INSERT/DELETE: Disallow direct inserts/deletes
-- Tags are managed via create_event_request RPC only
-- No INSERT/DELETE policies - tags must be created via RPC

-- ============================================================================
-- 4. EVENT_REQUEST_VOTES RLS POLICIES
-- ============================================================================

-- SELECT: Public can read vote counts (via view)
-- For raw votes, authenticated can read votes for visible requests
CREATE POLICY "event_request_votes_select_public"
  ON public.event_request_votes FOR SELECT
  TO authenticated, anon
  USING (
    EXISTS (
      SELECT 1 FROM public.event_requests
      WHERE event_requests.id = event_request_votes.request_id
        AND deleted_at IS NULL
        AND status IN ('open', 'fulfilled')
    )
  );

-- SELECT: Platform admin can read all
CREATE POLICY "event_request_votes_select_platform_admin"
  ON public.event_request_votes FOR SELECT
  TO authenticated
  USING (public.is_platform_admin());

-- INSERT: Authenticated can insert their own vote
CREATE POLICY "event_request_votes_insert_authenticated"
  ON public.event_request_votes FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.event_requests
      WHERE event_requests.id = event_request_votes.request_id
        AND deleted_at IS NULL
        AND status = 'open'
    )
  );

-- DELETE: Authenticated can delete their own vote
CREATE POLICY "event_request_votes_delete_own"
  ON public.event_request_votes FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- ============================================================================
-- 5. GRANTS
-- ============================================================================

-- Grant table access
GRANT SELECT, INSERT ON public.event_requests TO authenticated;
GRANT SELECT ON public.event_requests TO anon;
GRANT SELECT ON public.event_request_tags TO authenticated, anon;
GRANT SELECT, INSERT, DELETE ON public.event_request_votes TO authenticated;
GRANT SELECT ON public.event_request_votes TO anon;

-- ============================================================================
-- NOTES
-- ============================================================================
-- Updates to event_requests must go through fulfill_event_request RPC
-- Deletes to event_requests must go through delete_event_request RPC
-- Tags are managed via create_event_request RPC only
-- Votes can be inserted/deleted directly by authenticated users (RLS protected)
