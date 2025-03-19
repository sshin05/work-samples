import {
  sqlGetMarketplaceOrder,
  sqlFindMarketplaceOrders,
  sqlFinalizeContracing
} from './index';

describe('make sure these functions exist', () => {
  it('sqlGetMarketplaceOrder', () => {
    expect(sqlGetMarketplaceOrder()).toBeDefined();
  });

  it('sqlFindMarketplaceOrders', () => {
    expect(sqlFindMarketplaceOrders()).toBeDefined();
  });

  it('sqlFinalizeContracing', () => {
    expect(sqlFinalizeContracing()).toBeDefined();
  });
});
