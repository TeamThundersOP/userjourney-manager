import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Phase1, User } from "@/types/user";
import { Upload } from "lucide-react";

interface Phase1OnboardingProps {
  user: User;
}

const defaultPhase1Data: Phase1 = {
  cvSubmitted: false,
  personalDetailsCompleted: true,
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
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={phase1Data.cvSubmitted}
              disabled={phase1Data.cvSubmitted}
              onCheckedChange={(checked) =>
                setPhase1Data(prev => ({ ...prev, cvSubmitted: checked as boolean }))
              }
            />
            <Label>CV Submitted</Label>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleFileUpload('cv')}
              disabled={phase1Data.cvSubmitted}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload CV
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={phase1Data.personalDetailsCompleted}
              disabled={true}
              onCheckedChange={(checked) =>
                setPhase1Data(prev => ({ ...prev, personalDetailsCompleted: checked as boolean }))
              }
            />
            <Label>Personal Details Completed</Label>
          </div>

          <div className="space-y-2">
            <Label>Interview Status</Label>
            <Select
              value={phase1Data.interviewStatus}
              onValueChange={(value: 'pending' | 'completed' | 'rejected') =>
                setPhase1Data(prev => ({ ...prev, interviewStatus: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Job Status</Label>
            <Select
              value={phase1Data.jobStatus}
              onValueChange={(value: 'pending' | 'accepted' | 'rejected') =>
                setPhase1Data(prev => ({ ...prev, jobStatus: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Documents</Label>
            <div className="grid gap-2">
              {Object.entries(phase1Data.documents).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    checked={value}
                    onCheckedChange={(checked) =>
                      setPhase1Data(prev => ({
                        ...prev,
                        documents: {
                          ...prev.documents,
                          [key]: checked as boolean
                        }
                      }))
                    }
                  />
                  <Label className="capitalize">{key}</Label>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={phase1Data.offerLetterSent}
              disabled={phase1Data.offerLetterSent}
              onCheckedChange={(checked) =>
                setPhase1Data(prev => ({ ...prev, offerLetterSent: checked as boolean }))
              }
            />
            <Label>Offer Letter Sent</Label>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleFileUpload('offerLetter')}
              disabled={phase1Data.offerLetterSent}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Offer Letter
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Visa Status</Label>
            <Select
              value={phase1Data.visaStatus}
              onValueChange={(value: 'pending' | 'approved' | 'rejected') =>
                setPhase1Data(prev => ({ ...prev, visaStatus: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>UK Travel Documents</Label>
            <div className="grid gap-2">
              {Object.entries(phase1Data.ukTravel).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    checked={value}
                    onCheckedChange={(checked) =>
                      setPhase1Data(prev => ({
                        ...prev,
                        ukTravel: {
                          ...prev.ukTravel,
                          [key]: checked as boolean
                        }
                      }))
                    }
                  />
                  <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              ))}
            </div>
          </div>

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
