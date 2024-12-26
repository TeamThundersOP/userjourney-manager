import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { User } from "@/types/user";
import OnboardingPhaseDetails from "./OnboardingPhaseDetails";

interface OnboardingPhaseProgressProps {
  phase: 'phase0' | 'phase1' | 'phase2';
  title: string;
  progress: number;
  items: [string, boolean][];
  isApproved: boolean;
  canApprove: boolean;
  onApprove: () => void;
  user: User;
}

const OnboardingPhaseProgress = ({
  phase,
  title,
  progress,
  items,
  isApproved,
  canApprove,
  onApprove,
  user
}: OnboardingPhaseProgressProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{title}</h3>
        {isApproved ? (
          <Badge variant="default" className="flex items-center gap-1">
            <Check className="h-3 w-3" />
            Approved
          </Badge>
        ) : canApprove ? (
          <Button 
            size="sm" 
            onClick={onApprove}
            className="flex items-center gap-1"
          >
            <Check className="h-4 w-4" />
            Approve Phase
          </Button>
        ) : null}
      </div>
      <Progress value={progress} className="mb-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {items.map(([key, value]) => (
          <div key={key} className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${value ? 'bg-green-500' : 'bg-gray-300'}`} />
            <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
          </div>
        ))}
      </div>
      <OnboardingPhaseDetails phase={phase} user={user} />
    </div>
  );
};

export default OnboardingPhaseProgress;