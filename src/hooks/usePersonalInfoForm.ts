import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { PersonalInfoFormData } from "@/components/user/personal-info/PersonalInfoForm";
import { transformPersonalInfo } from "@/utils/personalInfoUtils";
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
  const [initialFormData, setInitialFormData] = useState<PersonalInfoFormData | null>(null);
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
          .single();

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
            familyName: (personalInfo.familyName as string) || '',
            givenName: (personalInfo.givenName as string) || '',
            otherNames: (personalInfo.otherNames as string) || '',
            nationality: (personalInfo.nationality as string) || '',
            placeOfBirth: (personalInfo.placeOfBirth as string) || '',
            dateOfBirth: (personalInfo.dateOfBirth as string) || '',
            gender: (personalInfo.gender as string) || '',
            countryOfResidence: (personalInfo.countryOfResidence as string) || '',
            passportNumber: (personalInfo.passportNumber as string) || '',
            passportIssueDate: (personalInfo.passportIssueDate as string) || '',
            passportExpiryDate: (personalInfo.passportExpiryDate as string) || '',
            passportPlaceOfIssue: (personalInfo.passportPlaceOfIssue as string) || '',
            address: (personalInfo.address as string) || '',
            city: (personalInfo.city as string) || '',
            postalCode: (personalInfo.postalCode as string) || '',
            country: (personalInfo.country as string) || '',
            phone: (personalInfo.phone as string) || '',
          };
          
          console.log('Fetched personal info:', transformedData);
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

      setIsFormChanged(hasChanges || !allRequiredFieldsFilled);
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