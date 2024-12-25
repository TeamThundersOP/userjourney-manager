import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const PersonalInfoHeader = () => {
  return (
    <Card className="glass-morphism mb-6 bg-gradient-to-r from-[#fb0918] to-[#af1626]">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-white">Personal Information</CardTitle>
        <p className="text-white/90 mt-2 text-lg">Please fill in your personal details</p>
      </CardHeader>
    </Card>
  );
};

export default PersonalInfoHeader;