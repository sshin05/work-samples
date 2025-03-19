import { ServerPageLoader } from '@/components_new/loaders/ServerPageLoader';
import { Suspense } from 'react';
import { DcwfPage } from './components/DcwfPage';

const Page = () => {
  return (
    <Suspense fallback={<ServerPageLoader header="DCWF" />}>
      <DcwfPage />
    </Suspense>
  );
};

export default Page;
