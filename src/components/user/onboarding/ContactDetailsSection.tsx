import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactDetailsSectionProps {
  ukContactNumber: string;
  ukAddress: string;
  usContactNumber: string;
  usAddress: string;
  onUKContactChange: (field: 'ukContactNumber' | 'ukAddress', value: string) => void;
  onUSContactChange: (field: 'usContactNumber' | 'usAddress', value: string) => void;
}

const ContactDetailsSection = ({
  ukContactNumber,
  ukAddress,
  usContactNumber,
  usAddress,
  onUKContactChange,
  onUSContactChange
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

      <div className="space-y-2">
        <Label>US Contact Details</Label>
        <Input
          placeholder="US Phone number"
          type="tel"
          value={usContactNumber}
          onChange={(e) => onUSContactChange('usContactNumber', e.target.value)}
        />
        <Input
          placeholder="US Address"
          value={usAddress}
          onChange={(e) => onUSContactChange('usAddress', e.target.value)}
        />
      </div>
    </div>
  );
};

export default ContactDetailsSection;