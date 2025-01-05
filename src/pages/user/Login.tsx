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
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // First attempt to sign in with Supabase Auth
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
        // After successful auth, check if user exists in candidates table
        const { data: candidate, error: candidateError } = await supabase
          .from('candidates')
          .select('*')
          .eq('email', email)
          .maybeSingle();

        if (candidateError) {
          console.error('Error checking candidate:', candidateError);
          toast({
            title: "Error",
            description: "An error occurred while checking your access. Please try again.",
            variant: "destructive",
          });
          return;
        }

        if (!candidate) {
          console.log('No candidate found with email:', email);
          // Sign out the user since they don't have a candidate record
          await supabase.auth.signOut();
          toast({
            title: "Access Denied",
            description: "Your account is not authorized. Please contact support.",
            variant: "destructive",
          });
          return;
        }

        // Set local storage items
        localStorage.setItem('userAuth', 'true');
        localStorage.setItem('userId', user.id);
        
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        
        navigate('/user/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "An error occurred during login.",
        variant: "destructive",
      });
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
            <Button type="submit" className="w-full btn-primary">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserLogin;