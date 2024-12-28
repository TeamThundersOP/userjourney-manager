import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { User } from "@/types/user";
import PhaseFeedback from "./PhaseFeedback";
import { toast } from "sonner";
import { UserFile } from "@/types/userFile";
import Phase0Actions from "./Phase0Actions";

interface Phase0OnboardingProps {
  userData: User | null;
  onSave: (formData: any) => void;
  isLoading: boolean;
}

const Phase0Onboarding = ({ userData, onSave, isLoading }: Phase0OnboardingProps) => {
  const [formData, setFormData] = useState({
    personalDetailsCompleted: true,
    cvSubmitted: false,
    interviewCompleted: false,
    jobStatus: 'pending',
    passportUploaded: false,
    pccUploaded: false,
    otherDocumentsUploaded: false,
    offerLetterSent: false,
    cosSent: false,
    visaStatus: 'pending',
    travelDetailsUpdated: false,
    travelDocumentsUploaded: false,
    visaCopyUploaded: false,
    ukContactUpdated: false,
    ukContactNumber: '',
    ukAddress: ''
  });

  useEffect(() => {
    if (userData?.onboarding?.phase0) {
      setFormData(prev => ({
        ...prev,
        ...userData.onboarding.phase0,
        ukContactNumber: userData.onboarding.phase0.ukContactNumber || '',
        ukAddress: userData.onboarding.phase0.ukAddress || ''
      }));
    }
  }, [userData]);

  const handleFileUpload = (type: string, file: UserFile) => {
    const fieldMap: { [key: string]: string } = {
      cv: 'cvSubmitted',
      passport: 'passportUploaded',
      pcc: 'pccUploaded',
      other: 'otherDocumentsUploaded',
      offerLetter: 'offerLetterSent',
      travelDocs: 'travelDocumentsUploaded',
      visaCopy: 'visaCopyUploaded'
    };

    setFormData(prev => ({
      ...prev,
      [fieldMap[type]]: true
    }));
    toast.success(`${type} uploaded successfully`);
  };

  const handlePersonalDetailsChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      personalDetailsCompleted: checked
    }));
  };

  const handleUKContactChange = (field: 'ukContactNumber' | 'ukAddress', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ukContactUpdated: true
    }));
  };

  const handleVisaStatusChange = (status: 'pending' | 'approved' | 'rejected') => {
    setFormData(prev => ({
      ...prev,
      visaStatus: status
    }));
    toast.success(`Visa status updated to ${status}`);
  };

  const handleNext = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: User) => {
      if (u.id === userData?.id) {
        return {
          ...u,
          onboarding: {
            ...u.onboarding,
            currentPhase: 1
          }
        };
      }
      return u;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    toast.success("Moving to Phase 1");
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Phase 0: Initial Setup</h2>
        <Progress value={
          Object.values(formData).filter(Boolean).length / Object.values(formData).length * 100
        } />
        
        <PhaseFeedback 
          feedback={userData?.onboarding?.phase0?.feedback} 
          phase={0}
        />
      </div>

      <Phase0Actions
        formData={formData}
        onFileUpload={handleFileUpload}
        onPersonalDetailsChange={handlePersonalDetailsChange}
        onUKContactChange={handleUKContactChange}
        onVisaStatusChange={handleVisaStatusChange}
      />

      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          onClick={() => onSave(formData)}
          disabled={isLoading}
        >
          Save Progress
        </Button>
        <Button
          onClick={handleNext}
          disabled={!userData?.onboarding?.approvals?.phase0}
        >
          Next Phase
        </Button>
      </div>
    </div>
  );
};

export default Phase0Onboarding;