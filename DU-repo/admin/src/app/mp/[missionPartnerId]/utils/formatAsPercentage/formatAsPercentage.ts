export const formatAsPercentage = (fraction: number) => {
  return new Intl.NumberFormat('default', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(fraction);
};
