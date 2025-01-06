import { useUserData } from "@/hooks/useUserData";
import { useUserAuth } from "@/contexts/UserAuthContext";
import Phase1Onboarding from "@/components/user/onboarding/Phase1Onboarding";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Phase1Page = () => {
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
            phase1: {
              ...user?.onboarding?.phase1,
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

  if (!user?.onboarding?.phase1) {
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
      <Phase1Onboarding
        userData={user}
        onSave={handleSave}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Phase1Page;