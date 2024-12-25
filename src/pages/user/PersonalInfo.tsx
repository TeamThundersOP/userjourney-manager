import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import PersonalInfoForm from '@/components/user/PersonalInfoForm';

const PersonalInfo = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const userEmail = localStorage.getItem('userEmail');
  
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
    passportIssuePlace: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    mobileNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((user: any) => {
      if (user.id.toString() === userId) {
        return {
          ...user,
          personalInfo: {
            ...formData,
            id: userId,
            email: userEmail,
          },
          personalInfoCompleted: true,
        };
      }
      return user;
    });
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('personalInfoCompleted', 'true');
    
    toast.success("Personal information saved successfully");
    navigate('/dashboard');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <PersonalInfoForm 
              formData={formData}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              userId={userId}
              userEmail={userEmail}
            />
            
            <Button type="submit" className="w-full mt-6">
              Save Personal Information
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInfo;