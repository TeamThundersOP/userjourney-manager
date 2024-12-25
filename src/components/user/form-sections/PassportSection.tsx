import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PassportSectionProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PassportSection = ({ formData, handleInputChange }: PassportSectionProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-primary">Passport Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="passportNumber">Passport Number</Label>
          <Input
            id="passportNumber"
            name="passportNumber"
            value={formData.passportNumber}
            onChange={handleInputChange}
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="passportIssuePlace">Place of Issue</Label>
          <Input
            id="passportIssuePlace"
            name="passportIssuePlace"
            value={formData.passportIssuePlace}
            onChange={handleInputChange}
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="passportIssueDate">Issue Date</Label>
          <Input
            id="passportIssueDate"
            name="passportIssueDate"
            type="date"
            value={formData.passportIssueDate}
            onChange={handleInputChange}
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="passportExpiryDate">Expiry Date</Label>
          <Input
            id="passportExpiryDate"
            name="passportExpiryDate"
            type="date"
            value={formData.passportExpiryDate}
            onChange={handleInputChange}
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
    </div>
  );
};

export default PassportSection;