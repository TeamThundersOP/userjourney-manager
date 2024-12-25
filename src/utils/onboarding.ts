import { Phase0, Phase1, Phase2 } from "@/types/user";

export const calculatePhaseProgress = (phase: Phase0 | Phase1 | Phase2): number => {
  const totalFields = Object.keys(phase).length;
  const completedFields = Object.entries(phase).reduce((count, [key, value]) => {
    // Skip jobStatus and visaStatus from calculation since they're enum fields
    if (key === 'visaStatus' || key === 'jobStatus') return count;
    // Count boolean fields that are true
    return count + (value === true ? 1 : 0);
  }, 0);
  
  // Adjust total fields count by removing status fields from consideration
  const adjustedTotal = totalFields - 2; // Subtract 2 for jobStatus and visaStatus
  return Math.round((completedFields / adjustedTotal) * 100);
};