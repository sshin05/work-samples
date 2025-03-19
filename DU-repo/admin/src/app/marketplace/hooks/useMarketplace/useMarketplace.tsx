import { useContext } from 'react';
import { MarketplaceContext } from '@/app/marketplace/providers/Marketplace/MarketplaceContext';
import type { UseGetUser } from '@/api/user/useGetUser';

export type UseMarketplaceProps = {
  marketplaceCartItems?: any;

  // Awaited<
  //   ReturnType<typeof sqlGetMarketplaceCart>
  // >['_serviceData'];

  /** Wraps the legacy GraphQL getUser query, allowing the request to be cached on the client.
   * This prevents multiple flashes of user loading state in the Marketplace's top nav.
   * When the user queries are ported to the `useSqlQuery` interface, this field can be deprecated */
  marketplaceUser?: UseGetUser;

  /** Updates marketplaceOpenSideDrawerTitle, allowing multiple SideDrawer component instances to exist and open on a
   * page without stacking on top of each other. */
  onSideDrawerOpen: (drawerTitle: string) => void;
  onSideDrawerClose: (drawerTitle: string) => void;
  /** Title allows other SideDrawer component instances to close when another drawer opens
   * > "When one drawer closes, another drawer opens" */
  marketplaceOpenSideDrawerTitle: string;
};

export const useMarketplace = (): UseMarketplaceProps => {
  return useContext(MarketplaceContext);
};
