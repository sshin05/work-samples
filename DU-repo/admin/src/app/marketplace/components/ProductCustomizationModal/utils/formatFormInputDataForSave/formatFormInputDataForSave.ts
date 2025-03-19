import { isValidDate } from '@/app/marketplace/utils/isValidDate';
import { FORM_INPUT_TYPES } from '../../components/CustomizationForm/CustomizationForm.constants';
import type { FormattedCustomizations } from './formatFormInputDataForSave.types';
import { formatAsDate } from '@/app/marketplace/utils/formatAsDate/formatAsDate';

const formatAsDateTime = (formInputValue: string): string => {
  const [hours, minutes] = formInputValue.split(':');

  const today = new Date();
  today.setHours(Number(hours), Number(minutes));

  if (isValidDate(today)) {
    return today.toISOString();
  }

  // Allows optional date values to be un-set
  return '';
};

const FORMATTERS: Record<
  FORM_INPUT_TYPES,
  (v: string | boolean | number) => string | number | Date
> = {
  [FORM_INPUT_TYPES.BOOLEAN]: (value: boolean) => String(value),
  [FORM_INPUT_TYPES.DATE]: formatAsDate,
  [FORM_INPUT_TYPES.DATE_TIME]: formatAsDate,
  [FORM_INPUT_TYPES.LIST]: (value: string) => value,
  [FORM_INPUT_TYPES.LONG_TEXT]: (value: string) => value,
  [FORM_INPUT_TYPES.NUMBER]: (value: number) => value,
  [FORM_INPUT_TYPES.TEXT]: (value: string) => value,
  [FORM_INPUT_TYPES.TIME]: formatAsDateTime
};

export const formatFormInputsForSave = (
  formData: Record<string, string | boolean | number | Date>,
  customizationDefinitions
): FormattedCustomizations => {
  return Object.keys(formData).reduce((acc, customizationDefinitionName) => {
    const customizationDefinition = customizationDefinitions.find(
      definition => definition.name === customizationDefinitionName
    );

    const formInputValue = formData[customizationDefinitionName || ''];

    if (customizationDefinition) {
      const inputFormatter = FORMATTERS[customizationDefinition.fieldType];

      const value = inputFormatter
        ? inputFormatter(formInputValue)
        : formInputValue;

      return [
        ...acc,
        {
          definitionId: customizationDefinition.id,
          value: value === '' ? null : value
        }
      ];
    }

    return acc;
  }, []);
};
