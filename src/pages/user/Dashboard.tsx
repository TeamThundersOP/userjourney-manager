import { useUserAuth } from '@/contexts/UserAuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Phase0Onboarding from '@/components/user/onboarding/Phase0Onboarding';
import Phase1Onboarding from '@/components/user/onboarding/Phase1Onboarding';
import Phase2Onboarding from '@/components/user/onboarding/Phase2Onboarding';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from '@/types/user';
import { Check } from "lucide-react";

const UserDashboard = () => {
  const { userId } = useUserAuth();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const { data: userData } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => String(u.id) === String(userId));
      
      if (user && !user.onboarding) {
        user.onboarding = {
          currentPhase: 0,
          phase0: {
            personalDetailsCompleted: false,
            cvSubmitted: false,
            interviewCompleted: false,
            jobStatus: 'pending',
            passportUploaded: false,
            pccUploaded: false,
            otherDocumentsUploaded: false,
            offerLetterSent: false,
            cosSent: false,
            rightToWorkSent: false,
            documentsUploaded: false,
            visaStatus: 'pending',
            travelDetailsUpdated: false,
            travelDocumentsUploaded: false,
            visaCopyUploaded: false,
            ukContactUpdated: false
          },
          phase1: {
            hmrcChecklist: false,
            companyAgreements: false,
            pensionScheme: false,
            bankStatements: false,
            vaccinationProof: false
          },
          phase2: {
            rightToWork: false,
            shareCode: false,
            dbs: false,
            onboardingComplete: false
          },
          approvals: {
            phase0: false,
            phase1: false,
            phase2: false
          }
        };
        
        const updatedUsers = users.map((u: User) => 
          String(u.id) === String(userId) ? user : u
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      }
      
      return user || null;
    },
    refetchInterval: 2000,
    refetchOnWindowFocus: true,
  });

  const handleSave = async (formData: any) => {
    setIsLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map((u: User) => {
        if (String(u.id) === String(userId)) {
          const currentPhase = u.onboarding?.currentPhase || 0;
          return {
            ...u,
            onboarding: {
              ...u.onboarding,
              [`phase${currentPhase}`]: {
                ...u.onboarding?.[`phase${currentPhase}`],
                ...formData
              }
            }
          };
        }
        return u;
      });

      localStorage.setItem('users', JSON.stringify(updatedUsers));
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

  const isOnboardingComplete = userData?.onboarding?.approvals?.phase0 && 
                             userData?.onboarding?.approvals?.phase1 && 
                             userData?.onboarding?.approvals?.phase2;

  if (isOnboardingComplete) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-green-800">
              Onboarding Complete!
            </h2>
            <p className="text-green-600">
              Congratulations! You have successfully completed all onboarding phases.
              Welcome to the team!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Your Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          {userData?.onboarding?.currentPhase === 0 && (
            <Phase0Onboarding 
              userData={userData}
              onSave={handleSave}
              isLoading={isLoading}
            />
          )}

          {userData?.onboarding?.currentPhase === 1 && userData?.onboarding?.approvals?.phase0 && (
            <Phase1Onboarding 
              userData={userData}
              onSave={handleSave}
              isLoading={isLoading}
            />
          )}

          {userData?.onboarding?.currentPhase === 2 && userData?.onboarding?.approvals?.phase1 && (
            <Phase2Onboarding 
              userData={userData}
              onSave={handleSave}
              isLoading={isLoading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;