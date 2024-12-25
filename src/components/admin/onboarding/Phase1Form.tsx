import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Phase1 } from "@/types/user";

interface Phase1FormProps {
  phase1: Phase1;
  onUpdate: (updates: Partial<Phase1>) => void;
}

const Phase1Form = ({ phase1, onUpdate }: Phase1FormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Phase 1: Documentation</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="hmrcChecklist"
            checked={phase1.hmrcChecklist}
            onCheckedChange={(checked) => onUpdate({ hmrcChecklist: checked as boolean })}
          />
          <Label htmlFor="hmrcChecklist">HMRC Checklist</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="companyAgreements"
            checked={phase1.companyAgreements}
            onCheckedChange={(checked) => onUpdate({ companyAgreements: checked as boolean })}
          />
          <Label htmlFor="companyAgreements">Company Agreements</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="pensionScheme"
            checked={phase1.pensionScheme}
            onCheckedChange={(checked) => onUpdate({ pensionScheme: checked as boolean })}
          />
          <Label htmlFor="pensionScheme">Pension Scheme</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="bankStatements"
            checked={phase1.bankStatements}
            onCheckedChange={(checked) => onUpdate({ bankStatements: checked as boolean })}
          />
          <Label htmlFor="bankStatements">Bank Statements</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="vaccinationProof"
            checked={phase1.vaccinationProof}
            onCheckedChange={(checked) => onUpdate({ vaccinationProof: checked as boolean })}
          />
          <Label htmlFor="vaccinationProof">Vaccination Proof</Label>
        </div>
      </div>
    </div>
  );
};

export default Phase1Form;