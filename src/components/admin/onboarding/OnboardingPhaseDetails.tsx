import { User } from "@/types/user";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface OnboardingPhaseDetailsProps {
  phase: 'phase0' | 'phase1' | 'phase2';
  user: User;
}

const OnboardingPhaseDetails = ({ phase, user }: OnboardingPhaseDetailsProps) => {
  const [phone, setPhone] = useState(user.personalInfo?.phone || '');
  const [address, setAddress] = useState(user.personalInfo?.address || '');
  const [city, setCity] = useState(user.personalInfo?.city || '');
  const [postalCode, setPostalCode] = useState(user.personalInfo?.postalCode || '');

  if (!user.onboarding?.[phase]) return null;

  const handleContactUpdate = () => {
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: User) => {
      if (u.id === user.id) {
        return {
          ...u,
          personalInfo: {
            ...u.personalInfo,
            phone,
            address,
            city,
            postalCode
          }
        };
      }
      return u;
    });
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    toast.success("Contact details updated successfully");
  };

  const renderPhase0Details = () => {
    const details = user.onboarding?.phase0;
    if (!details) return null;

    const completedTasks = [
      { label: 'Personal Details', completed: details.personalDetailsCompleted },
      { label: 'CV Submitted', completed: details.cvSubmitted },
      { label: 'Interview Completed', completed: details.interviewCompleted },
      { label: 'Passport Uploaded', completed: details.passportUploaded },
      { label: 'PCC Uploaded', completed: details.pccUploaded },
      { label: 'Other Documents Uploaded', completed: details.otherDocumentsUploaded },
      { label: 'Offer Letter Sent', completed: details.offerLetterSent },
      { label: 'COS Sent', completed: details.cosSent },
      { label: 'Right To Work Sent', completed: details.rightToWorkSent },
      { label: 'Documents Uploaded', completed: details.documentsUploaded },
      { label: 'Travel Details Updated', completed: details.travelDetailsUpdated },
      { label: 'Travel Documents Uploaded', completed: details.travelDocumentsUploaded },
      { label: 'Visa Copy Uploaded', completed: details.visaCopyUploaded },
      { label: 'UK Contact Updated', completed: details.ukContactUpdated },
    ];

    return (
      <div className="mt-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {completedTasks.map((task, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${task.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="text-sm">{task.label}</span>
            </div>
          ))}
        </div>

        {details.visaStatus !== 'pending' && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Visa Status: <span className="font-medium capitalize">{details.visaStatus}</span>
            </p>
          </div>
        )}

        <div className="space-y-4 mt-4">
          <div>
            <Label htmlFor="phone">Contact Number</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="address">UK Address</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <button
            onClick={handleContactUpdate}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
          >
            Update Contact Details
          </button>
        </div>
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