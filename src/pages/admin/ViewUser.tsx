import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface User {
  id: number;
  email: string;
  status: string;
  personalInfo?: {
    fullName?: string;
    nationality?: string;
    dateOfBirth?: string;
    gender?: string;
    passportNumber?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    phone?: string;
  };
  onboarding?: {
    currentPhase: number;
    phase0: {
      cvSubmitted: boolean;
      interviewCompleted: boolean;
      offerLetterSent: boolean;
      cosSent: boolean;
      rightToWorkSent: boolean;
      documentsUploaded: boolean;
      visaStatus: 'pending' | 'approved' | 'rejected';
    };
    phase1: {
      hmrcChecklist: boolean;
      companyAgreements: boolean;
      pensionScheme: boolean;
      bankStatements: boolean;
      vaccinationProof: boolean;
    };
    phase2: {
      rightToWork: boolean;
      shareCode: boolean;
      dbs: boolean;
      onboardingComplete: boolean;
    };
  };
}

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

const calculatePhaseProgress = (phase: Record<string, boolean>) => {
  const total = Object.keys(phase).length;
  const completed = Object.values(phase).filter(Boolean).length;
  return (completed / total) * 100;
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

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">User ID</p>
            <p className="font-medium">#{user.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium">{user.personalInfo?.fullName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <Badge variant={user.status === 'Active' ? 'success' : 'warning'}>
              {user.status}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{user.personalInfo?.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">
              {user.personalInfo?.address}, {user.personalInfo?.city}, {user.personalInfo?.postalCode}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Onboarding Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Onboarding Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Phase 0: Initial Setup</h3>
            <Progress value={calculatePhaseProgress(user.onboarding?.phase0 || {})} className="mb-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(user.onboarding?.phase0 || {}).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${value ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Phase 1: Documentation</h3>
            <Progress value={calculatePhaseProgress(user.onboarding?.phase1 || {})} className="mb-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(user.onboarding?.phase1 || {}).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${value ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Phase 2: Final Steps</h3>
            <Progress value={calculatePhaseProgress(user.onboarding?.phase2 || {})} className="mb-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(user.onboarding?.phase2 || {}).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${value ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewUser;