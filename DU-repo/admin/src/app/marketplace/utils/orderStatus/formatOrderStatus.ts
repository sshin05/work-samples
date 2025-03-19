import { orderStatusMap } from './orderStatusMap';

export const formatOrderStatus = (status: string): string => {
  return orderStatusMap[status] || status;
};
