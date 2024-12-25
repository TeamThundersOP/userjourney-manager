import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { User } from "@/types/user";

const PersonalDetailsForm = () => {
  const navigate = useNavigate();
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
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userId = localStorage.getItem('userId');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === Number(userId));
    
    if (userIndex !== -1) {
      const updatedUser = {
        ...users[userIndex],
        personalInfo: formData,
        onboarding: {
          currentPhase: 0,
          phase0: {
            cvSubmitted: false,
            interviewCompleted: false,
            offerLetterSent: false,
            cosSent: false,
            rightToWorkSent: false,
            documentsUploaded: false,
            visaStatus: 'pending'
          },
          phase1: users[userIndex].onboarding?.phase1 || {},
          phase2: users[userIndex].onboarding?.phase2 || {},
          approvals: {
            phase0: false,
            phase1: false,
            phase2: false
          }
        }
      };
      
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
      
      toast.success("Personal details saved successfully");
      navigate("/user/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="familyName">Family Name</Label>
        <Input
          id="familyName"
          value={formData.familyName}
          onChange={(e) => setFormData({ ...formData, familyName: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="givenName">Given Name</Label>
        <Input
          id="givenName"
          value={formData.givenName}
          onChange={(e) => setFormData({ ...formData, givenName: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="otherNames">Other Names</Label>
        <Input
          id="otherNames"
          value={formData.otherNames}
          onChange={(e) => setFormData({ ...formData, otherNames: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="nationality">Nationality</Label>
        <Input
          id="nationality"
          value={formData.nationality}
          onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="placeOfBirth">Place of Birth</Label>
        <Input
          id="placeOfBirth"
          value={formData.placeOfBirth}
          onChange={(e) => setFormData({ ...formData, placeOfBirth: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Input
          id="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="gender">Gender</Label>
        <Input
          id="gender"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="countryOfResidence">Country of Residence</Label>
        <Input
          id="countryOfResidence"
          value={formData.countryOfResidence}
          onChange={(e) => setFormData({ ...formData, countryOfResidence: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="passportNumber">Passport Number</Label>
        <Input
          id="passportNumber"
          value={formData.passportNumber}
          onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="passportIssueDate">Passport Issue Date</Label>
        <Input
          id="passportIssueDate"
          type="date"
          value={formData.passportIssueDate}
          onChange={(e) => setFormData({ ...formData, passportIssueDate: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="passportExpiryDate">Passport Expiry Date</Label>
        <Input
          id="passportExpiryDate"
          type="date"
          value={formData.passportExpiryDate}
          onChange={(e) => setFormData({ ...formData, passportExpiryDate: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="passportPlaceOfIssue">Place of Issue (Passport)</Label>
        <Input
          id="passportPlaceOfIssue"
          value={formData.passportPlaceOfIssue}
          onChange={(e) => setFormData({ ...formData, passportPlaceOfIssue: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="address">Current Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="postalCode">Postal Code</Label>
        <Input
          id="postalCode"
          value={formData.postalCode}
          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="phone">Mobile Number</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
};

export default PersonalDetailsForm;
