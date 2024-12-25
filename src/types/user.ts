export interface User {
  id: number;
  email: string;
  status: string;
  personalInfo?: {
    familyName?: string;
    givenName?: string;
    otherNames?: string;
    fullName?: string;
    nationality?: string;
    dateOfBirth?: string;
    gender?: string;
    countryOfResidence?: string;
    placeOfBirth?: string;
    passportNumber?: string;
    passportIssuePlace?: string;
    passportIssueDate?: string;
    passportExpiryDate?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    mobileNumber?: string;
  };
  onboarding?: {
    currentPhase: number;
    phase0: Phase0;
    phase1: Phase1;
    phase2: Phase2;
    approvals: {
      phase0: boolean;
      phase1: boolean;
      phase2: boolean;
    };
  };
}

export interface Phase0 {
  cvSubmitted: boolean;
  interviewCompleted: boolean;
  offerLetterSent: boolean;
  cosSent: boolean;
  rightToWorkSent: boolean;
  documentsUploaded: boolean;
  visaStatus: 'pending' | 'approved' | 'rejected';
}

export interface Phase1 {
  hmrcChecklist: boolean;
  companyAgreements: boolean;
  pensionScheme: boolean;
  bankStatements: boolean;
  vaccinationProof: boolean;
}

export interface Phase2 {
  rightToWork: boolean;
  shareCode: boolean;
  dbs: boolean;
  onboardingComplete: boolean;
}