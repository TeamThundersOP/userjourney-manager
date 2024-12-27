import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { User } from "@/types/user";

interface Phase0FormProps {
  onboarding: any;
  setOnboarding: (value: any) => void;
}

const Phase0Form = ({ onboarding, setOnboarding }: Phase0FormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Phase 0: Initial Setup</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="personalDetailsCompleted"
            checked={onboarding?.phase0?.personalDetailsCompleted}
            onCheckedChange={(checked) =>
              setOnboarding((prev: any) => ({
                ...prev!,
                phase0: { ...prev!.phase0, personalDetailsCompleted: checked as boolean },
              }))
            }
          />
          <Label htmlFor="personalDetailsCompleted">Personal Details Completed</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="cvSubmitted"
            checked={onboarding?.phase0?.cvSubmitted}
            onCheckedChange={(checked) =>
              setOnboarding((prev) => ({
                ...prev!,
                phase0: { ...prev!.phase0, cvSubmitted: checked as boolean },
              }))
            }
          />
          <Label htmlFor="cvSubmitted">CV Submitted</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="interviewCompleted"
            checked={onboarding?.phase0?.interviewCompleted}
            onCheckedChange={(checked) =>
              setOnboarding((prev) => ({
                ...prev!,
                phase0: { ...prev!.phase0, interviewCompleted: checked as boolean },
              }))
            }
          />
          <Label htmlFor="interviewCompleted">Interview Completed</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="passportUploaded"
            checked={onboarding?.phase0?.passportUploaded}
            onCheckedChange={(checked) =>
              setOnboarding((prev) => ({
                ...prev!,
                phase0: { ...prev!.phase0, passportUploaded: checked as boolean },
              }))
            }
          />
          <Label htmlFor="passportUploaded">Passport Uploaded</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="pccUploaded"
            checked={onboarding?.phase0?.pccUploaded}
            onCheckedChange={(checked) =>
              setOnboarding((prev) => ({
                ...prev!,
                phase0: { ...prev!.phase0, pccUploaded: checked as boolean },
              }))
            }
          />
          <Label htmlFor="pccUploaded">PCC Uploaded</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="otherDocumentsUploaded"
            checked={onboarding?.phase0?.otherDocumentsUploaded}
            onCheckedChange={(checked) =>
              setOnboarding((prev) => ({
                ...prev!,
                phase0: { ...prev!.phase0, otherDocumentsUploaded: checked as boolean },
              }))
            }
          />
          <Label htmlFor="otherDocumentsUploaded">Other Documents Uploaded</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="offerLetterSent"
            checked={onboarding?.phase0?.offerLetterSent}
            onCheckedChange={(checked) =>
              setOnboarding((prev) => ({
                ...prev!,
                phase0: { ...prev!.phase0, offerLetterSent: checked as boolean },
              }))
            }
          />
          <Label htmlFor="offerLetterSent">Offer Letter Sent</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="cosSent"
            checked={onboarding?.phase0?.cosSent}
            onCheckedChange={(checked) =>
              setOnboarding((prev) => ({
                ...prev!,
                phase0: { ...prev!.phase0, cosSent: checked as boolean },
              }))
            }
          />
          <Label htmlFor="cosSent">CoS Sent</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="rightToWorkSent"
            checked={onboarding?.phase0?.rightToWorkSent}
            onCheckedChange={(checked) =>
              setOnboarding((prev) => ({
                ...prev!,
                phase0: { ...prev!.phase0, rightToWorkSent: checked as boolean },
              }))
            }
          />
          <Label htmlFor="rightToWorkSent">Right to Work Sent</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="documentsUploaded"
            checked={onboarding?.phase0?.documentsUploaded}
            onCheckedChange={(checked) =>
              setOnboarding((prev) => ({
                ...prev!,
                phase0: { ...prev!.phase0, documentsUploaded: checked as boolean },
              }))
            }
          />
          <Label htmlFor="documentsUploaded">Documents Uploaded</Label>
        </div>
        <div className="col-span-2">
          <Label htmlFor="visaStatus">Visa Status</Label>
          <Select
            value={onboarding?.phase0?.visaStatus}
            onValueChange={(value: 'pending' | 'approved' | 'rejected') =>
              setOnboarding((prev) => ({
                ...prev!,
                phase0: { ...prev!.phase0, visaStatus: value },
              }))
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
            checked={onboarding?.phase0?.travelDetailsUpdated}
            onCheckedChange={(checked) =>
              setOnboarding((prev) => ({
                ...prev!,
                phase0: { ...prev!.phase0, travelDetailsUpdated: checked as boolean },
              }))
            }
          />
          <Label htmlFor="travelDetailsUpdated">Travel Details Updated</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="travelDocumentsUploaded"
            checked={onboarding?.phase0?.travelDocumentsUploaded}
            onCheckedChange={(checked) =>
              setOnboarding((prev) => ({
                ...prev!,
                phase0: { ...prev!.phase0, travelDocumentsUploaded: checked as boolean },
              }))
            }
          />
          <Label htmlFor="travelDocumentsUploaded">Travel Documents Uploaded</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="visaCopyUploaded"
            checked={onboarding?.phase0?.visaCopyUploaded}
            onCheckedChange={(checked) =>
              setOnboarding((prev) => ({
                ...prev!,
                phase0: { ...prev!.phase0, visaCopyUploaded: checked as boolean },
              }))
            }
          />
          <Label htmlFor="visaCopyUploaded">Visa Copy Uploaded</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="ukContactUpdated"
            checked={onboarding?.phase0?.ukContactUpdated}
            onCheckedChange={(checked) =>
              setOnboarding((prev) => ({
                ...prev!,
                phase0: { ...prev!.phase0, ukContactUpdated: checked as boolean },
              }))
            }
          />
          <Label htmlFor="ukContactUpdated">UK Contact Updated</Label>
        </div>
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="phase0-feedback">Feedback for Phase 0</Label>
        <Textarea
          id="phase0-feedback"
          value={onboarding.phase0.feedback}
          onChange={(e) =>
            setOnboarding((prev: any) => ({
              ...prev,
              phase0: { ...prev.phase0, feedback: e.target.value },
            }))
          }
          placeholder="Enter feedback for the user..."
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default Phase0Form;
