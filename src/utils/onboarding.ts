import { User } from "@/types/user";

export const calculateProgress = (userData: User | null, phase: number) => {
  if (!userData?.onboarding) return 0;

  const phase0Fields = [
    'personalDetailsCompleted',
    'cvSubmitted',
    'interviewCompleted',
    'passportUploaded',
    'pccUploaded',
    'otherDocumentsUploaded',
    'offerLetterSent',
    'cosSent',
    'travelDocumentsUploaded',
    'visaCopyUploaded',
    'ukContactUpdated',
    'rightToWorkSent',
    'onboardingComplete'
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
    'dbs'
  ];

  // Determine which phase we're calculating progress for
  const fields = phase === 0 ? phase0Fields :
                phase === 1 ? phase1Fields :
                phase2Fields;

  // Count completed items (true values)
  const completedItems = fields.filter(field => {
    const value = phase === 0 ? userData.onboarding?.phase0[field as keyof typeof userData.onboarding.phase0] :
                  phase === 1 ? userData.onboarding?.phase1[field as keyof typeof userData.onboarding.phase1] :
                  userData.onboarding?.phase2[field as keyof typeof userData.onboarding.phase2];
    return value === true;
  }).length;

  // Calculate percentage
  return (completedItems / fields.length) * 100;
};