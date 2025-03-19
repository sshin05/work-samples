const formatCohortDate = (input: Date | string): string => {
  const date = typeof input === 'string' ? new Date(input) : input;

  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }

  return `${date.getUTCDate()} ${date
    .toLocaleString('en-US', {
      month: 'short',
      timeZone: 'UTC'
    })
    .toUpperCase()} ${date.getUTCFullYear().toString()}`;
};

export { formatCohortDate };
