import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileUpload } from "./FileUpload";
import { Progress } from "@/components/ui/progress";
import { User } from "@/types/user";
import PhaseFeedback from "./PhaseFeedback";
import UKContactDetails from "./UKContactDetails";
import { toast } from "sonner";

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

  const handleFileUpload = (type: string, file: File) => {
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
  };

  const handleUKContactChange = (field: 'ukContactNumber' | 'ukAddress', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ukContactUpdated: true
    }));
  };

  const handleNext = () => {
    // Update currentPhase to 1 in localStorage
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
    // Force reload to update the UI
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

      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Checkbox 
            checked={formData.personalDetailsCompleted} 
            disabled 
          />
          <Label>Fill Personal Details</Label>
        </div>

        <div className="space-y-4">
          <FileUpload
            label="CV"
            onUpload={(file) => handleFileUpload('cv', file)}
            isUploaded={formData.cvSubmitted}
          />

          <div className="flex items-center space-x-2">
            <Checkbox 
              checked={formData.interviewCompleted}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, interviewCompleted: checked as boolean }))
              }
            />
            <Label>Interview Completed</Label>
          </div>

          <div className="space-y-2">
            <Label>Job Status</Label>
            <RadioGroup
              value={formData.jobStatus}
              onValueChange={(value) => 
                setFormData(prev => ({ ...prev, jobStatus: value }))
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="accepted" id="accepted" />
                <Label htmlFor="accepted">Accepted</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rejected" id="rejected" />
                <Label htmlFor="rejected">Rejected</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pending" id="pending" />
                <Label htmlFor="pending">Pending</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <FileUpload
              label="Passport Copy"
              onUpload={(file) => handleFileUpload('passport', file)}
              isUploaded={formData.passportUploaded}
            />
            
            <FileUpload
              label="PCC"
              onUpload={(file) => handleFileUpload('pcc', file)}
              isUploaded={formData.pccUploaded}
            />
            
            <FileUpload
              label="Other Documents"
              onUpload={(file) => handleFileUpload('other', file)}
              isUploaded={formData.otherDocumentsUploaded}
            />
          </div>

          <div className="space-y-4">
            <FileUpload
              label="Offer Letter"
              onUpload={(file) => handleFileUpload('offerLetter', file)}
              isUploaded={formData.offerLetterSent}
            />

            <div className="flex items-center space-x-2">
              <Checkbox 
                checked={formData.cosSent}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, cosSent: checked as boolean }))
                }
              />
              <Label>CoS Sent</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Visa Status</Label>
            <RadioGroup
              value={formData.visaStatus}
              onValueChange={(value) => 
                setFormData(prev => ({ ...prev, visaStatus: value }))
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pending" id="visa-pending" />
                <Label htmlFor="visa-pending">Pending</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="approved" id="visa-approved" />
                <Label htmlFor="visa-approved">Approved</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rejected" id="visa-rejected" />
                <Label htmlFor="visa-rejected">Rejected</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Travel Details</Label>
              <FileUpload
                label="Travel Documents (including ticket)"
                onUpload={(file) => handleFileUpload('travelDocs', file)}
                isUploaded={formData.travelDocumentsUploaded}
              />
              
              <FileUpload
                label="Visa Copy"
                onUpload={(file) => handleFileUpload('visaCopy', file)}
                isUploaded={formData.visaCopyUploaded}
              />
            </div>

            <UKContactDetails
              ukContactNumber={formData.ukContactNumber}
              ukAddress={formData.ukAddress}
              onUKContactChange={handleUKContactChange}
            />
          </div>
        </div>
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
