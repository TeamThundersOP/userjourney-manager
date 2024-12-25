import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactSectionProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContactSection = ({ formData, handleInputChange }: ContactSectionProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-primary">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="address">Current Address</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mobileNumber">Mobile Number</Label>
          <Input
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;