import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
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
  isAdmin?: boolean;
}

const EditOnboardingDialog = ({
  user,
  open,
  onOpenChange,
  onSave,
  isAdmin = true,
}: EditOnboardingDialogProps) => {
  const { toast } = useToast();
  const [onboarding, setOnboarding] = useState(user.onboarding);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedUser: User = {
      ...user,
      onboarding: onboarding,
    };

    onSave(updatedUser);
    toast({
      title: "Success",
      description: "Onboarding progress updated successfully",
    });
    onOpenChange(false);
  };

  const handlePhase0Update = (updates: Partial<typeof onboarding.phase0>) => {
    setOnboarding((prev) => ({
      ...prev!,
      phase0: { ...prev!.phase0, ...updates },
    }));
  };

  const handlePhase1Update = (updates: Partial<typeof onboarding.phase1>) => {
    setOnboarding((prev) => ({
      ...prev!,
      phase1: { ...prev!.phase1, ...updates },
    }));
  };

  const handlePhase2Update = (updates: Partial<typeof onboarding.phase2>) => {
    setOnboarding((prev) => ({
      ...prev!,
      phase2: { ...prev!.phase2, ...updates },
    }));
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
              phase0={onboarding!.phase0}
              onUpdate={handlePhase0Update}
              isAdmin={isAdmin}
            />
            {onboarding?.phase0.interviewStatus === 'accepted' && (
              <Phase1Form
                phase1={onboarding.phase1}
                onUpdate={handlePhase1Update}
                isAdmin={isAdmin}
              />
            )}
            {onboarding?.phase1.shareCodeUploaded && onboarding?.phase1.dbsUploaded && (
              <Phase2Form
                phase2={onboarding.phase2}
                onUpdate={handlePhase2Update}
                isAdmin={isAdmin}
              />
            )}
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