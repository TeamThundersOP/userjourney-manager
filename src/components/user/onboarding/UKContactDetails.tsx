import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UKContactDetailsProps {
  ukContactNumber: string;
  ukAddress: string;
  onUKContactChange: (field: 'ukContactNumber' | 'ukAddress', value: string) => void;
}

const UKContactDetails = ({
  ukContactNumber,
  ukAddress,
  onUKContactChange
}: UKContactDetailsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>UK Contact Details</Label>
        <Input
          placeholder="UK Phone number"
          type="tel"
          value={ukContactNumber}
          onChange={(e) => onUKContactChange('ukContactNumber', e.target.value)}
          className="w-full"
        />
        <Input
          placeholder="UK Address"
          value={ukAddress}
          onChange={(e) => onUKContactChange('ukAddress', e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default UKContactDetails;