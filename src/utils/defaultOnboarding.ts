export const defaultPhase0 = {
  cvSubmitted: false,
  personalDetailsCompleted: false,
  interviewCompleted: false,
  jobStatus: 'pending' as const,
  documents: {
    passportCopy: false,
    pcc: false,
    other: false,
  },
  offerLetterSent: false,
  cosSent: false,
  visaStatus: 'pending' as const,
  ukTravel: {
    ticketUploaded: false,
    visaCopyUploaded: false,
  },
  ukContactUpdated: false,
  phase0Complete: false,
};

export const defaultPhase1 = {
  hmrcChecklist: false,
  companyAgreements: false,
  pensionScheme: false,
  bankStatements: false,
  vaccinationProof: false,
};

export const defaultPhase2 = {
  rightToWork: false,
  shareCode: false,
  dbs: false,
  onboardingComplete: false,
};

export const defaultApprovals = {
  phase0: false,
  phase1: false,
  phase2: false,
};

export const defaultOnboarding = {
  currentPhase: 0,
  phase0: defaultPhase0,
  phase1: defaultPhase1,
  phase2: defaultPhase2,
  approvals: defaultApprovals,
};
