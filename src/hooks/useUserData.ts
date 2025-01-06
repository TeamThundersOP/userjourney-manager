import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, PersonalInfo } from "@/types/user";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface OnboardingData {
  currentPhase: number;
  phase0: {
    personalDetailsCompleted: boolean;
    cvSubmitted: boolean;
    interviewCompleted: boolean;
    jobStatus: string;
    passportUploaded: boolean;
    pccUploaded: boolean;
    otherDocumentsUploaded: boolean;
    offerLetterSent: boolean;
    cosSent: boolean;
    documentsUploaded: boolean;
    visaStatus: string;
    travelDetailsUpdated: boolean;
    travelDocumentsUploaded: boolean;
    visaCopyUploaded: boolean;
    ukContactUpdated: boolean;
    ukContactNumber?: string;
    ukAddress?: string;
    feedback?: string;
  };
  phase1: {
    hmrcChecklist: boolean;
    companyAgreements: boolean;
    pensionScheme: boolean;
    bankStatements: boolean;
    vaccinationProof: boolean;
    feedback?: string;
  };
  phase2: {
    rightToWork: boolean;
    shareCode: boolean;
    dbs: boolean;
    onboardingComplete: boolean;
    feedback?: string;
  };
  approvals: {
    phase0: boolean;
    phase1: boolean;
    phase2: boolean;
  };
}

export const useUserData = (userId: string | null) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        navigate('/user/login');
        return;
      }

      try {
        const { data: candidate, error } = await supabase
          .from('candidates')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) {
          console.error('Error fetching user:', error);
          toast("Failed to fetch user data");
          return;
        }

        if (candidate) {
          const personalInfo = candidate.personal_info as PersonalInfo;
          const onboarding = candidate.onboarding as OnboardingData;
          
          const userData: User = {
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
            onboarding: {
              currentPhase: onboarding?.currentPhase ?? 0,
              phase0: {
                personalDetailsCompleted: onboarding?.phase0?.personalDetailsCompleted ?? false,
                cvSubmitted: onboarding?.phase0?.cvSubmitted ?? false,
                interviewCompleted: onboarding?.phase0?.interviewCompleted ?? false,
                jobStatus: onboarding?.phase0?.jobStatus ?? 'pending',
                passportUploaded: onboarding?.phase0?.passportUploaded ?? false,
                pccUploaded: onboarding?.phase0?.pccUploaded ?? false,
                otherDocumentsUploaded: onboarding?.phase0?.otherDocumentsUploaded ?? false,
                offerLetterSent: onboarding?.phase0?.offerLetterSent ?? false,
                cosSent: onboarding?.phase0?.cosSent ?? false,
                documentsUploaded: onboarding?.phase0?.documentsUploaded ?? false,
                visaStatus: onboarding?.phase0?.visaStatus ?? 'pending',
                travelDetailsUpdated: onboarding?.phase0?.travelDetailsUpdated ?? false,
                travelDocumentsUploaded: onboarding?.phase0?.travelDocumentsUploaded ?? false,
                visaCopyUploaded: onboarding?.phase0?.visaCopyUploaded ?? false,
                ukContactUpdated: onboarding?.phase0?.ukContactUpdated ?? false,
                ukContactNumber: onboarding?.phase0?.ukContactNumber ?? '',
                ukAddress: onboarding?.phase0?.ukAddress ?? '',
                feedback: onboarding?.phase0?.feedback ?? '',
              },
              phase1: {
                hmrcChecklist: onboarding?.phase1?.hmrcChecklist ?? false,
                companyAgreements: onboarding?.phase1?.companyAgreements ?? false,
                pensionScheme: onboarding?.phase1?.pensionScheme ?? false,
                bankStatements: onboarding?.phase1?.bankStatements ?? false,
                vaccinationProof: onboarding?.phase1?.vaccinationProof ?? false,
                feedback: onboarding?.phase1?.feedback ?? '',
              },
              phase2: {
                rightToWork: onboarding?.phase2?.rightToWork ?? false,
                shareCode: onboarding?.phase2?.shareCode ?? false,
                dbs: onboarding?.phase2?.dbs ?? false,
                onboardingComplete: onboarding?.phase2?.onboardingComplete ?? false,
                feedback: onboarding?.phase2?.feedback ?? '',
              },
              approvals: {
                phase0: onboarding?.approvals?.phase0 ?? false,
                phase1: onboarding?.approvals?.phase1 ?? false,
                phase2: onboarding?.approvals?.phase2 ?? false,
              },
            },
          };

          setUser(userData);
        }
      } catch (error) {
        console.error('Error in fetchUser:', error);
        toast("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId, navigate]);

  return { user, isLoading };
};