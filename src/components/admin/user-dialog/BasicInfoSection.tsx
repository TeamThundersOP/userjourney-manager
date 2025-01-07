import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BasicInfoSectionProps {
  formData: {
    email: string;
    familyName: string;
    givenName: string;
    otherNames: string;
  };
  onChange: (field: string, value: string) => void;
}

const BasicInfoSection = ({ formData, onChange }: BasicInfoSectionProps) => {
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="email">Email ID</Label>
        <Input
          id="email"
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="familyName">Family Name</Label>
          <Input
            id="familyName"
            value={formData.familyName}
            onChange={(e) => onChange('familyName', e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="givenName">Given Name</Label>
          <Input
            id="givenName"
            value={formData.givenName}
            onChange={(e) => onChange('givenName', e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="otherNames">Other Names</Label>
        <Input
          id="otherNames"
          value={formData.otherNames}
          onChange={(e) => onChange('otherNames', e.target.value)}
        />
      </div>
    </>
  );
};

export default BasicInfoSection;