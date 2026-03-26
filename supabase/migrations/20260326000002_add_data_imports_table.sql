-- Migration: 20260326000002_add_data_imports_table.sql
-- Tracks scraper runs so we can show data freshness to users and alert on failures.

CREATE TABLE IF NOT EXISTS public.data_imports (
    id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    source       text        NOT NULL,          -- 'courses', 'professors', 'jobs'
    started_at   timestamptz NOT NULL DEFAULT now(),
    completed_at timestamptz,                   -- null while running
    record_count integer,                       -- rows upserted
    status       text        NOT NULL DEFAULT 'running',
    error        text,                          -- error message if failed
    created_at   timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT data_imports_source_check
        CHECK (source IN ('courses', 'professors', 'jobs')),
    CONSTRAINT data_imports_status_check
        CHECK (status IN ('running', 'success', 'failed'))
);

-- Efficient lookups by source + recency
CREATE INDEX IF NOT EXISTS idx_data_imports_source_started
    ON public.data_imports (source, started_at DESC);

-- Trigger to keep completed_at consistent
CREATE OR REPLACE FUNCTION public.data_imports_set_completed_at()
RETURNS TRIGGER AS $$
BEGIN
    -- Auto-set completed_at when status transitions away from 'running'
    IF NEW.status IN ('success', 'failed') AND NEW.completed_at IS NULL THEN
        NEW.completed_at := now();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_data_imports_completed_at
    BEFORE UPDATE ON public.data_imports
    FOR EACH ROW
    EXECUTE FUNCTION public.data_imports_set_completed_at();

ALTER TABLE public.data_imports ENABLE ROW LEVEL SECURITY;

-- Public can read import history (data freshness transparency)
CREATE POLICY "data_imports_public_read"
    ON public.data_imports FOR SELECT
    USING (true);

-- Only service_role can insert/update (scrapers use service_role key)
CREATE POLICY "data_imports_service_role_write"
    ON public.data_imports FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

COMMENT ON TABLE public.data_imports IS
'Tracks each scraper run. Use this to surface data freshness to users
and to detect failed/stale scrapes in monitoring. Updated by scraper
scripts using the SUPABASE_SERVICE_ROLE_KEY.';
