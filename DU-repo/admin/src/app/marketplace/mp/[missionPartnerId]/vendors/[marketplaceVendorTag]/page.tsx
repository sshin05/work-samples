'use client';

import { sqlFindMarketplaceProducts } from '@/app/api/marketplace/products';
import { sqlGetMarketplaceVendor } from '@/app/api/marketplace/vendors';
import { useSQLQuery } from '@/app/api';
import { useRouteParams } from '@/hooks/useRouteParams';
import { ProductListPage } from '@/app/marketplace/components/ProductListPage/ProductListPage';

export default function VendorProductListPage() {
  const { missionPartnerId, marketplaceVendorTag } = useRouteParams();
  const { data: marketplaceProducts, loading: isLoadingProducts } = useSQLQuery(
    sqlFindMarketplaceProducts,
    { options: { filter: { marketplaceVendorTag }, missionPartnerId } }
  );

  const { data: marketplaceVendor, loading: isLoadingVendor } = useSQLQuery(
    sqlGetMarketplaceVendor,
    {
      options: {
        uniqueTag: marketplaceVendorTag,
        missionPartnerId
      }
    }
  );

  return (
    <ProductListPage
      loading={isLoadingProducts || isLoadingVendor}
      pageTitle={marketplaceVendor?.name || ''}
      logoPath={marketplaceVendor?.logoPath || ''}
      heroDescription={marketplaceVendor?.shortDescription || ''}
      pageDescription={marketplaceVendor?.description || ''}
      pageImage={marketplaceVendor?.imagePath || ''}
      products={
        marketplaceProducts?.records?.toSorted((productA, productB) =>
          productA.title.localeCompare(productB.title)
        ) || []
      }
    />
  );
}
