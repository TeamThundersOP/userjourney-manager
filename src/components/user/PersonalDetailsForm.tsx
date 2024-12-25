import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PersonalDetailsFormProps {
  formData: {
    familyName: string;
    givenName: string;
    otherNames: string;
    nationality: string;
    placeOfBirth: string;
    dateOfBirth: string;
    gender: string;
    countryOfResidence: string;
    passportNumber: string;
    passportIssueDate: string;
    passportExpiryDate: string;
    passportPlaceOfIssue: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    email: string;
    phone: string;
  };
  setFormData: (data: any) => void;
}

const PersonalDetailsForm = ({ formData, setFormData }: PersonalDetailsFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label htmlFor="familyName" className="text-sm font-medium">
          Family Name
        </label>
        <Input
          id="familyName"
          value={formData.familyName}
          onChange={(e) => setFormData({ ...formData, familyName: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="givenName" className="text-sm font-medium">
          Given Name
        </label>
        <Input
          id="givenName"
          value={formData.givenName}
          onChange={(e) => setFormData({ ...formData, givenName: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="otherNames" className="text-sm font-medium">
          Other Names
        </label>
        <Input
          id="otherNames"
          value={formData.otherNames}
          onChange={(e) => setFormData({ ...formData, otherNames: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="nationality" className="text-sm font-medium">
          Nationality
        </label>
        <Input
          id="nationality"
          value={formData.nationality}
          onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="placeOfBirth" className="text-sm font-medium">
          Place of Birth
        </label>
        <Input
          id="placeOfBirth"
          value={formData.placeOfBirth}
          onChange={(e) => setFormData({ ...formData, placeOfBirth: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="dateOfBirth" className="text-sm font-medium">
          Date of Birth
        </label>
        <Input
          id="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="gender" className="text-sm font-medium">
          Gender
        </label>
        <Select
          value={formData.gender}
          onValueChange={(value) => setFormData({ ...formData, gender: value })}
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
        <label htmlFor="countryOfResidence" className="text-sm font-medium">
          Country of Residence
        </label>
        <Input
          id="countryOfResidence"
          value={formData.countryOfResidence}
          onChange={(e) => setFormData({ ...formData, countryOfResidence: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="passportNumber" className="text-sm font-medium">
          Passport Number
        </label>
        <Input
          id="passportNumber"
          value={formData.passportNumber}
          onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="passportIssueDate" className="text-sm font-medium">
          Passport Issue Date
        </label>
        <Input
          id="passportIssueDate"
          type="date"
          value={formData.passportIssueDate}
          onChange={(e) => setFormData({ ...formData, passportIssueDate: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="passportExpiryDate" className="text-sm font-medium">
          Passport Expiry Date
        </label>
        <Input
          id="passportExpiryDate"
          type="date"
          value={formData.passportExpiryDate}
          onChange={(e) => setFormData({ ...formData, passportExpiryDate: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="passportPlaceOfIssue" className="text-sm font-medium">
          Place of Issue (Passport)
        </label>
        <Input
          id="passportPlaceOfIssue"
          value={formData.passportPlaceOfIssue}
          onChange={(e) => setFormData({ ...formData, passportPlaceOfIssue: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="address" className="text-sm font-medium">
          Current Address
        </label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="city" className="text-sm font-medium">
          City
        </label>
        <Input
          id="city"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="postalCode" className="text-sm font-medium">
          Postal Code
        </label>
        <Input
          id="postalCode"
          value={formData.postalCode}
          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="country" className="text-sm font-medium">
          Country
        </label>
        <Input
          id="country"
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          readOnly
          className="bg-gray-100"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium">
          Mobile Number
        </label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>
    </div>
  );
};

export default PersonalDetailsForm;