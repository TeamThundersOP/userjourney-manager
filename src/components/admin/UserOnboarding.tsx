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

  // Initialize onboarding with default values if it doesn't exist
  const defaultOnboarding = {
    currentPhase: 0,
    phase0: {
      cvSubmitted: false,
      interviewCompleted: false,
      offerLetterSent: false,
      cosSent: false,
      rightToWorkSent: false,
      documentsUploaded: false,
      visaStatus: 'pending' as const,
    },
    phase1: {
      hmrcChecklist: false,
      companyAgreements: false,
      pensionScheme: false,
      bankStatements: false,
      vaccinationProof: false,
    },
    phase2: {
      rightToWork: false,
      shareCode: false,
      dbs: false,
      onboardingComplete: false,
    },
    approvals: {
      phase0: false,
      phase1: false,
      phase2: false,
    },
  };

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

  // Ensure all required properties exist by merging with default values
  const onboarding = {
    ...defaultOnboarding,
    ...user.onboarding,
    phase0: { ...defaultOnboarding.phase0, ...user.onboarding.phase0 },
    phase1: { ...defaultOnboarding.phase1, ...user.onboarding.phase1 },
    phase2: { ...defaultOnboarding.phase2, ...user.onboarding.phase2 },
    approvals: { ...defaultOnboarding.approvals, ...user.onboarding.approvals },
  };

  const phase0Progress = calculatePhaseProgress(onboarding.phase0);
  const phase1Progress = calculatePhaseProgress(onboarding.phase1);
  const phase2Progress = calculatePhaseProgress(onboarding.phase2);

  const handleApprovePhase = (phase: number) => {
    const updatedUser = {
      ...user,
      onboarding: {
        ...onboarding,
        approvals: {
          ...onboarding.approvals,
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
    if (phase === 0) {
      return phase0Progress === 100 && !onboarding.approvals.phase0;
    } else if (phase === 1) {
      return phase1Progress === 100 && onboarding.approvals.phase0 && !onboarding.approvals.phase1;
    } else if (phase === 2) {
      return phase2Progress === 100 && onboarding.approvals.phase1 && !onboarding.approvals.phase2;
    }
    return false;
  };

  // ... keep existing code (JSX for rendering the component)

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
            {onboarding.approvals.phase0 ? (
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
            {Object.entries(onboarding.phase0).map(([key, value]) => (
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

        {onboarding.approvals.phase0 && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Phase 1: Documentation</h3>
              {onboarding.approvals.phase1 ? (
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
              {Object.entries(onboarding.phase1).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${value ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {onboarding.approvals.phase1 && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Phase 2: Final Steps</h3>
              {onboarding.approvals.phase2 ? (
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
              {Object.entries(onboarding.phase2).map(([key, value]) => (
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
