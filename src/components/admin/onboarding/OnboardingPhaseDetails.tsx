import { User } from "@/types/user";

interface OnboardingPhaseDetailsProps {
  phase: 'phase0' | 'phase1' | 'phase2';
  user: User;
}

const OnboardingPhaseDetails = ({ phase, user }: OnboardingPhaseDetailsProps) => {
  if (!user.onboarding?.[phase]) return null;

  const renderPhase0Details = () => {
    const details = user.onboarding?.phase0;
    if (!details) return null;

    return (
      <div className="mt-2 space-y-2 text-sm text-gray-600">
        {details.jobStatus !== 'pending' && (
          <p>Job Status: <span className="font-medium capitalize">{details.jobStatus}</span></p>
        )}
        {details.visaStatus !== 'pending' && (
          <p>Visa Status: <span className="font-medium capitalize">{details.visaStatus}</span></p>
        )}
        {user.personalInfo?.phone && (
          <p>Contact Number: <span className="font-medium">{user.personalInfo.phone}</span></p>
        )}
        {user.personalInfo?.address && (
          <p>UK Address: <span className="font-medium">
            {user.personalInfo.address}
            {user.personalInfo.city && `, ${user.personalInfo.city}`}
            {user.personalInfo.postalCode && `, ${user.personalInfo.postalCode}`}
          </span></p>
        )}
      </div>
    );
  };

  const renderPhase1Details = () => {
    return null; // Phase 1 doesn't have additional details to show yet
  };

  const renderPhase2Details = () => {
    return null; // Phase 2 doesn't have additional details to show yet
  };

  const renderDetails = () => {
    switch (phase) {
      case 'phase0':
        return renderPhase0Details();
      case 'phase1':
        return renderPhase1Details();
      case 'phase2':
        return renderPhase2Details();
      default:
        return null;
    }
  };

  return renderDetails();
};

export default OnboardingPhaseDetails;