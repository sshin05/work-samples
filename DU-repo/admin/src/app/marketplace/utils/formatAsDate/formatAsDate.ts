import { isValidDate } from '../isValidDate';

const convertUtcDateToLocal = (date: Date): Date => {
  const tzOffsetMinutes = date.getTimezoneOffset();
  const tzOffsetMilliseconds = tzOffsetMinutes * 60000;

  return new Date(date.getTime() + tzOffsetMilliseconds);
};

/**
 * Returns a date if valid, an empty string otherwise
 *
 * Return empty string if the passed `formInputValue` create an invalid date */
export const formatAsDate = (formInputValue: string): string => {
  const date = new Date(formInputValue);

  // new Date creates an epoch date object when the passed value is null
  if (formInputValue !== null && isValidDate(date)) {
    const localizedDate = convertUtcDateToLocal(date);

    return localizedDate.toISOString();
  }

  // Return empty string if date is invalid
  return '';
};
