import { User, PersonalInfo } from "@/types/user";
import { Tables } from "@/integrations/supabase/types";

export const transformUserData = (candidate: Tables<'candidates'>): User => {
  // Transform personal_info
  const personalInfo = candidate.personal_info as Record<string, unknown>;
  const transformedPersonalInfo: PersonalInfo = {
    familyName: String(personalInfo?.familyName || ''),
    givenName: String(personalInfo?.givenName || ''),
    otherNames: String(personalInfo?.otherNames || ''),
    fullName: String(personalInfo?.fullName || ''),
    nationality: String(personalInfo?.nationality || ''),
    placeOfBirth: String(personalInfo?.placeOfBirth || ''),
    dateOfBirth: String(personalInfo?.dateOfBirth || ''),
    gender: String(personalInfo?.gender || ''),
    countryOfResidence: String(personalInfo?.countryOfResidence || ''),
    passportNumber: String(personalInfo?.passportNumber || ''),
    passportIssueDate: String(personalInfo?.passportIssueDate || ''),
    passportExpiryDate: String(personalInfo?.passportExpiryDate || ''),
    passportPlaceOfIssue: String(personalInfo?.passportPlaceOfIssue || ''),
    address: String(personalInfo?.address || ''),
    city: String(personalInfo?.city || ''),
    postalCode: String(personalInfo?.postalCode || ''),
    country: String(personalInfo?.country || ''),
    phone: String(personalInfo?.phone || ''),
  };

  return {
    id: candidate.id,
    name: candidate.name,
    username: candidate.username,
    email: candidate.email || '',
    status: candidate.status || 'pending',
    created_at: candidate.created_at,
    cv_submitted: candidate.cv_submitted,
    interview_status: candidate.interview_status,
    offer_letter_sent: candidate.offer_letter_sent,
    cos_sent: candidate.cos_sent,
    right_to_work: candidate.right_to_work,
    onboarding_complete: candidate.onboarding_complete,
    has_reset_password: candidate.has_reset_password,
    personal_info: transformedPersonalInfo,
    personalInfo: transformedPersonalInfo,
    onboarding: candidate.onboarding as User['onboarding'],
  };
};