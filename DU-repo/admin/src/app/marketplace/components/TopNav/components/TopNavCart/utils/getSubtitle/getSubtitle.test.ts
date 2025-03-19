import { USE_MARKETPLACE_MOCK_RETURN_VALUE } from '@/app/marketplace/hooks/useMarketplace/testing/mocks';
import { getSubtitle } from './getSubtitle';
import type { UseMarketplaceProps } from '@/app/marketplace/hooks/useMarketplace/useMarketplace';
import { CART_SUBTITLE_TEXT } from './getSubtitle.constants';

describe('getSubtitle', () => {
  it('returns the item count in the expected format', () => {
    const mockCartItems = {
      ...USE_MARKETPLACE_MOCK_RETURN_VALUE.marketplaceCartItems,
      data: {
        marketplaceOrderItems: [{}, {}]
      }
    } as UseMarketplaceProps['marketplaceCartItems'];

    expect(getSubtitle(mockCartItems)).toBe(`${CART_SUBTITLE_TEXT} (2 Items)`);
  });

  it('handles a single item in the cart', () => {
    const mockCartItems = {
      ...USE_MARKETPLACE_MOCK_RETURN_VALUE.marketplaceCartItems,
      data: {
        marketplaceOrderItems: [{}]
      }
    } as UseMarketplaceProps['marketplaceCartItems'];

    expect(getSubtitle(mockCartItems)).toBe(`${CART_SUBTITLE_TEXT} (1 Item)`);
  });

  it.each([
    { isLoading: true, error: null },
    { isLoading: false, error: 'has error' }
  ])('handles loading & error states', ({ isLoading, error }) => {
    const mockCartItems = {
      ...USE_MARKETPLACE_MOCK_RETURN_VALUE.marketplaceCartItems,
      data: {
        marketplaceOrderItems: [{}, {}]
      },
      loading: isLoading,
      error
    } as UseMarketplaceProps['marketplaceCartItems'];

    expect(getSubtitle(mockCartItems)).toBe(``);
  });

  it('returns an empty string if there are no cart items', () => {
    const mockCartItems = {
      ...USE_MARKETPLACE_MOCK_RETURN_VALUE.marketplaceCartItems,
      data: {
        marketplaceOrderItems: []
      }
    } as UseMarketplaceProps['marketplaceCartItems'];

    expect(getSubtitle(mockCartItems)).toBe(``);
  });
});
