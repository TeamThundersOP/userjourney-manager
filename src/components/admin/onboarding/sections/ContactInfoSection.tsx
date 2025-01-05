import { User } from "@/types/user";
import { Label } from "@/components/ui/label";

interface ContactInfoSectionProps {
  user: User;
}

const ContactInfoSection = ({ user }: ContactInfoSectionProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div>
        <Label className="font-semibold">Address</Label>
        <p className="text-gray-600">{user.personalInfo?.address}</p>
      </div>
      <div>
        <Label className="font-semibold">City</Label>
        <p className="text-gray-600">{user.personalInfo?.city}</p>
      </div>
      <div>
        <Label className="font-semibold">Postal Code</Label>
        <p className="text-gray-600">{user.personalInfo?.postalCode}</p>
      </div>
      <div>
        <Label className="font-semibold">Country</Label>
        <p className="text-gray-600">{user.personalInfo?.country}</p>
      </div>
      <div>
        <Label className="font-semibold">Phone</Label>
        <p className="text-gray-600">{user.personalInfo?.phone}</p>
      </div>
    </div>
  );
};

export default ContactInfoSection;