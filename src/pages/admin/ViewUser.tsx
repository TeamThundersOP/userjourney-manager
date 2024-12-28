import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import UserPersonalInfo from '@/components/admin/UserPersonalInfo';
import UserOnboarding from '@/components/admin/UserOnboarding';
import UserFiles from '@/components/admin/UserFiles';
import StatusTabs from '@/components/admin/user/StatusTabs';
import ProgressStatus from '@/components/admin/user/ProgressStatus';
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
  }
};

const fetchUser = async (userId: string): Promise<User> => {
  // Get the latest data from localStorage
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find((u: User) => u.id === parseInt(userId));
  
  if (!user) {
    // Return mock data if no user is found
    return mockUser;
  }
  
  // Initialize onboarding with all false values if it doesn't exist
  if (!user.onboarding) {
    user.onboarding = mockUser.onboarding;
  }
  
  // Merge the found user with mock data for missing fields
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
  const [activeTab, setActiveTab] = useState("onboarding");

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId || ''),
    refetchInterval: 2000,
    refetchOnWindowFocus: true,
  });

  // Fetch user reports
  const { data: reports } = useQuery({
    queryKey: ['reports', userId],
    queryFn: () => {
      const allReports = JSON.parse(localStorage.getItem('userReports') || '[]');
      return allReports.filter((report: any) => String(report.userId) === userId);
    },
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