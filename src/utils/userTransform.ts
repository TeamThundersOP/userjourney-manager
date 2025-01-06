import { User, PersonalInfo, OnboardingPhase0, OnboardingPhase1, OnboardingPhase2 } from "@/types/user";
import { Tables } from "@/integrations/supabase/types";

export const transformUserData = (candidate: Tables<'candidates'>): User => {
  // Transform personal_info
  const personalInfo = candidate.personal_info as Record<string, unknown>;
  const transformedPersonalInfo: PersonalInfo = {
    familyName: String(personalInfo?.familyName || ''),
    givenName: String(personalInfo?.givenName || ''),
    otherNames: String(personalInfo?.otherNames || ''),
    fullName: String(personalInfo?.fullName || ''),
    nationality: String(personalInfo?.nationality || ''),
    placeOfBirth: String(personalInfo?.placeOfBirth || ''),
    dateOfBirth: String(personalInfo?.dateOfBirth || ''),
    gender: String(personalInfo?.gender || ''),
    countryOfResidence: String(personalInfo?.countryOfResidence || ''),
    passportNumber: String(personalInfo?.passportNumber || ''),
    passportIssueDate: String(personalInfo?.passportIssueDate || ''),
    passportExpiryDate: String(personalInfo?.passportExpiryDate || ''),
    passportPlaceOfIssue: String(personalInfo?.passportPlaceOfIssue || ''),
    address: String(personalInfo?.address || ''),
    city: String(personalInfo?.city || ''),
    postalCode: String(personalInfo?.postalCode || ''),
    country: String(personalInfo?.country || ''),
    phone: String(personalInfo?.phone || ''),
  };

  // Transform onboarding data with proper type checking
  const rawOnboarding = candidate.onboarding as Record<string, any> | null;
  const transformedOnboarding = rawOnboarding ? {
    currentPhase: Number(rawOnboarding.currentPhase || 0),
    phase0: {
      personalDetailsCompleted: Boolean(rawOnboarding.phase0?.personalDetailsCompleted || false),
      cvSubmitted: Boolean(rawOnboarding.phase0?.cvSubmitted || false),
      interviewCompleted: Boolean(rawOnboarding.phase0?.interviewCompleted || false),
      jobStatus: (rawOnboarding.phase0?.jobStatus || 'pending') as 'pending' | 'accepted' | 'rejected',
      passportUploaded: Boolean(rawOnboarding.phase0?.passportUploaded || false),
      pccUploaded: Boolean(rawOnboarding.phase0?.pccUploaded || false),
      otherDocumentsUploaded: Boolean(rawOnboarding.phase0?.otherDocumentsUploaded || false),
      offerLetterSent: Boolean(rawOnboarding.phase0?.offerLetterSent || false),
      cosSent: Boolean(rawOnboarding.phase0?.cosSent || false),
      documentsUploaded: Boolean(rawOnboarding.phase0?.documentsUploaded || false),
      visaStatus: (rawOnboarding.phase0?.visaStatus || 'pending') as 'pending' | 'approved' | 'rejected',
      travelDetailsUpdated: Boolean(rawOnboarding.phase0?.travelDetailsUpdated || false),
      travelDocumentsUploaded: Boolean(rawOnboarding.phase0?.travelDocumentsUploaded || false),
      visaCopyUploaded: Boolean(rawOnboarding.phase0?.visaCopyUploaded || false),
      ukContactUpdated: Boolean(rawOnboarding.phase0?.ukContactUpdated || false),
      ukContactNumber: rawOnboarding.phase0?.ukContactNumber || '',
      ukAddress: rawOnboarding.phase0?.ukAddress || '',
      feedback: rawOnboarding.phase0?.feedback || '',
    } as OnboardingPhase0,
    phase1: {
      hmrcChecklist: Boolean(rawOnboarding.phase1?.hmrcChecklist || false),
      companyAgreements: Boolean(rawOnboarding.phase1?.companyAgreements || false),
      pensionScheme: Boolean(rawOnboarding.phase1?.pensionScheme || false),
      bankStatements: Boolean(rawOnboarding.phase1?.bankStatements || false),
      vaccinationProof: Boolean(rawOnboarding.phase1?.vaccinationProof || false),
      feedback: rawOnboarding.phase1?.feedback || '',
    } as OnboardingPhase1,
    phase2: {
      rightToWork: Boolean(rawOnboarding.phase2?.rightToWork || false),
      shareCode: Boolean(rawOnboarding.phase2?.shareCode || false),
      dbs: Boolean(rawOnboarding.phase2?.dbs || false),
      onboardingComplete: Boolean(rawOnboarding.phase2?.onboardingComplete || false),
      feedback: rawOnboarding.phase2?.feedback || '',
    } as OnboardingPhase2,
    approvals: {
      phase0: Boolean(rawOnboarding.approvals?.phase0 || false),
      phase1: Boolean(rawOnboarding.approvals?.phase1 || false),
      phase2: Boolean(rawOnboarding.approvals?.phase2 || false),
    }
  } : undefined;

  return {
    id: candidate.id,
    name: candidate.name,
    username: candidate.username,
    email: candidate.email || '',
    status: candidate.status || 'pending',
    created_at: candidate.created_at,
    cv_submitted: candidate.cv_submitted,
    interview_status: candidate.interview_status,
    offer_letter_sent: candidate.offer_letter_sent,
    cos_sent: candidate.cos_sent,
    right_to_work: candidate.right_to_work,
    onboarding_complete: candidate.onboarding_complete,
    has_reset_password: candidate.has_reset_password,
    personal_info: transformedPersonalInfo,
    personalInfo: transformedPersonalInfo,
    onboarding: transformedOnboarding,
  };
};