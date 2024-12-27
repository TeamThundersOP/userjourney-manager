import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { User } from "@/types/user";
import { FileUpload } from "./FileUpload";
import PhaseFeedback from "./PhaseFeedback";

interface Phase1OnboardingProps {
  userData: User | null;
  onSave: (formData: any) => void;
  isLoading: boolean;
}

const Phase1Onboarding = ({ userData, onSave, isLoading }: Phase1OnboardingProps) => {
  const [formData, setFormData] = useState({
    hmrcChecklist: false,
    companyAgreements: false,
    pensionScheme: false,
    bankStatements: false,
    vaccinationProof: false
  });

  useEffect(() => {
    if (userData?.onboarding?.phase1) {
      setFormData(prev => ({
        ...prev,
        ...userData.onboarding.phase1
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
        <h2 className="text-xl font-semibold">Phase 1: Documentation</h2>
        <Progress value={
          Object.values(formData).filter(Boolean).length / Object.values(formData).length * 100
        } />
        
        <PhaseFeedback 
          feedback={userData?.onboarding?.phase1?.feedback} 
          phase={1}
        />
      </div>

      <div className="space-y-6">
        <FileUpload
          label="HMRC Checklist"
          onUpload={() => handleFileUpload('hmrcChecklist')}
          isUploaded={formData.hmrcChecklist}
        />

        <FileUpload
          label="Company Agreements"
          onUpload={() => handleFileUpload('companyAgreements')}
          isUploaded={formData.companyAgreements}
        />

        <FileUpload
          label="Pension Scheme Documents"
          onUpload={() => handleFileUpload('pensionScheme')}
          isUploaded={formData.pensionScheme}
        />

        <FileUpload
          label="Bank Statements"
          onUpload={() => handleFileUpload('bankStatements')}
          isUploaded={formData.bankStatements}
        />

        <FileUpload
          label="Vaccination Proof"
          onUpload={() => handleFileUpload('vaccinationProof')}
          isUploaded={formData.vaccinationProof}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          onClick={() => onSave(formData)}
          disabled={isLoading}
        >
          Save Progress
        </Button>
        <Button
          onClick={() => {}}
          disabled={!userData?.onboarding?.approvals?.phase1}
        >
          Next Phase
        </Button>
      </div>
    </div>
  );
};

export default Phase1Onboarding;