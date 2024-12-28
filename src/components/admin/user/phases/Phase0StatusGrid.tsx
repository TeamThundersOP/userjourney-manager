import { OnboardingPhase0 } from "@/types/user";
import Phase0StatusItem from "./Phase0StatusItem";

interface Phase0StatusGridProps {
  phase0: OnboardingPhase0;
  onStatusChange: (key: string, value: boolean) => void;
}

const Phase0StatusGrid = ({ phase0, onStatusChange }: Phase0StatusGridProps) => {
  const steps = [
    { 
      title: "Personal Details",
      stateKey: "personalDetailsCompleted",
      completed: phase0?.personalDetailsCompleted,
      status: phase0?.personalDetailsCompleted ? "Completed" : "Pending"
    },
    { 
      title: "CV",
      stateKey: "cvSubmitted",
      completed: phase0?.cvSubmitted,
      status: phase0?.cvSubmitted ? "Completed" : "Pending",
      uploadable: true
    },
    // ... Add all other steps here with their unique stateKeys
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {steps.map((step) => (
        <Phase0StatusItem
          key={step.stateKey}
          title={step.title}
          completed={step.completed}
          status={step.status}
          stateKey={step.stateKey}
          onStatusChange={onStatusChange}
          uploadable={step.uploadable}
        />
      ))}
    </div>
  );
};

export default Phase0StatusGrid;