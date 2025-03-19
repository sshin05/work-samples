'use client';

import { ShoppingCart } from '@cerberus/icons';
import { css } from '@cerberus/styled-system/css';
import { circle } from '@cerberus/styled-system/patterns';
import { useEffect, useState } from 'react';
import { MarketplaceCart } from '@/app/marketplace/components/MarketplaceCart';
import { CartSubmissionConfirmationModal } from './components/CartSubmissionConfirmationModal';
import {
  SideDrawer,
  SideDrawerBody
} from '@/app/marketplace/components/SideDrawer';
import { useMarketplace } from '@/app/marketplace/hooks/useMarketplace';
import { getSubtitle } from './utils/getSubtitle';

export const TopNavCart = () => {
  const { marketplaceCartItems } = useMarketplace();
  const [isExpanded, setIsExpanded] = useState(false);
  const [submittedOrderReferenceId, setSubmittedOrderReferenceId] =
    useState(null);

  const [cartItemCount, setCartItemCount] = useState<number>(
    marketplaceCartItems.data?.marketplaceOrderItems?.length || 0
  );

  const displayCart = () => {
    setIsExpanded(true);
  };

  useEffect(() => {
    const newCartItemCount =
      marketplaceCartItems.data?.marketplaceOrderItems?.length;

    if (newCartItemCount > cartItemCount) {
      displayCart();
    }

    setCartItemCount(newCartItemCount);
  }, [cartItemCount, marketplaceCartItems.data?.marketplaceOrderItems?.length]);

  const toggleExpanded = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
      displayCart();
    }
  };

  const handleCartClose = () => {
    setIsExpanded(false);
  };

  const handleCartSubmission = (orderReferenceId: string) => {
    setSubmittedOrderReferenceId(orderReferenceId);
  };

  const handleCartSubmissionConfirmationModalClose = () => {
    setSubmittedOrderReferenceId(null);
  };

  return (
    <>
      <div
        onClick={toggleExpanded}
        className={css({
          pos: 'relative',
          cursor: 'pointer',
          userSelect: 'none'
        })}
      >
        <ShoppingCart size={24} />
        {cartItemCount > 0 && (
          <div
            className={circle({
              pos: 'absolute',
              top: '-6px',
              left: '15px',
              size: '4',
              bg: 'action.bg.initial',
              textStyle: 'mono-xs',
              color: 'action.text.initial',
              fontWeight: '400'
            })}
          >
            {cartItemCount}
          </div>
        )}
        <SideDrawer
          title="Cart"
          subtitle={getSubtitle(marketplaceCartItems)}
          HeaderIcon={ShoppingCart}
          onCloseIconClick={handleCartClose}
          isOpen={isExpanded}
        >
          <SideDrawerBody>
            <MarketplaceCart
              onClose={handleCartClose}
              onCartSubmission={handleCartSubmission}
            />
          </SideDrawerBody>
        </SideDrawer>
      </div>

      <CartSubmissionConfirmationModal
        onClose={handleCartSubmissionConfirmationModalClose}
        orderReferenceId={submittedOrderReferenceId}
      />
    </>
  );
};
