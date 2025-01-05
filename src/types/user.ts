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
  personalInfo?: {
    familyName?: string;
    givenName?: string;
    otherNames?: string;
    fullName?: string;
    nationality?: string;
    placeOfBirth?: string;
    dateOfBirth?: string;
    gender?: string;
    countryOfResidence?: string;
    passportNumber?: string;
    passportIssueDate?: string;
    passportExpiryDate?: string;
    passportPlaceOfIssue?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    phone?: string;
  };
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