'use client';

import { MarketplaceProvider } from '../../providers/Marketplace/MarketplaceProvider';

type MarketplaceProviders = {
  children: React.ReactNode;
};

export const MarketplaceProviders = ({ children }: MarketplaceProviders) => {
  return <MarketplaceProvider>{children}</MarketplaceProvider>;
};
