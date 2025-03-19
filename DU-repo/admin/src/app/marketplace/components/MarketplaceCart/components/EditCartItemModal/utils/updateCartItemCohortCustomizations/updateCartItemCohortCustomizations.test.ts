import type { CartItemData } from '../../../../MarketplaceCart.types';
import { updateCartItemCohortCustomizations } from './updateCartItemCohortCustomizations';

describe('updateCartItemCohortCustomizations', () => {
  it("maps the customization values onto the cart item's cohort customizations", () => {
    const mockCartItem = {
      cohortCustomizations: [
        {
          definitionId: 'customization-0',
          value: 'initial-value',
          cohortId: 'mock-cohort-id'
        },
        {
          definitionId: 'customization-1',
          value: 'initial-value',
          cohortId: 'mock-cohort-id'
        }
      ]
    } as CartItemData;

    const mockCustomizationValues = [
      {
        definitionId: 'customization-0',
        value: 'new-value',
        cohortId: 'mock-cohort-id'
      },
      {
        definitionId: 'customization-1',
        value: 'new-value',
        cohortId: 'mock-cohort-id'
      }
    ];

    const actual = updateCartItemCohortCustomizations({
      cartItem: mockCartItem,
      customizationValues: mockCustomizationValues
    });
    const expected = {
      cohortCustomizations: [
        {
          definitionId: 'customization-0',
          value: 'new-value',
          cohortId: 'mock-cohort-id'
        },
        {
          definitionId: 'customization-1',
          value: 'new-value',
          cohortId: 'mock-cohort-id'
        }
      ]
    };

    expect(actual).toEqual(expected);
  });

  it('adds new customizations to the existing cohortCustomizations array', () => {
    const mockCartItem = {
      cohortCustomizations: [
        {
          definitionId: 'customization-0',
          value: 'initial-value',
          cohortId: 'mock-cohort-id'
        }
      ],
      marketplaceProduct: {
        productCustomizations: [
          {
            id: 'customization-1',
            name: 'New Customization Name',
            fieldType: 'TEXT'
          }
        ]
      } as CartItemData['marketplaceProduct']
    } as CartItemData;

    const mockCustomizationValues = [
      {
        definitionId: 'customization-0',
        value: 'new-value',
        cohortId: 'mock-cohort-id'
      },
      {
        definitionId: 'customization-1',
        value: 'new-value',
        cohortId: 'mock-cohort-id'
      }
    ];

    const actual = updateCartItemCohortCustomizations({
      cartItem: mockCartItem,
      customizationValues: mockCustomizationValues
    });
    const expected = {
      ...mockCartItem,
      cohortCustomizations: [
        {
          definitionId: 'customization-0',
          value: 'new-value',
          cohortId: 'mock-cohort-id'
        },
        {
          definitionId: 'customization-1',
          value: 'new-value',
          cohortId: 'mock-cohort-id',
          name: 'New Customization Name',
          type: 'TEXT'
        }
      ]
    };

    expect(actual).toEqual(expected);
  });

  it('sets the value to null when updating an existing value', () => {
    const mockCartItem = {
      cohortCustomizations: [
        {
          definitionId: 'customization-0',
          value: 'initial-value',
          cohortId: 'mock-cohort-id'
        }
      ]
    } as CartItemData;

    const mockCustomizationValues = [
      {
        definitionId: 'customization-0',
        value: '',
        cohortId: 'mock-cohort-id'
      }
    ];

    const actual = updateCartItemCohortCustomizations({
      cartItem: mockCartItem,
      customizationValues: mockCustomizationValues
    });
    const expected = {
      cohortCustomizations: [
        {
          definitionId: 'customization-0',
          value: null,
          cohortId: 'mock-cohort-id'
        }
      ]
    };

    expect(actual).toEqual(expected);
  });

  it('excludes new customizations if the value is not specified', () => {
    const mockCartItem = {
      cohortCustomizations: [
        {
          definitionId: 'customization-0',
          value: 'initial-value',
          cohortId: 'mock-cohort-id'
        }
      ],
      marketplaceProduct: {
        productCustomizations: [
          {
            id: 'customization-1',
            name: 'New Customization Name',
            fieldType: 'TEXT'
          }
        ]
      } as CartItemData['marketplaceProduct']
    } as CartItemData;

    const mockCustomizationValues = [
      {
        definitionId: 'customization-0',
        value: 'new-value',
        cohortId: 'mock-cohort-id'
      },
      {
        definitionId: 'customization-1',
        value: '',
        cohortId: 'mock-cohort-id'
      }
    ];

    const actual = updateCartItemCohortCustomizations({
      cartItem: mockCartItem,
      customizationValues: mockCustomizationValues
    });
    const expected = {
      ...mockCartItem,
      cohortCustomizations: [
        {
          definitionId: 'customization-0',
          value: 'new-value',
          cohortId: 'mock-cohort-id'
        }
      ]
    };

    expect(actual).toEqual(expected);
  });
});
