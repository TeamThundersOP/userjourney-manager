import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { OnboardingPhase2 } from "@/types/user";

interface Phase2FormProps {
  phase2: OnboardingPhase2;
  onUpdate: (updates: Partial<OnboardingPhase2>) => void;
}

export const Phase2Form = ({ phase2, onUpdate }: Phase2FormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Phase 2: Final Steps</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="rightToWork"
            checked={phase2.rightToWork}
            onCheckedChange={(checked) => onUpdate({ rightToWork: checked as boolean })}
          />
          <Label htmlFor="rightToWork">Right to Work</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="shareCode"
            checked={phase2.shareCode}
            onCheckedChange={(checked) => onUpdate({ shareCode: checked as boolean })}
          />
          <Label htmlFor="shareCode">Share Code</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="dbs"
            checked={phase2.dbs}
            onCheckedChange={(checked) => onUpdate({ dbs: checked as boolean })}
          />
          <Label htmlFor="dbs">DBS</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="onboardingComplete"
            checked={phase2.onboardingComplete}
            onCheckedChange={(checked) => onUpdate({ onboardingComplete: checked as boolean })}
          />
          <Label htmlFor="onboardingComplete">Onboarding Complete</Label>
        </div>
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="phase2-feedback">Feedback for Phase 2</Label>
        <Textarea
          id="phase2-feedback"
          value={phase2.feedback}
          onChange={(e) => onUpdate({ feedback: e.target.value })}
          placeholder="Enter feedback for the user..."
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};
