import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Phase2FormProps {
  onboarding: any;
  setOnboarding: (value: any) => void;
}

const Phase2Form = ({ onboarding, setOnboarding }: Phase2FormProps) => {
  if (!onboarding?.approvals?.phase1) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Phase 2: Final Steps</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="rightToWork"
            checked={onboarding?.phase2.rightToWork}
            onCheckedChange={(checked) =>
              setOnboarding((prev: any) => ({
                ...prev!,
                phase2: { ...prev!.phase2, rightToWork: checked as boolean },
              }))
            }
          />
          <Label htmlFor="rightToWork">Right to Work</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="shareCode"
            checked={onboarding?.phase2.shareCode}
            onCheckedChange={(checked) =>
              setOnboarding((prev: any) => ({
                ...prev!,
                phase2: { ...prev!.phase2, shareCode: checked as boolean },
              }))
            }
          />
          <Label htmlFor="shareCode">Share Code</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="dbs"
            checked={onboarding?.phase2.dbs}
            onCheckedChange={(checked) =>
              setOnboarding((prev: any) => ({
                ...prev!,
                phase2: { ...prev!.phase2, dbs: checked as boolean },
              }))
            }
          />
          <Label htmlFor="dbs">DBS</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="onboardingComplete"
            checked={onboarding?.phase2.onboardingComplete}
            onCheckedChange={(checked) =>
              setOnboarding((prev: any) => ({
                ...prev!,
                phase2: { ...prev!.phase2, onboardingComplete: checked as boolean },
              }))
            }
          />
          <Label htmlFor="onboardingComplete">Onboarding Complete</Label>
        </div>
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="phase2-feedback">Feedback for Phase 2</Label>
        <Textarea
          id="phase2-feedback"
          value={onboarding.phase2.feedback}
          onChange={(e) =>
            setOnboarding((prev: any) => ({
              ...prev,
              phase2: { ...prev.phase2, feedback: e.target.value },
            }))
          }
          placeholder="Enter feedback for the user..."
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default Phase2Form;
