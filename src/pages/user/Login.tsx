import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { LoginForm } from '@/components/user/LoginForm';

const UserLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/user/dashboard');
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/user/dashboard');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLoginSuccess = () => {
    navigate('/user/dashboard');
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
          <LoginForm onSuccess={handleLoginSuccess} />
          <div className="mt-4 text-center">
            <Link 
              to="/user/reset-password" 
              className="text-sm text-primary hover:text-primary/90 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserLogin;