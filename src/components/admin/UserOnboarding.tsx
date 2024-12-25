import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import { User } from "@/types/user";
import { calculatePhaseProgress } from "@/utils/onboarding";
import { useState } from "react";
import EditOnboardingDialog from "./EditOnboardingDialog";

interface UserOnboardingProps {
  user: User;
}

const UserOnboarding = ({ user: initialUser }: UserOnboardingProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [user, setUser] = useState(initialUser);

  if (!user.onboarding) return null;

  const phase0Progress = calculatePhaseProgress(user.onboarding.phase0);
  const phase1Progress = calculatePhaseProgress(user.onboarding.phase1);
  const phase2Progress = calculatePhaseProgress(user.onboarding.phase2);

  const handleSaveOnboarding = (updatedUser: User) => {
    setUser(updatedUser);
    // Update localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: User) => 
      u.id === updatedUser.id ? updatedUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  // Check if phase is complete (100% progress)
  const isPhase0Complete = phase0Progress === 100;
  const isPhase1Complete = phase1Progress === 100;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Onboarding Progress</CardTitle>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsEditDialogOpen(true)}
        >
          <PenSquare className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Phase 0: Initial Setup</h3>
          <Progress value={phase0Progress} className="mb-2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {Object.entries(user.onboarding.phase0).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  key === 'visaStatus' 
                    ? value === 'approved' 
                      ? 'bg-green-500' 
                      : value === 'rejected'
                      ? 'bg-red-500'
                      : 'bg-yellow-500'
                    : value 
                    ? 'bg-green-500' 
                    : 'bg-gray-300'
                }`} />
                <span className="text-sm capitalize">
                  {key === 'visaStatus' 
                    ? `Visa Status: ${value}` 
                    : key.replace(/([A-Z])/g, ' $1')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {isPhase0Complete && (
          <div>
            <h3 className="font-semibold mb-2">Phase 1: Documentation</h3>
            <Progress value={phase1Progress} className="mb-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(user.onboarding.phase1).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${value ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {isPhase0Complete && isPhase1Complete && (
          <div>
            <h3 className="font-semibold mb-2">Phase 2: Final Steps</h3>
            <Progress value={phase2Progress} className="mb-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(user.onboarding.phase2).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${value ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <EditOnboardingDialog
        user={user}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSaveOnboarding}
      />
    </Card>
  );
};

export default UserOnboarding;