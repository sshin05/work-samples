export const formatDetailValue = (label: string, value: any): string => {
  // for "Total time training", show the value (or 0) with " hours"
  if (label === 'Total time training') {
    // explicitly check for null/undefined (0 is valid)
    const val = value === null || value === undefined ? 0 : value;

    return `${val} hours`;
  }

  // if there's no value, return the placeholder
  if (!value) {
    return '--';
  }

  // uppercase only the first character while preserving the rest
  const str = String(value);

  return str.charAt(0).toUpperCase() + str.slice(1);
};
