import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";

interface OnboardingPhasesProps {
  user: User;
}

const OnboardingPhases = ({ user }: OnboardingPhasesProps) => {
  const navigate = useNavigate();

  const getPhaseProgress = (phase: string) => {
    if (!user.onboarding) return 0;
    const phaseData = user.onboarding[phase as keyof typeof user.onboarding];
    if (!phaseData || typeof phaseData !== 'object') return 0;
    
    const totalSteps = Object.keys(phaseData).filter(key => typeof phaseData[key] === 'boolean').length;
    const completedSteps = Object.values(phaseData).filter(value => value === true).length;
    
    return (completedSteps / totalSteps) * 100;
  };

  const isPhaseApproved = (phaseNumber: number) => {
    return user.onboarding?.approvals?.[`phase${phaseNumber}` as keyof typeof user.onboarding.approvals] || false;
  };

  const isPhaseAccessible = (phaseNumber: number) => {
    if (phaseNumber === 0) return true;
    return isPhaseApproved(phaseNumber - 1);
  };

  const renderPhaseCard = (phaseNumber: number, title: string, description: string) => {
    const progress = getPhaseProgress(`phase${phaseNumber}`);
    const isApproved = isPhaseApproved(phaseNumber);
    const canAccess = isPhaseAccessible(phaseNumber);

    return (
      <div className="relative">
        <Card className={`p-6 space-y-4 transition-all duration-300 ${canAccess ? 'hover:shadow-lg' : 'opacity-70'}`}>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                  {phaseNumber}
                </span>
                <h3 className="text-lg font-semibold">{title}</h3>
              </div>
              <p className="text-sm text-gray-500 mt-2">{description}</p>
            </div>
            {isApproved ? (
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            ) : (
              <XCircle className="h-6 w-6 text-gray-300" />
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex justify-between items-center">
            <Badge 
              variant={isApproved ? "default" : "secondary"} 
              className={`${isApproved ? "bg-green-500" : ""} transition-colors duration-300`}
            >
              {isApproved ? "Approved" : "Pending Approval"}
            </Badge>
            <Button
              onClick={() => navigate(`/user/phase${phaseNumber}`)}
              disabled={!canAccess}
              className="gap-2"
            >
              {progress === 100 ? "Review" : "Continue"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
        {phaseNumber < 2 && (
          <div className="absolute left-1/2 -translate-x-1/2 h-8 w-px bg-border" />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold">Onboarding Progress</h2>
      <div className="space-y-8">
        {renderPhaseCard(0, "Phase 0: Initial Setup", "Complete your personal details and submit required documents")}
        {renderPhaseCard(1, "Phase 1: Documentation", "Submit additional documentation and complete HMRC checklist")}
        {renderPhaseCard(2, "Phase 2: Final Steps", "Complete final verifications and checks")}
      </div>
    </div>
  );
};

export default OnboardingPhases;