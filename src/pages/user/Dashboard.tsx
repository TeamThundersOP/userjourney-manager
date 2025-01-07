import { useUser } from "@/hooks/use-user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentsTab from "@/components/user/dashboard/DocumentsTab";
import OnboardingPhases from "@/components/user/dashboard/OnboardingPhases";
import { LoadingState } from "@/components/user/dashboard/LoadingState";
import { ProgressCard } from "@/components/user/dashboard/ProgressCard";
import { calculateProgress } from "@/utils/onboarding";

const Dashboard = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <LoadingState />;
  }

  if (!user) {
    return <div>No user data found.</div>;
  }

  const currentPhase = user.onboarding?.currentPhase || 0;
  const progress = calculateProgress(user, currentPhase);

  return (
    <div className="space-y-6">
      <ProgressCard 
        userName={user.name} 
        progress={progress}
      />
      
      <Tabs defaultValue="onboarding" className="space-y-6">
        <TabsList>
          <TabsTrigger value="onboarding">Onboarding Progress</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="onboarding" className="space-y-6">
          <OnboardingPhases user={user} />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;