import type { sqlGetMarketplaceProduct } from '@/app/api/marketplace/products';

export type ProductDetailContentBodyProps = {
  loading: boolean;
  product: Awaited<ReturnType<typeof sqlGetMarketplaceProduct>>['_serviceData'];
};
