import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { User } from "@/types/user";

interface OnboardingPhasesProps {
  user: User;
}

const OnboardingPhases = ({ user }: OnboardingPhasesProps) => {
  const [isPhaseDialogOpen, setIsPhaseDialogOpen] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);

  const phases = [
    {
      title: "Phase 0",
      completed: user.onboarding?.phase0?.personalDetailsCompleted,
      description: "Complete your personal details.",
    },
    {
      title: "Phase 1",
      completed: user.onboarding?.phase1?.hmrcChecklist,
      description: "Complete the HMRC checklist.",
    },
    {
      title: "Phase 2",
      completed: user.onboarding?.phase2?.rightToWork,
      description: "Complete the right to work verification.",
    },
  ];

  const handlePhaseClick = (index: number) => {
    setSelectedPhase(index);
    setIsPhaseDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      {phases.map((phase, index) => (
        <Card key={index} onClick={() => handlePhaseClick(index)} className="cursor-pointer">
          <CardHeader>
            <CardTitle>{phase.title}</CardTitle>
            <Badge variant={phase.completed ? "default" : "destructive"}>
              {phase.completed ? <CheckCircle2 /> : <XCircle />}
            </Badge>
          </CardHeader>
          <CardContent>
            <p>{phase.description}</p>
          </CardContent>
        </Card>
      ))}

      <Dialog open={isPhaseDialogOpen} onOpenChange={setIsPhaseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{phases[selectedPhase || 0]?.title}</DialogTitle>
            <DialogDescription>
              {phases[selectedPhase || 0]?.description}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OnboardingPhases;