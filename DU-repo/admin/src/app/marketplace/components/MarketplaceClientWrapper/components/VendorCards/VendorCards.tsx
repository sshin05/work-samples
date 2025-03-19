'use client';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { CategoryListCard } from '../CategoryListCard/CategoryListCard';

import type { JSX } from 'react';

// TODO: Add types from the API

/**
 * Renders a list of vendor cards.
 *
 * @returns {JSX.Element[]}
 *
 * @example
 * <VendorCards
 *   missionPartnerId="partner-123"
 *   vendors={[
 *     { id: 'v1', name: 'V1', description: 'V1 desc', uniqueTag: 'v1tag', logoUrl: 'https://example.com/1.png' },
 *     { id: 'v2', name: 'V2', description: 'V2 desc', uniqueTag: 'v2tag', logoUrl: 'https://example.com/2.png' }
 *   ]}
 * />
 */
export function VendorCards({ missionPartnerId, vendors }): JSX.Element[] {
  return vendors?.map(vendor => (
    <CategoryListCard
      key={vendor.id}
      title={vendor.name}
      iconUrl={vendor.logoPath}
      description={vendor.shortDescription}
      href={getRouteUrl(
        routeGenerators.MarketplaceVendor({
          missionPartnerId,
          uniqueTag: vendor.uniqueTag
        })
      )}
      /// @TODO(Lyle): App needs to be configured to allow image hosts.
      // iconUrl={vendor.logoPath}
    />
  ));
}
