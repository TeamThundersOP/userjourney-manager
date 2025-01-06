import { useUserAuth } from "@/contexts/UserAuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import DocumentsTab from "@/components/user/dashboard/DocumentsTab";
import LoadingState from "@/components/user/dashboard/LoadingState";
import { toast } from "sonner";
import { UserFile } from "@/types/userFile";
import { calculateProgress } from "@/utils/onboarding";
import { User } from "@/types/user";

const Dashboard = () => {
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

      if (error) {
        toast.error("Error fetching user data");
        throw error;
      }

      if (!data) return null;

      // Transform the data to match the User type
      const userData: User = {
        id: data.id,
        name: data.name,
        username: data.username,
        email: data.email || '',
        status: data.status || 'pending',
        created_at: data.created_at,
        cv_submitted: data.cv_submitted,
        interview_status: data.interview_status,
        offer_letter_sent: data.offer_letter_sent,
        cos_sent: data.cos_sent,
        right_to_work: data.right_to_work,
        onboarding_complete: data.onboarding_complete,
        has_reset_password: data.has_reset_password,
        personal_info: typeof data.personal_info === 'object' ? data.personal_info : {},
        personalInfo: typeof data.personal_info === 'object' ? data.personal_info : {},
        onboarding: typeof data.onboarding === 'object' ? data.onboarding : {},
      };

      return userData;
    },
    enabled: !!userId
  });

  if (isLoading || !user) {
    return <LoadingState />;
  }

  const progress = calculateProgress(user);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome back, {user.name}!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Onboarding Progress</span>
                <span className="text-sm text-gray-500">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="documents">
        <TabsList>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>
        <TabsContent value="documents">
          <DocumentsTab user={user} />
        </TabsContent>
        <TabsContent value="files">
          {/* Files tab content will be implemented later */}
          <Card>
            <CardContent className="pt-6">
              Coming soon...
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;