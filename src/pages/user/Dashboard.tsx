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

const Dashboard = () => {
  const { userId, setHasFilledPersonalInfo } = useUserAuth();
  const { user, isLoading } = useUserData(userId);

  const handleFileUpload = (file: UserFile) => {
    if (!user) return;

    // Update local storage
    const existingFiles = JSON.parse(localStorage.getItem('userFiles') || '[]');
    localStorage.setItem('userFiles', JSON.stringify([...existingFiles, file]));

    toast({
      title: "Success",
      description: "File uploaded successfully"
    });
  };

  if (isLoading || !user) {
    return <LoadingState />;
  }

  const phase0Progress = user.onboarding?.phase0 
    ? Object.values(user.onboarding.phase0).filter(value => value === true).length / 
      Object.values(user.onboarding.phase0).filter(value => typeof value === 'boolean').length * 100
    : 0;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <ProgressCard userName={user.name} progress={phase0Progress} />

      <Tabs defaultValue="personal-info">
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