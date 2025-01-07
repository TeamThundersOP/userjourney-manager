import { useUserAuth } from "@/contexts/UserAuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LoadingState } from "@/components/user/dashboard/LoadingState";
import { toast } from "sonner";
import { calculateProgress } from "@/utils/onboarding";
import { User } from "@/types/user";
import OnboardingPhases from "@/components/user/dashboard/OnboardingPhases";
import { transformUserData } from "@/utils/userTransform";

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

      // Transform the data using our utility function
      return transformUserData(data);
    },
    enabled: !!userId
  });

  if (isLoading || !user) {
    return <LoadingState />;
  }

  const progress = calculateProgress(user, user.onboarding?.currentPhase || 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-none shadow-lg bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome back, {user.name}!
          </CardTitle>
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-none shadow-lg bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Current Phase</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              Phase {user.onboarding?.currentPhase || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold capitalize text-primary">
              {user.status || 'Pending'}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-white/50 backdrop-blur-sm md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {user.onboarding?.phase0?.documentsUploaded ? 'Complete' : 'Pending'}
            </div>
          </CardContent>
        </Card>
      </div>

      <OnboardingPhases user={user} />
    </div>
  );
};

export default Dashboard;