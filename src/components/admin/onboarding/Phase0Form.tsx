import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phase0 } from "@/types/user";

interface Phase0FormProps {
  phase0: Phase0;
  onUpdate: (updates: Partial<Phase0>) => void;
  isAdmin: boolean;
}

const Phase0Form = ({ phase0, onUpdate, isAdmin }: Phase0FormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Phase 0: Initial Setup</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="cvSubmitted"
            checked={phase0.cvSubmitted}
            onCheckedChange={(checked) => onUpdate({ cvSubmitted: checked as boolean })}
            disabled={!isAdmin}
          />
          <Label htmlFor="cvSubmitted">CV Submitted</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Select
            value={phase0.interviewStatus}
            onValueChange={(value: 'pending' | 'accepted' | 'rejected') =>
              onUpdate({ interviewStatus: value })
            }
            disabled={!isAdmin}
          >
            <SelectTrigger>
              <SelectValue placeholder="Interview Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Label>Interview Status</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="offerLetterSent"
            checked={phase0.offerLetterSent}
            onCheckedChange={(checked) => onUpdate({ offerLetterSent: checked as boolean })}
            disabled={!isAdmin}
          />
          <Label htmlFor="offerLetterSent">Offer Letter Sent</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="cosSent"
            checked={phase0.cosSent}
            onCheckedChange={(checked) => onUpdate({ cosSent: checked as boolean })}
            disabled={!isAdmin}
          />
          <Label htmlFor="cosSent">COS Sent</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="rightToWorkSent"
            checked={phase0.rightToWorkSent}
            onCheckedChange={(checked) => onUpdate({ rightToWorkSent: checked as boolean })}
            disabled={!isAdmin}
          />
          <Label htmlFor="rightToWorkSent">Right to Work Sent</Label>
        </div>
      </div>
    </div>
  );
};

export default Phase0Form;