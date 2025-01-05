import { useState } from 'react';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Checking candidate status for email:', email);
      
      // First check if the email exists in the candidates table
      const { data: candidate, error: candidateError } = await supabase
        .from('candidates')
        .select('*')
        .eq('email', email.toLowerCase().trim())
        .maybeSingle();

      console.log('Candidate query result:', { candidate, candidateError });

      if (candidateError) {
        console.error('Error checking candidate status:', candidateError);
        throw new Error('Error checking candidate status');
      }

      if (!candidate) {
        toast({
          title: "Access Restricted",
          description: "This email is not registered in our system. Please contact the administrator for access.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // If candidate exists, proceed with authentication
      const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error('Sign in error:', signInError);
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please check your credentials and try again.",
          variant: "destructive",
        });
        return;
      }

      if (user) {
        // Set local storage items
        localStorage.setItem('userAuth', 'true');
        localStorage.setItem('userId', user.id);
        
        // Check if this is the first login
        const isFirstLogin = !user.last_sign_in_at;
        
        if (isFirstLogin) {
          localStorage.setItem('hasResetPassword', 'false');
          toast({
            title: "Welcome!",
            description: "Please reset your password for security.",
          });
          navigate('/user/reset-password');
          return;
        }
        
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        
        navigate('/user/dashboard');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "An error occurred during login. Please try again.",
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