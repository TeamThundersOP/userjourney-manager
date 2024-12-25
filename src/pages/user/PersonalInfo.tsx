import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '@/contexts/UserAuthContext';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import PersonalInfoHeader from '@/components/user/personal-info/PersonalInfoHeader';
import FormSection from '@/components/user/personal-info/FormSection';
import FormField from '@/components/user/personal-info/FormField';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PersonalInfo = () => {
  const { userId, setHasFilledPersonalInfo } = useUserAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
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

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = users.find((u: any) => u.id.toString() === userId);
    if (currentUser) {
      setUser(currentUser);
      if (currentUser.personalInfo) {
        setFormData({
          ...formData,
          ...currentUser.personalInfo
        });
      }
    }
  }, [userId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: any) => {
      if (u.id.toString() === userId) {
        return {
          ...u,
          personalInfo: {
            ...formData,
            fullName: `${formData.givenName} ${formData.familyName}`,
          },
          hasFilledPersonalInfo: true
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

    navigate('/user/dashboard');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-[#F2FCE2] via-white to-[#FEF7CD]">
      <div className="max-w-4xl mx-auto space-y-6">
        <PersonalInfoHeader />
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormSection title="Basic Information">
            <FormField
              label="ID"
              id="id"
              value={user.id}
              disabled
            />
            <FormField
              label="Email"
              id="email"
              value={user.email}
              disabled
            />
            <FormField
              label="Family Name"
              id="familyName"
              value={formData.familyName}
              onChange={(e) => setFormData({ ...formData, familyName: e.target.value })}
            />
            <FormField
              label="Given Name"
              id="givenName"
              value={formData.givenName}
              onChange={(e) => setFormData({ ...formData, givenName: e.target.value })}
            />
            <FormField
              label="Other Names"
              id="otherNames"
              value={formData.otherNames}
              onChange={(e) => setFormData({ ...formData, otherNames: e.target.value })}
              required={false}
            />
          </FormSection>

          <FormSection title="Personal Details">
            <FormField
              label="Nationality"
              id="nationality"
              value={formData.nationality}
              onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
            />
            <FormField
              label="Place of Birth"
              id="placeOfBirth"
              value={formData.placeOfBirth}
              onChange={(e) => setFormData({ ...formData, placeOfBirth: e.target.value })}
            />
            <FormField
              label="Date of Birth"
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            />
            <div className="space-y-2">
              <label htmlFor="gender" className="text-sm font-medium text-white">Gender</label>
              <Select
                value={formData.gender}
                onValueChange={(value) => setFormData({ ...formData, gender: value })}
              >
                <SelectTrigger className="w-full bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <FormField
              label="Country of Residence"
              id="countryOfResidence"
              value={formData.countryOfResidence}
              onChange={(e) => setFormData({ ...formData, countryOfResidence: e.target.value })}
            />
          </FormSection>

          <FormSection title="Passport Information">
            <FormField
              label="Passport Number"
              id="passportNumber"
              value={formData.passportNumber}
              onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
            />
            <FormField
              label="Place of Issue"
              id="passportPlaceOfIssue"
              value={formData.passportPlaceOfIssue}
              onChange={(e) => setFormData({ ...formData, passportPlaceOfIssue: e.target.value })}
            />
            <FormField
              label="Issue Date"
              id="passportIssueDate"
              type="date"
              value={formData.passportIssueDate}
              onChange={(e) => setFormData({ ...formData, passportIssueDate: e.target.value })}
            />
            <FormField
              label="Expiry Date"
              id="passportExpiryDate"
              type="date"
              value={formData.passportExpiryDate}
              onChange={(e) => setFormData({ ...formData, passportExpiryDate: e.target.value })}
            />
          </FormSection>

          <FormSection title="Contact Information">
            <FormField
              label="Current Address"
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            <FormField
              label="City"
              id="city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
            <FormField
              label="Postal Code"
              id="postalCode"
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            />
            <FormField
              label="Country"
              id="country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            />
            <FormField
              label="Mobile Number"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </FormSection>

          <Button
            type="submit"
            className="w-full glass-morphism bg-gradient-to-r from-[#D3E4FD] to-[#E5DEFF] text-gray-700 py-6 hover:opacity-90 transition-all duration-300"
          >
            Save Information
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;