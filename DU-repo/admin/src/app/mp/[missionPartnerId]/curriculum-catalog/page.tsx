import { Suspense } from 'react';
import Loading from './loading';
import { MpCurriculumCatalogPage } from './components/MpCurriculumCatalogPage';

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MpCurriculumCatalogPage />
    </Suspense>
  );
};

export default Page;
