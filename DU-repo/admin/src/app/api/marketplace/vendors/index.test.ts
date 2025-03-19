import {
  sqlFindMarketplaceVendors,
  sqlGetMarketplaceVendor,
  sqlArchiveMarketplaceVendor,
  sqlDeleteMarketplaceVendor,
  sqlUpdateMarketplaceVendor
} from './index';

describe('make sure these functions exist', () => {
  it('sqlFindMarketplaceVendors', () => {
    expect(sqlFindMarketplaceVendors()).toBeDefined();
  });

  it('sqlGetMarketplaceVendor', () => {
    expect(sqlGetMarketplaceVendor()).toBeDefined();
  });

  it('sqlArchiveMarketplaceVendor', () => {
    expect(sqlArchiveMarketplaceVendor()).toBeDefined();
  });

  it('sqlDeleteMarketplaceVendor', () => {
    expect(sqlDeleteMarketplaceVendor()).toBeDefined();
  });

  it('sqlUpdateMarketplaceVendor', () => {
    expect(sqlUpdateMarketplaceVendor()).toBeDefined();
  });
});
