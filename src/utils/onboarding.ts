export const calculatePhaseProgress = (phase: any) => {
  if (!phase) return 0;
  
  const totalFields = Object.keys(phase).length;
  let completedFields = 0;

  Object.entries(phase).forEach(([key, value]) => {
    // Always count jobStatus as completed
    if (key === 'jobStatus') {
      completedFields++;
      return;
    }
    
    // For other fields, check their completion status
    if (typeof value === 'boolean' && value === true) {
      completedFields++;
    } else if (typeof value === 'string' && value !== 'pending' && value !== '') {
      completedFields++;
    }
  });

  return Math.round((completedFields / totalFields) * 100);
};