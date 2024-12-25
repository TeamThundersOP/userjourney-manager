import { Phase0, Phase1, Phase2 } from "@/types/user";

export const calculatePhaseProgress = (phase: Phase0 | Phase1 | Phase2 | undefined): number => {
  if (!phase) return 0;
  
  const entries = Object.entries(phase);
  if (entries.length === 0) return 0;
  
  const totalFields = entries.length;
  const completedFields = entries.reduce((count, [currentKey, value]) => {
    // Skip visaStatus field in calculation
    if (currentKey === 'visaStatus') return count;
    return count + (value === true ? 1 : 0);
  }, 0);
  
  // Adjust total fields count by removing visaStatus from consideration
  const adjustedTotal = Object.keys(phase).includes('visaStatus') ? totalFields - 1 : totalFields;
  return (completedFields / adjustedTotal) * 100;
};