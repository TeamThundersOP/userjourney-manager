import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/types/user";
import Phase0Details from "./phases/Phase0Details";
import { toast } from "sonner";

interface ProgressStatusProps {
  user: User;
}

const ProgressStatus = ({ user }: ProgressStatusProps) => {
  const handleSaveFeedback = (phase: number, feedback: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: User) => {
      if (u.id === user.id) {
        return {
          ...u,
          onboarding: {
            ...u.onboarding,
            [`phase${phase}`]: {
              ...u.onboarding?.[`phase${phase}`],
              feedback: feedback
            }
          }
        };
      }
      return u;
    });
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    toast.success(`Feedback for Phase ${phase} saved successfully`);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="phase0" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="phase0">Phase 0</TabsTrigger>
          <TabsTrigger value="phase1" disabled={!user.onboarding?.approvals.phase0}>Phase 1</TabsTrigger>
          <TabsTrigger value="phase2" disabled={!user.onboarding?.approvals.phase1}>Phase 2</TabsTrigger>
        </TabsList>
        <TabsContent value="phase0" className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Phase 0: Initial Setup</h3>
          <Phase0Details 
            user={user} 
            onSaveFeedback={(feedback) => handleSaveFeedback(0, feedback)} 
          />
        </TabsContent>
        <TabsContent value="phase1" className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Phase 1: Documentation</h3>
          {/* Phase 1 content will be implemented similarly */}
        </TabsContent>
        <TabsContent value="phase2" className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Phase 2: Final Steps</h3>
          {/* Phase 2 content will be implemented similarly */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProgressStatus;
