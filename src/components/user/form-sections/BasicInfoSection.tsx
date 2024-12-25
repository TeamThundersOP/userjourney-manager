import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BasicInfoSectionProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (value: string, name: string) => void;
  userId: string | null;
  userEmail: string | null;
}

const BasicInfoSection = ({ formData, handleInputChange, handleSelectChange, userId, userEmail }: BasicInfoSectionProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-primary">Basic Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="id">ID</Label>
          <Input id="id" value={userId || ''} disabled className="bg-accent/10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={userEmail || ''} disabled className="bg-accent/10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="familyName">Family Name</Label>
          <Input
            id="familyName"
            name="familyName"
            value={formData.familyName}
            onChange={handleInputChange}
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="givenName">Given Name</Label>
          <Input
            id="givenName"
            name="givenName"
            value={formData.givenName}
            onChange={handleInputChange}
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="otherNames">Other Names</Label>
          <Input
            id="otherNames"
            name="otherNames"
            value={formData.otherNames}
            onChange={handleInputChange}
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select 
            value={formData.gender} 
            onValueChange={(value) => handleSelectChange(value, 'gender')}
            required
          >
            <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
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
    </div>
  );
};

export default BasicInfoSection;