import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import UserPersonalInfo from '@/components/admin/UserPersonalInfo';
import UserOnboarding from '@/components/admin/UserOnboarding';
import UserFiles from '@/components/admin/UserFiles';
import { User } from '@/types/user';

// Mock data for demonstration
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
    currentPhase: 1,
    phase0: {
      cvSubmitted: true,
      interviewCompleted: true,
      offerLetterSent: true,
      cosSent: false,
      rightToWorkSent: true,
      documentsUploaded: true,
      visaStatus: 'pending'
    },
    phase1: {
      hmrcChecklist: true,
      companyAgreements: false,
      pensionScheme: false,
      bankStatements: true,
      vaccinationProof: true
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
  // For demo purposes, we'll return mock data
  // In a real app, this would be an API call
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find((u: User) => u.id === parseInt(userId));
  
  if (!user) {
    // Return mock data if no user is found
    return mockUser;
  }
  
  // Merge the found user with mock data for missing fields
  return {
    ...mockUser,
    ...user
  };
};

const ViewUser = () => {
  const { userId } = useParams();
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId || ''),
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
      <h1 className="text-3xl font-bold">User Profile</h1>
      <UserPersonalInfo user={user} />
      <UserOnboarding user={user} />
      <UserFiles />
    </div>
  );
};

export default ViewUser;