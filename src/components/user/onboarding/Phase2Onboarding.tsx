import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { User } from "@/types/user";
import { FileUpload } from "./FileUpload";
import PhaseFeedback from "./PhaseFeedback";

interface Phase2OnboardingProps {
  userData: User | null;
  onSave: (formData: any) => void;
  isLoading: boolean;
}

const Phase2Onboarding = ({ userData, onSave, isLoading }: Phase2OnboardingProps) => {
  const [formData, setFormData] = useState({
    rightToWork: false,
    dbs: false
  });

  useEffect(() => {
    if (userData?.onboarding?.phase2) {
      setFormData(prev => ({
        ...prev,
        ...userData.onboarding.phase2
      }));
    }
  }, [userData]);

  const handleFileUpload = (type: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: true
    }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Phase 2: Final Steps</h2>
        <Progress value={
          Object.values(formData).filter(Boolean).length / Object.values(formData).length * 100
        } />
        
        <PhaseFeedback 
          feedback={userData?.onboarding?.phase2?.feedback} 
          phase={2}
        />
      </div>

      <div className="space-y-6">
        <FileUpload
          label="Right to Work Document"
          onUpload={() => handleFileUpload('rightToWork')}
          isUploaded={formData.rightToWork}
        />

        <FileUpload
          label="DBS Check"
          onUpload={() => handleFileUpload('dbs')}
          isUploaded={formData.dbs}
        />
      </div>

      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={() => onSave(formData)}
          disabled={isLoading}
        >
          Save Progress
        </Button>
      </div>
    </div>
  );
};

export default Phase2Onboarding;