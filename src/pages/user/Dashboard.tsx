import { useUserAuth } from "@/contexts/UserAuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserFiles } from "@/components/user/UserFiles";
import PersonalInfoForm from "@/components/user/personal-info/PersonalInfoForm";
import { ProgressCard } from "@/components/user/dashboard/ProgressCard";
import { DocumentsTab } from "@/components/user/dashboard/DocumentsTab";
import { LoadingState } from "@/components/user/dashboard/LoadingState";
import { useUserData } from "@/hooks/useUserData";
import { toast } from "sonner";
import { UserFile } from "@/types/userFile";
import { calculateProgress } from "@/utils/onboarding";

const Dashboard = () => {
  const { userId } = useUserAuth();
  const { user, isLoading } = useUserData(userId);

  const handleFileUpload = (file: UserFile) => {
    if (!user) return;
    toast("File uploaded successfully");
  };

  if (isLoading || !user) {
    return <LoadingState />;
  }

  const progress = calculateProgress(user, 0);
  const userName = user.name || user.username || 'User';

  return (
    <div className="container mx-auto py-6 space-y-6">
      <ProgressCard userName={userName} progress={progress} />

      <Tabs defaultValue="personal-info" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="files">My Files</TabsTrigger>
        </TabsList>

        <TabsContent value="personal-info" className="space-y-4">
          <PersonalInfoForm />
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <DocumentsTab onFileUpload={handleFileUpload} />
        </TabsContent>

        <TabsContent value="files">
          <UserFiles userId={user.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;