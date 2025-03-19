import { useState } from 'react';
import { Button, Spinner } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { sqlSubmitCart } from '@/app/api/marketplace/carts';
import { useSQLMutation } from '@/app/api';
import { useRouteParams } from '@/hooks/useRouteParams';
import { CartItem } from './components/CartItem';
import { SideDrawerFooter } from '../SideDrawer';
import { EmptyCartView } from './components/EmptyCartView';
import type { CartItemData } from './MarketplaceCart.types';
import { EditCartItemModal } from './components/EditCartItemModal';
import { useMarketplace } from '@/app/marketplace/hooks/useMarketplace';
import { getIsCartEmpty } from './utils/getHasMarketplaceCartItems/getIsCartEmpty';
import { useMatomoTrackEvent } from '@/hooks/useMatomoTrackEvent/useMatomoTrackEvent';

type MarketplaceCartProps = {
  onClose: () => void;
  onCartSubmission: (orderReferenceId: string) => void;
};

export const MarketplaceCart = ({
  onClose,
  onCartSubmission
}: MarketplaceCartProps) => {
  const { missionPartnerId } = useRouteParams();
  const [displayEditItemModal, setDisplayEditItemModal] = useState(false);
  const [cartItemToEdit, setCartItemToEdit] = useState(null);
  const matomoTrackEvent = useMatomoTrackEvent();

  const { marketplaceCartItems } = useMarketplace();

  const {
    loading: isCartSubmitting,
    error: _submitCartError,
    mutation: submitCart
  } = useSQLMutation(sqlSubmitCart, {
    callback: () => {
      marketplaceCartItems.query({ missionPartnerId });
    }
  });

  const handleCartItemEdit = (cartItemData: CartItemData) => {
    setDisplayEditItemModal(true);
    setCartItemToEdit(cartItemData);
  };

  const handleCustomizationRequestSubmission = async (): Promise<void> => {
    if (isCartSubmitting) {
      return;
    }

    const {
      data: { referenceId }
    } = await submitCart({
      missionPartnerId
    });

    matomoTrackEvent(
      'Cart',
      'Submit Customization Request',
      `Reference Id: ${referenceId}`
    );

    onCartSubmission(referenceId);
    onClose();
  };

  const handleCartItemEditModalClose = () => {
    setDisplayEditItemModal(false);
    setCartItemToEdit(null);
  };

  const isCartEmpty = getIsCartEmpty(marketplaceCartItems);
  if (isCartEmpty) {
    return <EmptyCartView onCloseButtonClick={onClose} />;
  }

  return (
    <>
      <div className={css({ paddingBottom: '204px' })}>
        {marketplaceCartItems.data?.marketplaceOrderItems?.map(item => {
          return (
            <CartItem
              key={item.id}
              cartItemData={item}
              onCartItemEdit={handleCartItemEdit}
            />
          );
        })}
      </div>

      <SideDrawerFooter>
        <p
          className={css({
            whiteSpace: 'normal',
            fontWeight: '400',
            mb: '6'
          })}
        >
          Clicking below will submit your cart to be reviewed by the applicable
          vendors. No payment is required at this time.
        </p>
        <Button onClick={handleCustomizationRequestSubmission}>
          {isCartSubmitting && <Spinner size="1em" />}
          Submit Customization Request
        </Button>
      </SideDrawerFooter>

      <EditCartItemModal
        displayEditItemModal={displayEditItemModal}
        cartItem={cartItemToEdit}
        onRemoveCartItem={() =>
          marketplaceCartItems.query({ missionPartnerId })
        }
        onClose={handleCartItemEditModalClose}
      />
    </>
  );
};
