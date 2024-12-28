import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle2, XCircle } from "lucide-react";
import { User } from "@/types/user";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Phase0DetailsProps {
  user: User;
  onSaveFeedback: (feedback: string) => void;
}

const Phase0Details = ({ user, onSaveFeedback }: Phase0DetailsProps) => {
  const [feedback, setFeedback] = useState(user.onboarding?.phase0?.feedback || "");
  const [phase0, setPhase0] = useState(user.onboarding?.phase0);
  const phase0Initial = user.onboarding?.phase0;

  const steps = [
    { 
      title: "Personal Details",
      key: "personalDetailsCompleted",
      completed: phase0?.personalDetailsCompleted,
      status: phase0?.personalDetailsCompleted ? "Completed" : "Pending"
    },
    { 
      title: "CV",
      completed: phase0?.cvSubmitted,
      status: phase0?.cvSubmitted ? "Completed" : "Pending",
      uploadable: true
    },
    { 
      title: "Interview",
      completed: phase0?.interviewCompleted,
      status: phase0?.interviewCompleted ? "Completed" : "Pending"
    },
    { 
      title: "Job Status",
      completed: phase0?.jobStatus === 'accepted',
      status: phase0?.jobStatus || "Pending"
    },
    { 
      title: "Passport",
      completed: phase0?.passportUploaded,
      status: phase0?.passportUploaded ? "Completed" : "Pending",
      uploadable: true
    },
    { 
      title: "PCC",
      completed: phase0?.pccUploaded,
      status: phase0?.pccUploaded ? "Completed" : "Pending",
      uploadable: true
    },
    { 
      title: "Other Documents",
      completed: phase0?.otherDocumentsUploaded,
      status: phase0?.otherDocumentsUploaded ? "Completed" : "Pending",
      uploadable: true
    },
    { 
      title: "Offer Letter",
      completed: phase0?.offerLetterSent,
      status: phase0?.offerLetterSent ? "Completed" : "Pending"
    },
    { 
      title: "COS",
      completed: phase0?.cosSent,
      status: phase0?.cosSent ? "Completed" : "Pending"
    },
    { 
      title: "Right to Work",
      completed: phase0?.rightToWorkSent,
      status: phase0?.rightToWorkSent ? "Completed" : "Pending"
    },
    { 
      title: "Documents",
      completed: phase0?.documentsUploaded,
      status: phase0?.documentsUploaded ? "Completed" : "Pending",
      uploadable: true
    },
    { 
      title: "Visa Status",
      completed: phase0?.visaStatus === 'approved',
      status: phase0?.visaStatus || "Pending"
    },
    { 
      title: "Travel Details",
      completed: phase0?.travelDetailsUpdated,
      status: phase0?.travelDetailsUpdated ? "Completed" : "Pending"
    },
    { 
      title: "Travel Documents",
      completed: phase0?.travelDocumentsUploaded,
      status: phase0?.travelDocumentsUploaded ? "Completed" : "Pending",
      uploadable: true
    },
    { 
      title: "Visa Copy",
      completed: phase0?.visaCopyUploaded,
      status: phase0?.visaCopyUploaded ? "Completed" : "Pending",
      uploadable: true
    },
    { 
      title: "UK Contact Details",
      completed: phase0?.ukContactUpdated,
      status: phase0?.ukContactUpdated ? "Completed" : "Pending"
    }
  ];

  const completedSteps = steps.filter(step => step.completed).length;
  const progress = (completedSteps / steps.length) * 100;

  const handleSaveFeedback = () => {
    onSaveFeedback(feedback);
    toast.success("Feedback saved successfully");
  };

  const handleStatusChange = (key: string, value: boolean) => {
    setPhase0(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleJobStatusChange = (value: 'pending' | 'accepted' | 'rejected') => {
    setPhase0(prev => ({
      ...prev,
      jobStatus: value
    }));
  };

  const handleVisaStatusChange = (value: 'pending' | 'approved' | 'rejected') => {
    setPhase0(prev => ({
      ...prev,
      visaStatus: value
    }));
  };

  const handleSaveChanges = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: User) => {
      if (u.id === user.id) {
        return {
          ...u,
          onboarding: {
            ...u.onboarding,
            phase0: phase0
          }
        };
      }
      return u;
    });
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    toast.success("Phase 0 status updated successfully");
  };

  const handleResetChanges = () => {
    setPhase0(phase0Initial);
    toast.success("Changes reset to original state");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-gray-500">{completedSteps} of {steps.length} steps completed</p>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={handleResetChanges}>
          Reset Changes
        </Button>
        <Button onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </div>

      {/* Contact Information Cards */}
      {(phase0?.ukContactNumber || phase0?.ukAddress) && (
        <Card className="p-4 space-y-2">
          <h4 className="font-medium">UK Contact Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Contact Number</p>
              <p className="font-medium">{phase0?.ukContactNumber || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{phase0?.ukAddress || "Not provided"}</p>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map((step) => (
          <Card key={step.key} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {step.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-gray-300" />
                )}
                <div>
                  <h4 className="font-medium">{step.title}</h4>
                  <p className="text-sm text-gray-500 capitalize">Status: {step.status}</p>
                </div>
              </div>
              {step.key !== 'jobStatus' && step.key !== 'visaStatus' && (
                <Checkbox
                  checked={phase0?.[step.key as keyof typeof phase0] as boolean}
                  onCheckedChange={(checked) => handleStatusChange(step.key, checked as boolean)}
                />
              )}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-4">Job Status</h3>
            <RadioGroup
              value={phase0?.jobStatus}
              onValueChange={handleJobStatusChange}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pending" id="job-pending" />
                <Label htmlFor="job-pending">Pending</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="accepted" id="job-accepted" />
                <Label htmlFor="job-accepted">Accepted</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rejected" id="job-rejected" />
                <Label htmlFor="job-rejected">Rejected</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Visa Status</h3>
            <RadioGroup
              value={phase0?.visaStatus}
              onValueChange={handleVisaStatusChange}
              className="flex flex-col space-y-2"
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
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Admin Feedback</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSaveFeedback}
            >
              Save Feedback
            </Button>
          </div>
          <Textarea
            placeholder="Enter feedback for Phase 0..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </Card>
    </div>
  );
};

export default Phase0Details;