import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '@/contexts/UserAuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setHasResetPassword } = useUserAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (newPassword !== confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        });
        return;
      }

      // Get the current user's email first
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user?.email) {
        console.error('Error getting user:', userError);
        throw new Error('Unable to verify user session');
      }

      console.log('Attempting to update password for user:', user.email);

      // First check if the candidate exists using email
      const { data: candidates, error: checkError } = await supabase
        .from('candidates')
        .select('*')
        .eq('email', user.email);

      if (checkError) {
        console.error('Error checking candidate:', checkError);
        throw new Error('Error verifying candidate status');
      }

      if (!candidates || candidates.length === 0) {
        toast({
          title: "Error",
          description: "Your account is not registered as a candidate. Please contact support.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const existingCandidate = candidates[0];

      // Update password in Supabase Auth
      const { error: updateAuthError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateAuthError) {
        // Handle the same password error specifically
        if (updateAuthError.message.includes('same_password')) {
          toast({
            title: "Error",
            description: "New password must be different from your current password",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        throw updateAuthError;
      }

      console.log('Password updated successfully in Auth, updating candidate record');

      // Update the candidates table to mark password as reset
      const { data: updateResult, error: updateCandidateError } = await supabase
        .from('candidates')
        .update({ has_reset_password: true })
        .eq('email', user.email)
        .select();

      if (updateCandidateError) {
        console.error('Error updating candidate:', updateCandidateError);
        throw updateCandidateError;
      }

      // Verify the update was successful
      if (!updateResult || updateResult.length === 0) {
        console.error('Failed to verify password reset update');
        throw new Error('Failed to update password reset status');
      }

      console.log('Password reset status updated successfully');

      // Update local state
      setHasResetPassword(true);

      toast({
        title: "Success",
        description: "Password has been reset successfully",
      });

      // Redirect to dashboard
      navigate('/user/dashboard');

    } catch (error: any) {
      console.error('Error resetting password:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to reset password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg p-4">
      <Card className="w-full max-w-md glass-card">
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
                className="w-full"
                disabled={isLoading}
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
                className="w-full"
                disabled={isLoading}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;