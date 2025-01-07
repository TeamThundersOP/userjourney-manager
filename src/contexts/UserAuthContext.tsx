import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
    // Check initial session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
        setUserId(session.user.id);
        
        // Fetch user data to check reset password and personal info status
        const { data: userData } = await supabase
          .from('candidates')
          .select('has_reset_password, personal_info')
          .eq('id', session.user.id)
          .single();

        if (userData) {
          setHasResetPassword(userData.has_reset_password || false);
          setHasFilledPersonalInfo(!!userData.personal_info);
        }
      } else {
        handleSessionExpired();
      }
    };

    checkSession();

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true);
        setUserId(session.user.id);
        
        // Fetch user data when signed in
        const { data: userData } = await supabase
          .from('candidates')
          .select('has_reset_password, personal_info')
          .eq('id', session.user.id)
          .single();

        if (userData) {
          setHasResetPassword(userData.has_reset_password || false);
          setHasFilledPersonalInfo(!!userData.personal_info);
        }
      } else if (event === 'SIGNED_OUT') {
        handleSessionExpired();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSessionExpired = () => {
    setIsAuthenticated(false);
    setUserId(null);
    setHasResetPassword(false);
    setHasFilledPersonalInfo(false);
    
    // Only show toast and redirect if we were previously authenticated
    if (isAuthenticated) {
      toast.error("Your session has expired. Please login again.");
      navigate('/user/login');
    }
  };

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    if (data.user) {
      setIsAuthenticated(true);
      setUserId(data.user.id);

      // Fetch user data after login
      const { data: userData } = await supabase
        .from('candidates')
        .select('has_reset_password, personal_info')
        .eq('id', data.user.id)
        .single();

      if (userData) {
        setHasResetPassword(userData.has_reset_password || false);
        setHasFilledPersonalInfo(!!userData.personal_info);

        if (!userData.has_reset_password) {
          navigate('/user/reset-password');
        } else if (!userData.personal_info) {
          navigate('/user/personal-info');
        } else {
          navigate('/user/dashboard');
        }
      }
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      toast.error("Error signing out");
      return;
    }
    
    handleSessionExpired();
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