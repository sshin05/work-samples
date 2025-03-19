import {
  sqlCreateMarketplaceTokenTransaction,
  sqlFindMarketplaceTokenTransactions,
  sqlGetMarketplaceTokenTransaction,
  sqlSumMarketplaceTokenTransactions
} from './index';

describe('make sure these functions exist', () => {
  it('sqlCreateMarketplaceTokenTransaction', () => {
    expect(sqlCreateMarketplaceTokenTransaction()).toBeDefined();
  });

  it('sqlFindMarketplaceTokenTransactions', () => {
    expect(sqlFindMarketplaceTokenTransactions()).toBeDefined();
  });

  it('sqlGetMarketplaceTokenTransaction', () => {
    expect(sqlGetMarketplaceTokenTransaction()).toBeDefined();
  });

  it('sqlSumMarketplaceTokenTransactions', () => {
    expect(sqlSumMarketplaceTokenTransactions()).toBeDefined();
  });
});
