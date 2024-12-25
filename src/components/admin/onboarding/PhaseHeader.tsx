import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PhaseHeaderProps {
  title: string;
  isApproved: boolean;
  canApprove: boolean;
  onApprove?: () => void;
}

const PhaseHeader = ({ title, isApproved, canApprove, onApprove }: PhaseHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <h3 className="font-semibold text-lg">{title}</h3>
      {isApproved ? (
        <Badge variant="default" className="flex items-center gap-1 bg-green-500">
          <Check className="h-3 w-3" />
          Approved
        </Badge>
      ) : canApprove ? (
        <Button 
          size="sm" 
          onClick={onApprove}
          className="flex items-center gap-1"
        >
          <Check className="h-4 w-4" />
          Approve Phase
        </Button>
      ) : null}
    </div>
  );
};

export default PhaseHeader;