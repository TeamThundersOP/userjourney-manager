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
  onUpdate: (field: keyof Phase0, value: any) => void;
}

const Phase0Form = ({ phase0, onUpdate }: Phase0FormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Phase 0: Initial Setup</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="personalDetailsCompleted"
            checked={phase0.personalDetailsCompleted}
            onCheckedChange={(checked) => onUpdate('personalDetailsCompleted', checked)}
          />
          <Label htmlFor="personalDetailsCompleted">Personal Details Completed</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="cvSubmitted"
            checked={phase0.cvSubmitted}
            onCheckedChange={(checked) => onUpdate('cvSubmitted', checked)}
          />
          <Label htmlFor="cvSubmitted">CV Submitted</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="interviewCompleted"
            checked={phase0.interviewCompleted}
            onCheckedChange={(checked) => onUpdate('interviewCompleted', checked)}
          />
          <Label htmlFor="interviewCompleted">Interview Completed</Label>
        </div>
        <div className="col-span-2">
          <Label htmlFor="jobStatus">Job Status</Label>
          <Select
            value={phase0.jobStatus}
            onValueChange={(value: 'pending' | 'accepted' | 'rejected') =>
              onUpdate('jobStatus', value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select job status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="passportUploaded"
            checked={phase0.passportUploaded}
            onCheckedChange={(checked) => onUpdate('passportUploaded', checked)}
          />
          <Label htmlFor="passportUploaded">Passport Uploaded</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="pccUploaded"
            checked={phase0.pccUploaded}
            onCheckedChange={(checked) => onUpdate('pccUploaded', checked)}
          />
          <Label htmlFor="pccUploaded">PCC Uploaded</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="otherDocumentsUploaded"
            checked={phase0.otherDocumentsUploaded}
            onCheckedChange={(checked) => onUpdate('otherDocumentsUploaded', checked)}
          />
          <Label htmlFor="otherDocumentsUploaded">Other Documents Uploaded</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="offerLetterSent"
            checked={phase0.offerLetterSent}
            onCheckedChange={(checked) => onUpdate('offerLetterSent', checked)}
          />
          <Label htmlFor="offerLetterSent">Offer Letter Sent</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="cosSent"
            checked={phase0.cosSent}
            onCheckedChange={(checked) => onUpdate('cosSent', checked)}
          />
          <Label htmlFor="cosSent">COS Sent</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="rightToWorkSent"
            checked={phase0.rightToWorkSent}
            onCheckedChange={(checked) => onUpdate('rightToWorkSent', checked)}
          />
          <Label htmlFor="rightToWorkSent">Right to Work Sent</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="documentsUploaded"
            checked={phase0.documentsUploaded}
            onCheckedChange={(checked) => onUpdate('documentsUploaded', checked)}
          />
          <Label htmlFor="documentsUploaded">Documents Uploaded</Label>
        </div>
        <div className="col-span-2">
          <Label htmlFor="visaStatus">Visa Status</Label>
          <Select
            value={phase0.visaStatus}
            onValueChange={(value: 'pending' | 'approved' | 'rejected') =>
              onUpdate('visaStatus', value)
            }
          >
            <SelectTrigger className="w-full">
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
            onCheckedChange={(checked) => onUpdate('travelDetailsUpdated', checked)}
          />
          <Label htmlFor="travelDetailsUpdated">Travel Details Updated</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="travelDocumentsUploaded"
            checked={phase0.travelDocumentsUploaded}
            onCheckedChange={(checked) => onUpdate('travelDocumentsUploaded', checked)}
          />
          <Label htmlFor="travelDocumentsUploaded">Travel Documents Uploaded</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="visaCopyUploaded"
            checked={phase0.visaCopyUploaded}
            onCheckedChange={(checked) => onUpdate('visaCopyUploaded', checked)}
          />
          <Label htmlFor="visaCopyUploaded">Visa Copy Uploaded</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="ukContactUpdated"
            checked={phase0.ukContactUpdated}
            onCheckedChange={(checked) => onUpdate('ukContactUpdated', checked)}
          />
          <Label htmlFor="ukContactUpdated">UK Contact Updated</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="phase0Complete"
            checked={phase0.phase0Complete}
            onCheckedChange={(checked) => onUpdate('phase0Complete', checked)}
          />
          <Label htmlFor="phase0Complete">Phase 0 Complete</Label>
        </div>
      </div>
    </div>
  );
};

export default Phase0Form;