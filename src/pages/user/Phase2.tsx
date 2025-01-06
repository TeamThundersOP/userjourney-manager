import { useUserData } from "@/hooks/useUserData";
import { useAuth } from "@/contexts/UserAuthContext";
import Phase2Onboarding from "@/components/user/onboarding/Phase2Onboarding";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Phase2Page = () => {
  const { session } = useAuth();
  const { user, isLoading } = useUserData(session?.user?.id || null);
  const navigate = useNavigate();

  const handleSave = async (formData: any) => {
    try {
      const { error } = await supabase
        .from('candidates')
        .update({
          onboarding: {
            ...user?.onboarding,
            phase2: {
              ...user?.onboarding?.phase2,
              ...formData
            }
          }
        })
        .eq('id', session?.user?.id);

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

  if (!user?.onboarding?.phase2) {
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
      <Phase2Onboarding
        userData={user}
        onSave={handleSave}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Phase2Page;