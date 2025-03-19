import {
  sqlArchiveMarketplaceProduct,
  sqlCreateMarketplaceProduct,
  sqlCreateMarketplaceProductCustomizationDefinition,
  sqlDeleteMarketplaceProductCustomizationDefinition,
  sqlFindMarketplaceCategories,
  sqlFindMarketplaceProductCustomizationDefinitions,
  sqlFindMarketplaceProducts,
  sqlGetMarketplaceProduct,
  sqlGetMarketplaceCategory,
  sqlGetMarketplaceProductCustomizationDefinition,
  sqlUpdateMarketplaceProduct,
  sqlUpdateMarketplaceProductCustomizationDefinition
} from './index';

describe('make sure these functions exist', () => {
  it('sqlArchiveMarketplaceProduct', () => {
    expect(sqlArchiveMarketplaceProduct()).toBeDefined();
  });

  it('sqlCreateMarketplaceProduct', () => {
    expect(sqlCreateMarketplaceProduct()).toBeDefined();
  });

  it('sqlCreateMarketplaceProductCustomizationDefinition', () => {
    expect(sqlCreateMarketplaceProductCustomizationDefinition()).toBeDefined();
  });

  it('sqlDeleteMarketplaceProductCustomizationDefinition', () => {
    expect(sqlDeleteMarketplaceProductCustomizationDefinition()).toBeDefined();
  });

  it('sqlFindMarketplaceCategories', () => {
    expect(sqlFindMarketplaceCategories()).toBeDefined();
  });

  it('sqlFindMarketplaceProductCustomizationDefinitions', () => {
    expect(sqlFindMarketplaceProductCustomizationDefinitions()).toBeDefined();
  });
  it('sqlFindMarketplaceProducts', () => {
    expect(sqlFindMarketplaceProducts()).toBeDefined();
  });
  it('sqlGetMarketplaceProduct', () => {
    expect(sqlGetMarketplaceProduct()).toBeDefined();
  });
  it('sqlGetMarketplaceCategory', () => {
    expect(sqlGetMarketplaceCategory()).toBeDefined();
  });
  it('sqlUpdateMarketplaceProduct', () => {
    expect(sqlUpdateMarketplaceProduct()).toBeDefined();
  });
  it('sqlGetMarketplaceProductCustomizationDefinition', () => {
    expect(sqlGetMarketplaceProductCustomizationDefinition()).toBeDefined();
  });
  it('sqlUpdateMarketplaceProductCustomizationDefinition', () => {
    expect(sqlUpdateMarketplaceProductCustomizationDefinition()).toBeDefined();
  });
});
