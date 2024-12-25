import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Phase1 } from "@/types/user";

interface UKTravelSectionProps {
  ukTravel: Phase1['ukTravel'];
  onUKTravelChange: (key: keyof Phase1['ukTravel'], value: boolean) => void;
}

export const UKTravelSection = ({ ukTravel, onUKTravelChange }: UKTravelSectionProps) => {
  return (
    <div className="space-y-2">
      <Label>UK Travel Documents</Label>
      <div className="grid gap-2">
        {Object.entries(ukTravel).map(([key, value]) => (
          <div key={key} className="flex items-center space-x-2">
            <Checkbox
              checked={value}
              onCheckedChange={(checked) =>
                onUKTravelChange(key as keyof Phase1['ukTravel'], checked as boolean)
              }
            />
            <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
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