import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, XCircle, Lock, Upload } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface Phase0StatusItemProps {
  title: string;
  completed: boolean;
  status: string;
  stateKey: string;
  onStatusChange: (key: string, value: boolean) => void;
  isAdminAction?: boolean;
  isUploadAction?: boolean;
}

const Phase0StatusItem = ({
  title,
  completed,
  status,
  stateKey,
  onStatusChange,
  isAdminAction,
  isUploadAction
}: Phase0StatusItemProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          {completed ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-gray-300" />
          )}
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-medium">{title}</h4>
              {isAdminAction && (
                <Badge variant="secondary" className="text-xs">
                  <Lock className="h-3 w-3 mr-1" />
                  Admin
                </Badge>
              )}
              {isUploadAction && (
                <Badge variant="outline" className="text-xs">
                  <Upload className="h-3 w-3 mr-1" />
                  Upload
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-500 capitalize">Status: {status}</p>
          </div>
        </div>
        {stateKey !== 'jobStatus' && stateKey !== 'visaStatus' && (
          <Checkbox
            checked={completed}
            onCheckedChange={(checked) => onStatusChange(stateKey, checked as boolean)}
          />
        )}
      </div>
    </Card>
  );
};

export default Phase0StatusItem;