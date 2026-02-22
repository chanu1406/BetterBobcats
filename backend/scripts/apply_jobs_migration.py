"""
Apply the jobs migration to the Supabase database directly via psycopg2.
Run this once to create the tables.
"""
import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

def apply_migration():
    # Parse the Supabase URL to get the host
    supabase_url = os.getenv("SUPABASE_URL") or os.getenv("NEXT_PUBLIC_SUPABASE_URL")
    if not supabase_url:
        print("Error: SUPABASE_URL not set")
        return
    
    # Extract project ref from URL: https://XXXXX.supabase.co -> XXXXX
    import re
    match = re.search(r"https://([^.]+)\.supabase\.co", supabase_url)
    if not match:
        print(f"Error: Could not parse project ref from URL: {supabase_url}")
        return
    
    project_ref = match.group(1)
    db_host = f"db.{project_ref}.supabase.co"
    
    # Get database password from env or prompt
    db_password = os.getenv("SUPABASE_DB_PASSWORD", "")
    if not db_password:
        db_password = input(f"Enter database password for {db_host}: ")
    
    print(f"Connecting to {db_host}...")
    
    conn = psycopg2.connect(
        host=db_host,
        port=5432,
        dbname="postgres",
        user="postgres",
        password=db_password,
        sslmode="require",
    )
    conn.autocommit = True
    cur = conn.cursor()
    
    # Check if jobs table already exists
    cur.execute("""
        SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' AND table_name = 'jobs'
        );
    """)
    exists = cur.fetchone()[0]
    
    if exists:
        print("Jobs table already exists, skipping.")
        cur.close()
        conn.close()
        return
    
    print("Creating jobs tables...")
    
    migration_sql = """
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

    -- Indexes
    CREATE INDEX IF NOT EXISTS idx_jobs_source_active_approved ON jobs(source, is_active, is_approved);
    CREATE INDEX IF NOT EXISTS idx_jobs_company ON jobs(company);
    CREATE INDEX IF NOT EXISTS idx_jobs_created_at_desc ON jobs(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_jobs_degree_category ON jobs(degree_category);
    CREATE INDEX IF NOT EXISTS idx_saved_jobs_user_id ON saved_jobs(user_id);
    CREATE UNIQUE INDEX IF NOT EXISTS idx_jobs_dedup ON jobs(company, role, source) WHERE source != 'user_submitted';

    -- Enable RLS
    ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
    ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;

    -- Jobs RLS policies
    CREATE POLICY "jobs_public_read" ON jobs
        FOR SELECT USING (is_active = true AND is_approved = true);

    CREATE POLICY "jobs_auth_insert" ON jobs
        FOR INSERT TO authenticated
        WITH CHECK (
            source = 'user_submitted'
            AND submitted_by = auth.uid()
            AND is_approved = false
        );

    -- Saved jobs RLS policies
    CREATE POLICY "saved_jobs_own_read" ON saved_jobs
        FOR SELECT TO authenticated
        USING (user_id = auth.uid());

    CREATE POLICY "saved_jobs_own_insert" ON saved_jobs
        FOR INSERT TO authenticated
        WITH CHECK (user_id = auth.uid());

    CREATE POLICY "saved_jobs_own_delete" ON saved_jobs
        FOR DELETE TO authenticated
        USING (user_id = auth.uid());

    -- Reload PostgREST schema cache
    NOTIFY pgrst, 'reload schema';
    """
    
    cur.execute(migration_sql)
    print("Done! Jobs tables, indexes, and RLS policies created.")
    
    # Verify
    cur.execute("SELECT count(*) FROM information_schema.tables WHERE table_name IN ('jobs', 'saved_jobs') AND table_schema = 'public';")
    count = cur.fetchone()[0]
    print(f"Verified: {count} tables created")
    
    cur.close()
    conn.close()


if __name__ == "__main__":
    apply_migration()
