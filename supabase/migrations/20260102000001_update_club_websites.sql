-- Update ACM website
UPDATE public.clubs 
SET website = 'https://ucm.acm.org/'
WHERE name = 'ACM (Association for Computing Machinery)';

-- Update Data Science Club website
UPDATE public.clubs 
SET website = 'https://www.instagram.com/dssucm/'
WHERE name = 'Data Science Club';

-- Replace Women in STEM with SASE
UPDATE public.clubs 
SET 
  name = 'SASE (Society of Asian Scientists and Engineers)',
  description = 'Professional organization supporting Asian heritage in STEM fields through networking, mentorship, and professional development.',
  website = 'https://www.instagram.com/saseucm/'
WHERE name = 'Women in STEM';
