-- =============================================================
-- Jobs tables: store scraped + user-submitted job listings
-- =============================================================

-- Main jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    company text NOT NULL,
    role text NOT NULL,
    location text NOT NULL,
    application_url text DEFAULT '',
    source text NOT NULL CHECK (source IN ('scraped_tech', 'scraped_research', 'user_submitted')),
    degree_category text NOT NULL DEFAULT 'All',
    tags text[] NOT NULL DEFAULT '{}',
    is_active boolean NOT NULL DEFAULT true,
    is_approved boolean NOT NULL DEFAULT false,
    submitted_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    scraped_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- Saved/bookmarked jobs per user
CREATE TABLE IF NOT EXISTS saved_jobs (
    job_id uuid NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (job_id, user_id)
);

-- =============================================================
-- Indexes
-- =============================================================
CREATE INDEX IF NOT EXISTS idx_jobs_source_active_approved ON jobs(source, is_active, is_approved);
CREATE INDEX IF NOT EXISTS idx_jobs_company ON jobs(company);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at_desc ON jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_degree_category ON jobs(degree_category);
CREATE INDEX IF NOT EXISTS idx_saved_jobs_user_id ON saved_jobs(user_id);

-- Unique constraint to prevent duplicate scraped jobs
CREATE UNIQUE INDEX IF NOT EXISTS idx_jobs_dedup ON jobs(company, role, source) WHERE source != 'user_submitted';

-- Auto-update updated_at trigger
CREATE TRIGGER trg_jobs_set_updated_at
    BEFORE UPDATE ON jobs
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

-- =============================================================
-- RLS Policies
-- =============================================================
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;

-- Jobs: public read for active, approved jobs
CREATE POLICY "jobs_public_read" ON jobs
    FOR SELECT USING (is_active = true AND is_approved = true);

-- Jobs: platform admins can read all jobs (including unapproved)
CREATE POLICY "jobs_admin_read_all" ON jobs
    FOR SELECT USING (is_platform_admin());

-- Jobs: authenticated users can submit jobs
CREATE POLICY "jobs_auth_insert" ON jobs
    FOR INSERT TO authenticated
    WITH CHECK (
        source = 'user_submitted'
        AND submitted_by = auth.uid()
        AND is_approved = false
    );

-- Jobs: platform admins can insert any job (for scraped data via service role)
CREATE POLICY "jobs_admin_insert" ON jobs
    FOR INSERT TO authenticated
    WITH CHECK (is_platform_admin());

-- Jobs: platform admins can update any job (approve, deactivate, etc.)
CREATE POLICY "jobs_admin_update" ON jobs
    FOR UPDATE TO authenticated
    USING (is_platform_admin())
    WITH CHECK (is_platform_admin());

-- Jobs: platform admins can delete jobs
CREATE POLICY "jobs_admin_delete" ON jobs
    FOR DELETE TO authenticated
    USING (is_platform_admin());

-- Saved jobs: users can read their own saved jobs
CREATE POLICY "saved_jobs_own_read" ON saved_jobs
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

-- Saved jobs: users can insert their own saved jobs
CREATE POLICY "saved_jobs_own_insert" ON saved_jobs
    FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid());

-- Saved jobs: users can delete their own saved jobs
CREATE POLICY "saved_jobs_own_delete" ON saved_jobs
    FOR DELETE TO authenticated
    USING (user_id = auth.uid());
