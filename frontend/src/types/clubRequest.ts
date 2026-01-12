/**
 * Club Request Type
 * Represents a club request submission waiting for admin review
 */
export interface ClubRequest {
  id: string;
  name: string;
  description: string;
  website: string | null;
  slug_candidate: string | null;
  contact_email: string;
  officer_emails: string[];
  officer_phones: string[];
  logo_url: string | null;
  banner_url: string | null;
  status: 'pending' | 'approved' | 'rejected';
  admin_message: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  created_at: string;
  updated_at: string;
  submitted_by: string | null;
}
