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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { User } from "@/types/user";
import { useState } from "react";

interface EditPhase0DialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedUser: User) => void;
}

const EditPhase0Dialog = ({ user, open, onOpenChange, onSave }: EditPhase0DialogProps) => {
  const [phase0Data, setPhase0Data] = useState({
    ...user.onboarding?.phase0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedUser: User = {
      ...user,
      onboarding: {
        ...user.onboarding,
        phase0: phase0Data,
      }
    };

    onSave(updatedUser);
    toast.success("Phase 0 data updated successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Edit Phase 0: Initial Setup</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="overflow-y-auto flex-1 pr-6 -mr-6">
            <div className="grid gap-6 py-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="personalDetailsCompleted"
                      checked={phase0Data?.personalDetailsCompleted}
                      onCheckedChange={(checked) =>
                        setPhase0Data((prev) => ({
                          ...prev!,
                          personalDetailsCompleted: checked as boolean,
                        }))
                      }
                    />
                    <Label htmlFor="personalDetailsCompleted">Personal Details Completed</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cvSubmitted"
                      checked={phase0Data?.cvSubmitted}
                      onCheckedChange={(checked) =>
                        setPhase0Data((prev) => ({
                          ...prev!,
                          cvSubmitted: checked as boolean,
                        }))
                      }
                    />
                    <Label htmlFor="cvSubmitted">CV Submitted</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="interviewCompleted"
                      checked={phase0Data?.interviewCompleted}
                      onCheckedChange={(checked) =>
                        setPhase0Data((prev) => ({
                          ...prev!,
                          interviewCompleted: checked as boolean,
                        }))
                      }
                    />
                    <Label htmlFor="interviewCompleted">Interview Completed</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="passportUploaded"
                      checked={phase0Data?.passportUploaded}
                      onCheckedChange={(checked) =>
                        setPhase0Data((prev) => ({
                          ...prev!,
                          passportUploaded: checked as boolean,
                        }))
                      }
                    />
                    <Label htmlFor="passportUploaded">Passport Uploaded</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pccUploaded"
                      checked={phase0Data?.pccUploaded}
                      onCheckedChange={(checked) =>
                        setPhase0Data((prev) => ({
                          ...prev!,
                          pccUploaded: checked as boolean,
                        }))
                      }
                    />
                    <Label htmlFor="pccUploaded">PCC Uploaded</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="otherDocumentsUploaded"
                      checked={phase0Data?.otherDocumentsUploaded}
                      onCheckedChange={(checked) =>
                        setPhase0Data((prev) => ({
                          ...prev!,
                          otherDocumentsUploaded: checked as boolean,
                        }))
                      }
                    />
                    <Label htmlFor="otherDocumentsUploaded">Other Documents Uploaded</Label>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="visaStatus">Visa Status</Label>
                    <Select
                      value={phase0Data?.visaStatus}
                      onValueChange={(value: 'pending' | 'approved' | 'rejected') =>
                        setPhase0Data((prev) => ({
                          ...prev!,
                          visaStatus: value,
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
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="phase0-feedback">Feedback</Label>
                    <Textarea
                      id="phase0-feedback"
                      value={phase0Data?.feedback}
                      onChange={(e) =>
                        setPhase0Data((prev) => ({
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
          </div>
          <DialogFooter className="sticky bottom-0 bg-white py-4">
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPhase0Dialog;