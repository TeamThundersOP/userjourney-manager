import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Phase2 } from "@/types/user";

interface Phase2FormProps {
  phase2: Phase2;
  onUpdate: (updates: Partial<Phase2>) => void;
  isAdmin: boolean;
}

const Phase2Form = ({ phase2, onUpdate, isAdmin }: Phase2FormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Phase 2: Final Steps</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="onboardingComplete"
            checked={phase2.onboardingComplete}
            onCheckedChange={(checked) => onUpdate({ onboardingComplete: checked as boolean })}
            disabled={!isAdmin}
          />
          <Label htmlFor="onboardingComplete">Onboarding Complete</Label>
        </div>
      </div>
    </div>
  );
};

export default Phase2Form;