import { User, PersonalInfo, OnboardingPhase0, OnboardingPhase1, OnboardingPhase2 } from "@/types/user";
import { Tables } from "@/integrations/supabase/types";

type CandidateRow = Tables<"candidates">;

export const transformUserData = (candidate: CandidateRow): User => {
  if (!candidate) {
    throw new Error('No candidate data provided');
  }

  // Transform personal_info to ensure it matches PersonalInfo type
  const personalInfo = (candidate.personal_info || {}) as PersonalInfo;

  // Define default onboarding structure with correct types
  const defaultOnboarding = {
    currentPhase: 0,
    phase0: {
      personalDetailsCompleted: false,
      cvSubmitted: false,
      interviewCompleted: false,
      jobStatus: 'pending' as const,
      passportUploaded: false,
      pccUploaded: false,
      otherDocumentsUploaded: false,
      offerLetterSent: false,
      cosSent: false,
      documentsUploaded: false,
      visaStatus: 'pending' as const,
      travelDetailsUpdated: false,
      travelDocumentsUploaded: false,
      visaCopyUploaded: false,
      ukContactUpdated: false,
    },
    phase1: {
      hmrcChecklist: false,
      companyAgreements: false,
      pensionScheme: false,
      bankStatements: false,
      vaccinationProof: false,
    },
    phase2: {
      rightToWork: false,
      shareCode: false,
      dbs: false,
      onboardingComplete: false,
    },
    approvals: {
      phase0: false,
      phase1: false,
      phase2: false,
    },
  };

  // Safely merge the database onboarding data with defaults
  const rawOnboarding = candidate.onboarding as Record<string, unknown> || {};
  
  const onboardingData = {
    ...defaultOnboarding,
    currentPhase: (rawOnboarding.currentPhase as number) ?? defaultOnboarding.currentPhase,
    phase0: {
      ...defaultOnboarding.phase0,
      ...(rawOnboarding.phase0 as Partial<OnboardingPhase0> || {}),
    },
    phase1: {
      ...defaultOnboarding.phase1,
      ...(rawOnboarding.phase1 as Partial<OnboardingPhase1> || {}),
    },
    phase2: {
      ...defaultOnboarding.phase2,
      ...(rawOnboarding.phase2 as Partial<OnboardingPhase2> || {}),
    },
    approvals: {
      ...defaultOnboarding.approvals,
      ...(rawOnboarding.approvals as typeof defaultOnboarding.approvals || {}),
    },
  };

  // Transform the data to match our User type
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
    personal_info: personalInfo,
    personalInfo: personalInfo,
    onboarding: onboardingData,
  };
};