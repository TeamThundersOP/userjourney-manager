import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email);
    
    if (user) {
      // In a real app, we would hash passwords and compare them securely
      localStorage.setItem('userAuth', 'true');
      localStorage.setItem('userId', user.id.toString());
      localStorage.setItem('userEmail', email);
      
      toast({
        title: "Success",
        description: "Successfully logged in",
      });

      // Check if password has been reset
      const isPasswordReset = localStorage.getItem('passwordReset');
      if (!isPasswordReset) {
        navigate('/reset-password');
      } else {
        // Check if personal info has been completed
        const isPersonalInfoCompleted = localStorage.getItem('personalInfoCompleted');
        if (!isPersonalInfoCompleted) {
          navigate('/personal-info');
        } else {
          navigate('/dashboard');
        }
      }
    } else {
      toast({
        title: "Error",
        description: "Invalid credentials or user not found",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserLogin;