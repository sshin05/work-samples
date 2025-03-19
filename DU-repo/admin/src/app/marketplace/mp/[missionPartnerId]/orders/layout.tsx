import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      template: '%s',
      default: 'Orders'
    }
  };
}

export default async function OrdersLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
