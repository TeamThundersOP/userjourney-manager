import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '@/contexts/UserAuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
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
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">ID</label>
                <Input value={user.id} disabled />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input value={user.email} disabled />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Family Name</label>
                <Input
                  value={formData.familyName}
                  onChange={(e) => setFormData({ ...formData, familyName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Given Name</label>
                <Input
                  value={formData.givenName}
                  onChange={(e) => setFormData({ ...formData, givenName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Other Names</label>
              <Input
                value={formData.otherNames}
                onChange={(e) => setFormData({ ...formData, otherNames: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nationality</label>
                <Input
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Place of Birth</label>
                <Input
                  value={formData.placeOfBirth}
                  onChange={(e) => setFormData({ ...formData, placeOfBirth: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date of Birth</label>
                <Input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Gender</label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Country of Residence</label>
              <Input
                value={formData.countryOfResidence}
                onChange={(e) => setFormData({ ...formData, countryOfResidence: e.target.value })}
                required
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Passport Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Passport Number</label>
                  <Input
                    value={formData.passportNumber}
                    onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Place of Issue</label>
                  <Input
                    value={formData.passportPlaceOfIssue}
                    onChange={(e) => setFormData({ ...formData, passportPlaceOfIssue: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Issue Date</label>
                  <Input
                    type="date"
                    value={formData.passportIssueDate}
                    onChange={(e) => setFormData({ ...formData, passportIssueDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Expiry Date</label>
                  <Input
                    type="date"
                    value={formData.passportExpiryDate}
                    onChange={(e) => setFormData({ ...formData, passportExpiryDate: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Address</label>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">City</label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Postal Code</label>
                  <Input
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Country</label>
                  <Input
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mobile Number</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Save Information
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInfo;