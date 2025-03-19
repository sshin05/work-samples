import { isInteger } from 'lodash';

export const canPaginate = (
  pageNumber?: number,
  pageSize?: number,
  totalCount?: number
) => {
  if (!isInteger(pageNumber) || pageNumber < 1) return false;
  if (!isInteger(pageSize) || pageSize < 1) return false;
  if (!isInteger(totalCount) || totalCount < 0) return false;

  const recordsDisplayed = pageNumber * pageSize;
  return recordsDisplayed < totalCount;
};
