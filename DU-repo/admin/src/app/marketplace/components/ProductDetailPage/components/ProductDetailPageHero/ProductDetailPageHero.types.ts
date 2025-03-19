import type { sqlGetMarketplaceProduct } from '@/app/api/marketplace/products';
import type { sqlGetMarketplaceVendor } from '@/app/api/marketplace/vendors';

export type ProductDetailPageHeroProps = {
  loading: boolean;
  product: Awaited<ReturnType<typeof sqlGetMarketplaceProduct>>['_serviceData'];
  vendor: Awaited<ReturnType<typeof sqlGetMarketplaceVendor>>['_serviceData'];
  onAddAndCustomizeButtonClick: () => void;
};
