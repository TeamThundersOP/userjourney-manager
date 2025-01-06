import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, FileText, UserRound, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const phases = [
    {
      title: "Phase 0: Initial Setup",
      description: "Complete personal details, submit required documents, and handle initial paperwork.",
      icon: UserRound,
      items: [
        "Personal Details",
        "CV Submission",
        "Interview Process",
        "Document Uploads",
        "Travel Details"
      ]
    },
    {
      title: "Phase 1: Documentation",
      description: "Submit and verify essential documentation for employment.",
      icon: FileText,
      items: [
        "HMRC Checklist",
        "Company Agreements",
        "Pension Scheme",
        "Bank Statements",
        "Vaccination Proof"
      ]
    },
    {
      title: "Phase 2: Final Steps",
      description: "Complete final verification and onboarding procedures.",
      icon: Shield,
      items: [
        "Right to Work",
        "Share Code",
        "DBS Check",
        "Final Verification"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">Welcome to Funelli</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your journey to joining our team starts here. Follow our structured onboarding process
            to ensure a smooth transition.
          </p>
          <Button 
            onClick={() => navigate('/user/login')} 
            size="lg"
            className="mt-6"
          >
            Get Started
          </Button>
        </div>

        <div className="grid gap-6 mt-12 md:grid-cols-3">
          {phases.map((phase, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <phase.icon className="w-16 h-16" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{phase.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{phase.description}</p>
                <ul className="space-y-2">
                  {phase.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-sm">
                      <Check className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center text-sm text-gray-500 mt-8">
          Already have an account? Click the button above to log in and continue your onboarding process.
        </div>
      </div>
    </div>
  );
};

export default Index;