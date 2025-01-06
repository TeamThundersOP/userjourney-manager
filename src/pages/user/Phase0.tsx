import { useUserData } from "@/hooks/useUserData";
import { useUserAuth } from "@/contexts/UserAuthContext";
import Phase0Onboarding from "@/components/user/onboarding/Phase0Onboarding";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Phase0Page = () => {
  const { userId } = useUserAuth();
  const { user, isLoading } = useUserData(userId);
  const navigate = useNavigate();

  const handleSave = async (formData: any) => {
    try {
      const { error } = await supabase
        .from('candidates')
        .update({
          onboarding: {
            ...user?.onboarding,
            phase0: {
              ...user?.onboarding?.phase0,
              ...formData
            }
          }
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
    return <div className="p-8">Loading...</div>;
  }

  if (!user?.onboarding?.phase0) {
    return <div className="p-8">No phase data found</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <button
          onClick={() => navigate('/user/dashboard')}
          className="text-primary hover:underline flex items-center gap-2"
        >
          ← Back to Dashboard
        </button>
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