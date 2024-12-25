import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { User } from "@/types/user";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = users.find((u: User) => u.id.toString() === userId);
    setUser(currentUser);
  }, []);

  const calculateProgress = () => {
    if (!user?.onboarding) return 0;
    const { phase0, phase1, phase2 } = user.onboarding;
    const totalSteps = Object.keys(phase0).length + Object.keys(phase1).length + Object.keys(phase2).length - 1; // -1 for visaStatus
    const completedSteps = Object.values(phase0).filter(v => v === true).length +
                          Object.values(phase1).filter(v => v === true).length +
                          Object.values(phase2).filter(v => v === true).length;
    return (completedSteps / totalSteps) * 100;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome Back!</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Onboarding Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={calculateProgress()} className="w-full" />
            <p className="text-sm text-muted-foreground">
              {calculateProgress().toFixed(0)}% Complete
            </p>
          </div>
        </CardContent>
      </Card>

      {user?.onboarding && (
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Phase 0</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(user.onboarding.phase0)
                .filter(([key]) => key !== 'visaStatus')
                .map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className={`text-sm ${value ? 'text-green-600' : 'text-red-600'}`}>
                      {value ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phase 1</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(user.onboarding.phase1).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className={`text-sm ${value ? 'text-green-600' : 'text-red-600'}`}>
                    {value ? 'Completed' : 'Pending'}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phase 2</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(user.onboarding.phase2).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className={`text-sm ${value ? 'text-green-600' : 'text-red-600'}`}>
                    {value ? 'Completed' : 'Pending'}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;