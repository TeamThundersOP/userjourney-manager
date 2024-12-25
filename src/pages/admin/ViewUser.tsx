import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import UserPersonalInfo from '@/components/admin/UserPersonalInfo';
import UserOnboarding from '@/components/admin/UserOnboarding';
import { User } from '@/types/user';

const fetchUser = async (userId: string): Promise<User> => {
  // For demo purposes, we'll return mock data
  // In a real app, this would be an API call
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find((u: User) => u.id === parseInt(userId));
  
  if (!user) {
    throw new Error('User not found');
  }
  
  return {
    ...user,
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
      }
    }
  };
};

const ViewUser = () => {
  const { userId } = useParams();
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId || ''),
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading user</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User Profile</h1>
      <UserPersonalInfo user={user} />
      <UserOnboarding user={user} />
    </div>
  );
};

export default ViewUser;