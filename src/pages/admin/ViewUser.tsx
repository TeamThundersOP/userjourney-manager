import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import StatusTabs from '@/components/admin/user/StatusTabs';
import UserPersonalInfo from '@/components/admin/UserPersonalInfo';
import ProgressStatus from '@/components/admin/user/ProgressStatus';
import UserFiles from '@/components/admin/UserFiles';
import { ReportsTable } from '@/components/admin/reports/ReportsTable';
import { User } from '@/types/user';

const mockUser: User = {
  id: 1,
  email: "user1@example.com",
  status: "Active",
  personalInfo: {
    fullName: "John Doe",
    nationality: "British",
    dateOfBirth: "1990-01-01",
    gender: "Male",
    passportNumber: "123456789",
    address: "123 Main St",
    city: "London",
    postalCode: "SW1A 1AA",
    country: "United Kingdom",
    phone: "+44 123 456 7890"
  },
  onboarding: {
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

const fetchUser = async (userId: string): Promise<User> => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find((u: User) => u.id === parseInt(userId));
  
  if (!user) {
    return mockUser;
  }
  
  if (!user.onboarding) {
    user.onboarding = mockUser.onboarding;
  }
  
  return {
    ...mockUser,
    ...user,
    onboarding: {
      ...mockUser.onboarding,
      ...user.onboarding,
      phase0: {
        ...mockUser.onboarding.phase0,
        ...user.onboarding?.phase0
      },
      phase1: {
        ...mockUser.onboarding.phase1,
        ...user.onboarding?.phase1
      },
      phase2: {
        ...mockUser.onboarding.phase2,
        ...user.onboarding?.phase2
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
    queryKey: ['userReports', userId],
    queryFn: () => {
      const allReports = JSON.parse(localStorage.getItem('userReports') || '[]');
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Find the current user
      const currentUser = users.find((u: any) => String(u.id) === String(userId));
      
      if (!currentUser) {
        console.log('Current user not found');
        return [];
      }
      
      // Map reports with user information
      const mappedReports = allReports.map((report: any) => {
        const reportUser = users.find((u: any) => String(u.id) === String(report.userId));
        return {
          ...report,
          sender: reportUser?.email || 'Unknown User',
        };
      });
      
      // Filter reports for the current user
      const userReports = mappedReports.filter((report: any) => 
        String(report.userId) === String(userId)
      );
      
      console.log('Current user:', currentUser);
      console.log('All reports:', allReports);
      console.log('Mapped reports:', mappedReports);
      console.log('Filtered user reports:', userReports);
      
      return userReports;
    },
    enabled: !!userId,
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
              onViewReport={(report) => {
                console.log('Viewing report:', report);
              }}
            />
          </div>
        )}
        {activeTab === "files" && <UserFiles user={user} />}
      </div>
    </div>
  );
};

export default ViewUser;