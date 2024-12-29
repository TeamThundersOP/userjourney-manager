export const normalizeCategory = (category: string): string => {
  const categoryMap: { [key: string]: string } = {
    'cv': 'cv',
    'passport': 'passport',
    'pcc': 'pcc',
    'other': 'other documents',
    'travelDocs': 'travel documents',
    'visaCopy': 'visa',
    'right to work': 'right to work'
  };
  return categoryMap[category.toLowerCase()] || category;
};