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
      if (!session) {
        handleSessionExpired();
      }
    };

    checkSession();

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);
      
      if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED' && !session) {
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
    localStorage.removeItem('userAuth');
    localStorage.removeItem('userId');
    
    // Only show toast and redirect if we were previously authenticated
    if (isAuthenticated) {
      toast.error("Your session has expired. Please login again.");
      navigate('/user/login');
    }
  };

  const login = async (email: string, password: string) => {
    // For demo purposes, we'll use the users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email);

    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }

    setIsAuthenticated(true);
    setUserId(user.id.toString());
    setIsFirstLogin(!user.hasLoggedInBefore);

    localStorage.setItem('userAuth', 'true');
    localStorage.setItem('userId', user.id.toString());

    // Update user's first login status
    if (!user.hasLoggedInBefore) {
      const updatedUsers = users.map((u: any) => 
        u.id === user.id ? { ...u, hasLoggedInBefore: true } : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      navigate('/user/reset-password');
    } else if (!user.hasResetPassword) {
      navigate('/user/reset-password');
    } else if (!user.hasFilledPersonalInfo) {
      navigate('/user/personal-info');
    } else {
      navigate('/user/dashboard');
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      toast.error("Error signing out");
      return;
    }
    
    setIsAuthenticated(false);
    setUserId(null);
    setHasResetPassword(false);
    setHasFilledPersonalInfo(false);
    localStorage.removeItem('userAuth');
    localStorage.removeItem('userId');
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
