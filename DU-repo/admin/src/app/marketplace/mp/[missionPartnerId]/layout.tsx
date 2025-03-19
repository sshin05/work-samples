import type { Metadata } from 'next';
import { MarketplaceProviders } from '../../components/MarketplaceProviders/MarketplaceProviders';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      template: '%s | Categories & Vendors',
      default: 'Categories & Vendors'
    }
  };
}

export default async function CategoryListPageLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <MarketplaceProviders>{children}</MarketplaceProviders>;
}
