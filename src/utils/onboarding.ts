import { Phase0, Phase1, Phase2 } from "@/types/user";

export const calculatePhaseProgress = (phase: Phase0 | Phase1 | Phase2): number => {
  if (!phase) return 0;
  
  const totalFields = Object.keys(phase).length;
  let completedFields = 0;

  Object.entries(phase).forEach(([key, value]) => {
    if (key === 'visaStatus') {
      if (value === 'approved') completedFields++;
    } else if (typeof value === 'boolean') {
      if (value) completedFields++;
    } else if (typeof value === 'object') {
      const subFields = Object.values(value);
      const completedSubFields = subFields.filter(v => v === true || (typeof v === 'string' && v.length > 0)).length;
      if (completedSubFields === subFields.length) completedFields++;
    }
  });

  const adjustedTotal = Object.keys(phase).includes('visaStatus') ? totalFields - 1 : totalFields;
  return Math.round((completedFields / adjustedTotal) * 100);
};