import { formatDateAsLocalTime } from '@/app/marketplace/utils/formatDateAsLocalTime';
import type { DynamicFormFieldProps } from '../../components/DynamicFormFields/DynamicFormFields.types';
import { FORM_INPUT_TYPES } from '../../CustomizationForm.constants';

const formatAsDate = (value: string): string => {
  if (value === null) {
    return '';
  }

  return new Date(value).toISOString().split('T')[0];
};

const formatAsDateTime = (value: string): string => {
  if (value === null) {
    return '';
  }

  const date = formatAsDate(value);
  const time = formatDateAsLocalTime(value);

  return `${date}T${time}`;
};

const formatAsTime = (value: string | null): string => {
  if (value === null) {
    return '';
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
  [FORM_INPUT_TYPES.TIME]: formatAsTime
};

/**
 *
 * @param customizationName - Name of the customization
 * @param cartItemCohortCustomizations - list of existing customizations for a unique order item
 * @returns existing customization value formatted for display as a default value within the form input. If the cohortCustomizations are not provided, or if there is not a customization for the particular field, an empty string is returned.
 */
export const getCohortCustomizationDisplayValue = (
  customizationName: string,
  cartItemCohortCustomizations: DynamicFormFieldProps['cartItemCohortCustomizations'] = []
) => {
  const cohortCustomization = cartItemCohortCustomizations.find(
    cohortCustomization => {
      return cohortCustomization.name === customizationName;
    }
  );

  if (cohortCustomization) {
    const formatter = FORMATTERS[cohortCustomization.type];

    if (formatter) {
      return formatter(cohortCustomization?.value);
    }

    return cohortCustomization?.value;
  }

  return '';
};
