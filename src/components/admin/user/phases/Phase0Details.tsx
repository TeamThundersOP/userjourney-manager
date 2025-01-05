import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Phase0StatusGrid from "./Phase0StatusGrid";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Phase0DetailsProps {
  user: User;
  onSaveFeedback: (feedback: string) => void;
}

const Phase0Details = ({ user, onSaveFeedback }: Phase0DetailsProps) => {
  const [feedback, setFeedback] = useState(user.onboarding?.phase0?.feedback || "");
  const [phase0, setPhase0] = useState(user.onboarding?.phase0);
  const phase0Initial = user.onboarding?.phase0;

  const handleStatusChange = (key: string, value: boolean) => {
    setPhase0(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleJobStatusChange = (value: 'pending' | 'accepted' | 'rejected') => {
    setPhase0(prev => ({
      ...prev,
      jobStatus: value
    }));
  };

  const handleVisaStatusChange = (value: 'pending' | 'approved' | 'rejected') => {
    setPhase0(prev => ({
      ...prev,
      visaStatus: value
    }));
  };

  const handleSaveChanges = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: User) => {
      if (u.id === user.id) {
        return {
          ...u,
          onboarding: {
            ...u.onboarding,
            phase0: phase0
          }
        };
      }
      return u;
    });
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    toast.success("Phase 0 status updated successfully");
  };

  const handleResetChanges = () => {
    setPhase0(phase0Initial);
    toast.success("Changes reset to original state");
  };

  const completedSteps = Object.values(phase0 || {}).filter(value => value === true).length;
  const totalSteps = Object.keys(phase0 || {}).filter(key => key !== 'feedback' && key !== 'jobStatus' && key !== 'visaStatus').length;
  const progress = (completedSteps / totalSteps) * 100;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-gray-500">{completedSteps} of {totalSteps} steps completed</p>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={handleResetChanges}>
          Reset Changes
        </Button>
        <Button onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </div>

      <Phase0StatusGrid phase0={phase0} onStatusChange={handleStatusChange} />

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-4">Job Status</h3>
            <RadioGroup
              value={phase0?.jobStatus}
              onValueChange={handleJobStatusChange}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pending" id="job-pending" />
                <Label htmlFor="job-pending">Pending</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="accepted" id="job-accepted" />
                <Label htmlFor="job-accepted">Accepted</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rejected" id="job-rejected" />
                <Label htmlFor="job-rejected">Rejected</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Visa Status</h3>
            <RadioGroup
              value={phase0?.visaStatus}
              onValueChange={handleVisaStatusChange}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pending" id="visa-pending" />
                <Label htmlFor="visa-pending">Pending</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="approved" id="visa-approved" />
                <Label htmlFor="visa-approved">Approved</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rejected" id="visa-rejected" />
                <Label htmlFor="visa-rejected">Rejected</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Admin Feedback</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onSaveFeedback(feedback)}
            >
              Save Feedback
            </Button>
          </div>
          <Textarea
            placeholder="Enter feedback for Phase 0..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="uk-contact" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
            <span className="text-lg font-heading font-medium text-primary">UK Contact Details</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-6 space-y-6 bg-gradient-to-br from-background via-background to-muted/20">
              <div className="glass-card p-4 rounded-lg">
                <Label className="text-primary font-heading mb-2 block">UK Contact Number</Label>
                <p className="text-foreground/80 font-medium">
                  {phase0?.ukContactNumber || 'Not provided'}
                </p>
              </div>
              <div className="glass-card p-4 rounded-lg">
                <Label className="text-primary font-heading mb-2 block">UK Address</Label>
                <p className="text-foreground/80 font-medium whitespace-pre-line">
                  {phase0?.ukAddress || 'Not provided'}
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Phase0Details;
