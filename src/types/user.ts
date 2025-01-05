export interface User {
  id: string;
  name: string;
  username: string;
  created_at?: string | null;
  cv_submitted?: boolean | null;
  interview_status?: string | null;
  offer_letter_sent?: boolean | null;
  cos_sent?: boolean | null;
  right_to_work?: boolean | null;
  onboarding_complete?: boolean | null;
}