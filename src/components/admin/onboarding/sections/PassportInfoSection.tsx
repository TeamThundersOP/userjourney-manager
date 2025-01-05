import { User } from "@/types/user";
import { Label } from "@/components/ui/label";

interface PassportInfoSectionProps {
  user: User;
}

const PassportInfoSection = ({ user }: PassportInfoSectionProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div>
        <Label className="font-semibold">Passport Number</Label>
        <p className="text-gray-600">{user.personalInfo?.passportNumber}</p>
      </div>
      <div>
        <Label className="font-semibold">Place of Issue</Label>
        <p className="text-gray-600">{user.personalInfo?.passportPlaceOfIssue}</p>
      </div>
      <div>
        <Label className="font-semibold">Issue Date</Label>
        <p className="text-gray-600">{user.personalInfo?.passportIssueDate}</p>
      </div>
      <div>
        <Label className="font-semibold">Expiry Date</Label>
        <p className="text-gray-600">{user.personalInfo?.passportExpiryDate}</p>
      </div>
    </div>
  );
};

export default PassportInfoSection;