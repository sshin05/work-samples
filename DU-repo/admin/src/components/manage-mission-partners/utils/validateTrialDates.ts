import dayjs, { type Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
dayjs.extend(customParseFormat);
dayjs.extend(utc);

const parseDates = (dateInput): Dayjs => {
  return dayjs(
    dateInput,
    ['DD/MM/YYYY', 'D/M/YYYY', 'DD/M/YYYY', 'DD/MM/YY', 'D/M/YY', 'DD/M/YY'],
    true
  );
};

export const formatTrialDates = (
  trialStartDate: string,
  trialEndDate: string
): { formattedStartDate: Date; formattedEndDate: Date } => {
  const startDate = parseDates(trialStartDate);
  const endDate = parseDates(trialEndDate);
  return {
    formattedStartDate: startDate.toDate(),
    formattedEndDate: endDate.hour(23).minute(59).toDate()
  };
};

export const getIsValidStartDate = (trialStartDate: string) => {
  const dateInput = parseDates(trialStartDate);
  return dateInput.isValid() && !dateInput.isBefore(dayjs().subtract(1, 'day'));
};

export const getIsValidEndDate = (trialEndDate: string) => {
  const dateInput = parseDates(trialEndDate);
  return dateInput.isValid() && !dateInput.isBefore(dateInput);
};

export const isValidTrialDates = (
  trialStartDate: string,
  trialEndDate: string
): boolean => {
  const startDate = parseDates(trialStartDate);
  const endDate = parseDates(trialEndDate);

  return (
    getIsValidStartDate(trialStartDate) &&
    getIsValidEndDate(trialEndDate) &&
    !startDate.isSame(endDate) &&
    endDate.isValid() &&
    !endDate.isBefore(startDate)
  );
};
