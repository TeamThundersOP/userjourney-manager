import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactDetailsSectionProps {
  ukContactNumber: string;
  ukAddress: string;
  onUKContactChange: (field: 'ukContactNumber' | 'ukAddress', value: string) => void;
}

const ContactDetailsSection = ({
  ukContactNumber,
  ukAddress,
  onUKContactChange
}: ContactDetailsSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>UK Contact Details</Label>
        <Input
          placeholder="UK Phone number"
          type="tel"
          value={ukContactNumber}
          onChange={(e) => onUKContactChange('ukContactNumber', e.target.value)}
        />
        <Input
          placeholder="UK Address"
          value={ukAddress}
          onChange={(e) => onUKContactChange('ukAddress', e.target.value)}
        />
      </div>
    </div>
  );
};

export default ContactDetailsSection;