import { useUserData } from "@/hooks/useUserData";
import { useUserAuth } from "@/contexts/UserAuthContext";
import Phase0Onboarding from "@/components/user/onboarding/Phase0Onboarding";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Json } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Phase0Page = () => {
  const { userId } = useUserAuth();
  const { user, isLoading } = useUserData(userId);
  const navigate = useNavigate();

  const handleSave = async (formData: any) => {
    try {
      const updatedOnboarding = {
        ...user?.onboarding,
        phase0: {
          ...user?.onboarding?.phase0,
          ...formData
        }
      };

      const { error } = await supabase
        .from('candidates')
        .update({
          onboarding: JSON.parse(JSON.stringify(updatedOnboarding)) as Json
        })
        .eq('id', userId);

      if (error) throw error;
      toast.success("Progress saved successfully");
    } catch (error) {
      console.error('Error saving progress:', error);
      toast.error("Failed to save progress");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!user?.onboarding?.phase0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">No phase data found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/user/dashboard')}
          className="text-primary hover:text-primary/90 hover:bg-primary/10 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
      <Phase0Onboarding
        userData={user}
        onSave={handleSave}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Phase0Page;