import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { User } from "@/types/user";

interface Phase1Data {
  hmrcChecklist: boolean;
  companyAgreements: boolean;
  pensionScheme: boolean;
  bankStatements: boolean;
  vaccinationProof: boolean;
}

const defaultPhase1Data: Phase1Data = {
  hmrcChecklist: false,
  companyAgreements: false,
  pensionScheme: false,
  bankStatements: false,
  vaccinationProof: false,
};

const Phase1Onboarding = () => {
  const [user, setUser] = useState<User | null>(null);
  const [phase1Data, setPhase1Data] = useState<Phase1Data>(defaultPhase1Data);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!userEmail) return;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const currentUser = users.find((u: User) => u.email === userEmail);
    
    if (currentUser) {
      setUser(currentUser);
      if (currentUser.onboarding?.phase1) {
        setPhase1Data(currentUser.onboarding.phase1);
      }
    }
  }, [userEmail]);

  const handleCheckboxChange = (field: keyof Phase1Data) => {
    setPhase1Data((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = () => {
    if (!userEmail || !user) return;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u: User) =>
      u.email === userEmail
        ? {
            ...u,
            onboarding: {
              ...u.onboarding,
              phase1: phase1Data,
            },
          }
        : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    toast.success("Phase 1 progress updated successfully");
  };

  if (!user?.onboarding) {
    return (
      <Card>
        <CardContent className="py-6">
          <div className="text-center text-gray-500">
            No onboarding information available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Phase 1: Documentation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hmrcChecklist"
              checked={phase1Data.hmrcChecklist}
              onCheckedChange={() => handleCheckboxChange("hmrcChecklist")}
            />
            <Label htmlFor="hmrcChecklist">HMRC Checklist</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="companyAgreements"
              checked={phase1Data.companyAgreements}
              onCheckedChange={() => handleCheckboxChange("companyAgreements")}
            />
            <Label htmlFor="companyAgreements">Company Agreements</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="pensionScheme"
              checked={phase1Data.pensionScheme}
              onCheckedChange={() => handleCheckboxChange("pensionScheme")}
            />
            <Label htmlFor="pensionScheme">Pension Scheme</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="bankStatements"
              checked={phase1Data.bankStatements}
              onCheckedChange={() => handleCheckboxChange("bankStatements")}
            />
            <Label htmlFor="bankStatements">Bank Statements</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="vaccinationProof"
              checked={phase1Data.vaccinationProof}
              onCheckedChange={() => handleCheckboxChange("vaccinationProof")}
            />
            <Label htmlFor="vaccinationProof">Vaccination Proof</Label>
          </div>
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Save Progress
        </Button>
      </CardContent>
    </Card>
  );
};

export default Phase1Onboarding;