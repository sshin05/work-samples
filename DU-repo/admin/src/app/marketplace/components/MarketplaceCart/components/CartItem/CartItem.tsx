import { css } from '@cerberus/styled-system/css';
import { Edit } from '@cerberus/icons';
import { IconButton } from '@cerberus/react';

import { ProductTypeTag } from '../../../ProductTypeTag/ProductTypeTag';
import type { CartItemData } from '../../MarketplaceCart.types';
import { normalizeCohortCustomizationsForDisplay } from './utils/normalizeCohortCustomizationsForDisplay';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import Link from 'next/link';
import { useRouteParams } from '@/hooks/useRouteParams';
import { ItemDetail } from './components/ItemDetail';
import { getQuantityDisplay } from './utils/getQuantityDisplay';

type CartItemProps = {
  cartItemData: CartItemData;
  onCartItemEdit: (cartItemData: CartItemData) => void;
};

export const CartItem = ({ cartItemData, onCartItemEdit }: CartItemProps) => {
  const { missionPartnerId } = useRouteParams();
  const normalizedCustomizations = normalizeCohortCustomizationsForDisplay(
    cartItemData.cohortCustomizations
  );

  const productDetailPageUrl = getRouteUrl(
    routeGenerators.MarketplaceVendorProductDetailPage({
      marketplaceVendorTag:
        cartItemData.marketplaceProduct.marketplaceVendorTag,
      productId: cartItemData.marketplaceProduct.id,
      missionPartnerId
    })
  );

  return (
    <div
      className={css({
        bg: 'page.surface.200',
        py: '4',
        pr: '4',
        pl: '8',
        borderRadius: 'sm',
        mb: '4'
      })}
    >
      <ProductTypeTag
        productType={cartItemData.marketplaceProduct.productType}
      />

      <h6
        className={css({
          color: 'action.text.100',
          my: '4',
          textStyle: 'h6',
          display: 'flex',
          alignItems: 'center'
        })}
      >
        <Link href={productDetailPageUrl}>
          {`${getQuantityDisplay(cartItemData)}${cartItemData.marketplaceProduct.title}`}
        </Link>

        <IconButton
          ariaLabel="Edit Cart Item Icon"
          className={css({
            color: 'page.text.initial',
            cursor: 'pointer',
            ml: 'auto'
          })}
          onClick={() => onCartItemEdit(cartItemData)}
        >
          <Edit size={16} />
        </IconButton>
      </h6>

      <ul>
        {cartItemData.price !== null && (
          <ItemDetail displayTitle="Price" displayValue={cartItemData.price} />
        )}
        {normalizedCustomizations.map(({ displayTitle, displayValue }) => (
          <ItemDetail
            key={displayTitle}
            displayTitle={displayTitle}
            displayValue={displayValue}
          />
        ))}
      </ul>
    </div>
  );
};
