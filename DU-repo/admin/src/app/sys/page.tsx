import { Suspense } from 'react';
import Loading from './loading';
import { SysRootPage } from './components/SysRootPage/SysRootPage';

const LearnersPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SysRootPage />
    </Suspense>
  );
};

export default LearnersPage;
