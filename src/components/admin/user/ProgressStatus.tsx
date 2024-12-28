import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";

interface ProgressStatusProps {
  user: User;
}

const ProgressStatus = ({ user }: ProgressStatusProps) => {
  const phase0 = user.onboarding?.phase0;
  
  const steps = [
    { 
      title: "CV Submitted", 
      completed: phase0?.cvSubmitted,
      status: phase0?.cvSubmitted ? "Completed" : "Pending"
    },
    { 
      title: "Interview Completed", 
      completed: phase0?.interviewCompleted,
      status: phase0?.interviewCompleted ? "Completed" : "Pending"
    },
    { 
      title: "Offer Letter", 
      completed: phase0?.offerLetterSent,
      status: phase0?.offerLetterSent ? "Completed" : "Pending"
    },
    { 
      title: "CoS", 
      completed: phase0?.cosSent,
      status: phase0?.cosSent ? "Completed" : "Pending",
      uploadable: true
    },
    { 
      title: "Right to Work", 
      completed: phase0?.rightToWorkSent,
      status: phase0?.rightToWorkSent ? "Completed" : "Pending"
    },
    { 
      title: "Onboarding", 
      completed: false,
      status: "Pending",
      uploadable: true
    }
  ];

  const completedSteps = steps.filter(step => step.completed).length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Overall Progress</h3>
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-gray-500">{completedSteps} of {steps.length} steps completed</p>
      </div>

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
                  <p className="text-sm text-gray-500">Status: {step.status}</p>
                </div>
              </div>
              {step.uploadable && !step.completed && (
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Upload className="h-4 w-4" />
                  Upload Document
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Important Notes</h3>
        <p className="text-gray-600">No notes available</p>
      </Card>
    </div>
  );
};

export default ProgressStatus;