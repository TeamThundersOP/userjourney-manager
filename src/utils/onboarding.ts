import { OnboardingPhase0, OnboardingPhase1, OnboardingPhase2 } from "@/types/user";

export const calculatePhaseProgress = (phase: OnboardingPhase0 | OnboardingPhase1 | OnboardingPhase2): number => {
  if (!phase) return 0;

  // Define fields to track for each phase
  const phase0Fields = [
    'personalDetailsCompleted',
    'cvSubmitted',
    'interviewCompleted',
    'passportUploaded',
    'pccUploaded',
    'otherDocumentsUploaded',
    'offerLetterSent',
    'cosSent',
    'rightToWorkSent',
    'documentsUploaded',
    'travelDetailsUpdated',
    'travelDocumentsUploaded',
    'visaCopyUploaded',
    'ukContactUpdated'
  ];

  const phase1Fields = [
    'hmrcChecklist',
    'companyAgreements',
    'pensionScheme',
    'bankStatements',
    'vaccinationProof'
  ];

  const phase2Fields = [
    'rightToWork',
    'shareCode',
    'dbs',
    'onboardingComplete'
  ];

  // Determine which phase we're calculating progress for
  let fieldsToCheck: string[] = [];
  
  if ('personalDetailsCompleted' in phase) {
    fieldsToCheck = phase0Fields;
  } else if ('hmrcChecklist' in phase) {
    fieldsToCheck = phase1Fields;
  } else if ('rightToWork' in phase) {
    fieldsToCheck = phase2Fields;
  }

  // Count completed fields
  const completedFields = fieldsToCheck.reduce((count, field) => {
    const value = phase[field as keyof typeof phase];
    // Only count if the value is explicitly true
    return count + (value === true ? 1 : 0);
  }, 0);

  // Calculate percentage
  return Math.round((completedFields / fieldsToCheck.length) * 100);
};