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
import { defaultOnboarding } from "@/utils/defaultOnboarding";
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
    ...defaultOnboarding,
    ...user.onboarding,
    phase0: { ...defaultOnboarding.phase0, ...user.onboarding?.phase0 },
    phase1: { ...defaultOnboarding.phase1, ...user.onboarding?.phase1 },
    phase2: { ...defaultOnboarding.phase2, ...user.onboarding?.phase2 },
    approvals: { ...defaultOnboarding.approvals, ...user.onboarding?.approvals },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedUser: User = {
      ...user,
      onboarding: onboarding,
    };

    onSave(updatedUser);
    toast.success("Onboarding progress updated successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Onboarding Progress</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <Phase0Form
              phase0={onboarding.phase0}
              onUpdate={(updates) =>
                setOnboarding((prev) => ({
                  ...prev,
                  phase0: { ...prev.phase0, ...updates },
                }))
              }
            />
            <Phase1Form
              phase1={onboarding.phase1}
              onUpdate={(updates) =>
                setOnboarding((prev) => ({
                  ...prev,
                  phase1: { ...prev.phase1, ...updates },
                }))
              }
            />
            <Phase2Form
              phase2={onboarding.phase2}
              onUpdate={(updates) =>
                setOnboarding((prev) => ({
                  ...prev,
                  phase2: { ...prev.phase2, ...updates },
                }))
              }
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditOnboardingDialog;