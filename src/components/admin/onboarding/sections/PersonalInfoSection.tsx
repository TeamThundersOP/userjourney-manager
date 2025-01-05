import { User } from "@/types/user";
import { Label } from "@/components/ui/label";

interface PersonalInfoSectionProps {
  user: User;
}

const PersonalInfoSection = ({ user }: PersonalInfoSectionProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div>
        <Label className="font-semibold">Full Name</Label>
        <p className="text-gray-600">{user.personalInfo?.givenName} {user.personalInfo?.familyName}</p>
      </div>
      <div>
        <Label className="font-semibold">Nationality</Label>
        <p className="text-gray-600">{user.personalInfo?.nationality}</p>
      </div>
      <div>
        <Label className="font-semibold">Date of Birth</Label>
        <p className="text-gray-600">{user.personalInfo?.dateOfBirth}</p>
      </div>
      <div>
        <Label className="font-semibold">Gender</Label>
        <p className="text-gray-600">{user.personalInfo?.gender}</p>
      </div>
    </div>
  );
};

export default PersonalInfoSection;