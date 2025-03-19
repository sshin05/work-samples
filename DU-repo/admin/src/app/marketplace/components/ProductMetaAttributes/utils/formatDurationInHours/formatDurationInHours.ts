import {
  HOURS_PER_DAY,
  HOURS_PER_WEEK
} from './formatDurationInHours.constants';

const pluralize = (value: number, unit: string, pluralization: string) => {
  if (value === 1) {
    return `${value} ${unit}`;
  }

  const pluralizedUnit = `${unit}${pluralization}`;
  return `${value} ${pluralizedUnit}`;
};

/**
 * Formats the getMarketplaceProduct's `durationInHours` value for frontend display
 */
export const formatDurationInHours = (hours: number): string => {
  if (hours < HOURS_PER_DAY) {
    return pluralize(hours, 'Hour', 's');
  }

  if (hours < HOURS_PER_WEEK) {
    const days = Math.ceil(hours / HOURS_PER_DAY);
    return pluralize(days, 'Day', 's');
  }

  const weeks = Math.ceil(hours / HOURS_PER_WEEK);
  return pluralize(weeks, 'Week', 's');
};
