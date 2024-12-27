import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUserAuth } from '@/contexts/UserAuthContext';

const UserLogin = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUserAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Supabase auth error:', error);
        throw error;
      }

      if (data.user) {
        toast({
          title: "Success",
          description: "Successfully logged in",
        });
        
        navigate('/user/dashboard');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to sign in",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    navigate('/user/dashboard');
    return null;
  }

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
          <CardTitle className="font-araboto-bold text-heading-1 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium font-araboto-normal">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg border-gray-200 focus:ring-2 focus:ring-primary/20 transition-shadow font-araboto-normal"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium font-araboto-normal">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg border-gray-200 focus:ring-2 focus:ring-primary/20 transition-shadow font-araboto-normal"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full btn-primary-line body-large"
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