import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { User } from "@/types/user";
import { calculatePhaseProgress } from "@/utils/onboarding";

interface UserOnboardingProps {
  user: User;
}

const UserOnboarding = ({ user }: UserOnboardingProps) => {
  if (!user.onboarding) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Onboarding Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Phase 0: Initial Setup</h3>
          <Progress value={calculatePhaseProgress(user.onboarding.phase0)} className="mb-2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {Object.entries(user.onboarding.phase0).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  key === 'visaStatus' 
                    ? value === 'approved' 
                      ? 'bg-green-500' 
                      : value === 'rejected'
                      ? 'bg-red-500'
                      : 'bg-yellow-500'
                    : value 
                    ? 'bg-green-500' 
                    : 'bg-gray-300'
                }`} />
                <span className="text-sm capitalize">
                  {key === 'visaStatus' 
                    ? `Visa Status: ${value}` 
                    : key.replace(/([A-Z])/g, ' $1')}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Phase 1: Documentation</h3>
          <Progress value={calculatePhaseProgress(user.onboarding.phase1)} className="mb-2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {Object.entries(user.onboarding.phase1).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${value ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Phase 2: Final Steps</h3>
          <Progress value={calculatePhaseProgress(user.onboarding.phase2)} className="mb-2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {Object.entries(user.onboarding.phase2).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${value ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserOnboarding;