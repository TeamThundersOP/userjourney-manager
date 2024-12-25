import { useUserAuth } from '@/contexts/UserAuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Phase0Onboarding from '@/components/user/onboarding/Phase0Onboarding';
import { useState, useEffect } from 'react';
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
      const user = users.find((u: any) => u.id === userId);
      
      // If user exists but doesn't have onboarding data, initialize it
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
        
        // Save the initialized user back to localStorage
        const updatedUsers = users.map((u: User) => 
          u.id === userId ? user : u
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      }
      
      return user || null;
    },
    // Enable automatic background refresh
    refetchInterval: 2000,
    // Refresh when window regains focus
    refetchOnWindowFocus: true,
  });

  const handleSave = async (formData: any) => {
    setIsLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map((u: User) => {
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