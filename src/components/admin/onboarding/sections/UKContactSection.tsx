import { User } from "@/types/user";
import { Label } from "@/components/ui/label";

interface UKContactSectionProps {
  user: User;
}

const UKContactSection = ({ user }: UKContactSectionProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div>
        <Label className="font-semibold">UK Contact Number</Label>
        <p className="text-gray-600">{user.onboarding?.phase0?.ukContactNumber || "Not provided"}</p>
      </div>
      <div>
        <Label className="font-semibold">UK Address</Label>
        <p className="text-gray-600">{user.onboarding?.phase0?.ukAddress || "Not provided"}</p>
      </div>
    </div>
  );
};

export default UKContactSection;