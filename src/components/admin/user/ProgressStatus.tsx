import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProgressStatusProps {
  user: User;
}

const ProgressStatus = ({ user }: ProgressStatusProps) => {
  const phase0 = user.onboarding?.phase0;
  const phase1 = user.onboarding?.phase1;
  const phase2 = user.onboarding?.phase2;
  
  const phase0Steps = [
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
    }
  ];

  const phase1Steps = [
    {
      title: "HMRC Checklist",
      completed: phase1?.hmrcChecklist,
      status: phase1?.hmrcChecklist ? "Completed" : "Pending",
      uploadable: true
    },
    {
      title: "Company Agreements",
      completed: phase1?.companyAgreements,
      status: phase1?.companyAgreements ? "Completed" : "Pending",
      uploadable: true
    },
    {
      title: "Pension Scheme",
      completed: phase1?.pensionScheme,
      status: phase1?.pensionScheme ? "Completed" : "Pending",
      uploadable: true
    },
    {
      title: "Bank Statements",
      completed: phase1?.bankStatements,
      status: phase1?.bankStatements ? "Completed" : "Pending",
      uploadable: true
    },
    {
      title: "Vaccination Proof",
      completed: phase1?.vaccinationProof,
      status: phase1?.vaccinationProof ? "Completed" : "Pending",
      uploadable: true
    }
  ];

  const phase2Steps = [
    {
      title: "Right to Work",
      completed: phase2?.rightToWork,
      status: phase2?.rightToWork ? "Completed" : "Pending",
      uploadable: true
    },
    {
      title: "Share Code",
      completed: phase2?.shareCode,
      status: phase2?.shareCode ? "Completed" : "Pending",
      uploadable: true
    },
    {
      title: "DBS Check",
      completed: phase2?.dbs,
      status: phase2?.dbs ? "Completed" : "Pending",
      uploadable: true
    }
  ];

  const renderPhaseProgress = (steps: any[]) => {
    const completedSteps = steps.filter(step => step.completed).length;
    const progress = (completedSteps / steps.length) * 100;

    return (
      <div className="space-y-6">
        <div className="space-y-2">
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
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="phase0" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="phase0">Phase 0</TabsTrigger>
          <TabsTrigger value="phase1" disabled={!user.onboarding?.approvals.phase0}>Phase 1</TabsTrigger>
          <TabsTrigger value="phase2" disabled={!user.onboarding?.approvals.phase1}>Phase 2</TabsTrigger>
        </TabsList>
        <TabsContent value="phase0" className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Phase 0: Initial Setup</h3>
          {renderPhaseProgress(phase0Steps)}
        </TabsContent>
        <TabsContent value="phase1" className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Phase 1: Documentation</h3>
          {renderPhaseProgress(phase1Steps)}
        </TabsContent>
        <TabsContent value="phase2" className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Phase 2: Final Steps</h3>
          {renderPhaseProgress(phase2Steps)}
        </TabsContent>
      </Tabs>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Important Notes</h3>
        <p className="text-gray-600">No notes available</p>
      </Card>
    </div>
  );
};

export default ProgressStatus;