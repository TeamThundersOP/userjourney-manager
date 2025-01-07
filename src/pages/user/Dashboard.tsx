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
import { useUser } from "@/hooks/use-user";

const Dashboard = () => {
  const { user, isLoading } = useUser();

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