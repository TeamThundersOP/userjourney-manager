import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/use-user";
import { useState } from "react";

const OnboardingPhases = () => {
  const { user } = useUser();
  const [isPhaseDialogOpen, setIsPhaseDialogOpen] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);

  const phases = [
    {
      title: "Phase 0: Pre-Employment",
      description: "Initial documentation and verification",
      items: [
        { key: "personalDetailsCompleted", label: "Personal Details" },
        { key: "cvSubmitted", label: "CV Submission" },
        { key: "interviewCompleted", label: "Interview" },
        { key: "passportUploaded", label: "Passport" },
        { key: "pccUploaded", label: "Police Clearance" },
        { key: "otherDocumentsUploaded", label: "Other Documents" },
        { key: "offerLetterSent", label: "Offer Letter" },
        { key: "cosSent", label: "Certificate of Sponsorship" },
        { key: "rightToWorkSent", label: "Right to Work" },
        { key: "documentsUploaded", label: "Documents Upload" },
        { key: "travelDetailsUpdated", label: "Travel Details" },
        { key: "travelDocumentsUploaded", label: "Travel Documents" },
        { key: "visaCopyUploaded", label: "Visa Copy" },
        { key: "ukContactUpdated", label: "UK Contact Details" }
      ]
    },
    {
      title: "Phase 1: Initial Employment",
      description: "Essential employment documentation",
      items: [
        { key: "hmrcChecklist", label: "HMRC Checklist" },
        { key: "companyAgreements", label: "Company Agreements" },
        { key: "pensionScheme", label: "Pension Scheme" },
        { key: "bankStatements", label: "Bank Statements" },
        { key: "vaccinationProof", label: "Vaccination Proof" }
      ]
    },
    {
      title: "Phase 2: Final Steps",
      description: "Final documentation and completion",
      items: [
        { key: "rightToWork", label: "Right to Work" },
        { key: "shareCode", label: "Share Code" },
        { key: "dbs", label: "DBS Check" },
        { key: "onboardingComplete", label: "Onboarding Complete" }
      ]
    }
  ];

  const getPhaseStatus = (phaseIndex: number) => {
    if (!user?.onboarding) return "pending";
    const phase = `phase${phaseIndex}` as keyof typeof user.onboarding;
    const items = phases[phaseIndex].items;
    
    const allCompleted = items.every(item => 
      user.onboarding[phase][item.key as keyof typeof user.onboarding[typeof phase]]
    );
    
    if (allCompleted) return "completed";
    if (items.some(item => 
      user.onboarding[phase][item.key as keyof typeof user.onboarding[typeof phase]]
    )) return "in-progress";
    return "pending";
  };

  const handlePhaseClick = (phaseIndex: number) => {
    setSelectedPhase(phaseIndex);
    setIsPhaseDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {phases.map((phase, index) => {
        const status = getPhaseStatus(index);
        const isCurrentPhase = user?.onboarding?.currentPhase === index;
        const isPreviousPhaseApproved = index === 0 || user?.onboarding?.approvals[`phase${index - 1}` as keyof typeof user.onboarding.approvals];
        const isPhaseApproved = user?.onboarding?.approvals[`phase${index}` as keyof typeof user.onboarding.approvals];

        return (
          <Card 
            key={index}
            className={cn(
              "relative cursor-pointer transition-colors",
              isCurrentPhase && "border-primary",
              !isPreviousPhaseApproved && "opacity-50"
            )}
            onClick={() => isPreviousPhaseApproved && handlePhaseClick(index)}
          >
            {isCurrentPhase && (
              <div className="absolute -left-2 top-4">
                <Badge variant="default">Current Phase</Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{phase.title}</span>
                <div className="flex items-center gap-2">
                  {status === "completed" && <CheckCircle2 className="text-green-500" />}
                  {status === "in-progress" && <Circle className="text-yellow-500" />}
                  {status === "pending" && <XCircle className="text-gray-300" />}
                  {isPhaseApproved && (
                    <Badge variant="outline" className="ml-2">Approved</Badge>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">{phase.description}</p>
            </CardContent>
          </Card>
        );
      })}

      <Dialog open={isPhaseDialogOpen} onOpenChange={setIsPhaseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Phase Details</DialogTitle>
            <DialogDescription>
              Review the details and requirements for this phase.
            </DialogDescription>
          </DialogHeader>
          {selectedPhase !== null && (
            <div className="space-y-4">
              <h3 className="font-semibold">{phases[selectedPhase].title}</h3>
              <p className="text-sm text-gray-500">{phases[selectedPhase].description}</p>
              <div className="space-y-2">
                {phases[selectedPhase].items.map((item, index) => {
                  const phase = `phase${selectedPhase}` as keyof typeof user.onboarding;
                  const isCompleted = user?.onboarding?.[phase][item.key as keyof typeof user.onboarding[typeof phase]];

                  return (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{item.label}</span>
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-300" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OnboardingPhases;