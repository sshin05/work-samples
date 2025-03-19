import { FORM_INPUT_TYPES } from '@/app/marketplace/components/ProductCustomizationModal/components/CustomizationForm/CustomizationForm.constants';
import { normalizeCohortCustomizationsForDisplay } from './normalizeCohortCustomizationsForDisplay';
import type { CartItemData } from '../../../../MarketplaceCart.types';

describe('normalizeCohortCustomizationsForDisplay', () => {
  const getMockCustomizations = ({ type, name, value }) => {
    return [
      {
        type,
        name,
        value
      }
    ] as unknown as CartItemData['cohortCustomizations'];
  };

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it.each([
    {
      type: FORM_INPUT_TYPES.BOOLEAN,
      name: 'Boolean',
      value: true,
      expected: 'true'
    },
    {
      type: FORM_INPUT_TYPES.DATE,
      name: 'Date',
      value: '2025-01-09T12:00:00.000Z',
      expected: '09 Jan 2025'
    },
    {
      type: FORM_INPUT_TYPES.DATE_TIME,
      name: 'Date',
      value: '2025-01-09T09:15:00.000Z',
      expected: '09 Jan 2025 02:15AM'
    },
    {
      type: FORM_INPUT_TYPES.TIME,
      name: 'Date',
      value: '2025-01-09T09:15:00.000Z',
      expected: '03:15'
    }
  ])('formats the type as expected', ({ type, name, value, expected }) => {
    // Override offset for CI (given the date inputs, T = 00:00:00)
    const mockTimezoneOffset = 360;
    jest
      .spyOn(Date.prototype, 'getTimezoneOffset')
      .mockReturnValue(mockTimezoneOffset);

    const actual = normalizeCohortCustomizationsForDisplay(
      getMockCustomizations({ type, name, value })
    );

    expect(actual).toEqual([
      {
        displayTitle: name,
        displayValue: expected
      }
    ]);
  });

  it.each([
    {
      type: FORM_INPUT_TYPES.DATE,
      name: 'Date',
      value: null
    },
    {
      type: FORM_INPUT_TYPES.DATE_TIME,
      name: 'Date',
      value: null
    },
    {
      type: FORM_INPUT_TYPES.TIME,
      name: 'Date',
      value: null
    }
  ])(
    'time values are excluded from the returned customizations list',
    ({ type, name, value }) => {
      const actual = normalizeCohortCustomizationsForDisplay(
        getMockCustomizations({ type, name, value })
      );

      expect(actual).toEqual([]);
    }
  );
});
