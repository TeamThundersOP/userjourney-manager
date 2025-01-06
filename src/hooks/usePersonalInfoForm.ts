import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { PersonalInfoFormData } from "@/components/user/personal-info/PersonalInfoForm";
import { useToast } from "@/components/ui/use-toast";
import { Json } from '@/integrations/supabase/types';

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

export const usePersonalInfoForm = (userId: string | null) => {
  const [formData, setFormData] = useState<PersonalInfoFormData>(defaultFormData);
  const [initialFormData, setInitialFormData] = useState<PersonalInfoFormData>(defaultFormData);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        const { data: candidate, error } = await supabase
          .from('candidates')
          .select('personal_info')
          .eq('id', userId)
          .maybeSingle();

        if (error) {
          console.error('Error fetching user data:', error);
          toast({
            title: "Error",
            description: "Failed to fetch user data",
            variant: "destructive",
          });
          return;
        }

        if (candidate?.personal_info) {
          const personalInfo = candidate.personal_info as Record<string, Json>;
          const transformedData: PersonalInfoFormData = {
            familyName: String(personalInfo.familyName || ''),
            givenName: String(personalInfo.givenName || ''),
            otherNames: String(personalInfo.otherNames || ''),
            nationality: String(personalInfo.nationality || ''),
            placeOfBirth: String(personalInfo.placeOfBirth || ''),
            dateOfBirth: String(personalInfo.dateOfBirth || ''),
            gender: String(personalInfo.gender || ''),
            countryOfResidence: String(personalInfo.countryOfResidence || ''),
            passportNumber: String(personalInfo.passportNumber || ''),
            passportIssueDate: String(personalInfo.passportIssueDate || ''),
            passportExpiryDate: String(personalInfo.passportExpiryDate || ''),
            passportPlaceOfIssue: String(personalInfo.passportPlaceOfIssue || ''),
            address: String(personalInfo.address || ''),
            city: String(personalInfo.city || ''),
            postalCode: String(personalInfo.postalCode || ''),
            country: String(personalInfo.country || ''),
            phone: String(personalInfo.phone || ''),
          };
          
          setFormData(transformedData);
          setInitialFormData(transformedData);
        }
      } catch (error) {
        console.error('Error in fetchUserData:', error);
        toast({
          title: "Error",
          description: "Failed to process user data",
          variant: "destructive",
        });
      }
    };

    fetchUserData();
  }, [userId, toast]);

  useEffect(() => {
    if (!initialFormData) return;

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

    setIsFormChanged(hasChanges && allRequiredFieldsFilled);
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