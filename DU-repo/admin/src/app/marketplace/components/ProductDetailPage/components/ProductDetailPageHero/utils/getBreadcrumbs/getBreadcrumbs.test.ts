import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { getBreadcrumbs } from './getBreadcrumbs';
import type { GetBreadCrumbArgs } from './getBreadcrumbs.types';
import type { sqlGetMarketplaceProduct } from '@/app/api/marketplace/products';

type MockProduct = Awaited<
  ReturnType<typeof sqlGetMarketplaceProduct>
>['_serviceData'];

describe('getBreadcrumbs', () => {
  const MOCK_PRODUCT = {
    title: 'Mock Product Title',
    category: {
      id: 'Mock Product Category Id',
      key: 'MOCKKEY',
      name: 'Mock Product Category Name'
    },
    marketplaceVendor: {
      name: 'Mock Vendor Name',
      uniqueTag: 'Mock Vednor Unique Tag'
    }
  } as GetBreadCrumbArgs['product'];

  const MOCK_MISSION_PARTNER_ID = 'mock-mp-id';

  const getDefaultArgs = () =>
    ({
      product: {
        ...MOCK_PRODUCT
      },

      missionPartnerId: MOCK_MISSION_PARTNER_ID,
      pathname: getRouteUrl(
        routeGenerators.MarketplaceVendor({
          missionPartnerId: MOCK_MISSION_PARTNER_ID,
          uniqueTag: MOCK_PRODUCT.marketplaceVendor.uniqueTag
        })
      )
    }) as GetBreadCrumbArgs;

  it('includes the product title', () => {
    const actual = getBreadcrumbs(getDefaultArgs());

    expect(actual[actual.length - 1].text).toBe(MOCK_PRODUCT.title);
  });

  it('correctly generates the PLP breadcrumb when on a vendor PDP', () => {
    const actual = getBreadcrumbs(getDefaultArgs());
    const productListPageBreadcrumb = actual[2];
    const { href, text } = productListPageBreadcrumb;

    expect(text).toBe(MOCK_PRODUCT.marketplaceVendor.name);
    expect(
      href.includes(`/vendors/${MOCK_PRODUCT.marketplaceVendor.uniqueTag}`)
    ).toBe(true);
  });

  it('correctly generates the PLP breadcrumb when on a category PDP', () => {
    const actual = getBreadcrumbs({
      ...getDefaultArgs(),
      pathname: getRouteUrl(
        routeGenerators.MarketplaceCategory({
          missionPartnerId: MOCK_MISSION_PARTNER_ID,
          categoryKey: '1235'
        })
      )
    });
    const productListPageBreadcrumb = actual[2];
    const { href, text } = productListPageBreadcrumb;

    expect(text).toBe(MOCK_PRODUCT.category.name);
    expect(href.includes(`/categories/${MOCK_PRODUCT.category.key}`)).toBe(
      true
    );
  });

  it('Does not include the product title if undefined', () => {
    const args = {
      ...getDefaultArgs(),
      product: {
        ...MOCK_PRODUCT,
        title: undefined
      } as MockProduct
    };

    const actual = getBreadcrumbs(args);

    expect(actual[actual.length - 1].text).not.toBe(MOCK_PRODUCT.title);
  });
});
