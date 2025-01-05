import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface FeedbackSectionProps {
  feedback: string;
  onFeedbackChange: (value: string) => void;
  onSaveFeedback: () => void;
}

const FeedbackSection = ({ feedback, onFeedbackChange, onSaveFeedback }: FeedbackSectionProps) => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Admin Feedback</h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onSaveFeedback}
          >
            Save Feedback
          </Button>
        </div>
        <Textarea
          placeholder="Enter feedback for Phase 0..."
          value={feedback}
          onChange={(e) => onFeedbackChange(e.target.value)}
          className="min-h-[100px]"
        />
      </div>
    </Card>
  );
};

export default FeedbackSection;