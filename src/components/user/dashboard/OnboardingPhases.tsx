import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle, ArrowRight, Lightbulb, Rocket, CheckCircle } from "lucide-react";

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

  const getPhaseIcon = (phaseNumber: number) => {
    switch(phaseNumber) {
      case 0:
        return <Lightbulb className="h-5 w-5" />;
      case 1:
        return <Rocket className="h-5 w-5" />;
      case 2:
        return <CheckCircle className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const renderPhaseCard = (phaseNumber: number, title: string, description: string) => {
    const progress = getPhaseProgress(`phase${phaseNumber}`);
    const isApproved = isPhaseApproved(phaseNumber);
    const canAccess = isPhaseAccessible(phaseNumber);

    return (
      <div className="relative">
        <div className="flex items-center mb-4">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${isApproved ? 'bg-green-500' : 'bg-primary/10'} text-white`}>
            {getPhaseIcon(phaseNumber)}
          </div>
          <div className="ml-4">
            <span className="text-sm text-muted-foreground">Phase {phaseNumber}</span>
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        </div>

        <Card className={`relative p-6 space-y-4 transition-all duration-300 ${canAccess ? 'hover:shadow-lg hover:translate-y-[-2px]' : 'opacity-70'}`}>
          <p className="text-sm text-gray-500">{description}</p>

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
          <>
            <div className="hidden md:block absolute top-5 left-[5rem] w-[calc(100%-5rem)] h-0.5 bg-gradient-to-r from-primary/20 to-primary/20" />
            <div className="md:hidden absolute left-5 top-[5rem] h-[calc(100%+2rem)] w-0.5 bg-gradient-to-b from-primary/20 to-primary/20" />
          </>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in p-4 md:p-6">
      <h2 className="text-2xl font-bold text-primary">Your Onboarding Journey</h2>
      <div className="space-y-12 md:space-y-16">
        {renderPhaseCard(0, "Initial Setup", "Complete your personal details and submit required documents")}
        {renderPhaseCard(1, "Documentation", "Submit additional documentation and complete HMRC checklist")}
        {renderPhaseCard(2, "Final Steps", "Complete final verifications and checks")}
      </div>
    </div>
  );
};

export default OnboardingPhases;