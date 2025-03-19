'use client';

import { sqlGetMarketplaceProduct } from '@/app/api/marketplace/products';
import { sqlGetMarketplaceVendor } from '@/app/api/marketplace/vendors';
import { useSQLMutation, useSQLQuery } from '@/app/api';
import { useState } from 'react';
import { useRouteParams } from '@/hooks/useRouteParams';
import { ProductDetailPageHero } from './components/ProductDetailPageHero';
import { ProductDetailContentBody } from './components/ProductDetailContentBody';
import { TopNav } from '../TopNav/TopNav';
import { css } from '@cerberus/styled-system/css';
import { ProductCustomizationModal } from '../ProductCustomizationModal';
import { type ProductCustomizationModalSubmitArguments } from '../ProductCustomizationModal/ProductCustomizationModal.types';
import { sqlAddProductToCart } from '@/app/api/marketplace/carts';
import { useMarketplace } from '@/app/marketplace/hooks/useMarketplace';
import { formatCustomizationsForAddToCart } from './utils/formatCustomizationsForAddToCart';
import { useMatomoTrackEvent } from '@/hooks/useMatomoTrackEvent/useMatomoTrackEvent';

export const ProductDetailPage = () => {
  const { marketplaceCartItems } = useMarketplace();
  const { productId, missionPartnerId } = useRouteParams();
  const { mutation: addProductToCart } = useSQLMutation(sqlAddProductToCart);
  const matomoTrackEvent = useMatomoTrackEvent();

  const { data: marketplaceProduct, loading: marketplaceProductLoading } =
    useSQLQuery(sqlGetMarketplaceProduct, {
      options: { id: productId, missionPartnerId }
    });

  const { data: vendor, loading: isVendorLoading } = useSQLQuery(
    sqlGetMarketplaceVendor,
    {
      options: {
        uniqueTag: marketplaceProduct?.marketplaceVendorTag || null,
        missionPartnerId
      }
    }
  );

  const [visible, setVisible] = useState(false);

  const handleAddProductToCart = async (
    submitArguments: ProductCustomizationModalSubmitArguments
  ) => {
    matomoTrackEvent(
      'Product',
      'Add to Cart',
      `${marketplaceProduct?.marketplaceVendorTag} : ${marketplaceProduct?.sku}`
    );
    await addProductToCart({
      ...submitArguments,
      cohortCustomizations: formatCustomizationsForAddToCart(
        submitArguments.customizationValues
      )
    });
    await marketplaceCartItems.query({ missionPartnerId });
  };

  const isLoading = isVendorLoading || marketplaceProductLoading;

  return (
    <div className={css({ h: '100vh' })}>
      <TopNav />
      <ProductDetailPageHero
        loading={isLoading}
        product={marketplaceProduct}
        vendor={vendor}
        onAddAndCustomizeButtonClick={() => setVisible(true)}
      />

      <ProductDetailContentBody
        loading={isLoading}
        product={marketplaceProduct}
      />

      <ProductCustomizationModal
        title="Customize details"
        marketplaceProduct={marketplaceProduct}
        visible={visible}
        onClose={() => setVisible(false)}
        submitText="Add to Cart"
        onSubmit={handleAddProductToCart}
      />
    </div>
  );
};
