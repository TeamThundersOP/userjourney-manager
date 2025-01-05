import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { OnboardingPhase0 } from "@/types/user";

interface StatusSectionProps {
  phase0: OnboardingPhase0;
  onJobStatusChange: (value: 'pending' | 'accepted' | 'rejected') => void;
  onVisaStatusChange: (value: 'pending' | 'approved' | 'rejected') => void;
}

const StatusSection = ({ phase0, onJobStatusChange, onVisaStatusChange }: StatusSectionProps) => {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-4">Job Status</h3>
          <RadioGroup
            value={phase0?.jobStatus}
            onValueChange={onJobStatusChange}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pending" id="job-pending" />
              <Label htmlFor="job-pending">Pending</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="accepted" id="job-accepted" />
              <Label htmlFor="job-accepted">Accepted</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rejected" id="job-rejected" />
              <Label htmlFor="job-rejected">Rejected</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Visa Status</h3>
          <RadioGroup
            value={phase0?.visaStatus}
            onValueChange={onVisaStatusChange}
            className="flex flex-col space-y-2"
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
    </Card>
  );
};

export default StatusSection;