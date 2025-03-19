import { Suspense } from 'react';
import { ServerPageLoader } from '@/components_new/loaders/ServerPageLoader';
import { ManualItemsPage } from './components/ManualItemsPage';

const Page = () => {
  return (
    <Suspense fallback={<ServerPageLoader header="Manual Items" />}>
      <ManualItemsPage />
    </Suspense>
  );
};

export default Page;
