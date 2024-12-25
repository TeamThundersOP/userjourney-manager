import FormSection from '../FormSection';
import FormField from '../FormField';
import { PersonalInfoFormData } from './PersonalInfoForm';

interface PassportInfoSectionProps {
  formData: PersonalInfoFormData;
  setFormData: React.Dispatch<React.SetStateAction<PersonalInfoFormData>>;
}

const PassportInfoSection = ({ formData, setFormData }: PassportInfoSectionProps) => {
  return (
    <FormSection title="Passport Information">
      <FormField
        label="Passport Number"
        id="passportNumber"
        value={formData.passportNumber}
        onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
        required
      />
      <FormField
        label="Place of Issue"
        id="passportPlaceOfIssue"
        value={formData.passportPlaceOfIssue}
        onChange={(e) => setFormData({ ...formData, passportPlaceOfIssue: e.target.value })}
        required
      />
      <FormField
        label="Issue Date"
        id="passportIssueDate"
        type="date"
        value={formData.passportIssueDate}
        onChange={(e) => setFormData({ ...formData, passportIssueDate: e.target.value })}
        required
      />
      <FormField
        label="Expiry Date"
        id="passportExpiryDate"
        type="date"
        value={formData.passportExpiryDate}
        onChange={(e) => setFormData({ ...formData, passportExpiryDate: e.target.value })}
        required
      />
    </FormSection>
  );
};

export default PassportInfoSection;