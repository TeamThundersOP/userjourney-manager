import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const PersonalInfoHeader = () => {
  return (
    <Card className="bg-gradient-to-r from-[#9b87f5] to-[#8B5CF6] text-white mb-6">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Personal Information</CardTitle>
        <p className="text-gray-100 mt-2">Please fill in your personal details</p>
      </CardHeader>
    </Card>
  );
};

export default PersonalInfoHeader;