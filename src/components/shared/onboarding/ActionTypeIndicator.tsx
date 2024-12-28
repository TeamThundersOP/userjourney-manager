import { Badge } from "@/components/ui/badge";
import { Lock, Upload, UserCircle2 } from "lucide-react";

interface ActionTypeIndicatorProps {
  type: "admin" | "user" | "upload";
}

const ActionTypeIndicator = ({ type }: ActionTypeIndicatorProps) => {
  switch (type) {
    case "admin":
      return (
        <Badge variant="secondary" className="text-xs">
          <Lock className="h-3 w-3 mr-1" />
          Admin
        </Badge>
      );
    case "upload":
      return (
        <Badge variant="outline" className="text-xs">
          <Upload className="h-3 w-3 mr-1" />
          Upload
        </Badge>
      );
    case "user":
      return (
        <Badge variant="default" className="text-xs">
          <UserCircle2 className="h-3 w-3 mr-1" />
          User
        </Badge>
      );
  }
};

export default ActionTypeIndicator;