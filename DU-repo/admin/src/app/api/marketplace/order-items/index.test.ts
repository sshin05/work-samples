import {
  sqlFindMarketplaceOrderItems,
  sqlGetMarketplaceOrderItem,
  sqlDeleteMarketplaceOrderItem,
  sqlUpdateMarketplaceOrderItem,
  sqlUpdateMarketplaceOrderItemStatus
} from './index';

describe('make sure these functions exist', () => {
  it('sqlFindMarketplaceOrderItems', () => {
    expect(sqlFindMarketplaceOrderItems()).toBeDefined();
  });

  it('sqlGetMarketplaceOrderItem', () => {
    expect(sqlGetMarketplaceOrderItem()).toBeDefined();
  });

  it('sqlDeleteMarketplaceOrderItem', () => {
    expect(sqlDeleteMarketplaceOrderItem()).toBeDefined();
  });

  it('sqlUpdateMarketplaceOrderItem', () => {
    expect(sqlUpdateMarketplaceOrderItem()).toBeDefined();
  });

  it('sqlUpdateMarketplaceOrderItemStatus', () => {
    expect(sqlUpdateMarketplaceOrderItemStatus()).toBeDefined();
  });
});
