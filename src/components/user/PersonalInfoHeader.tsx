import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const PersonalInfoHeader = () => {
  return (
    <Card className="border-none shadow-none bg-transparent mb-6">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Personal Information</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default PersonalInfoHeader;