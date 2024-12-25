import { useUserAuth } from '@/contexts/UserAuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Phase0Onboarding from '@/components/user/onboarding/Phase0Onboarding';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const UserDashboard = () => {
  const { userId } = useUserAuth();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const { data: userData } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      return users.find((u: any) => u.id === userId) || null;
    },
  });

  const handleSave = async (formData: any) => {
    setIsLoading(true);
    try {
      // Get existing users
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Update the current user's data
      const updatedUsers = users.map((u: any) => {
        if (u.id === userId) {
          return {
            ...u,
            onboarding: {
              ...u.onboarding,
              phase0: {
                ...u.onboarding?.phase0,
                ...formData
              }
            }
          };
        }
        return u;
      });

      // Save back to localStorage
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      // Invalidate and refetch queries to update both user and admin views
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      
      toast.success('Progress saved successfully');
    } catch (error) {
      console.error('Error saving progress:', error);
      toast.error('Failed to save progress');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Your Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Phase0Onboarding 
            userData={userData}
            onSave={handleSave}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;