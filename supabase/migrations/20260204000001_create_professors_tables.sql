-- Create professors tables for BetterBobcats
-- Migration: 20260204000001_create_professors_tables.sql

-- Departments table
CREATE TABLE IF NOT EXISTS public.departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    professor_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Professors table
CREATE TABLE IF NOT EXISTS public.professors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rmp_id TEXT UNIQUE,  -- RateMyProfessors legacy ID
    rmp_graphql_id TEXT UNIQUE,  -- RateMyProfessors GraphQL ID (base64)
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    department_name TEXT,  -- Denormalized for easy queries
    avg_rating DECIMAL(3, 2),  -- e.g., 4.50
    avg_difficulty DECIMAL(3, 2),  -- e.g., 3.20
    num_ratings INTEGER DEFAULT 0,
    would_take_again_percent DECIMAL(5, 2),  -- e.g., 85.50
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_professors_department_id ON public.professors(department_id);
CREATE INDEX IF NOT EXISTS idx_professors_last_name ON public.professors(last_name);
CREATE INDEX IF NOT EXISTS idx_professors_avg_rating ON public.professors(avg_rating DESC);
CREATE INDEX IF NOT EXISTS idx_professors_department_name ON public.professors(department_name);

-- Enable RLS
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professors ENABLE ROW LEVEL SECURITY;

-- Public read access policies (idempotent: drop if exists)
DROP POLICY IF EXISTS "Allow public read access on departments" ON public.departments;
CREATE POLICY "Allow public read access on departments" 
    ON public.departments FOR SELECT 
    USING (true);

DROP POLICY IF EXISTS "Allow public read access on professors" ON public.professors;
CREATE POLICY "Allow public read access on professors" 
    ON public.professors FOR SELECT 
    USING (true);

-- Allow service role full access for data import (idempotent)
DROP POLICY IF EXISTS "Allow service role full access on departments" ON public.departments;
CREATE POLICY "Allow service role full access on departments"
    ON public.departments FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service role full access on professors" ON public.professors;
CREATE POLICY "Allow service role full access on professors"
    ON public.professors FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Function to update department professor counts
CREATE OR REPLACE FUNCTION public.update_department_professor_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        UPDATE public.departments
        SET professor_count = (
            SELECT COUNT(*) FROM public.professors WHERE department_id = NEW.department_id
        )
        WHERE id = NEW.department_id;
    END IF;
    
    IF TG_OP = 'DELETE' OR TG_OP = 'UPDATE' THEN
        UPDATE public.departments
        SET professor_count = (
            SELECT COUNT(*) FROM public.professors WHERE department_id = OLD.department_id
        )
        WHERE id = OLD.department_id;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger to maintain professor counts (idempotent)
DROP TRIGGER IF EXISTS trigger_update_department_professor_count ON public.professors;
CREATE TRIGGER trigger_update_department_professor_count
AFTER INSERT OR UPDATE OR DELETE ON public.professors
FOR EACH ROW
EXECUTE FUNCTION public.update_department_professor_count();
