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
    approvals: user.onboarding?.approvals || { phase0: false, phase1: false, phase2: false }
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

  const handlePhase0Update = (field: string, value: any) => {
    setOnboarding((prev) => ({
      ...prev!,
      phase0: { ...prev!.phase0, [field]: value },
    }));
  };

  const handlePhase1Update = (field: string, value: boolean) => {
    setOnboarding((prev) => ({
      ...prev!,
      phase1: { ...prev!.phase1, [field]: value },
    }));
  };

  const handlePhase2Update = (field: string, value: boolean) => {
    setOnboarding((prev) => ({
      ...prev!,
      phase2: { ...prev!.phase2, [field]: value },
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Onboarding Progress</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Phase0Form 
            phase0={onboarding!.phase0} 
            onUpdate={handlePhase0Update}
          />
          
          {onboarding?.approvals.phase0 && (
            <Phase1Form 
              phase1={onboarding.phase1} 
              onUpdate={handlePhase1Update}
            />
          )}

          {onboarding?.approvals.phase1 && (
            <Phase2Form 
              phase2={onboarding.phase2} 
              onUpdate={handlePhase2Update}
            />
          )}

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditOnboardingDialog;