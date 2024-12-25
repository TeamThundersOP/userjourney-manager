import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '@/contexts/UserAuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { userId, setHasResetPassword } = useUserAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.id.toString() === userId);

    if (user && user.password === newPassword) {
      toast({
        title: "Error",
        description: "New password cannot be the same as the old password",
        variant: "destructive",
      });
      return;
    }

    // Update user's password
    const updatedUsers = users.map((u: any) => 
      u.id.toString() === userId 
        ? { ...u, password: newPassword, hasResetPassword: true } 
        : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('hasResetPassword', 'true');
    setHasResetPassword(true);

    toast({
      title: "Success",
      description: "Password has been reset successfully",
    });

    // Navigate to personal info if not filled, otherwise to dashboard
    const userAfterUpdate = updatedUsers.find((u: any) => u.id.toString() === userId);
    if (!userAfterUpdate.hasFilledPersonalInfo) {
      navigate('/user/personal-info');
    } else {
      navigate('/user/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="newPassword" className="text-sm font-medium">
                New Password
              </label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;