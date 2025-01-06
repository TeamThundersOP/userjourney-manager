import { useUserAuth } from '@/contexts/UserAuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Phase0Onboarding from '@/components/user/onboarding/Phase0Onboarding';
import Phase1Onboarding from '@/components/user/onboarding/Phase1Onboarding';
import Phase2Onboarding from '@/components/user/onboarding/Phase2Onboarding';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/types/user';
import { CheckCircle2 } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

const UserDashboard = () => {
  const { userId } = useUserAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { data: userData, isError } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      try {
        console.log('Fetching user data for ID:', userId);
        const { data, error } = await supabase
          .from('candidates')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) {
          console.error('Error fetching user data:', error);
          throw error;
        }

        console.log('User data fetched:', data);
        return data;
      } catch (error) {
        console.error('Error in query function:', error);
        throw error;
      }
    },
    enabled: !!userId,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Failed to load dashboard data');
    }
  }, [isError]);

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Welcome to Your Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Loading your dashboard information...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderCurrentPhase = () => {
    const currentPhase = userData?.onboarding?.currentPhase || 0;

    switch (currentPhase) {
      case 0:
        return (
          <Phase0Onboarding 
            userData={userData}
            onSave={handleSave}
            isLoading={isLoading}
          />
        );
      case 1:
        if (userData?.onboarding?.approvals?.phase0) {
          return (
            <Phase1Onboarding 
              userData={userData}
              onSave={handleSave}
              isLoading={isLoading}
            />
          );
        }
        return null;
      case 2:
        if (userData?.onboarding?.approvals?.phase1) {
          return (
            <Phase2Onboarding 
              userData={userData}
              onSave={handleSave}
              isLoading={isLoading}
            />
          );
        }
        return null;
      default:
        return null;
    }
  };

  const handleSave = async (formData: any) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('candidates')
        .update({
          onboarding: {
            ...userData.onboarding,
            [`phase${userData.onboarding?.currentPhase || 0}`]: {
              ...userData.onboarding?.[`phase${userData.onboarding?.currentPhase || 0}`],
              ...formData
            }
          }
        })
        .eq('id', userId);

      if (error) throw error;
      toast.success('Progress saved successfully');
    } catch (error) {
      console.error('Error saving progress:', error);
      toast.error('Failed to save progress');
    } finally {
      setIsLoading(false);
    }
  };

  const isOnboardingComplete = userData?.onboarding?.approvals?.phase2;

  if (isOnboardingComplete) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Card className="bg-green-50 dark:bg-green-900/10">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-green-700 dark:text-green-300">
                  Onboarding Complete!
                </h2>
                <p className="text-green-600 dark:text-green-400">
                  Thank you for completing your onboarding process.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Your Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          {renderCurrentPhase()}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;