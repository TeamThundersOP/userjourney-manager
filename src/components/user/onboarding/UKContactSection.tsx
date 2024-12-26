import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface UKContactSectionProps {
  ukContactNumber: string;
  ukAddress: string;
  onUKContactChange: (field: 'ukContactNumber' | 'ukAddress', value: string) => void;
}

const UKContactSection = ({ ukContactNumber, ukAddress, onUKContactChange }: UKContactSectionProps) => {
  return (
    <div className="space-y-2">
      <Label>UK Contact Details</Label>
      <Input
        placeholder="Phone number"
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
  );
};

export default UKContactSection;