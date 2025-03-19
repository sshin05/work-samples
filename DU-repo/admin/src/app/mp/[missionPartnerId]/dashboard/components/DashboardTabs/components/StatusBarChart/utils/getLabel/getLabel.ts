import { getMonthRangeByLabel } from '../getMonthRangeByLabel';

export const getLabel = (label: string) => {
  const monthRange = getMonthRangeByLabel(label);
  const year = label.slice(3, 7);

  return `${monthRange} ${year}`;
};
