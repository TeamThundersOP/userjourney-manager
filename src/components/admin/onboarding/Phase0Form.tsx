import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Phase0 } from "@/types/user";

interface Phase0FormProps {
  phase0: Phase0;
  onUpdate: (updates: Partial<Phase0>) => void;
}

const Phase0Form = ({ phase0, onUpdate }: Phase0FormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Phase 0: Initial Setup</h3>
      <div className="grid grid-cols-2 gap-4">
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
            id="personalDetailsCompleted"
            checked={phase0.personalDetailsCompleted}
            onCheckedChange={(checked) => onUpdate({ personalDetailsCompleted: checked as boolean })}
          />
          <Label htmlFor="personalDetailsCompleted">Personal Details Completed</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="interviewCompleted"
            checked={phase0.interviewCompleted}
            onCheckedChange={(checked) => onUpdate({ interviewCompleted: checked as boolean })}
          />
          <Label htmlFor="interviewCompleted">Interview Completed</Label>
        </div>

        <div className="col-span-2 space-y-2">
          <Label>Job Status</Label>
          <RadioGroup
            value={phase0.jobStatus}
            onValueChange={(value) => onUpdate({ jobStatus: value as 'pending' | 'accepted' | 'rejected' })}
            className="flex space-x-4"
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

        <div className="col-span-2">
          <Label>Documents</Label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="passportCopy"
                checked={phase0.documents.passportCopy}
                onCheckedChange={(checked) => 
                  onUpdate({ 
                    documents: { ...phase0.documents, passportCopy: checked as boolean } 
                  })
                }
              />
              <Label htmlFor="passportCopy">Passport Copy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="pcc"
                checked={phase0.documents.pcc}
                onCheckedChange={(checked) => 
                  onUpdate({ 
                    documents: { ...phase0.documents, pcc: checked as boolean } 
                  })
                }
              />
              <Label htmlFor="pcc">PCC</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="other"
                checked={phase0.documents.other}
                onCheckedChange={(checked) => 
                  onUpdate({ 
                    documents: { ...phase0.documents, other: checked as boolean } 
                  })
                }
              />
              <Label htmlFor="other">Other Documents</Label>
            </div>
          </div>
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
          <Label htmlFor="cosSent">CoS Sent</Label>
        </div>

        <div className="col-span-2 space-y-2">
          <Label>Visa Status</Label>
          <RadioGroup
            value={phase0.visaStatus}
            onValueChange={(value) => onUpdate({ visaStatus: value as 'pending' | 'approved' | 'rejected' })}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pending" id="visaPending" />
              <Label htmlFor="visaPending">Pending</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="approved" id="visaApproved" />
              <Label htmlFor="visaApproved">Approved</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rejected" id="visaRejected" />
              <Label htmlFor="visaRejected">Rejected</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="col-span-2">
          <Label>UK Travel</Label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ticketUploaded"
                checked={phase0.ukTravel.ticketUploaded}
                onCheckedChange={(checked) => 
                  onUpdate({ 
                    ukTravel: { ...phase0.ukTravel, ticketUploaded: checked as boolean } 
                  })
                }
              />
              <Label htmlFor="ticketUploaded">Ticket Uploaded</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="visaCopyUploaded"
                checked={phase0.ukTravel.visaCopyUploaded}
                onCheckedChange={(checked) => 
                  onUpdate({ 
                    ukTravel: { ...phase0.ukTravel, visaCopyUploaded: checked as boolean } 
                  })
                }
              />
              <Label htmlFor="visaCopyUploaded">Visa Copy Uploaded</Label>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="ukContactUpdated"
            checked={phase0.ukContactUpdated}
            onCheckedChange={(checked) => onUpdate({ ukContactUpdated: checked as boolean })}
          />
          <Label htmlFor="ukContactUpdated">UK Contact Updated</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="phase0Complete"
            checked={phase0.phase0Complete}
            onCheckedChange={(checked) => onUpdate({ phase0Complete: checked as boolean })}
          />
          <Label htmlFor="phase0Complete">Phase 0 Complete</Label>
        </div>
      </div>
    </div>
  );
};

export default Phase0Form;