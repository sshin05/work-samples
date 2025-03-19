import { ProductCustomizationModal } from '@/app/marketplace/components/ProductCustomizationModal';
import { useCallback, useState } from 'react';

import { useSQLMutation } from '@/app/api';
import { sqlRemoveItemFromCart } from '@/app/api/marketplace/carts';
import { sqlUpdateMarketplaceOrderItem } from '@/app/api/marketplace/order-items';

import { useRouteParams } from '@/hooks/useRouteParams';
import type { CartItemData } from '../../MarketplaceCart.types';
import { ConfirmationModal } from './components/ConfirmationModal';
import { handleCartItemEditSubmit } from './utils/handleCartItemEditSubmit';
import { useMarketplace } from '@/app/marketplace/hooks/useMarketplace';
import { useMatomoTrackEvent } from '@/hooks/useMatomoTrackEvent/useMatomoTrackEvent';

type EditCartItemModalProps = {
  displayEditItemModal: boolean;
  cartItem: CartItemData;
  onClose: () => void;
  onRemoveCartItem: () => void;
  showConfirmationModal?: boolean;
};

export const EditCartItemModal = ({
  displayEditItemModal,
  cartItem,
  onClose,
  onRemoveCartItem,
  showConfirmationModal = false
}: EditCartItemModalProps) => {
  const { missionPartnerId } = useRouteParams();
  const { marketplaceCartItems } = useMarketplace();
  const { mutation: updateMarketplaceOrderItem } = useSQLMutation(
    sqlUpdateMarketplaceOrderItem
  );
  const matomoTrackEvent = useMatomoTrackEvent();

  const { mutation: removeItemFromCart, loading: isRemovingItemFromCart } =
    useSQLMutation(sqlRemoveItemFromCart, {
      callback: onRemoveCartItem
    });

  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(
    showConfirmationModal
  );

  const submitCartItemEdit = useCallback(
    handleCartItemEditSubmit({
      cartItem,
      updateMarketplaceOrderItem,
      afterUpdate: () => marketplaceCartItems.query({ missionPartnerId }),
      onClose,
      missionPartnerId
    }),
    [cartItem, updateMarketplaceOrderItem, onClose, missionPartnerId]
  );

  const handleCartItemRemoval = async () => {
    matomoTrackEvent(
      'Product',
      'Remove from Cart',
      `${cartItem?.marketplaceProduct?.marketplaceVendorTag} : ${cartItem?.marketplaceProduct?.sku}`
    );
    await removeItemFromCart({
      missionPartnerId,
      marketplaceOrderItemId: cartItem.id
    });

    setDisplayConfirmationModal(false);
    onClose();
  };

  if (displayConfirmationModal) {
    return (
      <ConfirmationModal
        isRemovingItemFromCart={isRemovingItemFromCart}
        onConfirm={handleCartItemRemoval}
        onClose={() => setDisplayConfirmationModal(false)}
      />
    );
  }

  return (
    <ProductCustomizationModal
      title="Edit Details"
      submitText="Update Cart"
      marketplaceProduct={cartItem?.marketplaceProduct}
      cartItemCohortCustomizations={cartItem?.cohortCustomizations}
      visible={displayEditItemModal}
      onClose={onClose}
      onSubmit={submitCartItemEdit}
      onCartItemRemoval={() => setDisplayConfirmationModal(true)}
    />
  );
};
