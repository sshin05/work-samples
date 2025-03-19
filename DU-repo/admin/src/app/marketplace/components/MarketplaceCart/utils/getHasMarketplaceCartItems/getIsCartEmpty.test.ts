import { getIsCartEmpty } from './getIsCartEmpty';
import type { sqlGetMarketplaceCart } from '@/app/api/marketplace/carts';

describe('getIsCartEmpty', () => {
  type MockCartData = Awaited<
    ReturnType<typeof sqlGetMarketplaceCart>
  >['_serviceData'];

  const getMockCart = () => ({
    data: {
      marketplaceOrderItems: [{}, {}]
    } as unknown as MockCartData,
    loading: false,
    error: null
  });

  it('return false when it has cart items', () => {
    expect(getIsCartEmpty(getMockCart())).toBe(false);
  });

  it('returns false when loading', () => {
    const mockCart = {
      ...getMockCart(),
      loading: true
    };

    expect(getIsCartEmpty(mockCart)).toBe(false);
  });

  it('returns true when there is an error', () => {
    const mockCart = {
      ...getMockCart(),
      error: 'error'
    };

    expect(getIsCartEmpty(mockCart)).toBe(true);
  });

  it('returns true when empty', () => {
    const mockCart = {
      ...getMockCart(),
      data: {
        marketplaceOrderItems: []
      } as unknown as MockCartData
    };

    expect(getIsCartEmpty(mockCart)).toBe(true);
  });
});
