import type { CartItemData } from '../../../../MarketplaceCart.types';

export const getQuantityDisplay = (cartItemData: CartItemData): string => {
  if (cartItemData.marketplaceProduct.productType !== 'RESOURCE') {
    return '';
  }

  const quantityCustomization = cartItemData.cohortCustomizations.find(
    customization => customization.name.toLowerCase() === 'quantity'
  );

  // Fallback to quantity of 1 for resources without an quantity customization
  const quantityDisplayValue = quantityCustomization?.value ?? 1;

  return `${quantityDisplayValue} X`;
};
