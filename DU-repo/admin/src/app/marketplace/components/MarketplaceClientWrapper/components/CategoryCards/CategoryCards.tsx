'use client';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { CategoryListCard } from '../CategoryListCard/CategoryListCard';

import type { JSX } from 'react';

/// @TODO(Lyle): Use proper type when available ../codegen/graphql.
export type MarketplaceCategory = {
  key: string;
  name: string;
  description: string;
};

type Props = {
  /** The ID of the mission partner. */
  missionPartnerId: string;
  /** An array of categories to display as cards. */
  categories: Array<MarketplaceCategory>;
};

/**
 * Renders a list of category cards.
 *
 * @returns {JSX.Element[]}
 *
 * @example
 * <CategoryCards
 *   missionPartnerId="partner-123"
 *   categories={[
 *     { id: 'cat-1', name: 'Category 1', description: 'Description 1' },
 *     { id: 'cat-2', name: 'Category 2', description: 'Description 2' }
 *   ]}
 * />
 */
export function CategoryCards({
  missionPartnerId,
  categories
}: Props): JSX.Element[] {
  return categories?.map(category => (
    <CategoryListCard
      key={category.key}
      title={category.name}
      description={category.description}
      href={getRouteUrl(
        routeGenerators.MarketplaceCategory({
          missionPartnerId,
          categoryKey: category.key
        })
      )}
    />
  ));
}
