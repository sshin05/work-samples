import type { DynamicFormFieldProps } from '../../components/DynamicFormFields/DynamicFormFields.types';
import { FORM_INPUT_TYPES } from '../../CustomizationForm.constants';
import { getCohortCustomizationDisplayValue } from '.';

describe('getCohortCustomizationDisplayValue', () => {
  it.each([
    {
      type: FORM_INPUT_TYPES.BOOLEAN,
      value: false,
      expected: 'false',
      name: 'Boolean Field'
    },
    {
      type: FORM_INPUT_TYPES.DATE,
      value: '2024-12-07T00:00:00.000Z',
      expected: '2024-12-07',
      name: 'Date Field'
    },
    {
      type: FORM_INPUT_TYPES.DATE_TIME,
      value: '2024-12-07T03:14:00.000Z',
      expected: '2024-12-07T20:14',
      name: 'Date-Time Field'
    },
    {
      type: FORM_INPUT_TYPES.TIME,
      value: '2024-12-07T03:14:00.000Z',
      expected: '20:14',
      name: 'Time Field'
    },
    {
      type: FORM_INPUT_TYPES.LIST,
      value: 'List Option',
      expected: 'List Option',
      name: 'List Field'
    },
    {
      type: FORM_INPUT_TYPES.LONG_TEXT,
      value: 'LONG_TEXT Option',
      expected: 'LONG_TEXT Option',
      name: 'LONG_TEXT Field'
    },
    {
      type: FORM_INPUT_TYPES.NUMBER,
      value: 1,
      expected: 1,
      name: 'NUMBER Field'
    },
    {
      type: FORM_INPUT_TYPES.TEXT,
      value: 'TEXT Option',
      expected: 'TEXT Option',
      name: 'TEXT Field'
    }
  ])(
    'formats the customization values to function as default values in the form',
    ({ type, value, expected, name }) => {
      const customizations = [
        {
          type,
          value,
          name
        }
      ] as unknown as DynamicFormFieldProps['cartItemCohortCustomizations'];

      const actual = getCohortCustomizationDisplayValue(name, customizations);
      expect(actual).toBe(expected);
    }
  );

  it('returns an empty string when there are no cohort customizations', () => {
    expect(getCohortCustomizationDisplayValue('customization name')).toBe('');
  });

  it('returns the value if a formatter is not found', () => {
    const mockUnknownCustomization = {
      type: 'MOCK_UNKNOWN_FIELD_TYPE',
      value: 'MOCK_VALUE',
      name: 'Unknown Field'
    };
    const customizations = [
      mockUnknownCustomization
    ] as unknown as DynamicFormFieldProps['cartItemCohortCustomizations'];

    const actual = getCohortCustomizationDisplayValue(
      mockUnknownCustomization.name,
      customizations
    );
    expect(actual).toBe(mockUnknownCustomization.value);
  });

  it.each([
    {
      type: FORM_INPUT_TYPES.DATE,
      value: null,
      name: 'Date Field'
    },
    {
      type: FORM_INPUT_TYPES.DATE_TIME,
      value: null,
      name: 'Date-Time Field'
    },
    {
      type: FORM_INPUT_TYPES.TIME,
      value: null,
      name: 'TIME Field'
    }
  ])(
    'returns an empty string for null date/time values',
    ({ type, value, name }) => {
      const customizations = [
        {
          type,
          value,
          name
        }
      ] as unknown as DynamicFormFieldProps['cartItemCohortCustomizations'];

      const actual = getCohortCustomizationDisplayValue(name, customizations);
      expect(actual).toBe('');
    }
  );
});
