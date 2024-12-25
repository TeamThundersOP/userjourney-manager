import BasicInfoSection from "./form-sections/BasicInfoSection";
import NationalitySection from "./form-sections/NationalitySection";
import PassportSection from "./form-sections/PassportSection";
import ContactSection from "./form-sections/ContactSection";

interface PersonalInfoFormProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (value: string, name: string) => void;
  userId: string | null;
  userEmail: string | null;
}

const PersonalInfoForm = ({ 
  formData, 
  handleInputChange, 
  handleSelectChange, 
  userId, 
  userEmail 
}: PersonalInfoFormProps) => {
  return (
    <div className="space-y-8">
      <BasicInfoSection
        formData={formData}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        userId={userId}
        userEmail={userEmail}
      />
      <div className="h-px bg-border/40" />
      <NationalitySection
        formData={formData}
        handleInputChange={handleInputChange}
      />
      <div className="h-px bg-border/40" />
      <PassportSection
        formData={formData}
        handleInputChange={handleInputChange}
      />
      <div className="h-px bg-border/40" />
      <ContactSection
        formData={formData}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default PersonalInfoForm;