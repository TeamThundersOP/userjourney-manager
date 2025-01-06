import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Add effect to check authentication status on mount and changes
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // If user is already authenticated, redirect to dashboard
        navigate('/user/dashboard');
      }
    };

    checkAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/user/dashboard');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const normalizedEmail = email.toLowerCase().trim();
      console.log('Attempting login process for:', normalizedEmail);
      
      // First check if the email exists in the candidates table
      const { data: candidate, error: candidateError } = await supabase
        .from('candidates')
        .select('has_reset_password')
        .eq('email', normalizedEmail)
        .maybeSingle();

      console.log('Candidate check result:', { candidate, candidateError });

      if (candidateError) {
        console.error('Error checking candidate status:', candidateError);
        toast({
          title: "Error",
          description: "An error occurred while checking your registration status. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (!candidate) {
        console.log('No candidate found for email:', normalizedEmail);
        toast({
          title: "Access Restricted",
          description: "This email is not registered in our system. Please contact the administrator for access.",
          variant: "destructive",
        });
        return;
      }

      // Now attempt to sign in
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      console.log('Authentication result:', { data, signInError });

      if (signInError) {
        console.error('Authentication error:', signInError);
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please check your credentials and try again.",
          variant: "destructive",
        });
        return;
      }

      if (data.user) {
        console.log('Login successful, checking password reset status');
        
        // Check if the user has reset their password
        if (!candidate.has_reset_password) {
          console.log('Password not reset, redirecting to reset page');
          toast({
            title: "Welcome!",
            description: "Please reset your password for security.",
          });
          navigate('/user/reset-password');
        } else {
          // If password has been reset, go directly to dashboard
          console.log('Password already reset, redirecting to dashboard');
          toast({
            title: "Success",
            description: "Logged in successfully",
          });
          navigate('/user/dashboard');
        }
      }
    } catch (error: any) {
      console.error('Unexpected error during login:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg p-4">
      <Card className="w-full max-w-md glass-card">
        <CardHeader className="space-y-2">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/2906d348-43aa-4456-a306-855eb66b60d1.png"
              alt="Funelli Logo"
              className="h-12 w-auto"
            />
          </div>
          <CardTitle className="heading-2 text-center text-primary">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
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
            <div className="flex items-center justify-end">
              <Link 
                to="/user/reset-password" 
                className="text-sm text-primary hover:text-primary/90 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Button 
              type="submit" 
              className="w-full btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserLogin;