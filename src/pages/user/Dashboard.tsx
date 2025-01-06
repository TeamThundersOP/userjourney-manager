import { useUserAuth } from "@/contexts/UserAuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LoadingState } from "@/components/user/dashboard/LoadingState";
import { toast } from "sonner";
import { calculateProgress } from "@/utils/onboarding";
import { User, PersonalInfo, OnboardingPhase0, OnboardingPhase1, OnboardingPhase2 } from "@/types/user";
import OnboardingPhases from "@/components/user/dashboard/OnboardingPhases";

const Dashboard = () => {
  const { userId } = useUserAuth();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user data:', error);
        toast.error("Error fetching user data");
        throw error;
      }

      if (!data) return null;

      // Transform the data to match the User type
      const personalInfo = data.personal_info as PersonalInfo;
      const onboardingData = data.onboarding as {
        currentPhase: number;
        phase0: OnboardingPhase0;
        phase1: OnboardingPhase1;
        phase2: OnboardingPhase2;
        approvals: {
          phase0: boolean;
          phase1: boolean;
          phase2: boolean;
        };
      };

      const userData: User = {
        id: data.id,
        name: data.name,
        username: data.username,
        email: data.email || '',
        status: data.status || 'pending',
        created_at: data.created_at,
        cv_submitted: data.cv_submitted,
        interview_status: data.interview_status,
        offer_letter_sent: data.offer_letter_sent,
        cos_sent: data.cos_sent,
        right_to_work: data.right_to_work,
        onboarding_complete: data.onboarding_complete,
        has_reset_password: data.has_reset_password,
        personal_info: personalInfo,
        personalInfo: personalInfo,
        onboarding: onboardingData,
      };

      return userData;
    },
    enabled: !!userId,
    retry: 1
  });

  if (isLoading || !user) {
    return <LoadingState />;
  }

  const progress = calculateProgress(user, user.onboarding?.currentPhase || 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome back, {user.name}!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-gray-500">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <OnboardingPhases user={user} />
    </div>
  );
};

export default Dashboard;