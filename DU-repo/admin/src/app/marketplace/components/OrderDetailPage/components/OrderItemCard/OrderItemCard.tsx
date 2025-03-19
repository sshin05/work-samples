'use client';
import Link from 'next/link';
import { css } from '@cerberus/styled-system/css';
import { Edit } from '@cerberus/icons';
import { ProductMetaAttributes } from '../../../ProductMetaAttributes/ProductMetaAttributes';
import { flex } from '@cerberus/styled-system/patterns';
import {
  Accordion,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionItemIndicator,
  AccordionItem
} from '@cerberus/react';
import { formatDollars } from '@/utils/format-number';
import { ProductTypeTag } from '@/app/marketplace/components/ProductTypeTag/ProductTypeTag';
import { StatusTag } from '@/app/marketplace/components/StatusTag/StatusTag';
import { ItemDetail } from '@/app/marketplace/components/MarketplaceCart/components/CartItem/components/ItemDetail/ItemDetail';
import { normalizeCohortCustomizationsForDisplay } from '@/app/marketplace/components/MarketplaceCart/components/CartItem/utils/normalizeCohortCustomizationsForDisplay/normalizeCohortCustomizationsForDisplay';
import { sqlGetMarketplaceOrderItem } from '@/app/api/marketplace/order-items';
import { useSQLQuery } from '@/app/api';
import { useIsDuAdmin } from '@/hooks/useCurrentSession/useCurrentSession';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { useRouteParams } from '@/hooks/useRouteParams';

import type { JSX } from 'react';

export function OrderItemCard({ orderItem, onEdit }): JSX.Element {
  const { missionPartnerId } = useRouteParams();

  const { isDuAdmin } = useIsDuAdmin();

  const {
    data: orderItemDetails,
    loading: orderItemDetailsLoading,
    query: getOrderItem
  } = useSQLQuery(sqlGetMarketplaceOrderItem, {
    lazyLoad: true
  });

  const normalizedCustomizations = normalizeCohortCustomizationsForDisplay(
    orderItemDetails?.cohortCustomizations
  );

  const productDetailPageUrl = getRouteUrl(
    routeGenerators.MarketplaceVendorProductDetailPage({
      marketplaceVendorTag: orderItem?.marketplaceProduct.marketplaceVendorTag,
      productId: orderItem?.marketplaceProduct.id,
      missionPartnerId
    })
  );

  return (
    <div
      className={css({
        bg: 'page.surface.200',
        px: '6',
        py: '6',
        border: '1px solid #000',
        alignSelf: 'stretch'
      })}
    >
      <div className={flex({ direction: 'column', height: 'full', gap: '4' })}>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between'
          })}
        >
          <div className={css({ display: 'flex', gap: 4 })}>
            <StatusTag status={orderItem?.status} />
            <ProductTypeTag
              productType={orderItem?.marketplaceProduct?.productType}
            />
          </div>

          <div
            className={css({
              display: 'flex',
              gap: '2',
              alignItems: 'center'
            })}
          >
            <div>
              {orderItem?.price ? `${formatDollars(orderItem.price)}` : ''}
            </div>
            <div className={css({ cursor: 'pointer' })}>
              {isDuAdmin ? <Edit onClick={() => onEdit(orderItem)} /> : null}
            </div>
          </div>
        </div>

        <h5
          className={css({
            textStyle: 'h6',
            letterSpacing: '0.01em',
            wordBreak: 'normal',
            whiteSpace: 'normal',
            overflowWrap: 'break-word',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            verticalAlign: 'middle',
            lineClamp: '2'
          })}
        >
          <Link href={productDetailPageUrl}>
            {orderItem?.marketplaceProduct?.title}
          </Link>
        </h5>

        <div>
          <Accordion>
            <AccordionItem value={orderItem.id}>
              <AccordionItemTrigger
                size="sm"
                className={css({
                  gap: 'md',
                  justifyContent: 'flex-start'
                })}
                onClick={() => {
                  getOrderItem({ id: orderItem.id });
                }}
              >
                <AccordionItemIndicator size="sm" />
                Item Details
              </AccordionItemTrigger>

              <AccordionItemContent
                className={css({
                  py: '2',
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
                    maxH: '126px',
                    overflow: 'auto'
                  })}
                >
                  {orderItemDetailsLoading ? (
                    <div aria-busy>Loading...</div>
                  ) : null}
                  {normalizedCustomizations.map(
                    ({ displayTitle, displayValue }) => (
                      <ItemDetail
                        key={displayTitle}
                        displayTitle={displayTitle + ':'}
                        displayValue={displayValue}
                      />
                    )
                  )}
                </div>
              </AccordionItemContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className={css({ mt: 'auto' })}>
          <ProductMetaAttributes product={orderItem?.marketplaceProduct} />
        </div>
      </div>
    </div>
  );
}
