import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // For demo purposes, we'll use hardcoded credentials
  const ADMIN_EMAIL = 'vanapallisaisriram7@gmail.com';
  const DEMO_USERNAME = 'admin';
  const DEMO_PASSWORD = 'admin123';

  const login = async (username: string, password: string) => {
    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password: DEMO_PASSWORD,
      });

      if (error) {
        throw new Error('Authentication failed');
      }

      if (data.user) {
        setIsAuthenticated(true);
        navigate('/admin/dashboard');
      }
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    navigate('/admin/login');
  };

  useEffect(() => {
    // Check for existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};