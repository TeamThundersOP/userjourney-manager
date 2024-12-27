import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Phase1FormProps {
  onboarding: any;
  setOnboarding: (value: any) => void;
}

const Phase1Form = ({ onboarding, setOnboarding }: Phase1FormProps) => {
  if (!onboarding?.approvals?.phase0) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Phase 1: Documentation</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="hmrcChecklist"
            checked={onboarding?.phase1.hmrcChecklist}
            onCheckedChange={(checked) =>
              setOnboarding((prev: any) => ({
                ...prev!,
                phase1: { ...prev!.phase1, hmrcChecklist: checked as boolean },
              }))
            }
          />
          <Label htmlFor="hmrcChecklist">HMRC Checklist</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="companyAgreements"
            checked={onboarding?.phase1.companyAgreements}
            onCheckedChange={(checked) =>
              setOnboarding((prev: any) => ({
                ...prev!,
                phase1: { ...prev!.phase1, companyAgreements: checked as boolean },
              }))
            }
          />
          <Label htmlFor="companyAgreements">Company Agreements</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="pensionScheme"
            checked={onboarding?.phase1.pensionScheme}
            onCheckedChange={(checked) =>
              setOnboarding((prev: any) => ({
                ...prev!,
                phase1: { ...prev!.phase1, pensionScheme: checked as boolean },
              }))
            }
          />
          <Label htmlFor="pensionScheme">Pension Scheme</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="bankStatements"
            checked={onboarding?.phase1.bankStatements}
            onCheckedChange={(checked) =>
              setOnboarding((prev: any) => ({
                ...prev!,
                phase1: { ...prev!.phase1, bankStatements: checked as boolean },
              }))
            }
          />
          <Label htmlFor="bankStatements">Bank Statements</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="vaccinationProof"
            checked={onboarding?.phase1.vaccinationProof}
            onCheckedChange={(checked) =>
              setOnboarding((prev: any) => ({
                ...prev!,
                phase1: { ...prev!.phase1, vaccinationProof: checked as boolean },
              }))
            }
          />
          <Label htmlFor="vaccinationProof">Vaccination Proof</Label>
        </div>
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="phase1-feedback">Feedback for Phase 1</Label>
        <Textarea
          id="phase1-feedback"
          value={onboarding.phase1.feedback}
          onChange={(e) =>
            setOnboarding((prev: any) => ({
              ...prev,
              phase1: { ...prev.phase1, feedback: e.target.value },
            }))
          }
          placeholder="Enter feedback for the user..."
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default Phase1Form;
