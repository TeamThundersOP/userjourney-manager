import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  useEffect(() => {
    const storedAuth = localStorage.getItem('userAuth');
    const storedUserId = localStorage.getItem('userId');
    const storedHasResetPassword = localStorage.getItem('hasResetPassword') === 'true';
    const storedHasFilledPersonalInfo = localStorage.getItem('hasFilledPersonalInfo') === 'true';

    if (storedAuth === 'true' && storedUserId) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
      setHasResetPassword(storedHasResetPassword);
      setHasFilledPersonalInfo(storedHasFilledPersonalInfo);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const usersJson = localStorage.getItem('users');
      if (!usersJson) {
        throw new Error('No users found');
      }

      const users = JSON.parse(usersJson);
      const user = users.find((u: any) => u.email === email);

      if (!user) {
        throw new Error('User not found');
      }

      if (user.password !== password) {
        throw new Error('Invalid password');
      }

      // Convert user.id to string to ensure consistent type
      const userIdString = String(user.id);
      
      setIsAuthenticated(true);
      setUserId(userIdString);
      setIsFirstLogin(!user.hasLoggedInBefore);
      setHasResetPassword(!!user.hasResetPassword);
      setHasFilledPersonalInfo(!!user.hasFilledPersonalInfo);

      // Update localStorage
      localStorage.setItem('userAuth', 'true');
      localStorage.setItem('userId', userIdString);
      localStorage.setItem('hasResetPassword', String(!!user.hasResetPassword));
      localStorage.setItem('hasFilledPersonalInfo', String(!!user.hasFilledPersonalInfo));

      // Update user's first login status in localStorage
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

      toast({
        title: "Success",
        description: "Successfully logged in",
      });

    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    setHasResetPassword(false);
    setHasFilledPersonalInfo(false);
    localStorage.removeItem('userAuth');
    localStorage.removeItem('userId');
    localStorage.removeItem('hasResetPassword');
    localStorage.removeItem('hasFilledPersonalInfo');
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