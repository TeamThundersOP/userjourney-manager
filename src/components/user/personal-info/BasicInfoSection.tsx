import FormSection from '../FormSection';
import FormField from '../FormField';
import { PersonalInfoFormData } from './PersonalInfoForm';

interface BasicInfoSectionProps {
  formData: PersonalInfoFormData;
  setFormData: React.Dispatch<React.SetStateAction<PersonalInfoFormData>>;
}

const BasicInfoSection = ({ formData, setFormData }: BasicInfoSectionProps) => {
  return (
    <FormSection title="Basic Information">
      <FormField
        label="Family Name"
        id="familyName"
        value={formData.familyName}
        onChange={(e) => setFormData({ ...formData, familyName: e.target.value })}
        required
      />
      <FormField
        label="Given Name"
        id="givenName"
        value={formData.givenName}
        onChange={(e) => setFormData({ ...formData, givenName: e.target.value })}
        required
      />
      <FormField
        label="Other Names"
        id="otherNames"
        value={formData.otherNames}
        onChange={(e) => setFormData({ ...formData, otherNames: e.target.value })}
      />
    </FormSection>
  );
};

export default BasicInfoSection;