import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Phase1 } from "@/types/user";

interface DocumentsSectionProps {
  documents: Phase1['documents'];
  onDocumentChange: (key: keyof Phase1['documents'], value: boolean) => void;
}

export const DocumentsSection = ({ documents, onDocumentChange }: DocumentsSectionProps) => {
  return (
    <div className="space-y-2">
      <Label>Documents</Label>
      <div className="grid gap-2">
        {Object.entries(documents).map(([key, value]) => (
          <div key={key} className="flex items-center space-x-2">
            <Checkbox
              checked={value}
              onCheckedChange={(checked) =>
                onDocumentChange(key as keyof Phase1['documents'], checked as boolean)
              }
            />
            <Label className="capitalize">{key}</Label>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};