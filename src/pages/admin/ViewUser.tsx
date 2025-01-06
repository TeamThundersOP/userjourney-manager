import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import StatusTabs from '@/components/admin/user/StatusTabs';
import UserPersonalInfo from '@/components/admin/UserPersonalInfo';
import ProgressStatus from '@/components/admin/user/ProgressStatus';
import UserFiles from '@/components/admin/UserFiles';
import { ReportsTable } from '@/components/admin/reports/ReportsTable';
import { User } from '@/types/user';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const fetchUser = async (userId: string): Promise<User> => {
  const { data: user, error } = await supabase
    .from('candidates')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching user:', error);
    toast.error('Failed to fetch user details');
    throw error;
  }

  if (!user) {
    toast.error('User not found');
    throw new Error('User not found');
  }

  // Transform the data to match our User type
  return {
    id: user.id,
    name: user.name || '',
    username: user.username || '',
    email: user.email || '',
    status: user.status || 'pending',
    personal_info: user.personal_info,
    personalInfo: user.personal_info, // Alias for frontend compatibility
    onboarding: user.onboarding || {
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
    }
  };
};

const ViewUser = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("personal");

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId || ''),
  });

  const { data: reports } = useQuery({
    queryKey: ['reports', userId, user?.email],
    queryFn: async () => {
      // For now, we'll keep using localStorage for reports
      // This can be updated later when we add reports to the database
      const allReports = JSON.parse(localStorage.getItem('userReports') || '[]');
      return allReports.filter((report: any) => 
        String(report.userId) === userId || 
        (user?.email && report.sender === user.email)
      );
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">Loading user details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-500">
          Error loading user details. Please try again later.
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">User not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Candidate Details</h1>
      </div>
      
      <StatusTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="mt-6">
        {activeTab === "personal" && <UserPersonalInfo user={user} />}
        {activeTab === "onboarding" && <ProgressStatus user={user} />}
        {activeTab === "reports" && (
          <div className="space-y-6">
            <ReportsTable
              reports={reports || []}
              onViewReport={() => {}}
            />
          </div>
        )}
        {activeTab === "files" && <UserFiles user={user} />}
      </div>
    </div>
  );
};

export default ViewUser;
