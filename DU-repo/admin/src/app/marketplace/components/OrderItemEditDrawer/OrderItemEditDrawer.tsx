import { useMemo, useCallback } from 'react';
import Link from 'next/link';
import type { GetMarketplaceProductType } from '@digital-u/services/marketplace/products/get-marketplace-product';
import type { CartItemMarketplaceProduct } from '@/app/marketplace/components/ProductCustomizationModal/ProductCustomizationModal.types';
import {
  SideDrawer,
  SideDrawerBody,
  SideDrawerFooter
} from '@/app/marketplace/components/SideDrawer';
import { Edit, DataViewAlt } from '@cerberus/icons';
import {
  Button,
  Show,
  Accordion,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionItemIndicator,
  AccordionItem
} from '@cerberus/react';
import { formatFormInputsForSave } from '@/app/marketplace/components/ProductCustomizationModal/utils/formatFormInputDataForSave/formatFormInputDataForSave';
import { OrderItemCustomizationForm } from '@/app/marketplace/components/ProductCustomizationModal/components/CustomizationForm/components/OrderItemCustomizationForm';
import { useIsDuAdmin } from '@/hooks/useCurrentSession/useCurrentSession';
import { normalizeCohortCustomizationsForDisplay } from '@/app/marketplace/components/MarketplaceCart/components/CartItem/utils/normalizeCohortCustomizationsForDisplay/normalizeCohortCustomizationsForDisplay';
import { ItemDetail } from '@/app/marketplace/components/OrderItemEditDrawer/components/ItemDetail';
import { formatOrderStatus } from '@/app/marketplace/utils/orderStatus';
import { OrderNoteCard } from '@/app/marketplace/components/OrderDetailPage/components/OrderNoteCard/OrderNoteCard';
import { css } from '@cerberus/styled-system/css';
import { ProductTypeTag } from '../ProductTypeTag';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { useMatomoTrackEvent } from '@/hooks/useMatomoTrackEvent/useMatomoTrackEvent';

export const OrderItemEditDrawer = ({
  orderItem,
  handleCloseDrawer,
  drawerIsExpanded,
  handleOnExit,
  onSubmit,
  missionPartnerId,
  loading
}) => {
  const { isDuAdmin } = useIsDuAdmin();
  const matomoTrackEvent = useMatomoTrackEvent();

  const customizations = useMemo(
    () =>
      (orderItem?.marketplaceProduct as GetMarketplaceProductType)
        ?.customizations ||
      (orderItem?.marketplaceProduct as CartItemMarketplaceProduct)
        ?.productCustomizations,
    [orderItem?.marketplaceProduct]
  );

  const normalizedCustomizations = [
    {
      displayTitle: 'Status',
      displayValue: formatOrderStatus(orderItem?.status)
    },
    {
      displayTitle: 'Price',
      displayValue: orderItem?.price ? `$${orderItem?.price}` : 'N/A'
    },
    ...normalizeCohortCustomizationsForDisplay(orderItem?.cohortCustomizations)
  ];

  const handleSave = useCallback(
    async formData => {
      const formattedData = formatFormInputsForSave(formData, customizations);

      let price = parseInt(formData.orderItemPrice);
      if (isNaN(price)) {
        price = null;
      }

      matomoTrackEvent(
        'Product',
        'Edit',
        `OrderItem Id: ${orderItem.referenceId}`
      );

      await onSubmit({
        id: orderItem?.id,
        price: price,
        status: formData.orderItemStatus,
        cohortCustomizations: formattedData,
        marketplaceProductId: orderItem?.marketplaceProduct.id,
        missionPartnerId
      });

      handleCloseDrawer();
    },
    [orderItem?.marketplaceProduct]
  );

  const orderUrl = getRouteUrl(
    routeGenerators.MarketplaceOrder({
      missionPartnerId,
      orderId: orderItem?.marketplaceOrder?.referenceId
    })
  );

  return (
    <SideDrawer
      title={isDuAdmin ? 'Edit Item' : 'View Item'}
      HeaderIcon={isDuAdmin ? Edit : DataViewAlt}
      onCloseIconClick={handleCloseDrawer}
      isOpen={drawerIsExpanded}
      onExited={handleOnExit}
    >
      <SideDrawerBody drawerHasFooter>
        <div
          aria-busy={loading}
          className={css({ mt: 2, mb: 8, minHeight: '124px' })}
        >
          {orderItem?.marketplaceProduct && (
            <div className={css({ mb: 4 })}>
              <ProductTypeTag
                productType={orderItem.marketplaceProduct?.productType}
              />
              <h4 className={css({ mt: 4, textStyle: 'heading-md' })}>
                {orderItem.marketplaceProduct?.title}
              </h4>
            </div>
          )}

          <Show when={isDuAdmin}>
            Order ID:{' '}
            <Link
              href={orderUrl}
              className={css({ textDecoration: 'underline' })}
            >
              {orderItem?.marketplaceOrder?.referenceId}
            </Link>
          </Show>

          <Show when={!isDuAdmin}>
            Order ID: {orderItem?.marketplaceOrder?.id}
          </Show>
        </div>

        <Show when={isDuAdmin && !loading}>
          <OrderItemCustomizationForm
            orderItem={orderItem}
            customizationFields={customizations || []}
            orderItemCohortCustomizations={orderItem?.cohortCustomizations}
            onClose={handleCloseDrawer}
            onSubmit={handleSave}
            submitText="Save"
          />
        </Show>

        <Show when={!isDuAdmin && !loading}>
          {normalizedCustomizations.map(({ displayTitle, displayValue }) => (
            <ItemDetail
              key={displayTitle}
              displayTitle={displayTitle}
              displayValue={displayValue}
            />
          ))}

          <Accordion>
            <AccordionItem value="Item History">
              <AccordionItemTrigger
                size="sm"
                className={css({
                  gap: 'md',
                  justifyContent: 'flex-start'
                })}
              >
                <AccordionItemIndicator size="sm" />
                Item History
              </AccordionItemTrigger>

              <AccordionItemContent
                className={css({
                  '&.animation-ended': {
                    height: 'auto !important'
                  }
                })}
                onAnimationEnd={event => {
                  (event.target as HTMLElement).classList.add(
                    'animation-ended'
                  );
                }}
                onAnimationStart={event => {
                  (event.target as HTMLElement).classList.remove(
                    'animation-ended'
                  );
                }}
              >
                <div
                  className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6
                  })}
                >
                  {orderItem?.marketplaceNotes.map(note => (
                    <OrderNoteCard key={note.id} note={note} />
                  ))}
                </div>
              </AccordionItemContent>
            </AccordionItem>
          </Accordion>

          <SideDrawerFooter>
            <Button onClick={handleCloseDrawer}>Back</Button>
          </SideDrawerFooter>
        </Show>
      </SideDrawerBody>
    </SideDrawer>
  );
};
