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

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="personal-info">
          <AccordionTrigger>Personal Information</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4 p-4">
              <div>
                <Label className="font-semibold">Full Name</Label>
                <p className="text-gray-600">{user.personalInfo?.givenName} {user.personalInfo?.familyName}</p>
              </div>
              <div>
                <Label className="font-semibold">Nationality</Label>
                <p className="text-gray-600">{user.personalInfo?.nationality}</p>
              </div>
              <div>
                <Label className="font-semibold">Date of Birth</Label>
                <p className="text-gray-600">{user.personalInfo?.dateOfBirth}</p>
              </div>
              <div>
                <Label className="font-semibold">Gender</Label>
                <p className="text-gray-600">{user.personalInfo?.gender}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="passport-info">
          <AccordionTrigger>Passport Information</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4 p-4">
              <div>
                <Label className="font-semibold">Passport Number</Label>
                <p className="text-gray-600">{user.personalInfo?.passportNumber}</p>
              </div>
              <div>
                <Label className="font-semibold">Place of Issue</Label>
                <p className="text-gray-600">{user.personalInfo?.passportPlaceOfIssue}</p>
              </div>
              <div>
                <Label className="font-semibold">Issue Date</Label>
                <p className="text-gray-600">{user.personalInfo?.passportIssueDate}</p>
              </div>
              <div>
                <Label className="font-semibold">Expiry Date</Label>
                <p className="text-gray-600">{user.personalInfo?.passportExpiryDate}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="contact-info">
          <AccordionTrigger>Contact Information</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4 p-4">
              <div>
                <Label className="font-semibold">Address</Label>
                <p className="text-gray-600">{user.personalInfo?.address}</p>
              </div>
              <div>
                <Label className="font-semibold">City</Label>
                <p className="text-gray-600">{user.personalInfo?.city}</p>
              </div>
              <div>
                <Label className="font-semibold">Postal Code</Label>
                <p className="text-gray-600">{user.personalInfo?.postalCode}</p>
              </div>
              <div>
                <Label className="font-semibold">Country</Label>
                <p className="text-gray-600">{user.personalInfo?.country}</p>
              </div>
              <div>
                <Label className="font-semibold">Phone</Label>
                <p className="text-gray-600">{user.personalInfo?.phone}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

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
    </div>
  );
};

export default Phase0Details;