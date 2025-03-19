import {
  sqlGetMarketplaceCart,
  sqlSubmitCart,
  sqlAddProductToCart,
  sqlRemoveItemFromCart,
  sqlMakePaymentWithMarketplaceTokenTransaction,
  sqlMakePaymentWithContracting
} from './index';

describe('make sure these functions exist', () => {
  it('sqlGetMarketplaceCart', () => {
    expect(sqlGetMarketplaceCart()).toBeDefined();
  });

  it('sqlSubmitCart', () => {
    expect(sqlSubmitCart()).toBeDefined();
  });

  it('sqlAddProductToCart', () => {
    expect(sqlAddProductToCart()).toBeDefined();
  });

  it('sqlRemoveItemFromCart', () => {
    expect(sqlRemoveItemFromCart()).toBeDefined();
  });

  it('sqlMakePaymentWithMarketplaceTokenTransaction', () => {
    expect(sqlMakePaymentWithMarketplaceTokenTransaction()).toBeDefined();
  });
  it('sqlMakePaymentWithContracting', () => {
    expect(sqlMakePaymentWithContracting()).toBeDefined();
  });
});
