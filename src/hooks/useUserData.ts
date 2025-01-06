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
    jobStatus: 'pending' | 'accepted' | 'rejected';
    passportUploaded: boolean;
    pccUploaded: boolean;
    otherDocumentsUploaded: boolean;
    offerLetterSent: boolean;
    cosSent: boolean;
    documentsUploaded: boolean;
    visaStatus: 'pending' | 'approved' | 'rejected';
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
          const rawOnboarding = candidate.onboarding as Record<string, unknown>;
          
          // Create a properly typed onboarding object with default values
          const onboarding: OnboardingData = {
            currentPhase: (rawOnboarding?.currentPhase as number) ?? 0,
            phase0: {
              personalDetailsCompleted: (rawOnboarding?.phase0 as any)?.personalDetailsCompleted ?? false,
              cvSubmitted: (rawOnboarding?.phase0 as any)?.cvSubmitted ?? false,
              interviewCompleted: (rawOnboarding?.phase0 as any)?.interviewCompleted ?? false,
              jobStatus: ((rawOnboarding?.phase0 as any)?.jobStatus as 'pending' | 'accepted' | 'rejected') ?? 'pending',
              passportUploaded: (rawOnboarding?.phase0 as any)?.passportUploaded ?? false,
              pccUploaded: (rawOnboarding?.phase0 as any)?.pccUploaded ?? false,
              otherDocumentsUploaded: (rawOnboarding?.phase0 as any)?.otherDocumentsUploaded ?? false,
              offerLetterSent: (rawOnboarding?.phase0 as any)?.offerLetterSent ?? false,
              cosSent: (rawOnboarding?.phase0 as any)?.cosSent ?? false,
              documentsUploaded: (rawOnboarding?.phase0 as any)?.documentsUploaded ?? false,
              visaStatus: ((rawOnboarding?.phase0 as any)?.visaStatus as 'pending' | 'approved' | 'rejected') ?? 'pending',
              travelDetailsUpdated: (rawOnboarding?.phase0 as any)?.travelDetailsUpdated ?? false,
              travelDocumentsUploaded: (rawOnboarding?.phase0 as any)?.travelDocumentsUploaded ?? false,
              visaCopyUploaded: (rawOnboarding?.phase0 as any)?.visaCopyUploaded ?? false,
              ukContactUpdated: (rawOnboarding?.phase0 as any)?.ukContactUpdated ?? false,
              ukContactNumber: (rawOnboarding?.phase0 as any)?.ukContactNumber ?? '',
              ukAddress: (rawOnboarding?.phase0 as any)?.ukAddress ?? '',
              feedback: (rawOnboarding?.phase0 as any)?.feedback ?? '',
            },
            phase1: {
              hmrcChecklist: (rawOnboarding?.phase1 as any)?.hmrcChecklist ?? false,
              companyAgreements: (rawOnboarding?.phase1 as any)?.companyAgreements ?? false,
              pensionScheme: (rawOnboarding?.phase1 as any)?.pensionScheme ?? false,
              bankStatements: (rawOnboarding?.phase1 as any)?.bankStatements ?? false,
              vaccinationProof: (rawOnboarding?.phase1 as any)?.vaccinationProof ?? false,
              feedback: (rawOnboarding?.phase1 as any)?.feedback ?? '',
            },
            phase2: {
              rightToWork: (rawOnboarding?.phase2 as any)?.rightToWork ?? false,
              shareCode: (rawOnboarding?.phase2 as any)?.shareCode ?? false,
              dbs: (rawOnboarding?.phase2 as any)?.dbs ?? false,
              onboardingComplete: (rawOnboarding?.phase2 as any)?.onboardingComplete ?? false,
              feedback: (rawOnboarding?.phase2 as any)?.feedback ?? '',
            },
            approvals: {
              phase0: (rawOnboarding?.approvals as any)?.phase0 ?? false,
              phase1: (rawOnboarding?.approvals as any)?.phase1 ?? false,
              phase2: (rawOnboarding?.approvals as any)?.phase2 ?? false,
            },
          };
          
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
            onboarding,
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