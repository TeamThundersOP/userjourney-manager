import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/user";

interface UserPersonalInfoProps {
  user: User;
}

const UserPersonalInfo = ({ user }: UserPersonalInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
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
    </Card>
  );
};

export default UserPersonalInfo;