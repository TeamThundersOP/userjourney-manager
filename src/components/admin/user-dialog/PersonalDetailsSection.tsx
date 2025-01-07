import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PersonalDetailsSectionProps {
  formData: {
    nationality: string;
    placeOfBirth: string;
    dateOfBirth: string;
    gender: string;
    countryOfResidence: string;
  };
  onChange: (field: string, value: string) => void;
}

const PersonalDetailsSection = ({ formData, onChange }: PersonalDetailsSectionProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="nationality">Nationality</Label>
          <Input
            id="nationality"
            value={formData.nationality}
            onChange={(e) => onChange('nationality', e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="placeOfBirth">Place of Birth</Label>
          <Input
            id="placeOfBirth"
            value={formData.placeOfBirth}
            onChange={(e) => onChange('placeOfBirth', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => onChange('dateOfBirth', e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={formData.gender}
            onValueChange={(value) => onChange('gender', value)}
          >
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="countryOfResidence">Country of Residence</Label>
        <Input
          id="countryOfResidence"
          value={formData.countryOfResidence}
          onChange={(e) => onChange('countryOfResidence', e.target.value)}
        />
      </div>
    </>
  );
};

export default PersonalDetailsSection;