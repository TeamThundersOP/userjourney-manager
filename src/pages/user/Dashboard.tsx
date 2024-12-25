import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { User, Phase0, Phase1, Phase2 } from "@/types/user";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = users.find((u: User) => u.email === userEmail);
    setUser(currentUser);
  }, [userEmail]);

  if (!user?.onboarding) {
    return (
      <Card>
        <CardContent className="py-6">
          <div className="text-center text-gray-500">
            No onboarding information available
          </div>
        </CardContent>
      </Card>
    );
  }

  const calculateProgress = (phase: Phase0 | Phase1 | Phase2): number => {
    const entries = Object.entries(phase);
    const total = entries.length;
    const completed = entries.filter(([_, value]) => {
      if (typeof value === 'boolean') {
        return value;
      }
      if (typeof value === 'string') {
        return value === 'approved';
      }
      return false;
    }).length;
    
    return (completed / total) * 100;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome Back!</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Onboarding Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">Phase 0: Initial Setup</h3>
              <span className="text-sm text-gray-500">
                {calculateProgress(user.onboarding.phase0)}%
              </span>
            </div>
            <Progress value={calculateProgress(user.onboarding.phase0)} />
          </div>

          {user.onboarding.approvals.phase0 && (
            <div>
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">Phase 1: Documentation</h3>
                <span className="text-sm text-gray-500">
                  {calculateProgress(user.onboarding.phase1)}%
                </span>
              </div>
              <Progress value={calculateProgress(user.onboarding.phase1)} />
            </div>
          )}

          {user.onboarding.approvals.phase1 && (
            <div>
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">Phase 2: Final Steps</h3>
                <span className="text-sm text-gray-500">
                  {calculateProgress(user.onboarding.phase2)}%
                </span>
              </div>
              <Progress value={calculateProgress(user.onboarding.phase2)} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;