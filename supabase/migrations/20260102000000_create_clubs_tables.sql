-- Create clubs table
CREATE TABLE IF NOT EXISTS public.clubs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    website TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create majors table
CREATE TABLE IF NOT EXISTS public.majors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create club_majors junction table (many-to-many)
CREATE TABLE IF NOT EXISTS public.club_majors (
    club_id UUID NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
    major_id UUID NOT NULL REFERENCES public.majors(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (club_id, major_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_club_majors_club_id ON public.club_majors(club_id);
CREATE INDEX IF NOT EXISTS idx_club_majors_major_id ON public.club_majors(major_id);

-- Enable Row Level Security
ALTER TABLE public.clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.majors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.club_majors ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON public.clubs
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON public.majors
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON public.club_majors
    FOR SELECT USING (true);
