import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { User } from "@/types/user";
import { calculateProgress } from "@/utils/onboarding";

interface OnboardingPhasesProps {
  user: User;
}

const OnboardingPhases = ({ user }: OnboardingPhasesProps) => {
  const phase0Progress = calculateProgress(user, 0);
  const phase1Progress = calculateProgress(user, 1);
  const phase2Progress = calculateProgress(user, 2);

  const phases = [
    {
      number: 0,
      title: "Initial Setup",
      progress: phase0Progress,
      isApproved: user.onboarding?.approvals.phase0,
      isActive: user.onboarding?.currentPhase === 0,
      link: "/user/phase0"
    },
    {
      number: 1,
      title: "Documentation",
      progress: phase1Progress,
      isApproved: user.onboarding?.approvals.phase1,
      isActive: user.onboarding?.currentPhase === 1,
      link: "/user/phase1",
      isLocked: !user.onboarding?.approvals.phase0
    },
    {
      number: 2,
      title: "Final Steps",
      progress: phase2Progress,
      isApproved: user.onboarding?.approvals.phase2,
      isActive: user.onboarding?.currentPhase === 2,
      link: "/user/phase2",
      isLocked: !user.onboarding?.approvals.phase1
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
      {phases.map((phase) => (
        <Card 
          key={phase.number}
          className={`relative transition-all duration-300 hover:shadow-lg ${
            phase.isActive ? 'ring-2 ring-primary ring-opacity-50' : ''
          } ${phase.isLocked ? 'opacity-50' : ''}`}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                Phase {phase.number}: {phase.title}
              </CardTitle>
              {phase.isApproved && (
                <Badge variant="default" className="ml-2">
                  <Check className="w-3 h-3 mr-1" />
                  Approved
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{Math.round(phase.progress)}%</span>
                </div>
                <Progress value={phase.progress} className="h-2" />
              </div>
              
              <Link
                to={phase.isLocked ? "#" : phase.link}
                className={`
                  w-full inline-flex items-center justify-center px-4 py-2 rounded-md
                  text-sm font-medium transition-colors
                  ${phase.isLocked 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                  }
                `}
              >
                {phase.isLocked ? (
                  "Locked"
                ) : (
                  <>
                    {phase.isActive ? "Continue" : "View"} 
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OnboardingPhases;