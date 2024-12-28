import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FileUpload from "./FileUpload";
import { Progress } from "@/components/ui/progress";
import { User } from "@/types/user";
import PhaseFeedback from "./PhaseFeedback";
import UKContactDetails from "./UKContactDetails";
import { toast } from "sonner";
import { UserFile } from "@/types/userFile";

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

  const handleFileUpload = (type: string, _: UserFile) => {
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

      <div className="space-y-6">
        {/* User actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Required Actions</h3>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              checked={formData.personalDetailsCompleted} 
              disabled 
            />
            <Label>Fill Personal Details</Label>
          </div>

          <FileUpload
            label="CV Upload"
            onFileUpload={(file) => handleFileUpload('cv', file)}
            isUploaded={formData.cvSubmitted}
          />

          {/* Admin-controlled fields - disabled for users */}
          <div className="flex items-center space-x-2 opacity-50">
            <Checkbox 
              checked={formData.interviewCompleted}
              disabled
            />
            <Label>Interview Status (Admin controlled)</Label>
          </div>

          <div className="space-y-2 opacity-50">
            <Label>Job Status (Admin controlled)</Label>
            <RadioGroup
              value={formData.jobStatus}
              disabled
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

          {/* Document uploads - user actions */}
          <div className="space-y-4">
            <h4 className="font-medium">Required Documents</h4>
            <FileUpload
              label="Passport Copy"
              onFileUpload={(file) => handleFileUpload('passport', file)}
              isUploaded={formData.passportUploaded}
            />
            
            <FileUpload
              label="PCC (Police Clearance Certificate)"
              onFileUpload={(file) => handleFileUpload('pcc', file)}
              isUploaded={formData.pccUploaded}
            />
            
            <FileUpload
              label="Other Required Documents"
              onFileUpload={(file) => handleFileUpload('other', file)}
              isUploaded={formData.otherDocumentsUploaded}
            />
          </div>

          {/* Admin controlled documents - disabled */}
          <div className="space-y-4 opacity-50">
            <h4 className="font-medium">Company Documents (Admin controlled)</h4>
            <div className="flex items-center space-x-2">
              <Checkbox 
                checked={formData.offerLetterSent}
                disabled
              />
              <Label>Offer Letter Status</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                checked={formData.cosSent}
                disabled
              />
              <Label>CoS Status</Label>
            </div>
          </div>

          {/* Visa section - user actions */}
          <div className="space-y-4">
            <h4 className="font-medium">Visa Application</h4>
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
          </div>

          {/* Travel and UK details - user actions */}
          <div className="space-y-4">
            <h4 className="font-medium">Travel & UK Details</h4>
            <FileUpload
              label="Travel Documents (including ticket)"
              onFileUpload={(file) => handleFileUpload('travelDocs', file)}
              isUploaded={formData.travelDocumentsUploaded}
            />
            
            <FileUpload
              label="Visa Copy"
              onFileUpload={(file) => handleFileUpload('visaCopy', file)}
              isUploaded={formData.visaCopyUploaded}
            />

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