import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle2, XCircle } from "lucide-react";
import { User } from "@/types/user";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

interface Phase0DetailsProps {
  user: User;
  onSaveFeedback: (feedback: string) => void;
}

const Phase0Details = ({ user, onSaveFeedback }: Phase0DetailsProps) => {
  const [feedback, setFeedback] = useState(user.onboarding?.phase0?.feedback || "");
  const phase0 = user.onboarding?.phase0;

  const steps = [
    { 
      title: "Personal Details",
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

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-gray-500">{completedSteps} of {steps.length} steps completed</p>
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
        {steps.map((step, index) => (
          <Card key={index} className="p-4">
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
              {step.uploadable && !step.completed && (
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Upload className="h-4 w-4" />
                  Upload
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

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