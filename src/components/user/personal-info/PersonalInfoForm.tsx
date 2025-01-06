import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '@/contexts/UserAuthContext';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import BasicInfoSection from './BasicInfoSection';
import AdditionalInfoSection from './AdditionalInfoSection';
import PassportInfoSection from './PassportInfoSection';
import ContactInfoSection from './ContactInfoSection';

export interface PersonalInfoFormData {
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
  phone: string;
}

const PersonalInfoForm = () => {
  const { userId, setHasFilledPersonalInfo } = useUserAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<PersonalInfoFormData>({
    familyName: '',
    givenName: '',
    otherNames: '',
    nationality: '',
    placeOfBirth: '',
    dateOfBirth: '',
    gender: '',
    countryOfResidence: '',
    passportNumber: '',
    passportIssueDate: '',
    passportExpiryDate: '',
    passportPlaceOfIssue: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });
  const [initialFormData, setInitialFormData] = useState<PersonalInfoFormData | null>(null);
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = users.find((u: any) => u.id.toString() === userId);
    if (currentUser?.personalInfo) {
      const personalInfo = currentUser.personalInfo;
      setFormData(personalInfo);
      setInitialFormData(personalInfo);
    }
  }, [userId]);

  useEffect(() => {
    if (initialFormData) {
      // Check if any field has been changed from its initial value
      const hasChanges = Object.keys(formData).some(key => {
        const field = key as keyof PersonalInfoFormData;
        return formData[field] !== initialFormData[field];
      });
      
      // Also check if all required fields are filled
      const requiredFields: (keyof PersonalInfoFormData)[] = [
        'familyName',
        'givenName',
        'nationality',
        'placeOfBirth',
        'dateOfBirth',
        'gender',
        'countryOfResidence',
        'passportNumber',
        'passportIssueDate',
        'passportExpiryDate',
        'passportPlaceOfIssue',
        'address',
        'city',
        'postalCode',
        'country',
        'phone'
      ];
      
      const allRequiredFieldsFilled = requiredFields.every(field => 
        formData[field] && formData[field].trim() !== ''
      );

      // Enable the button if either there are changes or all required fields are filled
      setIsFormChanged(hasChanges || allRequiredFieldsFilled);
    }
  }, [formData, initialFormData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: any) => {
      if (u.id.toString() === userId) {
        const currentOnboarding = u.onboarding || {
          currentPhase: 0,
          phase0: {
            personalDetailsCompleted: false,
            cvSubmitted: false,
            interviewCompleted: false,
            jobStatus: 'pending',
            passportUploaded: false,
            pccUploaded: false,
            otherDocumentsUploaded: false,
            offerLetterSent: false,
            cosSent: false,
            rightToWorkSent: false,
            documentsUploaded: false,
            visaStatus: 'pending',
            travelDetailsUpdated: false,
            travelDocumentsUploaded: false,
            visaCopyUploaded: false,
            ukContactUpdated: false
          },
          phase1: {
            hmrcChecklist: false,
            companyAgreements: false,
            pensionScheme: false,
            bankStatements: false,
            vaccinationProof: false
          },
          phase2: {
            rightToWork: false,
            shareCode: false,
            dbs: false,
            onboardingComplete: false
          },
          approvals: {
            phase0: false,
            phase1: false,
            phase2: false
          }
        };

        return {
          ...u,
          personalInfo: {
            ...formData,
            fullName: `${formData.givenName} ${formData.familyName}`,
          },
          hasFilledPersonalInfo: true,
          onboarding: {
            ...currentOnboarding,
            phase0: {
              ...currentOnboarding.phase0,
              personalDetailsCompleted: true
            }
          }
        };
      }
      return u;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('hasFilledPersonalInfo', 'true');
    setHasFilledPersonalInfo(true);

    toast({
      title: "Success",
      description: "Personal information saved successfully",
    });

    setInitialFormData(formData);
    setIsFormChanged(false);
    navigate('/user/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white shadow-sm rounded-lg p-6 md:p-8">
      <BasicInfoSection formData={formData} setFormData={setFormData} />
      <AdditionalInfoSection formData={formData} setFormData={setFormData} />
      <PassportInfoSection formData={formData} setFormData={setFormData} />
      <ContactInfoSection formData={formData} setFormData={setFormData} />
      
      <Button type="submit" className="w-full" disabled={!isFormChanged}>
        Save Information
      </Button>
    </form>
  );
};

export default PersonalInfoForm;