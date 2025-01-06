import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "@/contexts/UserAuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PersonalInfo } from "@/types/user";
import { Database } from "@/integrations/supabase/types";

type Candidate = Database['public']['Tables']['candidates']['Row'];

const Profile = () => {
  const navigate = useNavigate();
  const { userId } = useUserAuth();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data as Candidate;
    }
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          Loading...
        </CardContent>
      </Card>
    );
  }

  const personalInfo = user?.personal_info as PersonalInfo;

  if (!personalInfo) {
    return (
      <Card>
        <CardContent className="text-center py-6">
          <p className="text-gray-500 mb-4">Please complete your personal information</p>
          <Button onClick={() => navigate('/user/personal-info')}>
            Fill Personal Information
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-sm text-gray-500">Full Name</h3>
            <p>{personalInfo.fullName}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-gray-500">Email</h3>
            <p>{user.email}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-gray-500">Nationality</h3>
            <p>{personalInfo.nationality}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-gray-500">Date of Birth</h3>
            <p>{personalInfo.dateOfBirth}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-gray-500">Phone</h3>
            <p>{personalInfo.phone}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-gray-500">Address</h3>
            <p>{personalInfo.address}</p>
          </div>
        </div>
        <Button 
          onClick={() => navigate('/user/personal-info')}
          variant="outline"
        >
          Update Personal Information
        </Button>
      </CardContent>
    </Card>
  );
};

export default Profile;