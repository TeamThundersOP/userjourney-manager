import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AuthError, AuthApiError } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onSuccess: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const getErrorMessage = (error: AuthError) => {
    console.error('Auth error details:', error);
    
    if (error instanceof AuthApiError) {
      switch (error.status) {
        case 400:
          if (error.message.includes('Invalid login credentials')) {
            return 'Invalid email or password. Please check your credentials and try again.';
          }
          return 'Invalid request. Please check your input and try again.';
        case 422:
          return 'Invalid email format. Please enter a valid email address.';
        default:
          return error.message;
      }
    }
    return 'An unexpected error occurred. Please try again.';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const normalizedEmail = email.toLowerCase().trim();
      console.log('Starting login process for:', normalizedEmail);
      
      // First try to sign in
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: password,
      });

      if (signInError) {
        console.error('Sign in error:', signInError);
        throw signInError;
      }

      console.log('Sign in successful:', signInData);

      // Check if user exists in candidates table and their password reset status
      const { data: candidate, error: candidateError } = await supabase
        .from('candidates')
        .select('has_reset_password, id')
        .eq('email', normalizedEmail)
        .single();

      if (candidateError) {
        console.error('Error fetching candidate:', candidateError);
        throw new Error('Failed to fetch user data');
      }

      if (!candidate) {
        throw new Error('User not found');
      }

      // Store auth state
      localStorage.setItem('userAuth', 'true');
      localStorage.setItem('userId', candidate.id);

      console.log('Has reset password:', candidate.has_reset_password);

      if (!candidate.has_reset_password) {
        // First time login - redirect to reset password
        navigate('/user/reset-password');
        toast({
          title: "Welcome!",
          description: "Please reset your password to continue.",
        });
      } else {
        // Regular login - proceed to dashboard
        onSuccess();
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-background/50 border-input"
          placeholder="Enter your email"
          disabled={isLoading}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-foreground">
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-background/50 border-input"
          placeholder="Enter your password"
          disabled={isLoading}
        />
      </div>
      <Button 
        type="submit" 
        className="w-full btn-primary"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
};