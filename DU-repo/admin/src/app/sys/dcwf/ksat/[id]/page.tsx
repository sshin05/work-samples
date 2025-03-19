'use client';
import { ServerPageLoader } from '@/components_new/loaders/ServerPageLoader';
import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { KsatDetailsPage } from '../components/KsatDetailsPage';

const Page = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <Suspense fallback={<ServerPageLoader header="KSAT" />}>
      <KsatDetailsPage ksatId={id} />
    </Suspense>
  );
};

export default Page;
