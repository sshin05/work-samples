'use client';
import { useRouteParams } from '@/hooks/useRouteParams';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { css } from '@cerberus/styled-system/css';
import { circle, hstack } from '@cerberus/styled-system/patterns';
import Link from 'next/link';
import type { JSX } from 'react';
// import { useState } from 'react';

/**
 * Renders an Orders link with notification indicator.
 *
 * This component conditionally renders a notification indicator if there
 * are orders ready for payment.
 *
 * @returns {JSX.Element}
 */
export const TopNavOrders = (): JSX.Element => {
  const { missionPartnerId } = useRouteParams();
  // const [orders, setOrders] = useState([]);

  /// @TODO(Lyle): This value should be based on orders that are "Ready for Payment"
  // [Source](https://repo.bespin.cce.af.mil/bespin/products/digital-u/licensed/digital-university/-/issues/5764)
  // Acceptance Criteria 2.4.1
  const hasOrdersReadyForPayment = true;

  return (
    <div className={hstack({ gap: '0' })}>
      {hasOrdersReadyForPayment && (
        <div
          role="presentation"
          className={circle({ size: '3', bg: 'action.bg.initial' })}
        ></div>
      )}
      <Link
        href={getRouteUrl(
          routeGenerators.MarketplaceOrders({ missionPartnerId })
        )}
        className={css({
          ml: '2px',
          px: '1',
          py: '3',
          _hover: {
            color: 'secondaryAction.navigation.hover'
          }
        })}
      >
        Orders
      </Link>
    </div>
  );
};
