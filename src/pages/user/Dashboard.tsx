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
      
      // Safely type the onboarding data with proper type assertions
      const rawOnboarding = data.onboarding as Record<string, unknown>;
      const onboardingData = {
        currentPhase: (rawOnboarding?.currentPhase as number) ?? 0,
        phase0: (rawOnboarding?.phase0 as OnboardingPhase0) ?? {
          personalDetailsCompleted: false,
          cvSubmitted: false,
          interviewCompleted: false,
          jobStatus: 'pending',
          passportUploaded: false,
          pccUploaded: false,
          otherDocumentsUploaded: false,
          offerLetterSent: false,
          cosSent: false,
          documentsUploaded: false,
          visaStatus: 'pending',
          travelDetailsUpdated: false,
          travelDocumentsUploaded: false,
          visaCopyUploaded: false,
          ukContactUpdated: false,
        },
        phase1: (rawOnboarding?.phase1 as OnboardingPhase1) ?? {
          hmrcChecklist: false,
          companyAgreements: false,
          pensionScheme: false,
          bankStatements: false,
          vaccinationProof: false,
        },
        phase2: (rawOnboarding?.phase2 as OnboardingPhase2) ?? {
          rightToWork: false,
          shareCode: false,
          dbs: false,
          onboardingComplete: false,
        },
        approvals: {
          phase0: (rawOnboarding?.approvals as any)?.phase0 ?? false,
          phase1: (rawOnboarding?.approvals as any)?.phase1 ?? false,
          phase2: (rawOnboarding?.approvals as any)?.phase2 ?? false,
        },
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