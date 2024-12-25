import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import PersonalDetailsForm from "@/components/user/PersonalDetailsForm";
import { User } from "@/types/user";

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
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/login");
      return;
    }

    // Get user's data from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: User) => u.email === userEmail);
    
    if (user && user.personalInfo) {
      setFormData({
        familyName: user.personalInfo.familyName || "",
        givenName: user.personalInfo.givenName || "",
        otherNames: user.personalInfo.otherNames || "",
        nationality: user.personalInfo.nationality || "",
        placeOfBirth: user.personalInfo.placeOfBirth || "",
        dateOfBirth: user.personalInfo.dateOfBirth || "",
        gender: user.personalInfo.gender || "",
        countryOfResidence: user.personalInfo.countryOfResidence || "",
        passportNumber: user.personalInfo.passportNumber || "",
        passportIssueDate: user.personalInfo.passportIssueDate || "",
        passportExpiryDate: user.personalInfo.passportExpiryDate || "",
        passportPlaceOfIssue: user.personalInfo.passportPlaceOfIssue || "",
        address: user.personalInfo.address || "",
        city: user.personalInfo.city || "",
        postalCode: user.personalInfo.postalCode || "",
        country: user.personalInfo.country || "",
        email: user.email || "",
        phone: user.personalInfo.phone || "",
      });
    } else {
      setFormData(prev => ({
        ...prev,
        email: userEmail
      }));
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/login");
      return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((user: User) =>
      user.email === userEmail
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

    navigate("/user/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">My Profile</CardTitle>
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