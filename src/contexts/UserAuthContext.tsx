import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface UserAuthContextType {
  session: Session | null;
  user: User | null;
  userId: string | null;
  signOut: () => Promise<void>;
  logout: () => Promise<void>;
  setHasFilledPersonalInfo: (value: boolean) => void;
}

const UserAuthContext = createContext<UserAuthContextType>({
  session: null,
  user: null,
  userId: null,
  signOut: async () => {},
  logout: async () => {},
  setHasFilledPersonalInfo: () => {},
});

export const UserAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [hasFilledPersonalInfo, setHasFilledPersonalInfo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session and set up session persistence
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event);
      setSession(session);
      setUser(session?.user ?? null);

      // Handle session expiration
      if (!session) {
        navigate("/user/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/user/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Alias for signOut to maintain compatibility
  const logout = signOut;

  return (
    <UserAuthContext.Provider 
      value={{ 
        session, 
        user, 
        userId: user?.id ?? null,
        signOut, 
        logout,
        setHasFilledPersonalInfo 
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used within a UserAuthProvider");
  }
  return context;
};