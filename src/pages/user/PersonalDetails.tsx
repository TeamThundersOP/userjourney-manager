import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import PersonalDetailsForm from "@/components/user/PersonalDetailsForm";

const PersonalDetails = () => {
  const [formData, setFormData] = useState({
    familyName: "",
    givenName: "",
    otherNames: "",
    nationality: "",
    placeOfBirth: "",
    dateOfBirth: "",
    gender: "",
    countryOfResidence: "",
    passportNumber: "",
    passportIssueDate: "",
    passportExpiryDate: "",
    passportPlaceOfIssue: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }

    // Get user's email from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.id === Number(userId));
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email
      }));
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((user: any) =>
      user.id === Number(userId)
        ? {
            ...user,
            personalInfo: {
              ...formData,
              fullName: `${formData.givenName} ${formData.familyName}`,
            },
            hasCompletedPersonalInfo: true,
          }
        : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    toast({
      title: "Success",
      description: "Personal details saved successfully",
    });

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Complete Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <PersonalDetailsForm formData={formData} setFormData={setFormData} />
            <Button type="submit" className="w-full">
              Save Details
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalDetails;