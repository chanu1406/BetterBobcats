-- Migration: Create RPC function for email processing
-- This function safely locks and selects pending emails for sending
-- Used by the send-emails Edge Function

-- ============================================================================
-- FUNCTION: Select pending emails for sending (with locking)
-- ============================================================================

CREATE OR REPLACE FUNCTION public.select_pending_emails_for_sending(p_limit integer DEFAULT 25)
RETURNS TABLE (
  id uuid,
  to_email citext,
  template text,
  payload jsonb,
  attempt_count integer
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_now timestamptz := now();
BEGIN
  -- Select and lock pending emails, then update their status to 'sending'
  -- FOR UPDATE SKIP LOCKED prevents concurrent workers from processing the same emails
  RETURN QUERY
  WITH locked_emails AS (
    SELECT eo.id, eo.to_email, eo.template, eo.payload, eo.attempt_count
    FROM public.email_outbox eo
    WHERE eo.status = 'pending'
    ORDER BY eo.created_at ASC
    LIMIT p_limit
    FOR UPDATE SKIP LOCKED
  )
  UPDATE public.email_outbox eo
  SET 
    status = 'sending',
    last_attempt_at = v_now,
    attempt_count = COALESCE(eo.attempt_count, 0) + 1
  FROM locked_emails le
  WHERE eo.id = le.id
  RETURNING eo.id, eo.to_email, eo.template, eo.payload, eo.attempt_count;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.select_pending_emails_for_sending(integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.select_pending_emails_for_sending(integer) TO service_role;

-- Add comment
COMMENT ON FUNCTION public.select_pending_emails_for_sending(integer) IS 
  'Selects and locks pending emails for sending. Updates status to sending and increments attempt_count. Uses FOR UPDATE SKIP LOCKED to prevent concurrent processing.';
