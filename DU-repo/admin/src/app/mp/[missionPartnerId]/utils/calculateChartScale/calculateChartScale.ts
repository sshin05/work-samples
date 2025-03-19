export const calculateChartScale = (
  allPercentages: number[][] | number[],
  multiple: number
) => {
  const largestPercentage = Math.max(...allPercentages.flat());
  const max = Math.round(largestPercentage / multiple) * multiple + multiple;
  if (max > 100 || largestPercentage === 0) return 100;

  return Number(max.toFixed(100));
};
