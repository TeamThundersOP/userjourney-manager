import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { OnboardingPhase0 } from "@/types/user";

interface Phase0FormProps {
  phase0: OnboardingPhase0;
  onUpdate: (updates: Partial<OnboardingPhase0>) => void;
}

export const Phase0Form = ({ phase0, onUpdate }: Phase0FormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Phase 0: Initial Setup</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="personalDetailsCompleted"
            checked={phase0.personalDetailsCompleted}
            onCheckedChange={(checked) => onUpdate({ personalDetailsCompleted: checked as boolean })}
          />
          <Label htmlFor="personalDetailsCompleted">Personal Details Completed</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="cvSubmitted"
            checked={phase0.cvSubmitted}
            onCheckedChange={(checked) => onUpdate({ cvSubmitted: checked as boolean })}
          />
          <Label htmlFor="cvSubmitted">CV Submitted</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="interviewCompleted"
            checked={phase0.interviewCompleted}
            onCheckedChange={(checked) => onUpdate({ interviewCompleted: checked as boolean })}
          />
          <Label htmlFor="interviewCompleted">Interview Completed</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="passportUploaded"
            checked={phase0.passportUploaded}
            onCheckedChange={(checked) => onUpdate({ passportUploaded: checked as boolean })}
          />
          <Label htmlFor="passportUploaded">Passport Uploaded</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="pccUploaded"
            checked={phase0.pccUploaded}
            onCheckedChange={(checked) => onUpdate({ pccUploaded: checked as boolean })}
          />
          <Label htmlFor="pccUploaded">PCC Uploaded</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="otherDocumentsUploaded"
            checked={phase0.otherDocumentsUploaded}
            onCheckedChange={(checked) => onUpdate({ otherDocumentsUploaded: checked as boolean })}
          />
          <Label htmlFor="otherDocumentsUploaded">Other Documents Uploaded</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="offerLetterSent"
            checked={phase0.offerLetterSent}
            onCheckedChange={(checked) => onUpdate({ offerLetterSent: checked as boolean })}
          />
          <Label htmlFor="offerLetterSent">Offer Letter Sent</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="cosSent"
            checked={phase0.cosSent}
            onCheckedChange={(checked) => onUpdate({ cosSent: checked as boolean })}
          />
          <Label htmlFor="cosSent">COS Sent</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="rightToWorkSent"
            checked={phase0.rightToWorkSent}
            onCheckedChange={(checked) => onUpdate({ rightToWorkSent: checked as boolean })}
          />
          <Label htmlFor="rightToWorkSent">Right to Work Sent</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="documentsUploaded"
            checked={phase0.documentsUploaded}
            onCheckedChange={(checked) => onUpdate({ documentsUploaded: checked as boolean })}
          />
          <Label htmlFor="documentsUploaded">Documents Uploaded</Label>
        </div>
        <div className="col-span-2">
          <Label htmlFor="visaStatus">Visa Status</Label>
          <Select
            value={phase0.visaStatus}
            onValueChange={(value: 'pending' | 'approved' | 'rejected') =>
              onUpdate({ visaStatus: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select visa status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="travelDetailsUpdated"
            checked={phase0.travelDetailsUpdated}
            onCheckedChange={(checked) => onUpdate({ travelDetailsUpdated: checked as boolean })}
          />
          <Label htmlFor="travelDetailsUpdated">Travel Details Updated</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="travelDocumentsUploaded"
            checked={phase0.travelDocumentsUploaded}
            onCheckedChange={(checked) => onUpdate({ travelDocumentsUploaded: checked as boolean })}
          />
          <Label htmlFor="travelDocumentsUploaded">Travel Documents Uploaded</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="visaCopyUploaded"
            checked={phase0.visaCopyUploaded}
            onCheckedChange={(checked) => onUpdate({ visaCopyUploaded: checked as boolean })}
          />
          <Label htmlFor="visaCopyUploaded">Visa Copy Uploaded</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="ukContactUpdated"
            checked={phase0.ukContactUpdated}
            onCheckedChange={(checked) => onUpdate({ ukContactUpdated: checked as boolean })}
          />
          <Label htmlFor="ukContactUpdated">UK Contact Updated</Label>
        </div>
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="phase0-feedback">Feedback for Phase 0</Label>
        <Textarea
          id="phase0-feedback"
          value={phase0.feedback}
          onChange={(e) => onUpdate({ feedback: e.target.value })}
          placeholder="Enter feedback for the user..."
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};
