import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { User } from "@/types/user";
import { useState } from "react";

interface EditPhase2DialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedUser: User) => void;
}

const EditPhase2Dialog = ({ user, open, onOpenChange, onSave }: EditPhase2DialogProps) => {
  const [phase2Data, setPhase2Data] = useState({
    ...user.onboarding?.phase2,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedUser: User = {
      ...user,
      onboarding: {
        ...user.onboarding,
        phase2: phase2Data,
      }
    };

    onSave(updatedUser);
    toast.success("Phase 2 data updated successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Edit Phase 2: Final Steps</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="overflow-y-auto flex-1 pr-6 -mr-6">
            <div className="grid gap-6 py-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rightToWork"
                      checked={phase2Data?.rightToWork}
                      onCheckedChange={(checked) =>
                        setPhase2Data((prev) => ({
                          ...prev!,
                          rightToWork: checked as boolean,
                        }))
                      }
                    />
                    <Label htmlFor="rightToWork">Right to Work</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="shareCode"
                      checked={phase2Data?.shareCode}
                      onCheckedChange={(checked) =>
                        setPhase2Data((prev) => ({
                          ...prev!,
                          shareCode: checked as boolean,
                        }))
                      }
                    />
                    <Label htmlFor="shareCode">Share Code</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="dbs"
                      checked={phase2Data?.dbs}
                      onCheckedChange={(checked) =>
                        setPhase2Data((prev) => ({
                          ...prev!,
                          dbs: checked as boolean,
                        }))
                      }
                    />
                    <Label htmlFor="dbs">DBS</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="onboardingComplete"
                      checked={phase2Data?.onboardingComplete}
                      onCheckedChange={(checked) =>
                        setPhase2Data((prev) => ({
                          ...prev!,
                          onboardingComplete: checked as boolean,
                        }))
                      }
                    />
                    <Label htmlFor="onboardingComplete">Onboarding Complete</Label>
                  </div>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="phase2-feedback">Feedback</Label>
                  <Textarea
                    id="phase2-feedback"
                    value={phase2Data?.feedback}
                    onChange={(e) =>
                      setPhase2Data((prev) => ({
                        ...prev!,
                        feedback: e.target.value,
                      }))
                    }
                    placeholder="Enter feedback for the user..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="sticky bottom-0 bg-white py-4">
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPhase2Dialog;