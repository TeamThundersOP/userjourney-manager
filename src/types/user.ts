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
  personalDetailsCompleted: boolean;
  interviewCompleted: boolean;
  jobStatus: 'pending' | 'accepted' | 'rejected';
  documents: {
    passportCopy: boolean;
    pcc: boolean;
    other: boolean;
  };
  offerLetterSent: boolean;
  cosSent: boolean;
  visaStatus: 'pending' | 'approved' | 'rejected';
  ukTravel: {
    ticketUploaded: boolean;
    visaCopyUploaded: boolean;
  };
  ukContactUpdated: boolean;
  phase0Complete: boolean;
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
