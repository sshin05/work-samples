import React, { useState } from 'react';
import { MarketplaceContext } from './MarketplaceContext';
import { useSQLQuery } from '@/app/api';
import { sqlGetMarketplaceCart } from '@/app/api/marketplace/carts';
import { useRouteParams } from '@/hooks/useRouteParams';
import type { UseMarketplaceProps } from '@/app/marketplace/hooks/useMarketplace/useMarketplace';

type MarketplaceProviderProps = {
  children: React.ReactNode;
};

/**
 * MarketplaceProvider provides a centralized state store for shared application state
 * across Marketplace pages.
 *
 * Recommendation: split this out into separate providers as warranted by future complexity.
 */
export const MarketplaceProvider = ({ children }: MarketplaceProviderProps) => {
  const { missionPartnerId } = useRouteParams();
  const getMarketplaceCart = useSQLQuery(sqlGetMarketplaceCart, {
    options: {
      missionPartnerId
    }
  });

  const [openSideDrawerTitle, setSideDrawerOpenTitle] = useState<string | null>(
    null
  );

  const cartData: UseMarketplaceProps = {
    marketplaceCartItems: {
      ...getMarketplaceCart
    },
    onSideDrawerOpen: (drawerTitle: string) => {
      setSideDrawerOpenTitle(drawerTitle);
    },
    onSideDrawerClose: (drawerTitle: string) => {
      if (drawerTitle === openSideDrawerTitle) {
        setSideDrawerOpenTitle(null);
      }
    },
    marketplaceOpenSideDrawerTitle: openSideDrawerTitle
  };

  return (
    <MarketplaceContext.Provider value={cartData}>
      {children}
    </MarketplaceContext.Provider>
  );
};
