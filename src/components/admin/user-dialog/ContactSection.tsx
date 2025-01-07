import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactSectionProps {
  formData: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  onChange: (field: string, value: string) => void;
}

const ContactSection = ({ formData, onChange }: ContactSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Contact Information</h3>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="address">Current Address</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => onChange('address', e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => onChange('city', e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              id="postalCode"
              value={formData.postalCode}
              onChange={(e) => onChange('postalCode', e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            value={formData.country}
            onChange={(e) => onChange('country', e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Mobile Number</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => onChange('phone', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;