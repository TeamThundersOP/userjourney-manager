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
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Full Name</p>
          <p className="font-medium">{user.personalInfo?.fullName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
            {user.status}
          </Badge>
        </div>
        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium">{user.personalInfo?.phone}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Address</p>
          <p className="font-medium">
            {user.personalInfo?.address}, {user.personalInfo?.city}, {user.personalInfo?.postalCode}
          </p>
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