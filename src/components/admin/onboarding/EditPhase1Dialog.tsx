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

interface EditPhase1DialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedUser: User) => void;
}

const EditPhase1Dialog = ({ user, open, onOpenChange, onSave }: EditPhase1DialogProps) => {
  const [phase1Data, setPhase1Data] = useState({
    ...user.onboarding?.phase1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedUser: User = {
      ...user,
      onboarding: {
        ...user.onboarding,
        phase1: phase1Data,
      }
    };

    onSave(updatedUser);
    toast.success("Phase 1 data updated successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Edit Phase 1: Documentation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="overflow-y-auto flex-1 pr-6 -mr-6">
            <div className="grid gap-6 py-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hmrcChecklist"
                      checked={phase1Data?.hmrcChecklist}
                      onCheckedChange={(checked) =>
                        setPhase1Data((prev) => ({
                          ...prev!,
                          hmrcChecklist: checked as boolean,
                        }))
                      }
                    />
                    <Label htmlFor="hmrcChecklist">HMRC Checklist</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="companyAgreements"
                      checked={phase1Data?.companyAgreements}
                      onCheckedChange={(checked) =>
                        setPhase1Data((prev) => ({
                          ...prev!,
                          companyAgreements: checked as boolean,
                        }))
                      }
                    />
                    <Label htmlFor="companyAgreements">Company Agreements</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pensionScheme"
                      checked={phase1Data?.pensionScheme}
                      onCheckedChange={(checked) =>
                        setPhase1Data((prev) => ({
                          ...prev!,
                          pensionScheme: checked as boolean,
                        }))
                      }
                    />
                    <Label htmlFor="pensionScheme">Pension Scheme</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="bankStatements"
                      checked={phase1Data?.bankStatements}
                      onCheckedChange={(checked) =>
                        setPhase1Data((prev) => ({
                          ...prev!,
                          bankStatements: checked as boolean,
                        }))
                      }
                    />
                    <Label htmlFor="bankStatements">Bank Statements</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="vaccinationProof"
                      checked={phase1Data?.vaccinationProof}
                      onCheckedChange={(checked) =>
                        setPhase1Data((prev) => ({
                          ...prev!,
                          vaccinationProof: checked as boolean,
                        }))
                      }
                    />
                    <Label htmlFor="vaccinationProof">Vaccination Proof</Label>
                  </div>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="phase1-feedback">Feedback</Label>
                  <Textarea
                    id="phase1-feedback"
                    value={phase1Data?.feedback}
                    onChange={(e) =>
                      setPhase1Data((prev) => ({
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

export default EditPhase1Dialog;