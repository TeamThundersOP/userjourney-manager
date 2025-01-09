import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { User } from "@/types/user";
import PhaseFeedback from "./PhaseFeedback";
import { toast } from "sonner";
import { UserFile } from "@/types/userFile";
import Phase0Actions from "./Phase0Actions";
import { Badge } from "@/components/ui/badge";

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

  const progress = Object.values(formData).filter(Boolean).length / Object.values(formData).length * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
      case 'approved':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-primary">Phase 0: Initial Setup</h2>
          <div className="text-sm text-gray-500">
            Progress: {Math.round(progress)}%
          </div>
        </div>
        
        <Progress 
          value={progress} 
          className="h-2 bg-gray-100"
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Job Status:</span>
            <Badge 
              className={`${getStatusColor(userData?.onboarding?.phase0?.jobStatus || 'pending')}`}
            >
              {getStatusText(userData?.onboarding?.phase0?.jobStatus || 'pending')}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Visa Status:</span>
            <Badge 
              className={`${getStatusColor(userData?.onboarding?.phase0?.visaStatus || 'pending')}`}
            >
              {getStatusText(userData?.onboarding?.phase0?.visaStatus || 'pending')}
            </Badge>
          </div>
        </div>
        
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

      <div className="flex justify-end space-x-4 sticky bottom-6 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <Button
          variant="outline"
          onClick={() => onSave(formData)}
          disabled={isLoading}
          className="hover:bg-gray-50"
        >
          Save Progress
        </Button>
        <Button
          onClick={handleNext}
          disabled={!userData?.onboarding?.approvals?.phase0}
          className="bg-primary hover:bg-primary/90"
        >
          Next Phase
        </Button>
      </div>
    </div>
  );
};

export default Phase0Onboarding;
