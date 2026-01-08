/**
 * Club TypeScript types matching backend Pydantic models and database schema
 */

export interface Club {
  id: string;
  name: string;
  description: string;
  website: string | null;
  slug: string | null;
  is_active: boolean;
  display_order: number;
  logo_url: string | null;
  banner_url: string | null;
  created_at: string;
}

export interface ClubCreate {
  name: string;
  description: string;
  website?: string | null;
  slug?: string | null;
  is_active?: boolean;
  display_order?: number;
  logo_url?: string | null;
  banner_url?: string | null;
}

