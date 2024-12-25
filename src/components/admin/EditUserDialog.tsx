import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/types/user";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditUserDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedUser: User) => void;
}

const EditUserDialog = ({ user, open, onOpenChange, onSave }: EditUserDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: user.email,
    familyName: user.personalInfo?.familyName || "",
    givenName: user.personalInfo?.givenName || "",
    otherNames: user.personalInfo?.otherNames || "",
    nationality: user.personalInfo?.nationality || "",
    placeOfBirth: user.personalInfo?.placeOfBirth || "",
    dateOfBirth: user.personalInfo?.dateOfBirth || "",
    gender: user.personalInfo?.gender || "",
    countryOfResidence: user.personalInfo?.countryOfResidence || "",
    passportNumber: user.personalInfo?.passportNumber || "",
    passportIssueDate: user.personalInfo?.passportIssueDate || "",
    passportExpiryDate: user.personalInfo?.passportExpiryDate || "",
    passportPlaceOfIssue: user.personalInfo?.passportPlaceOfIssue || "",
    address: user.personalInfo?.address || "",
    city: user.personalInfo?.city || "",
    postalCode: user.personalInfo?.postalCode || "",
    country: user.personalInfo?.country || "",
    phone: user.personalInfo?.phone || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedUser: User = {
      ...user,
      email: formData.email,
      personalInfo: {
        ...user.personalInfo,
        familyName: formData.familyName,
        givenName: formData.givenName,
        otherNames: formData.otherNames,
        fullName: `${formData.givenName} ${formData.familyName}`,
        nationality: formData.nationality,
        placeOfBirth: formData.placeOfBirth,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        countryOfResidence: formData.countryOfResidence,
        passportNumber: formData.passportNumber,
        passportIssueDate: formData.passportIssueDate,
        passportExpiryDate: formData.passportExpiryDate,
        passportPlaceOfIssue: formData.passportPlaceOfIssue,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        phone: formData.phone,
      },
    };

    onSave(updatedUser);
    toast({
      title: "Success",
      description: "User profile updated successfully",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit User Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email ID</Label>
              <Input
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="familyName">Family Name</Label>
                <Input
                  id="familyName"
                  value={formData.familyName}
                  onChange={(e) => setFormData({ ...formData, familyName: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="givenName">Given Name</Label>
                <Input
                  id="givenName"
                  value={formData.givenName}
                  onChange={(e) => setFormData({ ...formData, givenName: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="otherNames">Other Names</Label>
              <Input
                id="otherNames"
                value={formData.otherNames}
                onChange={(e) => setFormData({ ...formData, otherNames: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="placeOfBirth">Place of Birth</Label>
                <Input
                  id="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={(e) => setFormData({ ...formData, placeOfBirth: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value })}
                >
                  <SelectTrigger id="gender">
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

            <div className="grid gap-2">
              <Label htmlFor="countryOfResidence">Country of Residence</Label>
              <Input
                id="countryOfResidence"
                value={formData.countryOfResidence}
                onChange={(e) => setFormData({ ...formData, countryOfResidence: e.target.value })}
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Passport Information</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="passportNumber">Passport Number</Label>
                  <Input
                    id="passportNumber"
                    value={formData.passportNumber}
                    onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="passportIssueDate">Issue Date</Label>
                    <Input
                      id="passportIssueDate"
                      type="date"
                      value={formData.passportIssueDate}
                      onChange={(e) => setFormData({ ...formData, passportIssueDate: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="passportExpiryDate">Expiry Date</Label>
                    <Input
                      id="passportExpiryDate"
                      type="date"
                      value={formData.passportExpiryDate}
                      onChange={(e) => setFormData({ ...formData, passportExpiryDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="passportPlaceOfIssue">Place of Issue</Label>
                  <Input
                    id="passportPlaceOfIssue"
                    value={formData.passportPlaceOfIssue}
                    onChange={(e) => setFormData({ ...formData, passportPlaceOfIssue: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Contact Information</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="address">Current Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Mobile Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;