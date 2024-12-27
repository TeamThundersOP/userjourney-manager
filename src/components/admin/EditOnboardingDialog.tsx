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
import { Textarea } from "@/components/ui/textarea";
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
      onboarding: {
        ...onboarding,
        phase0: {
          personalDetailsCompleted: onboarding?.phase0?.personalDetailsCompleted || false,
          cvSubmitted: onboarding?.phase0?.cvSubmitted || false,
          interviewCompleted: onboarding?.phase0?.interviewCompleted || false,
          jobStatus: onboarding?.phase0?.jobStatus || 'pending',
          passportUploaded: onboarding?.phase0?.passportUploaded || false,
          pccUploaded: onboarding?.phase0?.pccUploaded || false,
          otherDocumentsUploaded: onboarding?.phase0?.otherDocumentsUploaded || false,
          offerLetterSent: onboarding?.phase0?.offerLetterSent || false,
          cosSent: onboarding?.phase0?.cosSent || false,
          rightToWorkSent: onboarding?.phase0?.rightToWorkSent || false,
          documentsUploaded: onboarding?.phase0?.documentsUploaded || false,
          visaStatus: onboarding?.phase0?.visaStatus || 'pending',
          travelDetailsUpdated: onboarding?.phase0?.travelDetailsUpdated || false,
          travelDocumentsUploaded: onboarding?.phase0?.travelDocumentsUploaded || false,
          visaCopyUploaded: onboarding?.phase0?.visaCopyUploaded || false,
          ukContactUpdated: onboarding?.phase0?.ukContactUpdated || false,
          feedback: onboarding?.phase0?.feedback || ''
        },
        phase1: onboarding?.phase1 || {
          hmrcChecklist: false,
          companyAgreements: false,
          pensionScheme: false,
          bankStatements: false,
          vaccinationProof: false,
          feedback: ''
        },
        phase2: onboarding?.phase2 || {
          rightToWork: false,
          shareCode: false,
          dbs: false,
          onboardingComplete: false,
          feedback: ''
        },
        approvals: onboarding?.approvals || {
          phase0: false,
          phase1: false,
          phase2: false
        }
      }
    };

    onSave(updatedUser);
    toast.success("Onboarding progress updated successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Edit Onboarding Progress</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="overflow-y-auto flex-1 pr-6 -mr-6">
            <div className="grid gap-6 py-4">
              <div className="space-y-4">
                <h3 className="font-semibold">Phase 0: Initial Setup</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="personalDetailsCompleted"
                      checked={onboarding?.phase0?.personalDetailsCompleted}
                      onCheckedChange={(checked) =>
                        setOnboarding((prev) => ({
                          ...prev!,
                          phase0: { ...prev!.phase0, personalDetailsCompleted: checked as boolean },
                        }))
                      }
                    />
                    <Label htmlFor="personalDetailsCompleted">Personal Details Completed</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cvSubmitted"
                      checked={onboarding?.phase0?.cvSubmitted}
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
                      checked={onboarding?.phase0?.interviewCompleted}
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
                      id="passportUploaded"
                      checked={onboarding?.phase0?.passportUploaded}
                      onCheckedChange={(checked) =>
                        setOnboarding((prev) => ({
                          ...prev!,
                          phase0: { ...prev!.phase0, passportUploaded: checked as boolean },
                        }))
                      }
                    />
                    <Label htmlFor="passportUploaded">Passport Uploaded</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pccUploaded"
                      checked={onboarding?.phase0?.pccUploaded}
                      onCheckedChange={(checked) =>
                        setOnboarding((prev) => ({
                          ...prev!,
                          phase0: { ...prev!.phase0, pccUploaded: checked as boolean },
                        }))
                      }
                    />
                    <Label htmlFor="pccUploaded">PCC Uploaded</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="otherDocumentsUploaded"
                      checked={onboarding?.phase0?.otherDocumentsUploaded}
                      onCheckedChange={(checked) =>
                        setOnboarding((prev) => ({
                          ...prev!,
                          phase0: { ...prev!.phase0, otherDocumentsUploaded: checked as boolean },
                        }))
                      }
                    />
                    <Label htmlFor="otherDocumentsUploaded">Other Documents Uploaded</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="offerLetterSent"
                      checked={onboarding?.phase0?.offerLetterSent}
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
                      checked={onboarding?.phase0?.cosSent}
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
                      checked={onboarding?.phase0?.rightToWorkSent}
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
                      checked={onboarding?.phase0?.documentsUploaded}
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
                      value={onboarding?.phase0?.visaStatus}
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
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="travelDetailsUpdated"
                      checked={onboarding?.phase0?.travelDetailsUpdated}
                      onCheckedChange={(checked) =>
                        setOnboarding((prev) => ({
                          ...prev!,
                          phase0: { ...prev!.phase0, travelDetailsUpdated: checked as boolean },
                        }))
                      }
                    />
                    <Label htmlFor="travelDetailsUpdated">Travel Details Updated</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="travelDocumentsUploaded"
                      checked={onboarding?.phase0?.travelDocumentsUploaded}
                      onCheckedChange={(checked) =>
                        setOnboarding((prev) => ({
                          ...prev!,
                          phase0: { ...prev!.phase0, travelDocumentsUploaded: checked as boolean },
                        }))
                      }
                    />
                    <Label htmlFor="travelDocumentsUploaded">Travel Documents Uploaded</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="visaCopyUploaded"
                      checked={onboarding?.phase0?.visaCopyUploaded}
                      onCheckedChange={(checked) =>
                        setOnboarding((prev) => ({
                          ...prev!,
                          phase0: { ...prev!.phase0, visaCopyUploaded: checked as boolean },
                        }))
                      }
                    />
                    <Label htmlFor="visaCopyUploaded">Visa Copy Uploaded</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ukContactUpdated"
                      checked={onboarding?.phase0?.ukContactUpdated}
                      onCheckedChange={(checked) =>
                        setOnboarding((prev) => ({
                          ...prev!,
                          phase0: { ...prev!.phase0, ukContactUpdated: checked as boolean },
                        }))
                      }
                    />
                    <Label htmlFor="ukContactUpdated">UK Contact Updated</Label>
                  </div>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="phase0-feedback">Feedback for Phase 0</Label>
                  <Textarea
                    id="phase0-feedback"
                    value={onboarding.phase0.feedback}
                    onChange={(e) =>
                      setOnboarding((prev) => ({
                        ...prev,
                        phase0: { ...prev.phase0, feedback: e.target.value },
                      }))
                    }
                    placeholder="Enter feedback for the user..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              {user.onboarding?.approvals.phase0 && (
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
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="phase1-feedback">Feedback for Phase 1</Label>
                    <Textarea
                      id="phase1-feedback"
                      value={onboarding.phase1.feedback}
                      onChange={(e) =>
                        setOnboarding((prev) => ({
                          ...prev,
                          phase1: { ...prev.phase1, feedback: e.target.value },
                        }))
                      }
                      placeholder="Enter feedback for the user..."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              )}

              {user.onboarding?.approvals.phase1 && (
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
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="phase2-feedback">Feedback for Phase 2</Label>
                    <Textarea
                      id="phase2-feedback"
                      value={onboarding.phase2.feedback}
                      onChange={(e) =>
                        setOnboarding((prev) => ({
                          ...prev,
                          phase2: { ...prev.phase2, feedback: e.target.value },
                        }))
                      }
                      placeholder="Enter feedback for the user..."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              )}
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

export default EditOnboardingDialog;
