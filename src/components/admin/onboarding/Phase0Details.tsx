import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { useState } from "react";
import { toast } from "sonner";
import Phase0StatusGrid from "./Phase0StatusGrid";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PersonalInfoSection from "./sections/PersonalInfoSection";
import PassportInfoSection from "./sections/PassportInfoSection";
import ContactInfoSection from "./sections/ContactInfoSection";
import UKContactSection from "./sections/UKContactSection";
import StatusSection from "./sections/StatusSection";
import FeedbackSection from "./sections/FeedbackSection";

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

      <Accordion type="single" collapsible defaultValue="personal-info" className="w-full">
        <AccordionItem value="personal-info">
          <AccordionTrigger>Personal Information</AccordionTrigger>
          <AccordionContent>
            <PersonalInfoSection user={user} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="passport-info">
          <AccordionTrigger>Passport Information</AccordionTrigger>
          <AccordionContent>
            <PassportInfoSection user={user} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="contact-info">
          <AccordionTrigger>Contact Information</AccordionTrigger>
          <AccordionContent>
            <ContactInfoSection user={user} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="uk-contact">
          <AccordionTrigger>UK Contact Details</AccordionTrigger>
          <AccordionContent>
            <UKContactSection user={user} />
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

      <StatusSection 
        phase0={phase0}
        onJobStatusChange={handleJobStatusChange}
        onVisaStatusChange={handleVisaStatusChange}
      />

      <FeedbackSection 
        feedback={feedback}
        onFeedbackChange={setFeedback}
        onSaveFeedback={() => onSaveFeedback(feedback)}
      />
    </div>
  );
};

export default Phase0Details;