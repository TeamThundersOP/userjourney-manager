import FormSection from '../FormSection';
import FormField from '../FormField';
import { PersonalInfoFormData } from './PersonalInfoForm';

interface ContactInfoSectionProps {
  formData: PersonalInfoFormData;
  setFormData: React.Dispatch<React.SetStateAction<PersonalInfoFormData>>;
}

const ContactInfoSection = ({ formData, setFormData }: ContactInfoSectionProps) => {
  return (
    <FormSection title="Contact Information">
      <FormField
        label="Current Address"
        id="address"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        required
      />
      <FormField
        label="City"
        id="city"
        value={formData.city}
        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        required
      />
      <FormField
        label="Postal Code"
        id="postalCode"
        value={formData.postalCode}
        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
        required
      />
      <FormField
        label="Country"
        id="country"
        value={formData.country}
        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
        required
      />
      <FormField
        label="Mobile Number"
        id="phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
      />
    </FormSection>
  );
};

export default ContactInfoSection;