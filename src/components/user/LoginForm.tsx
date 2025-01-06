import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { signInUser, signUpUser, getErrorMessage } from '@/utils/auth';

interface LoginFormProps {
  onSuccess: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const normalizedEmail = email.toLowerCase().trim();
      console.log('Starting login process for:', normalizedEmail);
      
      // First try to sign in
      try {
        await signInUser(normalizedEmail, password);
        onSuccess();
      } catch (signInError: any) {
        // If login fails, try to sign up
        if (signInError.status === 400) {
          await signUpUser(normalizedEmail, password);
          // Try signing in again after successful signup
          await signInUser(normalizedEmail, password);
          onSuccess();
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