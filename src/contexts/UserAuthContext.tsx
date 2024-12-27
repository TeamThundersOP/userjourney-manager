import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface UserAuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  userId: string | null;
  isFirstLogin: boolean;
  hasResetPassword: boolean;
  hasFilledPersonalInfo: boolean;
  setHasResetPassword: (value: boolean) => void;
  setHasFilledPersonalInfo: (value: boolean) => void;
}

const UserAuthContext = createContext<UserAuthContextType | null>(null);

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error('useUserAuth must be used within a UserAuthProvider');
  }
  return context;
};

export const UserAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [hasResetPassword, setHasResetPassword] = useState(false);
  const [hasFilledPersonalInfo, setHasFilledPersonalInfo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check initial auth state
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
        setUserId(session.user.id);
      }
    };
    
    checkAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true);
        setUserId(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setUserId(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    if (user) {
      setIsAuthenticated(true);
      setUserId(user.id);
      navigate('/user/dashboard');
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setUserId(null);
    setHasResetPassword(false);
    setHasFilledPersonalInfo(false);
    navigate('/user/login');
  };

  return (
    <UserAuthContext.Provider 
      value={{ 
        isAuthenticated, 
        login, 
        logout, 
        userId,
        isFirstLogin,
        hasResetPassword,
        hasFilledPersonalInfo,
        setHasResetPassword,
        setHasFilledPersonalInfo
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};