import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PersonalInfoFormProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (value: string, name: string) => void;
  userId: string | null;
  userEmail: string | null;
}

const PersonalInfoForm = ({ formData, handleInputChange, handleSelectChange, userId, userEmail }: PersonalInfoFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Disabled Fields */}
      <div className="space-y-2">
        <Label htmlFor="id">ID</Label>
        <Input id="id" value={userId || ''} disabled />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={userEmail || ''} disabled />
      </div>
      
      {/* Personal Details */}
      <div className="space-y-2">
        <Label htmlFor="familyName">Family Name *</Label>
        <Input
          id="familyName"
          name="familyName"
          value={formData.familyName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="givenName">Given Name *</Label>
        <Input
          id="givenName"
          name="givenName"
          value={formData.givenName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="otherNames">Other Names</Label>
        <Input
          id="otherNames"
          name="otherNames"
          value={formData.otherNames}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="nationality">Nationality *</Label>
        <Input
          id="nationality"
          name="nationality"
          value={formData.nationality}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="placeOfBirth">Place of Birth *</Label>
        <Input
          id="placeOfBirth"
          name="placeOfBirth"
          value={formData.placeOfBirth}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
        <Input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="gender">Gender *</Label>
        <Select 
          value={formData.gender} 
          onValueChange={(value) => handleSelectChange(value, 'gender')}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="countryOfResidence">Country of Residence *</Label>
        <Input
          id="countryOfResidence"
          name="countryOfResidence"
          value={formData.countryOfResidence}
          onChange={handleInputChange}
          required
        />
      </div>
      
      {/* Passport Details */}
      <div className="space-y-2">
        <Label htmlFor="passportNumber">Passport Number *</Label>
        <Input
          id="passportNumber"
          name="passportNumber"
          value={formData.passportNumber}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="passportIssueDate">Passport Issue Date *</Label>
        <Input
          id="passportIssueDate"
          name="passportIssueDate"
          type="date"
          value={formData.passportIssueDate}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="passportExpiryDate">Passport Expiry Date *</Label>
        <Input
          id="passportExpiryDate"
          name="passportExpiryDate"
          type="date"
          value={formData.passportExpiryDate}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="passportIssuePlace">Place of Issue (Passport) *</Label>
        <Input
          id="passportIssuePlace"
          name="passportIssuePlace"
          value={formData.passportIssuePlace}
          onChange={handleInputChange}
          required
        />
      </div>
      
      {/* Address Details */}
      <div className="space-y-2">
        <Label htmlFor="address">Current Address *</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="city">City *</Label>
        <Input
          id="city"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="postalCode">Postal Code *</Label>
        <Input
          id="postalCode"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="country">Country *</Label>
        <Input
          id="country"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="mobileNumber">Mobile Number *</Label>
        <Input
          id="mobileNumber"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;