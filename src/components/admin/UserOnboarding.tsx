import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PenSquare, Check } from "lucide-react";
import { User } from "@/types/user";
import { calculatePhaseProgress } from "@/utils/onboarding";
import { useState } from "react";
import EditOnboardingDialog from "./EditOnboardingDialog";
import { toast } from "sonner";

interface UserOnboardingProps {
  user: User;
}

const UserOnboarding = ({ user: initialUser }: UserOnboardingProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [user, setUser] = useState(initialUser);

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

  const phase0Progress = calculatePhaseProgress(user.onboarding?.phase0);
  const phase1Progress = calculatePhaseProgress(user.onboarding?.phase1);
  const phase2Progress = calculatePhaseProgress(user.onboarding?.phase2);

  const handleApprovePhase = (phase: number) => {
    if (!user.onboarding) return;

    const updatedUser = {
      ...user,
      onboarding: {
        ...user.onboarding,
        approvals: {
          ...user.onboarding.approvals,
          [`phase${phase}`]: true
        },
        currentPhase: phase + 1
      }
    };
    setUser(updatedUser);
    
    // Update localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: User) => 
      u.id === updatedUser.id ? updatedUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    toast.success(`Phase ${phase} approved successfully`);
  };

  const handleSaveOnboarding = (updatedUser: User) => {
    setUser(updatedUser);
    // Update localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: User) => 
      u.id === updatedUser.id ? updatedUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const canApprovePhase = (phase: number): boolean => {
    if (!user.onboarding?.approvals) return false;

    if (phase === 0) {
      return phase0Progress === 100 && !user.onboarding.approvals.phase0;
    } else if (phase === 1) {
      return phase1Progress === 100 && user.onboarding.approvals.phase0 && !user.onboarding.approvals.phase1;
    } else if (phase === 2) {
      return phase2Progress === 100 && user.onboarding.approvals.phase1 && !user.onboarding.approvals.phase2;
    }
    return false;
  };

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
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Phase 0: Initial Setup</h3>
            {user.onboarding?.approvals.phase0 ? (
              <Badge variant="default" className="flex items-center gap-1">
                <Check className="h-3 w-3" />
                Approved
              </Badge>
            ) : canApprovePhase(0) ? (
              <Button 
                size="sm" 
                onClick={() => handleApprovePhase(0)}
                className="flex items-center gap-1"
              >
                <Check className="h-4 w-4" />
                Approve Phase
              </Button>
            ) : null}
          </div>
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

        {user.onboarding?.approvals.phase0 && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Phase 1: Documentation</h3>
              {user.onboarding?.approvals.phase1 ? (
                <Badge variant="default" className="flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  Approved
                </Badge>
              ) : canApprovePhase(1) ? (
                <Button 
                  size="sm" 
                  onClick={() => handleApprovePhase(1)}
                  className="flex items-center gap-1"
                >
                  <Check className="h-4 w-4" />
                  Approve Phase
                </Button>
              ) : null}
            </div>
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

        {user.onboarding?.approvals.phase1 && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Phase 2: Final Steps</h3>
              {user.onboarding?.approvals.phase2 ? (
                <Badge variant="default" className="flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  Approved
                </Badge>
              ) : canApprovePhase(2) ? (
                <Button 
                  size="sm" 
                  onClick={() => handleApprovePhase(2)}
                  className="flex items-center gap-1"
                >
                  <Check className="h-4 w-4" />
                  Approve Phase
                </Button>
              ) : null}
            </div>
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