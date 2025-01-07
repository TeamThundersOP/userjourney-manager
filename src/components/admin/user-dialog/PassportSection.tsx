import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PassportSectionProps {
  formData: {
    passportNumber: string;
    passportIssueDate: string;
    passportExpiryDate: string;
    passportPlaceOfIssue: string;
  };
  onChange: (field: string, value: string) => void;
}

const PassportSection = ({ formData, onChange }: PassportSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Passport Information</h3>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="passportNumber">Passport Number</Label>
          <Input
            id="passportNumber"
            value={formData.passportNumber}
            onChange={(e) => onChange('passportNumber', e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="passportIssueDate">Issue Date</Label>
            <Input
              id="passportIssueDate"
              type="date"
              value={formData.passportIssueDate}
              onChange={(e) => onChange('passportIssueDate', e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="passportExpiryDate">Expiry Date</Label>
            <Input
              id="passportExpiryDate"
              type="date"
              value={formData.passportExpiryDate}
              onChange={(e) => onChange('passportExpiryDate', e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="passportPlaceOfIssue">Place of Issue</Label>
          <Input
            id="passportPlaceOfIssue"
            value={formData.passportPlaceOfIssue}
            onChange={(e) => onChange('passportPlaceOfIssue', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PassportSection;