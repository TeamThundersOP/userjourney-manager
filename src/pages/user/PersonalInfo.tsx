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
    <div className="min-h-screen bg-accent/5 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader className="text-center space-y-2 pb-8 border-b">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Personal Information
          </CardTitle>
          <p className="text-muted-foreground">
            Please fill in your personal details below
          </p>
        </CardHeader>
        <CardContent className="pt-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <PersonalInfoForm 
              formData={formData}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              userId={userId}
              userEmail={userEmail}
            />
            
            <div className="flex justify-end pt-6">
              <Button 
                type="submit" 
                className="px-8 py-6 text-lg font-medium transition-all duration-200 hover:scale-105"
              >
                Save Personal Information
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInfo;