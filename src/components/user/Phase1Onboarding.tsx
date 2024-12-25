import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Phase1, User } from "@/types/user";
import { DocumentsSection } from "./phase1/DocumentsSection";
import { UKTravelSection } from "./phase1/UKTravelSection";

interface Phase1OnboardingProps {
  user: User;
}

const defaultPhase1Data: Phase1 = {
  cvSubmitted: false,
  personalDetailsCompleted: false,
  interviewStatus: 'pending',
  jobStatus: 'pending',
  documents: {
    passport: false,
    pcc: false,
    other: false
  },
  offerLetterSent: false,
  cosSent: false,
  visaStatus: 'pending',
  ukTravel: {
    ticket: false,
    visaCopy: false
  },
  ukContact: {
    phone: '',
    address: ''
  },
  completed: false,
  hmrcChecklist: false,
  companyAgreements: false,
  pensionScheme: false,
  bankStatements: false,
  vaccinationProof: false,
};

const Phase1Onboarding = ({ user }: Phase1OnboardingProps) => {
  const [phase1Data, setPhase1Data] = useState<Phase1>(defaultPhase1Data);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (user?.onboarding?.phase1) {
      setPhase1Data(user.onboarding.phase1);
    }
  }, [user]);

  useEffect(() => {
    const calculateProgress = () => {
      const totalSteps = 10;
      let completedSteps = 0;

      if (phase1Data.cvSubmitted) completedSteps++;
      if (phase1Data.personalDetailsCompleted) completedSteps++;
      if (phase1Data.interviewStatus === 'completed') completedSteps++;
      if (phase1Data.jobStatus === 'accepted') completedSteps++;
      if (Object.values(phase1Data.documents).some(v => v)) completedSteps++;
      if (phase1Data.offerLetterSent) completedSteps++;
      if (phase1Data.cosSent) completedSteps++;
      if (phase1Data.visaStatus !== 'pending') completedSteps++;
      if (Object.values(phase1Data.ukTravel).some(v => v)) completedSteps++;
      if (phase1Data.ukContact.phone && phase1Data.ukContact.address) completedSteps++;

      return (completedSteps / totalSteps) * 100;
    };

    setProgress(calculateProgress());
  }, [phase1Data]);

  const handleFileUpload = (type: 'cv' | 'offerLetter') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (type === 'cv') {
          setPhase1Data(prev => ({ ...prev, cvSubmitted: true }));
          toast.success('CV uploaded successfully');
        } else {
          setPhase1Data(prev => ({ ...prev, offerLetterSent: true }));
          toast.success('Offer letter uploaded successfully');
        }
      }
    };
    
    input.click();
  };

  const handleSave = () => {
    if (!user) {
      toast.error('User data not available');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: User) =>
      u.id === user.id
        ? {
            ...u,
            onboarding: {
              ...u.onboarding,
              phase1: phase1Data,
            },
          }
        : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    toast.success('Progress saved successfully');
  };

  const handleNext = () => {
    if (progress < 100) {
      toast.error('Please complete all steps before proceeding');
      return;
    }
    if (!user?.onboarding?.approvals.phase1) {
      toast.info('Please wait for admin approval before proceeding to next phase');
      return;
    }
  };

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Phase 1: Initial Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Phase 1: Initial Setup</CardTitle>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <DocumentsSection 
            documents={phase1Data.documents}
            onDocumentChange={(key, value) =>
              setPhase1Data(prev => ({
                ...prev,
                documents: {
                  ...prev.documents,
                  [key]: value
                }
              }))
            }
          />

          <UKTravelSection
            ukTravel={phase1Data.ukTravel}
            onUKTravelChange={(key, value) =>
              setPhase1Data(prev => ({
                ...prev,
                ukTravel: {
                  ...prev.ukTravel,
                  [key]: value
                }
              }))
            }
          />

          <div className="space-y-2">
            <Label>UK Contact Information</Label>
            <div className="grid gap-2">
              <Input
                placeholder="Phone Number"
                value={phase1Data.ukContact.phone}
                onChange={(e) =>
                  setPhase1Data(prev => ({
                    ...prev,
                    ukContact: {
                      ...prev.ukContact,
                      phone: e.target.value
                    }
                  }))
                }
              />
              <Input
                placeholder="Address"
                value={phase1Data.ukContact.address}
                onChange={(e) =>
                  setPhase1Data(prev => ({
                    ...prev,
                    ukContact: {
                      ...prev.ukContact,
                      address: e.target.value
                    }
                  }))
                }
              />
            </div>
          </div>
        </div>

        {!user?.onboarding?.approvals.phase1 && progress === 100 && (
          <div className="bg-yellow-50 p-4 rounded-md">
            <p className="text-yellow-800">
              All steps completed. Waiting for admin approval before proceeding to next phase.
            </p>
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <Button onClick={handleSave}>Save Progress</Button>
          <Button onClick={handleNext} disabled={progress < 100 || !user?.onboarding?.approvals.phase1}>
            Next Phase
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Phase1Onboarding;