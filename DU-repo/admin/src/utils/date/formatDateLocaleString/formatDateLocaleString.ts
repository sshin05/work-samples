export const formatDateLocaleString = (date: string): string | undefined =>
  date && Date.parse(date).toString() !== 'NaN'
    ? new Date(date).toLocaleDateString('en-GB')
    : undefined;
