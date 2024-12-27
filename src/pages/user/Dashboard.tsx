import { useUserAuth } from '@/contexts/UserAuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Phase0Onboarding from '@/components/user/onboarding/Phase0Onboarding';
import Phase1Onboarding from '@/components/user/onboarding/Phase1Onboarding';
import Phase2Onboarding from '@/components/user/onboarding/Phase2Onboarding';
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