import type { statusData, statusType } from './getLabel.types';
import { formatNumber } from '@/utils/format-number';

export const getAfterLabel = (
  statusData: statusData[],
  statusType: statusType,
  index: number,
  barLabel: string | undefined
) => {
  if (barLabel === undefined) return;
  const parsedBarLabel = barLabel.toLowerCase().trim();
  const parsedPercentage = `${String(statusData[index][parsedBarLabel].percentageOfUsers)}%`;

  return `${formatNumber(statusData[index][parsedBarLabel].numberOfUsers)} of ${formatNumber(
    statusData[index].total
  )} ${statusType.toLowerCase()} ${String(
    parsedBarLabel
  )} (${parsedPercentage})`;
};
