import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useUserAuth } from "@/contexts/UserAuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PersonalInfo } from "@/types/user";
import { Skeleton } from "@/components/ui/skeleton";

const Profile = () => {
  const { userId } = useUserAuth();
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user data:', error);
        throw error;
      }

      return data;
    },
    enabled: !!userId
  });

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

  const personalInfo = user.personal_info as PersonalInfo;

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
              <p className="mt-1">{personalInfo?.fullName || 'Not provided'}</p>
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
              <p className="mt-1">{personalInfo?.address || 'Not provided'}</p>
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