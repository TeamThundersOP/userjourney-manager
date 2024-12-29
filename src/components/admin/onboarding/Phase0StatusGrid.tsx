import { OnboardingPhase0 } from "@/types/user";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Phase0StatusGridProps {
  phase0: OnboardingPhase0;
  onStatusChange: (key: string, value: boolean) => void;
}

const Phase0StatusGrid = ({ phase0, onStatusChange }: Phase0StatusGridProps) => {
  const statusItems = [
    { key: 'personalDetailsCompleted', label: 'Personal Details' },
    { key: 'cvSubmitted', label: 'CV Submitted' },
    { key: 'interviewCompleted', label: 'Interview' },
    { key: 'passportUploaded', label: 'Passport' },
    { key: 'pccUploaded', label: 'PCC' },
    { key: 'otherDocumentsUploaded', label: 'Other Documents' },
    { key: 'offerLetterSent', label: 'Offer Letter' },
    { key: 'cosSent', label: 'COS' },
    { key: 'travelDocumentsUploaded', label: 'Travel Documents' },
    { key: 'visaCopyUploaded', label: 'Visa Copy' },
    { key: 'ukContactUpdated', label: 'UK Contact' }
  ];

  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {statusItems.map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between space-x-2">
            <Label htmlFor={key}>{label}</Label>
            <Switch
              id={key}
              checked={phase0[key as keyof OnboardingPhase0] as boolean}
              onCheckedChange={(checked) => onStatusChange(key, checked)}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Phase0StatusGrid;