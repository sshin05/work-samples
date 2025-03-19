import type { sqlGetMarketplaceProduct } from '@/app/api/marketplace/products';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import type { BreadcrumbPath } from '../../../../../Breadcrumbs/Breadcrumbs.types';
import type { GetBreadCrumbArgs } from './getBreadcrumbs.types';

const isParentVendorProductListPage = (pathname: string): boolean => {
  return pathname.includes('/vendors/');
};

const getProductListPageHref = ({
  pathname,
  product,
  missionPartnerId
}: {
  pathname: string;
  product: Awaited<ReturnType<typeof sqlGetMarketplaceProduct>>['_serviceData'];
  missionPartnerId: string;
}): string => {
  if (isParentVendorProductListPage(pathname)) {
    return getRouteUrl(
      routeGenerators.MarketplaceVendor({
        missionPartnerId,
        uniqueTag: product?.marketplaceVendor?.uniqueTag
      })
    );
  }

  return getRouteUrl(
    routeGenerators.MarketplaceCategory({
      missionPartnerId,
      categoryKey: product?.category?.key
    })
  );
};

const getProductListPageDisplayText = ({
  pathname,
  product
}: {
  pathname: string;
  product: Awaited<ReturnType<typeof sqlGetMarketplaceProduct>>['_serviceData'];
}): string => {
  if (isParentVendorProductListPage(pathname)) {
    return product?.marketplaceVendor?.name;
  }

  return product?.category?.name;
};

export const getBreadcrumbs = ({
  product,
  missionPartnerId,
  pathname
}: GetBreadCrumbArgs): BreadcrumbPath[] => {
  const breadcrumbs = [
    {
      text: 'Admin Portal',
      href: getRouteUrl('/')
    },
    {
      text: 'SOT-X',
      href: getRouteUrl(routeGenerators.Marketplace({ missionPartnerId }))
    },
    {
      text: getProductListPageDisplayText({
        pathname,
        product
      }),
      href: getProductListPageHref({
        missionPartnerId,
        pathname,
        product
      })
    }
  ];

  if (product?.title) {
    return [
      ...breadcrumbs,
      {
        text: product.title
      }
    ];
  }

  return breadcrumbs;
};
