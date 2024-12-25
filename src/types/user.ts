export interface User {
  id: number;
  email: string;
  status: string;
  personalInfo?: {
    fullName?: string;
    nationality?: string;
    dateOfBirth?: string;
    gender?: string;
    passportNumber?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    phone?: string;
  };
  onboarding?: {
    currentPhase: number;
    phase0: Phase0;
    phase1: Phase1;
    phase2: Phase2;
  };
}

export interface Phase0 {
  cvSubmitted: boolean;
  interviewStatus: 'pending' | 'accepted' | 'rejected';
  offerLetterSent: boolean;
  cosSent: boolean;
  rightToWorkSent: boolean;
}

export interface Phase1 {
  shareCodeUploaded: boolean;
  dbsUploaded: boolean;
}

export interface Phase2 {
  onboardingComplete: boolean;
}