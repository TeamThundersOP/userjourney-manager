import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '@/contexts/UserAuthContext';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import BasicInfoSection from './BasicInfoSection';
import AdditionalInfoSection from './AdditionalInfoSection';
import PassportInfoSection from './PassportInfoSection';
import ContactInfoSection from './ContactInfoSection';
import { supabase } from "@/integrations/supabase/client";

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

const defaultFormData: PersonalInfoFormData = {
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
};

const PersonalInfoForm = () => {
  const { userId, setHasFilledPersonalInfo } = useUserAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<PersonalInfoFormData>(defaultFormData);
  const [initialFormData, setInitialFormData] = useState<PersonalInfoFormData | null>(null);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      const { data: candidate, error } = await supabase
        .from('candidates')
        .select('personal_info')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: "Error",
          description: "Failed to fetch user data",
        });
        return;
      }

      if (candidate?.personal_info) {
        const personalInfo = candidate.personal_info as PersonalInfoFormData;
        setFormData(personalInfo);
        setInitialFormData(personalInfo);
      }
    };

    fetchUserData();
  }, [userId, toast]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('candidates')
        .update({
          personal_info: {
            ...formData,
            fullName: `${formData.givenName} ${formData.familyName}`,
          },
          onboarding: {
            currentPhase: 0,
            phase0: {
              personalDetailsCompleted: true,
              cvSubmitted: false,
              interviewCompleted: false,
              jobStatus: 'pending',
              passportUploaded: false,
              pccUploaded: false,
              otherDocumentsUploaded: false,
              offerLetterSent: false,
              cosSent: false,
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
          }
        })
        .eq('id', userId);

      if (error) throw error;

      setHasFilledPersonalInfo(true);
      toast({
        title: "Success",
        description: "Personal information saved successfully",
      });
      setInitialFormData(formData);
      setIsFormChanged(false);
      navigate('/user/dashboard');
    } catch (error) {
      console.error('Error saving personal info:', error);
      toast({
        title: "Error",
        description: "Failed to save personal information",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white shadow-sm rounded-lg p-6 md:p-8">
      <BasicInfoSection formData={formData} setFormData={setFormData} />
      <AdditionalInfoSection formData={formData} setFormData={setFormData} />
      <PassportInfoSection formData={formData} setFormData={setFormData} />
      <ContactInfoSection formData={formData} setFormData={setFormData} />
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={!isFormChanged || isLoading}
      >
        {isLoading ? "Saving..." : "Save Information"}
      </Button>
    </form>
  );
};

export default PersonalInfoForm;