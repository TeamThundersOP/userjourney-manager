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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { User } from "@/types/user";
import { useState } from "react";

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
            <div className="space-y-4">
              <h3 className="font-semibold">Phase 0: Initial Setup</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="cvSubmitted"
                    checked={onboarding?.phase0.cvSubmitted}
                    onCheckedChange={(checked) =>
                      setOnboarding((prev) => ({
                        ...prev!,
                        phase0: { ...prev!.phase0, cvSubmitted: checked as boolean },
                      }))
                    }
                  />
                  <Label htmlFor="cvSubmitted">CV Submitted</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="interviewCompleted"
                    checked={onboarding?.phase0.interviewCompleted}
                    onCheckedChange={(checked) =>
                      setOnboarding((prev) => ({
                        ...prev!,
                        phase0: { ...prev!.phase0, interviewCompleted: checked as boolean },
                      }))
                    }
                  />
                  <Label htmlFor="interviewCompleted">Interview Completed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="offerLetterSent"
                    checked={onboarding?.phase0.offerLetterSent}
                    onCheckedChange={(checked) =>
                      setOnboarding((prev) => ({
                        ...prev!,
                        phase0: { ...prev!.phase0, offerLetterSent: checked as boolean },
                      }))
                    }
                  />
                  <Label htmlFor="offerLetterSent">Offer Letter Sent</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="cosSent"
                    checked={onboarding?.phase0.cosSent}
                    onCheckedChange={(checked) =>
                      setOnboarding((prev) => ({
                        ...prev!,
                        phase0: { ...prev!.phase0, cosSent: checked as boolean },
                      }))
                    }
                  />
                  <Label htmlFor="cosSent">COS Sent</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rightToWorkSent"
                    checked={onboarding?.phase0.rightToWorkSent}
                    onCheckedChange={(checked) =>
                      setOnboarding((prev) => ({
                        ...prev!,
                        phase0: { ...prev!.phase0, rightToWorkSent: checked as boolean },
                      }))
                    }
                  />
                  <Label htmlFor="rightToWorkSent">Right to Work Sent</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="documentsUploaded"
                    checked={onboarding?.phase0.documentsUploaded}
                    onCheckedChange={(checked) =>
                      setOnboarding((prev) => ({
                        ...prev!,
                        phase0: { ...prev!.phase0, documentsUploaded: checked as boolean },
                      }))
                    }
                  />
                  <Label htmlFor="documentsUploaded">Documents Uploaded</Label>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="visaStatus">Visa Status</Label>
                  <Select
                    value={onboarding?.phase0.visaStatus}
                    onValueChange={(value: 'pending' | 'approved' | 'rejected') =>
                      setOnboarding((prev) => ({
                        ...prev!,
                        phase0: { ...prev!.phase0, visaStatus: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select visa status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Phase 1: Documentation</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hmrcChecklist"
                    checked={onboarding?.phase1.hmrcChecklist}
                    onCheckedChange={(checked) =>
                      setOnboarding((prev) => ({
                        ...prev!,
                        phase1: { ...prev!.phase1, hmrcChecklist: checked as boolean },
                      }))
                    }
                  />
                  <Label htmlFor="hmrcChecklist">HMRC Checklist</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="companyAgreements"
                    checked={onboarding?.phase1.companyAgreements}
                    onCheckedChange={(checked) =>
                      setOnboarding((prev) => ({
                        ...prev!,
                        phase1: { ...prev!.phase1, companyAgreements: checked as boolean },
                      }))
                    }
                  />
                  <Label htmlFor="companyAgreements">Company Agreements</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pensionScheme"
                    checked={onboarding?.phase1.pensionScheme}
                    onCheckedChange={(checked) =>
                      setOnboarding((prev) => ({
                        ...prev!,
                        phase1: { ...prev!.phase1, pensionScheme: checked as boolean },
                      }))
                    }
                  />
                  <Label htmlFor="pensionScheme">Pension Scheme</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="bankStatements"
                    checked={onboarding?.phase1.bankStatements}
                    onCheckedChange={(checked) =>
                      setOnboarding((prev) => ({
                        ...prev!,
                        phase1: { ...prev!.phase1, bankStatements: checked as boolean },
                      }))
                    }
                  />
                  <Label htmlFor="bankStatements">Bank Statements</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vaccinationProof"
                    checked={onboarding?.phase1.vaccinationProof}
                    onCheckedChange={(checked) =>
                      setOnboarding((prev) => ({
                        ...prev!,
                        phase1: { ...prev!.phase1, vaccinationProof: checked as boolean },
                      }))
                    }
                  />
                  <Label htmlFor="vaccinationProof">Vaccination Proof</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Phase 2: Final Steps</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rightToWork"
                    checked={onboarding?.phase2.rightToWork}
                    onCheckedChange={(checked) =>
                      setOnboarding((prev) => ({
                        ...prev!,
                        phase2: { ...prev!.phase2, rightToWork: checked as boolean },
                      }))
                    }
                  />
                  <Label htmlFor="rightToWork">Right to Work</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="shareCode"
                    checked={onboarding?.phase2.shareCode}
                    onCheckedChange={(checked) =>
                      setOnboarding((prev) => ({
                        ...prev!,
                        phase2: { ...prev!.phase2, shareCode: checked as boolean },
                      }))
                    }
                  />
                  <Label htmlFor="shareCode">Share Code</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dbs"
                    checked={onboarding?.phase2.dbs}
                    onCheckedChange={(checked) =>
                      setOnboarding((prev) => ({
                        ...prev!,
                        phase2: { ...prev!.phase2, dbs: checked as boolean },
                      }))
                    }
                  />
                  <Label htmlFor="dbs">DBS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="onboardingComplete"
                    checked={onboarding?.phase2.onboardingComplete}
                    onCheckedChange={(checked) =>
                      setOnboarding((prev) => ({
                        ...prev!,
                        phase2: { ...prev!.phase2, onboardingComplete: checked as boolean },
                      }))
                    }
                  />
                  <Label htmlFor="onboardingComplete">Onboarding Complete</Label>
                </div>
              </div>
            </div>
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
