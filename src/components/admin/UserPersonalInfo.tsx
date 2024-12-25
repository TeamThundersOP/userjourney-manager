import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PenSquare, User, Mail, Phone, MapPin, Globe, Calendar, Passport } from "lucide-react";
import { User as UserType } from "@/types/user";
import { useState } from "react";
import EditUserDialog from "./EditUserDialog";

interface UserPersonalInfoProps {
  user: UserType;
}

const UserPersonalInfo = ({ user: initialUser }: UserPersonalInfoProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [user, setUser] = useState(initialUser);

  const handleSaveUser = (updatedUser: UserType) => {
    setUser(updatedUser);
    // Update localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: UserType) => 
      u.id === updatedUser.id ? updatedUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Personal Information
        </CardTitle>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsEditDialogOpen(true)}
        >
          <PenSquare className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <User className="h-4 w-4" />
            User ID
          </p>
          <p className="font-medium">#{user.id}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </p>
          <p className="font-medium">{user.email}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <User className="h-4 w-4" />
            Full Name
          </p>
          <p className="font-medium">
            {user.personalInfo?.familyName} {user.personalInfo?.givenName}
            {user.personalInfo?.otherNames && ` (${user.personalInfo.otherNames})`}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
              Status
            </Badge>
          </p>
          <p className="font-medium">{user.status}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Nationality
          </p>
          <p className="font-medium">{user.personalInfo?.nationality}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Date of Birth
          </p>
          <p className="font-medium">{user.personalInfo?.dateOfBirth}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <User className="h-4 w-4" />
            Gender
          </p>
          <p className="font-medium capitalize">{user.personalInfo?.gender}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Country of Residence
          </p>
          <p className="font-medium">{user.personalInfo?.countryOfResidence}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Place of Birth
          </p>
          <p className="font-medium">{user.personalInfo?.placeOfBirth}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Passport className="h-4 w-4" />
            Passport Information
          </p>
          <div className="space-y-1">
            <p className="font-medium">Number: {user.personalInfo?.passportNumber}</p>
            <p className="font-medium">Issue Place: {user.personalInfo?.passportIssuePlace}</p>
            <p className="font-medium">Issue Date: {user.personalInfo?.passportIssueDate}</p>
            <p className="font-medium">Expiry Date: {user.personalInfo?.passportExpiryDate}</p>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Contact
          </p>
          <p className="font-medium">Mobile: {user.personalInfo?.mobileNumber}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Address
          </p>
          <div className="space-y-1">
            <p className="font-medium">{user.personalInfo?.address}</p>
            <p className="font-medium">{user.personalInfo?.city}, {user.personalInfo?.postalCode}</p>
            <p className="font-medium">{user.personalInfo?.country}</p>
          </div>
        </div>
      </CardContent>

      <EditUserDialog
        user={user}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSaveUser}
      />
    </Card>
  );
};

export default UserPersonalInfo;