import { LocationTypes } from './formatLocationType.types';

/**
 * Formats the getMarketplaceProduct's `locationType` value for frontend display
 */
export const formatLocationType = (locationType: string): string => {
  return LocationTypes[locationType as keyof typeof LocationTypes] || '';
};
