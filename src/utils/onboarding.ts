import { User } from "@/types/user";

export const calculateProgress = (user: User, phase: number): number => {
  if (!user.onboarding) return 0;

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
    'rightToWorkSent',
    'onboardingComplete'
  ];

  let fields: string[];
  let phaseData: any;

  switch (phase) {
    case 0:
      fields = phase0Fields;
      phaseData = user.onboarding.phase0;
      break;
    case 1:
      fields = phase1Fields;
      phaseData = user.onboarding.phase1;
      break;
    case 2:
      fields = phase2Fields;
      phaseData = user.onboarding.phase2;
      break;
    default:
      return 0;
  }

  const completedFields = fields.filter(field => phaseData[field] === true).length;
  return (completedFields / fields.length) * 100;
};