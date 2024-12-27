import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { User } from "@/types/user";
import { useState } from "react";
import Phase0Form from "./onboarding/Phase0Form";
import Phase1Form from "./onboarding/Phase1Form";
import Phase2Form from "./onboarding/Phase2Form";

interface EditOnboardingDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedUser: User) => void;
}

const EditOnboardingDialog = ({
  user,
  open,
  onOpenChange,
  onSave,
}: EditOnboardingDialogProps) => {
  const [onboarding, setOnboarding] = useState({
    ...user.onboarding,
    currentPhase: user.onboarding?.currentPhase || 0,
    phase0: {
      personalDetailsCompleted: false,
      cvSubmitted: false,
      interviewCompleted: false,
      jobStatus: 'pending',
      passportUploaded: false,
      pccUploaded: false,
      otherDocumentsUploaded: false,
      offerLetterSent: false,
      cosSent: false,
      rightToWorkSent: false,
      documentsUploaded: false,
      visaStatus: 'pending',
      travelDetailsUpdated: false,
      travelDocumentsUploaded: false,
      visaCopyUploaded: false,
      ukContactUpdated: false,
      feedback: user.onboarding?.phase0?.feedback || '',
      ...user.onboarding?.phase0
    },
    phase1: {
      hmrcChecklist: false,
      companyAgreements: false,
      pensionScheme: false,
      bankStatements: false,
      vaccinationProof: false,
      feedback: user.onboarding?.phase1?.feedback || '',
      ...user.onboarding?.phase1
    },
    phase2: {
      rightToWork: false,
      shareCode: false,
      dbs: false,
      onboardingComplete: false,
      feedback: user.onboarding?.phase2?.feedback || '',
      ...user.onboarding?.phase2
    },
    approvals: {
      phase0: false,
      phase1: false,
      phase2: false,
      ...user.onboarding?.approvals
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser: User = {
      ...user,
      onboarding: onboarding
    };
    onSave(updatedUser);
    toast.success("Onboarding progress updated successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Onboarding Progress</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-8 py-4 px-6">
              <Phase0Form
                phase0={onboarding.phase0}
                onUpdate={(updates) =>
                  setOnboarding((prev) => ({
                    ...prev,
                    phase0: { ...prev.phase0, ...updates },
                  }))
                }
              />

              {user.onboarding?.approvals.phase0 && (
                <Phase1Form
                  phase1={onboarding.phase1}
                  onUpdate={(updates) =>
                    setOnboarding((prev) => ({
                      ...prev,
                      phase1: { ...prev.phase1, ...updates },
                    }))
                  }
                />
              )}

              {user.onboarding?.approvals.phase1 && (
                <Phase2Form
                  phase2={onboarding.phase2}
                  onUpdate={(updates) =>
                    setOnboarding((prev) => ({
                      ...prev,
                      phase2: { ...prev.phase2, ...updates },
                    }))
                  }
                />
              )}
            </div>
          </div>
          <DialogFooter className="sticky bottom-0 bg-white py-4 px-6 border-t">
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditOnboardingDialog;