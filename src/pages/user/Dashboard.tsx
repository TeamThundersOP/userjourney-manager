import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/use-user";
import OnboardingPhases from "@/components/user/dashboard/OnboardingPhases";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/user/login');
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <OnboardingPhases user={user} />
    </div>
  );
};

export default Dashboard;