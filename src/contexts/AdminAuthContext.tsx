import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  const ADMIN_EMAIL = 'vanapallisaisriram7@gmail.com';
  const DEMO_USERNAME = 'admin';
  const DEMO_PASSWORD = 'admin123';

  const login = async (username: string, password: string) => {
    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
      try {
        // First try to sign in
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: ADMIN_EMAIL,
          password: password,
        });

        if (signInError) {
          console.error('Sign in error:', signInError);
          // If sign in fails with no user found, try to sign up
          if (signInError.message.includes('Invalid login credentials')) {
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
              email: ADMIN_EMAIL,
              password: password,
            });

            if (signUpError) {
              console.error('Sign up error:', signUpError);
              throw new Error('Failed to create admin account');
            }

            // Check if admin exists in candidates table
            const { data: existingUser, error: queryError } = await supabase
              .from('candidates')
              .select('*')
              .eq('email', ADMIN_EMAIL)
              .single();

            if (queryError && queryError.code !== 'PGRST116') {
              console.error('Error querying user:', queryError);
              throw new Error('Failed to query user');
            }

            // If admin doesn't exist in candidates, create it
            if (!existingUser) {
              const { error: insertError } = await supabase
                .from('candidates')
                .insert([
                  {
                    username: DEMO_USERNAME,
                    name: 'Admin User',
                    email: ADMIN_EMAIL,
                  }
                ]);

              if (insertError) {
                console.error('Error creating admin user:', insertError);
                throw new Error('Failed to create admin user');
              }
            }
          } else {
            throw signInError;
          }
        }

        setIsAuthenticated(true);
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('userRole', 'admin');
        navigate('/admin/dashboard');
        
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
      } catch (error) {
        console.error('Login error:', error);
        toast({
          title: "Error",
          description: error.message || "Authentication failed",
          variant: "destructive",
        });
        throw error;
      }
    } else {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
      throw new Error('Invalid credentials');
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      localStorage.removeItem('adminAuth');
      localStorage.removeItem('userRole');
      navigate('/admin/login');
      
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    // Check for existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      if (session) {
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('userRole', 'admin');
      }
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('userRole', 'admin');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};