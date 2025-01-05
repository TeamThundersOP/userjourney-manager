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
    queryKey: ['reports', userId],
    queryFn: () => {
      // Get all reports from localStorage
      const allReports = JSON.parse(localStorage.getItem('userReports') || '[]');
      
      // Get all users to map emails to IDs
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Map through reports to add userId based on sender email
      const reportsWithUserIds = allReports.map((report: any) => {
        const user = users.find((u: any) => u.email === report.sender);
        return {
          ...report,
          userId: user ? user.id : null
        };
      });
      
      // Filter reports for the current user
      const userReports = reportsWithUserIds.filter((report: any) => 
        report.userId && Number(report.userId) === Number(userId)
      );
      
      console.log('All reports:', allReports);
      console.log('Reports with userIds:', reportsWithUserIds);
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