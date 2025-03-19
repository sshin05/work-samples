import { Suspense } from 'react';
import Loading from './loading';
import { MpClassroomPage } from './components/MpClassroomPage/MpClassroomPage';

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MpClassroomPage />
    </Suspense>
  );
};

export default Page;
