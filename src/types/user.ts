export interface User {
  id: number;
  email: string;
  status: string;
  personalInfo?: {
    familyName?: string;
    givenName?: string;
    otherNames?: string;
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
    email?: string;
    fullName?: string;
  };
  onboarding?: {
    currentPhase: number;
    phase1: Phase1;
    phase2: Phase2;
    approvals: {
      phase1: boolean;
      phase2: boolean;
    };
  };
}

export interface Phase1 {
  cvSubmitted: boolean;
  personalDetailsCompleted: boolean;
  interviewStatus: 'pending' | 'completed' | 'rejected';
  jobStatus: 'pending' | 'accepted' | 'rejected';
  documents: {
    passport: boolean;
    pcc: boolean;
    other: boolean;
  };
  offerLetterSent: boolean;
  cosSent: boolean;
  visaStatus: 'pending' | 'approved' | 'rejected';
  ukTravel: {
    ticket: boolean;
    visaCopy: boolean;
  };
  ukContact: {
    phone: string;
    address: string;
  };
  completed: boolean;
}

export interface Phase2 {
  rightToWork: boolean;
  shareCode: boolean;
  dbs: boolean;
  onboardingComplete: boolean;
}