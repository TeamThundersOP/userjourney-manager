import { PersonalInfoFormData } from "@/components/user/personal-info/PersonalInfoForm";
import { Json } from "@/integrations/supabase/types";

export const transformPersonalInfo = (data: Json): PersonalInfoFormData => {
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    throw new Error('Invalid personal info data');
  }

  const personalInfo = data as Record<string, Json>;
  
  return {
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
};