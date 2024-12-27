import { OnboardingPhase0, OnboardingPhase1, OnboardingPhase2 } from "@/types/user";

export const calculatePhaseProgress = (phase: OnboardingPhase0 | OnboardingPhase1 | OnboardingPhase2): number => {
  // Fields to exclude from progress calculation
  const excludedFields = ['feedback', 'jobStatus', 'visaStatus', 'ukContactNumber', 'ukAddress'];
  
  const totalFields = Object.keys(phase).filter(key => !excludedFields.includes(key)).length;
  const completedFields = Object.entries(phase).reduce((count, [key, value]) => {
    // Skip excluded fields
    if (excludedFields.includes(key)) return count;
    // Count boolean fields that are true
    return count + (value === true ? 1 : 0);
  }, 0);
  
  return Math.round((completedFields / totalFields) * 100);
};