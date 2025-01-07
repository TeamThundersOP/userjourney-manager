import { useUser } from "@/hooks/use-user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const Profile = () => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-[200px]" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-12" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return <div>No user data found.</div>;
  }

  const personalInfo = user.personalInfo;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Personal Information</CardTitle>
          <Button 
            variant="outline"
            onClick={() => navigate('/user/personal-info')}
          >
            Update Information
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-500">Full Name</label>
              <p className="mt-1">
                {personalInfo?.givenName && personalInfo?.familyName 
                  ? `${personalInfo.givenName} ${personalInfo.familyName}`
                  : 'Not provided'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Nationality</label>
              <p className="mt-1">{personalInfo?.nationality || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Date of Birth</label>
              <p className="mt-1">{personalInfo?.dateOfBirth || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone</label>
              <p className="mt-1">{personalInfo?.phone || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Address</label>
              <p className="mt-1">
                {[
                  personalInfo?.address,
                  personalInfo?.city,
                  personalInfo?.postalCode,
                  personalInfo?.country
                ].filter(Boolean).join(', ') || 'Not provided'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="mt-1">{user.email || 'Not provided'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;