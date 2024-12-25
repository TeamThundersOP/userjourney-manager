import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find((u: any) => u.id.toString() === userId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {user?.personalInfo ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-sm text-gray-500">Full Name</h3>
                <p>{user.personalInfo.fullName}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-500">Email</h3>
                <p>{user.email}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-500">Nationality</h3>
                <p>{user.personalInfo.nationality}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-500">Date of Birth</h3>
                <p>{user.personalInfo.dateOfBirth}</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/user/personal-info')}
              variant="outline"
            >
              Update Personal Information
            </Button>
          </>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500 mb-4">Please complete your personal information</p>
            <Button onClick={() => navigate('/user/personal-info')}>
              Fill Personal Information
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Profile;