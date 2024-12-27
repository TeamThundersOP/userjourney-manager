import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useUserAuth } from '@/contexts/UserAuthContext';

const UserLogin = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUserAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/user/dashboard');
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        navigate('/user/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
      <Card className="w-full max-w-md border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-center mb-2">
            <img 
              src="/lovable-uploads/17a49967-e711-4d5a-b8fe-fb02e4469a2a.png" 
              alt="Funelli Logo" 
              className="h-12 w-auto"
            />
          </div>
          <CardTitle className="text-2xl text-center font-araboto-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#af1626',
                    brandAccent: '#fb0918',
                    brandButtonText: 'white',
                    defaultButtonBackground: '#f1f5f9',
                    defaultButtonBackgroundHover: '#e2e8f0',
                    inputBackground: 'white',
                    inputBorder: '#e2e8f0',
                    inputBorderHover: '#af1626',
                    inputBorderFocus: '#fb0918',
                  },
                  borderRadii: {
                    button: '100px 0px 100px 100px',
                    input: '8px',
                  },
                  fontSizes: {
                    baseButtonSize: '14px',
                    baseInputSize: '14px',
                  },
                  space: {
                    buttonPadding: '10px 20px',
                    inputPadding: '10px 14px',
                  },
                },
              },
              className: {
                button: 'btn-primary-line',
                container: 'space-y-4',
                label: 'text-gray-700 font-medium',
                input: 'rounded-lg border-gray-200 focus:ring-2 focus:ring-primary/20 transition-shadow',
                message: 'text-sm text-gray-600',
              },
            }}
            providers={[]}
            redirectTo={`${window.location.origin}/user/dashboard`}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserLogin;