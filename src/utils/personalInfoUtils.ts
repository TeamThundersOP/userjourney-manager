import { PersonalInfoFormData } from "@/components/user/personal-info/PersonalInfoForm";
import { Json } from "@/integrations/supabase/types";

export const transformPersonalInfo = (data: Json): PersonalInfoFormData => {
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    throw new Error('Invalid personal info data');
  }

  return {
    familyName: (data.familyName as string) || '',
    givenName: (data.givenName as string) || '',
    otherNames: (data.otherNames as string) || '',
    nationality: (data.nationality as string) || '',
    placeOfBirth: (data.placeOfBirth as string) || '',
    dateOfBirth: (data.dateOfBirth as string) || '',
    gender: (data.gender as string) || '',
    countryOfResidence: (data.countryOfResidence as string) || '',
    passportNumber: (data.passportNumber as string) || '',
    passportIssueDate: (data.passportIssueDate as string) || '',
    passportExpiryDate: (data.passportExpiryDate as string) || '',
    passportPlaceOfIssue: (data.passportPlaceOfIssue as string) || '',
    address: (data.address as string) || '',
    city: (data.city as string) || '',
    postalCode: (data.postalCode as string) || '',
    country: (data.country as string) || '',
    phone: (data.phone as string) || '',
  };
};