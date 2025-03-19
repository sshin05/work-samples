import { FORM_INPUT_TYPES } from '@/app/marketplace/components/ProductCustomizationModal/components/CustomizationForm/CustomizationForm.constants';
import type { CartItemData } from '../../../../MarketplaceCart.types';
import { formatDateAsLocalTime } from '@/app/marketplace/utils/formatDateAsLocalTime';
import { abbreviatedDateTime } from '@/utils/date/abbreviatedDateTime';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';

const formatAsDate = (value: string | null): string | null => {
  if (value === null) {
    return null;
  }

  return abbreviatedDayDate(value);
};

const formatAsDateTime = (value: string | null): string | null => {
  if (value === null) {
    return null;
  }

  return abbreviatedDateTime(value);
};

const formatTime = (value: string | null): string | null => {
  if (value === null) {
    return null;
  }

  return formatDateAsLocalTime(value);
};

const FORMATTERS: Record<
  FORM_INPUT_TYPES,
  (v: string | boolean | number) => string | number
> = {
  [FORM_INPUT_TYPES.BOOLEAN]: (value: boolean) => String(value),
  [FORM_INPUT_TYPES.DATE]: formatAsDate,
  [FORM_INPUT_TYPES.DATE_TIME]: formatAsDateTime,
  [FORM_INPUT_TYPES.LIST]: (value: string) => value,
  [FORM_INPUT_TYPES.LONG_TEXT]: (value: string) => value,
  [FORM_INPUT_TYPES.NUMBER]: (value: number) => value,
  [FORM_INPUT_TYPES.TEXT]: (value: string) => value,
  [FORM_INPUT_TYPES.TIME]: (value: string) => formatTime(value)
};

type NormalizedCohortCustomizations = {
  displayTitle: string;
  displayValue: string | number;
}[];

export const normalizeCohortCustomizationsForDisplay = (
  cohortCustomizations: CartItemData['cohortCustomizations']
): NormalizedCohortCustomizations => {
  if (!cohortCustomizations) {
    return [];
  }

  return cohortCustomizations
    .map(customization => {
      const formatter = FORMATTERS[customization.type];

      return {
        displayTitle: customization.name,
        displayValue: formatter(customization.value)
      };
    })
    .filter(({ displayValue }) => Boolean(displayValue));
};
