import FormSection from '../FormSection';
import FormField from '../FormField';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PersonalInfoFormData } from './PersonalInfoForm';

interface AdditionalInfoSectionProps {
  formData: PersonalInfoFormData;
  setFormData: React.Dispatch<React.SetStateAction<PersonalInfoFormData>>;
}

const AdditionalInfoSection = ({ formData, setFormData }: AdditionalInfoSectionProps) => {
  return (
    <FormSection title="Additional Information">
      <FormField
        label="Nationality"
        id="nationality"
        value={formData.nationality}
        onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
        required
      />
      <FormField
        label="Place of Birth"
        id="placeOfBirth"
        value={formData.placeOfBirth}
        onChange={(e) => setFormData({ ...formData, placeOfBirth: e.target.value })}
        required
      />
      <FormField
        label="Date of Birth"
        id="dateOfBirth"
        type="date"
        value={formData.dateOfBirth}
        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
        required
      />
      <div className="space-y-2">
        <label className="text-sm font-medium">Gender</label>
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
      <FormField
        label="Country of Residence"
        id="countryOfResidence"
        value={formData.countryOfResidence}
        onChange={(e) => setFormData({ ...formData, countryOfResidence: e.target.value })}
        required
      />
    </FormSection>
  );
};

export default AdditionalInfoSection;