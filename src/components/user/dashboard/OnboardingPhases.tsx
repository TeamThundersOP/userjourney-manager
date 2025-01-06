import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
import { User } from "@/types/user";
import { calculateProgress } from "@/utils/onboarding";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface OnboardingPhasesProps {
  user: User;
}

const OnboardingPhases = ({ user }: OnboardingPhasesProps) => {
  const navigate = useNavigate();
  
  if (!user.onboarding) return null;

  const phase0Progress = calculateProgress(user, 0);
  const phase1Progress = calculateProgress(user, 1);
  const phase2Progress = calculateProgress(user, 2);

  const getPhaseStatus = (phase: number) => {
    if (user.onboarding?.approvals[`phase${phase}`]) {
      return "completed";
    }
    if (user.onboarding?.currentPhase === phase) {
      return "current";
    }
    return "pending";
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Your Onboarding Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Phase 0: Initial Setup</h3>
              {getPhaseStatus(0) === "completed" && (
                <Badge variant="default" className="flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  Completed
                </Badge>
              )}
              {getPhaseStatus(0) === "current" && (
                <Badge variant="secondary">Current Phase</Badge>
              )}
            </div>
            {getPhaseStatus(0) === "current" && (
              <Button 
                size="sm" 
                onClick={() => navigate("/user/onboarding")}
                className="flex items-center gap-1"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Progress value={phase0Progress} className="mb-2" />
          <p className="text-sm text-gray-500">
            Complete your personal details, submit required documents, and prepare for your journey.
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Phase 1: Documentation</h3>
              {getPhaseStatus(1) === "completed" && (
                <Badge variant="default" className="flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  Completed
                </Badge>
              )}
              {getPhaseStatus(1) === "current" && (
                <Badge variant="secondary">Current Phase</Badge>
              )}
            </div>
            {getPhaseStatus(1) === "current" && (
              <Button 
                size="sm" 
                onClick={() => navigate("/user/onboarding")}
                className="flex items-center gap-1"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Progress value={phase1Progress} className="mb-2" />
          <p className="text-sm text-gray-500">
            Submit your HMRC documents, company agreements, and other essential paperwork.
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Phase 2: Final Steps</h3>
              {getPhaseStatus(2) === "completed" && (
                <Badge variant="default" className="flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  Completed
                </Badge>
              )}
              {getPhaseStatus(2) === "current" && (
                <Badge variant="secondary">Current Phase</Badge>
              )}
            </div>
            {getPhaseStatus(2) === "current" && (
              <Button 
                size="sm" 
                onClick={() => navigate("/user/onboarding")}
                className="flex items-center gap-1"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Progress value={phase2Progress} className="mb-2" />
          <p className="text-sm text-gray-500">
            Complete your right to work verification and final documentation.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OnboardingPhases;