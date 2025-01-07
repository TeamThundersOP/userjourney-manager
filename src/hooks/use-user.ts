import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setIsLoading(false);
          navigate('/user/login');
          return;
        }

        const { data: candidate, error } = await supabase
          .from('candidates')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching user:', error);
          setIsLoading(false);
          return;
        }

        if (candidate) {
          const onboardingData = candidate.onboarding as {
            currentPhase: number;
            phase0: Record<string, boolean | string>;
            phase1: Record<string, boolean | string>;
            phase2: Record<string, boolean | string>;
            approvals: {
              phase0: boolean;
              phase1: boolean;
              phase2: boolean;
            };
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
            personal_info: candidate.personal_info as any,
            personalInfo: candidate.personal_info as any,
            onboarding: {
              currentPhase: onboardingData?.currentPhase || 0,
              phase0: onboardingData?.phase0 as any,
              phase1: onboardingData?.phase1 as any,
              phase2: onboardingData?.phase2 as any,
              approvals: onboardingData?.approvals || {
                phase0: false,
                phase1: false,
                phase2: false
              }
            }
          };

          setUser(userData);
        }
      } catch (error) {
        console.error('Error in fetchUser:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
        navigate('/user/login');
      } else if (event === 'SIGNED_IN' && session) {
        const { data: candidate } = await supabase
          .from('candidates')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (candidate) {
          const onboardingData = candidate.onboarding as {
            currentPhase: number;
            phase0: Record<string, boolean | string>;
            phase1: Record<string, boolean | string>;
            phase2: Record<string, boolean | string>;
            approvals: {
              phase0: boolean;
              phase1: boolean;
              phase2: boolean;
            };
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
            personal_info: candidate.personal_info as any,
            personalInfo: candidate.personal_info as any,
            onboarding: {
              currentPhase: onboardingData?.currentPhase || 0,
              phase0: onboardingData?.phase0 as any,
              phase1: onboardingData?.phase1 as any,
              phase2: onboardingData?.phase2 as any,
              approvals: onboardingData?.approvals || {
                phase0: false,
                phase1: false,
                phase2: false
              }
            }
          };
          setUser(userData);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return { user, isLoading };
};