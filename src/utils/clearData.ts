export const clearAllData = () => {
  // Clear users
  localStorage.removeItem('users');
  
  // Clear reports
  localStorage.removeItem('reports');
  localStorage.removeItem('userReports');
  
  // Clear files
  localStorage.removeItem('userFiles');
  
  // Clear any file data
  const allKeys = Object.keys(localStorage);
  allKeys.forEach(key => {
    if (key.startsWith('file_')) {
      localStorage.removeItem(key);
    }
  });
  
  // Clear onboarding data
  allKeys.forEach(key => {
    if (key.startsWith('onboarding_')) {
      localStorage.removeItem(key);
    }
  });
  
  // Clear auth states
  localStorage.removeItem('adminAuth');
  localStorage.removeItem('userAuth');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userEmail');
  
  console.log('All data has been cleared');
};