import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NationalitySectionProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NationalitySection = ({ formData, handleInputChange }: NationalitySectionProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-primary">Nationality & Birth Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="nationality">Nationality</Label>
          <Input
            id="nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleInputChange}
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="countryOfResidence">Country of Residence</Label>
          <Input
            id="countryOfResidence"
            name="countryOfResidence"
            value={formData.countryOfResidence}
            onChange={handleInputChange}
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="placeOfBirth">Place of Birth</Label>
          <Input
            id="placeOfBirth"
            name="placeOfBirth"
            value={formData.placeOfBirth}
            onChange={handleInputChange}
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
    </div>
  );
};

export default NationalitySection;