import React from 'react';
import type { UseMarketplaceProps } from '@/app/marketplace/hooks/useMarketplace/useMarketplace';

export const MarketplaceContext = React.createContext<UseMarketplaceProps>({
  onSideDrawerClose: () => {},
  onSideDrawerOpen: () => {},
  marketplaceOpenSideDrawerTitle: null
});
