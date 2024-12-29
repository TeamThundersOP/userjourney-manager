import { Badge } from "@/components/ui/badge";
import { Lock, Upload, UserCircle2 } from "lucide-react";

interface ActionTypeIndicatorProps {
  type: "admin" | "user" | "upload";
}

const ActionTypeIndicator = ({ type }: ActionTypeIndicatorProps) => {
  switch (type) {
    case "admin":
      return (
        <Badge variant="secondary" className="text-xs whitespace-nowrap inline-flex items-center">
          <Lock className="h-3 w-3 mr-1 flex-shrink-0" />
          Admin
        </Badge>
      );
    case "upload":
      return (
        <Badge variant="outline" className="text-xs whitespace-nowrap inline-flex items-center">
          <Upload className="h-3 w-3 mr-1 flex-shrink-0" />
          Upload
        </Badge>
      );
    case "user":
      return (
        <Badge variant="default" className="text-xs whitespace-nowrap inline-flex items-center">
          <UserCircle2 className="h-3 w-3 mr-1 flex-shrink-0" />
          User
        </Badge>
      );
  }
};

export default ActionTypeIndicator;