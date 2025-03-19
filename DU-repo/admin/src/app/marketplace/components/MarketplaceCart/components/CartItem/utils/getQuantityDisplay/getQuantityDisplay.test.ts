import type { CartItemData } from '../../../../MarketplaceCart.types';
import { getQuantityDisplay } from './getQuantityDisplay';

describe('getQuantityDisplay', () => {
  const mockCohortCustomization = [
    {
      name: 'Quantity',
      value: 7
    }
  ];

  const getMockCartItem = () =>
    ({
      cohortCustomizations: [...mockCohortCustomization],
      marketplaceProduct: {
        productType: 'RESOURCE'
      }
    }) as unknown as CartItemData;

  it('Returns the quantity value when it exists on a cohortCustomization', () => {
    expect(getQuantityDisplay(getMockCartItem())).toBe('7 X');
  });

  it('Falls back to 1 if the resource does not have a quantity cohortCustomization', () => {
    const mockCart = {
      ...getMockCartItem(),
      cohortCustomizations: []
    };
    expect(getQuantityDisplay(mockCart)).toBe('1 X');
  });

  it('Returns an empty string for non-Resource product types', () => {
    const mockCart = {
      ...getMockCartItem(),
      marketplaceProduct: {
        productType: 'TRAINING'
      } as unknown as CartItemData['marketplaceProduct']
    };

    expect(getQuantityDisplay(mockCart)).toBe('');
  });
});
