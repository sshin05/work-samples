import { orderStatusMap } from './orderStatusMap';

export const replaceOrderStatusInText = (text: string): string => {
  return text.replace(
    /READY_FOR_PAYMENT|IN_CONTRACTING|PROCESSING|PAID|CANCELLED|REFUNDED/g,
    match => {
      return orderStatusMap[match];
    }
  );
};
