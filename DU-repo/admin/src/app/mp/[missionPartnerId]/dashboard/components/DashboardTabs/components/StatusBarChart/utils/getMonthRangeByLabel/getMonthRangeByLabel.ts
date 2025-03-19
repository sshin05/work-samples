export const getMonthRangeByLabel = (label: string) => {
  if (label.includes('Q1')) return 'Jan-Mar';
  if (label.includes('Q2')) return 'Apr-June';
  if (label.includes('Q3')) return 'July-Sept';
  if (label.includes('Q4')) return 'Oct-Dec';
  return 'error';
};
