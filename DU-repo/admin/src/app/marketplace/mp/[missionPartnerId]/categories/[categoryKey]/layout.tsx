import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    /// @TODO(Lyle): Should we make the title dynamic based on Category?
    title: {
      template: '%s | Categories',
      default: 'Category'
    }
  };
}

export default async function VendorLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
