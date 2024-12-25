import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Phase1 } from "@/types/user";

interface Phase1FormProps {
  phase1: Phase1;
  onUpdate: (updates: Partial<Phase1>) => void;
  isAdmin: boolean;
}

const Phase1Form = ({ phase1, onUpdate, isAdmin }: Phase1FormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Phase 1: Documentation</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="shareCodeUploaded"
            checked={phase1.shareCodeUploaded}
            onCheckedChange={(checked) => onUpdate({ shareCodeUploaded: checked as boolean })}
          />
          <Label htmlFor="shareCodeUploaded">Share Code Uploaded</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="dbsUploaded"
            checked={phase1.dbsUploaded}
            onCheckedChange={(checked) => onUpdate({ dbsUploaded: checked as boolean })}
          />
          <Label htmlFor="dbsUploaded">DBS Uploaded</Label>
        </div>
      </div>
    </div>
  );
};

export default Phase1Form;