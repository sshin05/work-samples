import { Suspense } from 'react';
import Loading from './loading';
import { MpVendorDetailPage } from './components/MpVendorDetailPage';

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MpVendorDetailPage />
    </Suspense>
  );
};

export default Page;
