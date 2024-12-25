import { Phase0, Phase1, Phase2 } from "@/types/user";

export const calculatePhaseProgress = (phase: Phase0 | Phase1 | Phase2): number => {
  const totalFields = Object.keys(phase).length;
  const completedFields = Object.entries(phase).reduce((count, [currentKey, value]) => {
    // Skip visaStatus field in calculation
    if (currentKey === 'visaStatus') return count;
    return count + (value === true ? 1 : 0);
  }, 0);
  
  // Adjust total fields count by removing visaStatus from consideration
  const adjustedTotal = Object.keys(phase).includes('visaStatus') ? totalFields - 1 : totalFields;
  return (completedFields / adjustedTotal) * 100;
};