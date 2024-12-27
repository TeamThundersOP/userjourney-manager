import { useUserAuth } from '@/contexts/UserAuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Phase0Onboarding from '@/components/user/onboarding/Phase0Onboarding';
import Phase1Onboarding from '@/components/user/onboarding/Phase1Onboarding';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from '@/types/user';

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

  const handleSave = async (formData: any, phase: number) => {
    setIsLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map((u: User) => {
        if (String(u.id) === String(userId)) {
          return {
            ...u,
            onboarding: {
              ...u.onboarding,
              [`phase${phase}`]: {
                ...u.onboarding?.[`phase${phase}`],
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Your Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Phase0Onboarding 
            userData={userData}
            onSave={(formData) => handleSave(formData, 0)}
            isLoading={isLoading}
          />

          {userData?.onboarding?.approvals?.phase0 && (
            <div className="mt-8">
              <Phase1Onboarding 
                userData={userData}
                onSave={(formData) => handleSave(formData, 1)}
                isLoading={isLoading}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;