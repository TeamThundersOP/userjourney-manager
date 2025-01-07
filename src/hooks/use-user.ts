import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/user/login');
          return;
        }

        const { data: candidate, error } = await supabase
          .from('candidates')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching user:', error);
          return;
        }

        if (candidate) {
          setUser(candidate as User);
        }
      } catch (error) {
        console.error('Error in fetchUser:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
        navigate('/user/login');
      } else if (event === 'SIGNED_IN' && session) {
        const { data: candidate } = await supabase
          .from('candidates')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (candidate) {
          setUser(candidate as User);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return { user, isLoading };
};