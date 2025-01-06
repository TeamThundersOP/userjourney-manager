import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { signInUser, signUpUser, getErrorMessage } from '@/utils/auth';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const normalizedEmail = email.toLowerCase().trim();
      console.log('Starting login process for:', normalizedEmail);
      
      // First try to sign in
      try {
        const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password: password,
        });

        if (signInError) throw signInError;

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
          return; // Important: return here to prevent onSuccess from being called
        } else {
          // Regular login - proceed to dashboard
          onSuccess();
        }
      } catch (signInError: any) {
        // If login fails, try to sign up
        if (signInError.status === 400) {
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: normalizedEmail,
            password: password,
          });

          if (signUpError) throw signUpError;

          // Create candidate record
          const { data: candidate, error: insertError } = await supabase
            .from('candidates')
            .insert([
              { 
                email: normalizedEmail,
                has_reset_password: false,
                name: email.split('@')[0], // Use email prefix as initial name
                username: email.split('@')[0], // Use email prefix as initial username
              }
            ])
            .select()
            .single();

          if (insertError) throw insertError;

          // Store auth state
          localStorage.setItem('userAuth', 'true');
          localStorage.setItem('userId', candidate.id);

          // Redirect to reset password for first-time users
          navigate('/user/reset-password');
          toast({
            title: "Welcome!",
            description: "Please reset your password to continue.",
          });
          return; // Important: return here to prevent onSuccess from being called
        } else {
          throw signInError;
        }
      }
    } catch (error: any) {
      console.error('Login/Signup error:', error);
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