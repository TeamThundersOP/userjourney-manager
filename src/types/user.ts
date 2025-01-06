export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  status: string;
  created_at?: string | null;
  cv_submitted?: boolean | null;
  interview_status?: string | null;
  offer_letter_sent?: boolean | null;
  cos_sent?: boolean | null;
  right_to_work?: boolean | null;
  onboarding_complete?: boolean | null;
  has_reset_password?: boolean | null;
  personal_info?: PersonalInfo | null;
  personalInfo?: PersonalInfo | null; // Alias for frontend compatibility
  onboarding?: {
    currentPhase: number;
    phase0: OnboardingPhase0;
    phase1: OnboardingPhase1;
    phase2: OnboardingPhase2;
    approvals: {
      phase0: boolean;
      phase1: boolean;
      phase2: boolean;
    };
  };
}

export interface PersonalInfo {
  familyName?: string | null;
  givenName?: string | null;
  otherNames?: string | null;
  fullName?: string | null;
  nationality?: string | null;
  placeOfBirth?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
  countryOfResidence?: string | null;
  passportNumber?: string | null;
  passportIssueDate?: string | null;
  passportExpiryDate?: string | null;
  passportPlaceOfIssue?: string | null;
  address?: string | null;
  city?: string | null;
  postalCode?: string | null;
  country?: string | null;
  phone?: string | null;
}

export interface OnboardingPhase0 {
  personalDetailsCompleted: boolean;
  cvSubmitted: boolean;
  interviewCompleted: boolean;
  jobStatus: 'pending' | 'accepted' | 'rejected';
  passportUploaded: boolean;
  pccUploaded: boolean;
  otherDocumentsUploaded: boolean;
  offerLetterSent: boolean;
  cosSent: boolean;
  documentsUploaded: boolean;
  visaStatus: 'pending' | 'approved' | 'rejected';
  travelDetailsUpdated: boolean;
  travelDocumentsUploaded: boolean;
  visaCopyUploaded: boolean;
  ukContactUpdated: boolean;
  ukContactNumber?: string;
  ukAddress?: string;
  feedback?: string;
}

export interface OnboardingPhase1 {
  hmrcChecklist: boolean;
  companyAgreements: boolean;
  pensionScheme: boolean;
  bankStatements: boolean;
  vaccinationProof: boolean;
  feedback?: string;
}

export interface OnboardingPhase2 {
  rightToWork: boolean;
  shareCode: boolean;
  dbs: boolean;
  onboardingComplete: boolean;
  feedback?: string;
}

export interface UserFile {
  id: number;
  userId: string;
  name: string;
  type: string;
  uploadedAt: string;
  size: string;
  category: string;
}
