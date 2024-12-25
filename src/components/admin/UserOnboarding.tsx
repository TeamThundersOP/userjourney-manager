import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import { User } from "@/types/user";
import { calculatePhaseProgress } from "@/utils/onboarding";
import { useState } from "react";
import EditOnboardingDialog from "./EditOnboardingDialog";
import { toast } from "sonner";
import PhaseHeader from "./onboarding/PhaseHeader";
import PhaseProgress from "./onboarding/PhaseProgress";

interface UserOnboardingProps {
  user: User;
}

const UserOnboarding = ({ user: initialUser }: UserOnboardingProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [user, setUser] = useState(initialUser);

  if (!user.onboarding) {
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

  const phase0Progress = calculatePhaseProgress(user.onboarding.phase0);
  const phase1Progress = calculatePhaseProgress(user.onboarding.phase1);
  const phase2Progress = calculatePhaseProgress(user.onboarding.phase2);

  const handleApprovePhase = (phase: number) => {
    const updatedUser = {
      ...user,
      onboarding: {
        ...user.onboarding!,
        approvals: {
          ...user.onboarding!.approvals,
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

  const canApprovePhase = (phase: number) => {
    if (phase === 0) {
      return phase0Progress === 100 && !user.onboarding?.approvals.phase0;
    } else if (phase === 1) {
      return phase1Progress === 100 && user.onboarding?.approvals.phase0 && !user.onboarding?.approvals.phase1;
    } else if (phase === 2) {
      return phase2Progress === 100 && user.onboarding?.approvals.phase1 && !user.onboarding?.approvals.phase2;
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
          <PhaseHeader
            title="Phase 0: Initial Setup"
            isApproved={user.onboarding.approvals.phase0}
            canApprove={canApprovePhase(0)}
            onApprove={() => handleApprovePhase(0)}
          />
          <PhaseProgress
            progress={phase0Progress}
            items={Object.entries(user.onboarding.phase0).map(([key, value]) => ({ key, value }))}
          />
        </div>

        {user.onboarding?.approvals.phase0 && (
          <div>
            <PhaseHeader
              title="Phase 1: Documentation"
              isApproved={user.onboarding.approvals.phase1}
              canApprove={canApprovePhase(1)}
              onApprove={() => handleApprovePhase(1)}
            />
            <PhaseProgress
              progress={phase1Progress}
              items={Object.entries(user.onboarding.phase1).map(([key, value]) => ({ key, value }))}
            />
          </div>
        )}

        {user.onboarding?.approvals.phase1 && (
          <div>
            <PhaseHeader
              title="Phase 2: Final Steps"
              isApproved={user.onboarding.approvals.phase2}
              canApprove={canApprovePhase(2)}
              onApprove={() => handleApprovePhase(2)}
            />
            <PhaseProgress
              progress={phase2Progress}
              items={Object.entries(user.onboarding.phase2).map(([key, value]) => ({ key, value }))}
            />
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