import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PenSquare, Key } from "lucide-react";
import { User } from "@/types/user";
import { useState } from "react";
import EditUserDialog from "./EditUserDialog";
import ResetUserPasswordDialog from "./ResetUserPasswordDialog";

interface UserPersonalInfoProps {
  user: User;
}

const UserPersonalInfo = ({ user: initialUser }: UserPersonalInfoProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false);
  const [user, setUser] = useState(initialUser);

  const handleSaveUser = (updatedUser: User) => {
    setUser(updatedUser);
    // Update localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: User) => 
      u.id === updatedUser.id ? updatedUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Personal Information</CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsResetPasswordDialogOpen(true)}
          >
            <Key className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <PenSquare className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">User ID</p>
          <p className="font-medium">#{user.id}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
            {user.status}
          </Badge>
        </div>
        <div>
          <p className="text-sm text-gray-500">Family Name</p>
          <p className="font-medium">{user.personalInfo?.familyName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Given Name</p>
          <p className="font-medium">{user.personalInfo?.givenName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Other Names</p>
          <p className="font-medium">{user.personalInfo?.otherNames}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Nationality</p>
          <p className="font-medium">{user.personalInfo?.nationality}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Place of Birth</p>
          <p className="font-medium">{user.personalInfo?.placeOfBirth}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Date of Birth</p>
          <p className="font-medium">{user.personalInfo?.dateOfBirth}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Gender</p>
          <p className="font-medium">{user.personalInfo?.gender}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Country of Residence</p>
          <p className="font-medium">{user.personalInfo?.countryOfResidence}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Passport Number</p>
          <p className="font-medium">{user.personalInfo?.passportNumber}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Passport Issue Date</p>
          <p className="font-medium">{user.personalInfo?.passportIssueDate}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Passport Expiry Date</p>
          <p className="font-medium">{user.personalInfo?.passportExpiryDate}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Place of Issue (Passport)</p>
          <p className="font-medium">{user.personalInfo?.passportPlaceOfIssue}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Current Address</p>
          <p className="font-medium">{user.personalInfo?.address}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">City</p>
          <p className="font-medium">{user.personalInfo?.city}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Postal Code</p>
          <p className="font-medium">{user.personalInfo?.postalCode}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Country</p>
          <p className="font-medium">{user.personalInfo?.country}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Mobile Number</p>
          <p className="font-medium">{user.personalInfo?.phone}</p>
        </div>
      </CardContent>

      <EditUserDialog
        user={user}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSaveUser}
      />

      <ResetUserPasswordDialog
        userId={user.id}
        open={isResetPasswordDialogOpen}
        onOpenChange={setIsResetPasswordDialogOpen}
        onSuccess={() => {
          // Handle success if needed
        }}
      />
    </Card>
  );
};

export default UserPersonalInfo;