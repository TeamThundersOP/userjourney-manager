import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import { User } from "@/types/user";
import { useState } from "react";
import EditUserDialog from "./EditUserDialog";

interface UserPersonalInfoProps {
  user: User;
}

const UserPersonalInfo = ({ user: initialUser }: UserPersonalInfoProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
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
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsEditDialogOpen(true)}
        >
          <PenSquare className="h-4 w-4" />
        </Button>
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
          <p className="font-medium">{user.personalInfo?.familyName || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Given Name</p>
          <p className="font-medium">{user.personalInfo?.givenName || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Other Names</p>
          <p className="font-medium">{user.personalInfo?.otherNames || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Nationality</p>
          <p className="font-medium">{user.personalInfo?.nationality || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Place of Birth</p>
          <p className="font-medium">{user.personalInfo?.placeOfBirth || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Date of Birth</p>
          <p className="font-medium">{user.personalInfo?.dateOfBirth || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Gender</p>
          <p className="font-medium">{user.personalInfo?.gender || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Country of Residence</p>
          <p className="font-medium">{user.personalInfo?.countryOfResidence || "N/A"}</p>
        </div>

        <div className="col-span-2">
          <h3 className="font-semibold mb-4">Passport Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Passport Number</p>
              <p className="font-medium">{user.personalInfo?.passportNumber || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Place of Issue</p>
              <p className="font-medium">{user.personalInfo?.passportPlaceOfIssue || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Issue Date</p>
              <p className="font-medium">{user.personalInfo?.passportIssueDate || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Expiry Date</p>
              <p className="font-medium">{user.personalInfo?.passportExpiryDate || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <h3 className="font-semibold mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Mobile Number</p>
              <p className="font-medium">{user.personalInfo?.phone || "N/A"}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500">Current Address</p>
              <p className="font-medium">
                {user.personalInfo?.address || "N/A"}
                {user.personalInfo?.address && user.personalInfo?.city && ", "}
                {user.personalInfo?.city || ""}
                {user.personalInfo?.city && user.personalInfo?.postalCode && ", "}
                {user.personalInfo?.postalCode || ""}
                {(user.personalInfo?.address || user.personalInfo?.city || user.personalInfo?.postalCode) && user.personalInfo?.country && ", "}
                {user.personalInfo?.country || ""}
              </p>
            </div>
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