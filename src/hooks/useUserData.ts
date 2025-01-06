import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/user";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
          const personalInfo = candidate.personal_info as User['personal_info'];
          const rawOnboarding = candidate.onboarding as any;
          
          const onboarding = {
            currentPhase: rawOnboarding?.currentPhase ?? 0,
            phase0: {
              personalDetailsCompleted: rawOnboarding?.phase0?.personalDetailsCompleted ?? false,
              cvSubmitted: rawOnboarding?.phase0?.cvSubmitted ?? false,
              interviewCompleted: rawOnboarding?.phase0?.interviewCompleted ?? false,
              jobStatus: rawOnboarding?.phase0?.jobStatus ?? 'pending',
              passportUploaded: rawOnboarding?.phase0?.passportUploaded ?? false,
              pccUploaded: rawOnboarding?.phase0?.pccUploaded ?? false,
              otherDocumentsUploaded: rawOnboarding?.phase0?.otherDocumentsUploaded ?? false,
              offerLetterSent: rawOnboarding?.phase0?.offerLetterSent ?? false,
              cosSent: rawOnboarding?.phase0?.cosSent ?? false,
              documentsUploaded: rawOnboarding?.phase0?.documentsUploaded ?? false,
              visaStatus: rawOnboarding?.phase0?.visaStatus ?? 'pending',
              travelDetailsUpdated: rawOnboarding?.phase0?.travelDetailsUpdated ?? false,
              travelDocumentsUploaded: rawOnboarding?.phase0?.travelDocumentsUploaded ?? false,
              visaCopyUploaded: rawOnboarding?.phase0?.visaCopyUploaded ?? false,
              ukContactUpdated: rawOnboarding?.phase0?.ukContactUpdated ?? false,
              ukContactNumber: rawOnboarding?.phase0?.ukContactNumber ?? '',
              ukAddress: rawOnboarding?.phase0?.ukAddress ?? '',
              feedback: rawOnboarding?.phase0?.feedback ?? '',
            },
            phase1: {
              hmrcChecklist: rawOnboarding?.phase1?.hmrcChecklist ?? false,
              companyAgreements: rawOnboarding?.phase1?.companyAgreements ?? false,
              pensionScheme: rawOnboarding?.phase1?.pensionScheme ?? false,
              bankStatements: rawOnboarding?.phase1?.bankStatements ?? false,
              vaccinationProof: rawOnboarding?.phase1?.vaccinationProof ?? false,
              feedback: rawOnboarding?.phase1?.feedback ?? '',
            },
            phase2: {
              rightToWork: rawOnboarding?.phase2?.rightToWork ?? false,
              shareCode: rawOnboarding?.phase2?.shareCode ?? false,
              dbs: rawOnboarding?.phase2?.dbs ?? false,
              onboardingComplete: rawOnboarding?.phase2?.onboardingComplete ?? false,
              feedback: rawOnboarding?.phase2?.feedback ?? '',
            },
            approvals: {
              phase0: rawOnboarding?.approvals?.phase0 ?? false,
              phase1: rawOnboarding?.approvals?.phase1 ?? false,
              phase2: rawOnboarding?.approvals?.phase2 ?? false,
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
            onboarding: onboarding,
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