import { formatAsPercentage } from '@/app/mp/[missionPartnerId]/utils/formatAsPercentage';

export const getAfterLabel = (
  index: number,
  reverseDataPercentage: number[],
  reverseLearnersPerCategory: number[],
  dataTotal: number
) => {
  const parsedPercentage = formatAsPercentage(reverseDataPercentage[index]);

  if (parsedPercentage === '0%' && reverseLearnersPerCategory[index] > 0) {
    return 'of completed training (<1%)';
  }

  if (
    parsedPercentage === '100%' &&
    reverseLearnersPerCategory[index] !== dataTotal
  ) {
    return 'of completed training (>99%)';
  }

  return `of completed training (${parsedPercentage})`;
};
