import { isValidDate } from '@/app/marketplace/utils/isValidDate';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';

export const formatTransactionDate = (dateValue: string | Date): string => {
  if (Boolean(dateValue) && isValidDate(dateValue)) {
    return abbreviatedDayDate(dateValue);
  }

  return '';
};
