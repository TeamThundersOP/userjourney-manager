import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const PersonalInfoHeader = () => {
  return (
    <Card className="btn-primary-line mb-6">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Personal Information</CardTitle>
        <p className="text-gray-100 mt-2">Please fill in your personal details</p>
      </CardHeader>
    </Card>
  );
};

export default PersonalInfoHeader;