import type { UseMarketplaceProps } from '@/app/marketplace/hooks/useMarketplace/useMarketplace';
import { CART_SUBTITLE_TEXT } from './getSubtitle.constants';

const pluralize = (value: number, unit: string, pluralization: string) => {
  if (value === 1) {
    return `${value} ${unit}`;
  }

  const pluralizedUnit = `${unit}${pluralization}`;
  return `${value} ${pluralizedUnit}`;
};

export const getSubtitle = (
  cartItems: UseMarketplaceProps['marketplaceCartItems']
): string => {
  if (cartItems.loading || cartItems.error) {
    return '';
  }

  const cartItemsCount = cartItems.data?.marketplaceOrderItems.length;
  if (cartItemsCount > 0) {
    const countDisplay = pluralize(cartItemsCount, 'Item', 's');

    return `${CART_SUBTITLE_TEXT} (${countDisplay})`;
  }

  return '';
};
