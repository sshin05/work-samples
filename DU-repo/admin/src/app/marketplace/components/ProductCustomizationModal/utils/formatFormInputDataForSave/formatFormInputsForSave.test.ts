import type { sqlGetMarketplaceProduct } from '@/app/api/marketplace/products';
import { FORM_INPUT_TYPES } from '../../components/CustomizationForm/CustomizationForm.constants';
import { formatFormInputsForSave } from './formatFormInputDataForSave';

describe('formatFormInputsForSave', () => {
  it('does not fail when encountering an unknown field type', () => {
    const mockFormData = {
      'Customization Definition Name 0': 'Value 0',
      'Customization Definition Name 1': 'Value 1'
    };

    const mockCustomizationDefinitions = [
      {
        id: 'def-0',
        name: 'Customization Definition Name 0'
      },
      {
        id: 'def-1',
        name: 'Customization Definition Name 1'
      }
    ] as Awaited<
      ReturnType<typeof sqlGetMarketplaceProduct>
    >['_serviceData']['customizations'];

    const expected = [
      { definitionId: 'def-0', value: 'Value 0' },
      { definitionId: 'def-1', value: 'Value 1' }
    ];
    const actual = formatFormInputsForSave(
      mockFormData,
      mockCustomizationDefinitions
    );

    expect(actual).toEqual(expected);
  });

  it.each([
    {
      inputValue: 'Mock Long Text Input Value',
      expected: 'Mock Long Text Input Value',
      fieldType: FORM_INPUT_TYPES.LONG_TEXT
    },
    {
      inputValue: 5,
      expected: 5,
      fieldType: FORM_INPUT_TYPES.NUMBER
    },
    {
      inputValue: 'Mock Short Text Input Value',
      expected: 'Mock Short Text Input Value',
      fieldType: FORM_INPUT_TYPES.TEXT
    },
    {
      inputValue: false,
      expected: 'false',
      fieldType: FORM_INPUT_TYPES.BOOLEAN
    }
  ])('formats the $fieldType', ({ inputValue, expected, fieldType }) => {
    const mockFormData = {
      'Field Name': inputValue
    };
    const mockCustomizationDefinitions = [
      {
        id: 'def-0',
        name: 'Field Name',
        fieldType
      }
    ];

    const actual = formatFormInputsForSave(
      mockFormData,
      mockCustomizationDefinitions
    );

    expect(actual).toEqual([
      {
        definitionId: 'def-0',
        value: expected
      }
    ]);
  });

  describe('date/time formatting', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    it('formats date values as expected', () => {
      // Override offset for CI (given the date inputs, T = 00:00:00)
      const mockTimezoneOffset = 120;
      jest
        .spyOn(Date.prototype, 'getTimezoneOffset')
        .mockReturnValue(mockTimezoneOffset);

      const mockFormData = {
        'Date Field': '2024-11-15',
        'Date Time Field': '2024-11-29T12:06',
        'Time Field': '12:03'
      };

      const mockCustomizationDefinitions = [
        {
          id: 'date-field',
          name: 'Date Field',
          fieldType: 'DATE'
        },
        {
          id: 'date-time-field',
          name: 'Date Time Field',
          fieldType: 'DATE_TIME'
        },
        {
          id: 'time-field',
          name: 'Time Field',
          fieldType: 'TIME'
        }
      ] as Awaited<
        ReturnType<typeof sqlGetMarketplaceProduct>
      >['_serviceData']['customizations'];

      const actual = formatFormInputsForSave(
        mockFormData,
        mockCustomizationDefinitions
      );

      const [dateField, dateTimeField, timeField] = actual;

      expect(dateField.value).toEqual('2024-11-15T02:00:00.000Z');

      const [date, time] = dateTimeField.value.split('T');
      expect(date).toBe('2024-11-29');
      // Validate a time is check, CI agnostic
      expect(time.includes('00:00:00')).toBe(false);

      const timestampRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

      expect(timeField.value).toMatch(timestampRegex);
    });

    it('does not apply the formatting to an empty date string', () => {
      const mockFormData = {
        'Date Field': '',
        'Date Time Field': '',
        'Time Field': ''
      };

      const mockCustomizationDefinitions = [
        {
          id: 'date-field',
          name: 'Date Field',
          fieldType: 'DATE'
        },
        {
          id: 'date-time-field',
          name: 'Date Time Field',
          fieldType: 'DATE_TIME'
        },
        {
          id: 'time-field',
          name: 'Time Field',
          fieldType: 'TIME'
        }
      ] as Awaited<
        ReturnType<typeof sqlGetMarketplaceProduct>
      >['_serviceData']['customizations'];

      const expected = [
        { definitionId: 'date-field', value: null },
        { definitionId: 'date-time-field', value: null },
        { definitionId: 'time-field', value: null }
      ];
      const actual = formatFormInputsForSave(
        mockFormData,
        mockCustomizationDefinitions
      );

      expect(actual).toEqual(expected);
    });
  });

  describe('boolean input formatting', () => {
    it('formats falsy boolean fields as expected', () => {
      const mockFormData = {
        'Boolean Toggle': false
      };

      const mockCustomizationDefinitions = [
        {
          id: 'def-0',
          name: 'Boolean Toggle',
          fieldType: FORM_INPUT_TYPES.BOOLEAN
        }
      ] as Awaited<
        ReturnType<typeof sqlGetMarketplaceProduct>
      >['_serviceData']['customizations'];

      const actual = formatFormInputsForSave(
        mockFormData,
        mockCustomizationDefinitions
      );

      expect(actual).toEqual([
        {
          definitionId: 'def-0',
          value: 'false'
        }
      ]);
    });
  });
});
