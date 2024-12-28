import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { OnboardingPhase0 } from "@/types/user";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Phase0FormProps {
  phase0: OnboardingPhase0;
  onUpdate: (updates: Partial<OnboardingPhase0>) => void;
}

const Phase0Form = ({ phase0, onUpdate }: Phase0FormProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Phase 0: Initial Setup</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="personalDetailsCompleted"
            checked={phase0.personalDetailsCompleted}
            onCheckedChange={(checked) =>
              onUpdate({ personalDetailsCompleted: checked as boolean })
            }
          />
          <Label htmlFor="personalDetailsCompleted">Personal Details Completed</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="cvSubmitted"
            checked={phase0.cvSubmitted}
            onCheckedChange={(checked) =>
              onUpdate({ cvSubmitted: checked as boolean })
            }
          />
          <Label htmlFor="cvSubmitted">CV Submitted</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="interviewCompleted"
            checked={phase0.interviewCompleted}
            onCheckedChange={(checked) =>
              onUpdate({ interviewCompleted: checked as boolean })
            }
          />
          <Label htmlFor="interviewCompleted">Interview Completed</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="passportUploaded"
            checked={phase0.passportUploaded}
            onCheckedChange={(checked) =>
              onUpdate({ passportUploaded: checked as boolean })
            }
          />
          <Label htmlFor="passportUploaded">Passport Uploaded</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="pccUploaded"
            checked={phase0.pccUploaded}
            onCheckedChange={(checked) =>
              onUpdate({ pccUploaded: checked as boolean })
            }
          />
          <Label htmlFor="pccUploaded">PCC Uploaded</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="otherDocumentsUploaded"
            checked={phase0.otherDocumentsUploaded}
            onCheckedChange={(checked) =>
              onUpdate({ otherDocumentsUploaded: checked as boolean })
            }
          />
          <Label htmlFor="otherDocumentsUploaded">Other Documents Uploaded</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="offerLetterSent"
            checked={phase0.offerLetterSent}
            onCheckedChange={(checked) =>
              onUpdate({ offerLetterSent: checked as boolean })
            }
          />
          <Label htmlFor="offerLetterSent">Offer Letter Sent</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="cosSent"
            checked={phase0.cosSent}
            onCheckedChange={(checked) =>
              onUpdate({ cosSent: checked as boolean })
            }
          />
          <Label htmlFor="cosSent">COS Sent</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="rightToWorkSent"
            checked={phase0.rightToWorkSent}
            onCheckedChange={(checked) =>
              onUpdate({ rightToWorkSent: checked as boolean })
            }
          />
          <Label htmlFor="rightToWorkSent">Right to Work Sent</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="documentsUploaded"
            checked={phase0.documentsUploaded}
            onCheckedChange={(checked) =>
              onUpdate({ documentsUploaded: checked as boolean })
            }
          />
          <Label htmlFor="documentsUploaded">Documents Uploaded</Label>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Job Status</Label>
          <RadioGroup
            value={phase0.jobStatus}
            onValueChange={(value: 'pending' | 'accepted' | 'rejected') =>
              onUpdate({ jobStatus: value })
            }
            className="flex flex-col space-y-1 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pending" id="pending" />
              <Label htmlFor="pending">Pending</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="accepted" id="accepted" />
              <Label htmlFor="accepted">Accepted</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rejected" id="rejected" />
              <Label htmlFor="rejected">Rejected</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Visa Status</Label>
          <RadioGroup
            value={phase0.visaStatus}
            onValueChange={(value: 'pending' | 'approved' | 'rejected') =>
              onUpdate({ visaStatus: value })
            }
            className="flex flex-col space-y-1 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pending" id="visa-pending" />
              <Label htmlFor="visa-pending">Pending</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="approved" id="visa-approved" />
              <Label htmlFor="visa-approved">Approved</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rejected" id="visa-rejected" />
              <Label htmlFor="visa-rejected">Rejected</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phase0-feedback">Feedback for Phase 0</Label>
        <Textarea
          id="phase0-feedback"
          value={phase0.feedback}
          onChange={(e) => onUpdate({ feedback: e.target.value })}
          placeholder="Enter feedback for the user..."
          className="min-h-[100px] w-full"
        />
      </div>
    </div>
  );
};

export default Phase0Form;