import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { PersonalInfoFormData } from "@/components/user/personal-info/PersonalInfoForm";
import { transformPersonalInfo } from "@/utils/personalInfoUtils";
import { useToast } from "@/components/ui/use-toast";

export const usePersonalInfoForm = (userId: string | null) => {
  const [formData, setFormData] = useState<PersonalInfoFormData>(defaultFormData);
  const [initialFormData, setInitialFormData] = useState<PersonalInfoFormData | null>(null);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
        try {
          const personalInfo = transformPersonalInfo(candidate.personal_info);
          setFormData(personalInfo);
          setInitialFormData(personalInfo);
        } catch (error) {
          console.error('Error transforming personal info:', error);
          toast({
            title: "Error",
            description: "Failed to process user data",
          });
        }
      }
    };

    fetchUserData();
  }, [userId, toast]);

  useEffect(() => {
    if (initialFormData) {
      const hasChanges = Object.keys(formData).some(key => {
        const field = key as keyof PersonalInfoFormData;
        return formData[field] !== initialFormData[field];
      });
      
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

      setIsFormChanged(hasChanges || allRequiredFieldsFilled);
    }
  }, [formData, initialFormData]);

  return {
    formData,
    setFormData,
    isFormChanged,
    isLoading,
    setIsLoading,
    initialFormData,
    setInitialFormData,
  };
};

export const defaultFormData: PersonalInfoFormData = {
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