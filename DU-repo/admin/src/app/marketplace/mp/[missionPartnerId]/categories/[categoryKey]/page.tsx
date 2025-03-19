'use client';

import {
  sqlGetMarketplaceCategory,
  sqlFindMarketplaceProducts
} from '@/app/api/marketplace/products';
import { useSQLQuery } from '@/app/api';
import { useRouteParams } from '@/hooks/useRouteParams';
import { ProductListPage } from '@/app/marketplace/components/ProductListPage/ProductListPage';

export default function CategoryProductListPage() {
  const { categoryKey, missionPartnerId } = useRouteParams();

  const { data: category, loading: isLoadingCategory } = useSQLQuery(
    sqlGetMarketplaceCategory,
    { options: { key: categoryKey } }
  );

  const { data: marketplaceProducts, loading: isLoadingProducts } = useSQLQuery(
    sqlFindMarketplaceProducts,
    {
      options: {
        filter: { category: categoryKey },
        missionPartnerId
      }
    }
  );

  return (
    <ProductListPage
      loading={isLoadingProducts || isLoadingCategory}
      pageTitle={category?.name || ''}
      heroDescription={category?.description || ''}
      products={
        marketplaceProducts?.records?.toSorted((productA, productB) =>
          productA.title.localeCompare(productB.title)
        ) || []
      }
    />
  );
}
