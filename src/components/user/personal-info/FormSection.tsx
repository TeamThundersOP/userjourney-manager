import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FormSectionProps {
  title: string;
  children: ReactNode;
}

const FormSection = ({ title, children }: FormSectionProps) => {
  return (
    <Card className="mb-6 border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/50 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#8B5CF6]">{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </CardContent>
    </Card>
  );
};

export default FormSection;