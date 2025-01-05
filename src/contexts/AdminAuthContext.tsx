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

  const ADMIN_EMAIL = 'vanapallisaisriram7@gmail.com';
  const DEMO_USERNAME = 'admin';
  const DEMO_PASSWORD = 'admin123';

  const login = async (username: string, password: string) => {
    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
      try {
        // First sign in with Supabase
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: ADMIN_EMAIL,
          password: password,
        });

        if (signInError) {
          // If sign in fails, try to sign up
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: ADMIN_EMAIL,
            password: password,
          });

          if (signUpError) {
            console.error('Supabase auth error:', signUpError);
            throw new Error('Authentication failed');
          }

          // Use the sign up data if sign in failed
          if (signUpData.user) {
            signInData = signUpData;
          }
        }

        if (signInData.user) {
          // Check if admin exists in candidates table using maybeSingle()
          const { data: existingUser, error: queryError } = await supabase
            .from('candidates')
            .select('*')
            .eq('username', username)
            .maybeSingle();

          if (queryError) {
            console.error('Error querying user:', queryError);
            throw new Error('Failed to query user');
          }

          // If admin user doesn't exist in candidates, create it
          if (!existingUser) {
            const { error: insertError } = await supabase
              .from('candidates')
              .insert([
                {
                  username: DEMO_USERNAME,
                  name: 'Admin User',
                }
              ]);

            if (insertError) {
              console.error('Error creating admin user:', insertError);
              throw new Error('Failed to create admin user');
            }
          }

          setIsAuthenticated(true);
          localStorage.setItem('adminAuth', 'true');
          localStorage.setItem('userRole', 'admin');
          navigate('/admin/dashboard');
        }
      } catch (error) {
        console.error('Login error:', error);
        throw new Error('Authentication failed');
      }
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('userRole');
    navigate('/admin/login');
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