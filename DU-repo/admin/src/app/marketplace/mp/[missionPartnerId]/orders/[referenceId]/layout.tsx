import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      template: '%s',
      default: 'Order Details'
    }
  };
}

export default async function OrderDetailsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
