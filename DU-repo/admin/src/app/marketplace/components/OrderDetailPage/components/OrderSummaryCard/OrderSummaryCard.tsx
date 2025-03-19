'use client';
import { css } from '@cerberus/styled-system/css';
import { formatDollars } from '@/utils/format-number';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import type { sqlGetMarketplaceOrder } from '@/app/api/marketplace/orders';

import type { JSX } from 'react';

type OrderSummaryCardProps = {
  order?: ReturnType<typeof sqlGetMarketplaceOrder>['_serviceData'];
};

function getPaymentMethodString(
  paymentMethods: OrderSummaryCardProps['order']['paymentMethods']
) {
  const methodMap = {
    CREDIT_CARD: 'Credit Card',
    TOKENS: 'Tokens',
    CONTRACT: 'Contract'
  };
  if (!paymentMethods || paymentMethods.length === 0) {
    return 'N/A';
  }
  return paymentMethods.map(method => methodMap[method]).join('/');
}

export function OrderSummaryCard({
  order
}: OrderSummaryCardProps): JSX.Element {
  const orderTotalPrice = order?.totalPrice || order?.totalPaid;
  const orderTotalTokens = order?.totalTokens || order?.totalPaidTokens;

  return orderTotalPrice && orderTotalTokens ? (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        mt: '3.75rem',
        bg: 'page.surface.200',
        px: '6',
        py: '6',
        border: '1px solid #000',
        alignSelf: 'stretch',
        gap: '2rem',
        minWidth: '380px'
      })}
    >
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between'
        })}
      >
        <h5
          className={css({
            textStyle: 'h6'
          })}
        >
          Order Summary
        </h5>
        <div className={css({ textAlign: 'right' })}>
          <h5
            className={css({
              textStyle: 'h6'
            })}
          >
            {formatDollars(orderTotalPrice)}
          </h5>
          <div className={css({ textStyle: 'label-sm' })}>
            <p>{orderTotalTokens} tokens</p>
            {orderTotalTokens > 0 ? (
              <p>(1 token x ${orderTotalPrice / orderTotalTokens})</p>
            ) : null}
          </div>
        </div>
      </div>
      {order?.totalPrice ? (
        <div className={css({ textStyle: 'body-sm' })}>
          Only items ready for payment are included in the summary.
        </div>
      ) : null}
      {order?.totalPaid ? (
        <div>
          <div
            className={css({
              textStyle: 'body-sm',
              display: 'flex',
              justifyContent: 'space-between',
              mb: '2'
            })}
          >
            <p>Payment Method:</p>
            <p>{getPaymentMethodString(order.paymentMethods)}</p>
          </div>
          <div
            className={css({
              textStyle: 'body-sm',
              display: 'flex',
              justifyContent: 'space-between'
            })}
          >
            <p>Payment Date:</p>
            <p>{abbreviatedDayDate(order.mostRecentPaymentDate)}</p>
          </div>
        </div>
      ) : null}
    </div>
  ) : null;
}
