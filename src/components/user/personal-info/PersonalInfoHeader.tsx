import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const PersonalInfoHeader = () => {
  return (
    <Card className="glass-morphism mb-6 bg-gradient-to-r from-[#FDE1D3] to-[#FFDEE2]">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-gray-700">Personal Information</CardTitle>
        <p className="text-gray-600 mt-2 text-lg">Please fill in your personal details</p>
      </CardHeader>
    </Card>
  );
};

export default PersonalInfoHeader;