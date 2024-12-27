import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MessageCircle } from "lucide-react";

interface PhaseFeedbackProps {
  feedback?: string;
  phase: number;
}

const PhaseFeedback = ({ feedback, phase }: PhaseFeedbackProps) => {
  if (!feedback) return null;

  return (
    <Alert className="mt-4">
      <MessageCircle className="h-4 w-4" />
      <AlertTitle>Admin Feedback for Phase {phase}</AlertTitle>
      <AlertDescription>{feedback}</AlertDescription>
    </Alert>
  );
};

export default PhaseFeedback;