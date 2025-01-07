import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { supabase } from "@/integrations/supabase/client";
import { useUserAuth } from "@/contexts/UserAuthContext";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { session } = useUserAuth();

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.user?.email) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("candidates")
          .select("*")
          .eq("email", session.user.email)
          .single();

        if (error) throw error;
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [session]);

  return { user, isLoading };
};