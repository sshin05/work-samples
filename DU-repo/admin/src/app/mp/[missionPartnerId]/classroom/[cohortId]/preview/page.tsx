import { Suspense } from 'react';
import Loading from './loading';
import { MpClassroomPreviewPage } from './components/MpClassroomPreviewPage/MpClassroomPreviewPage';

const ClassroomPreviewPage = () => {
  /// @TODO(Lyle): This page route may need to be excluded from middleware authorization filtering.

  return (
    <Suspense fallback={<Loading />}>
      <MpClassroomPreviewPage />
    </Suspense>
  );
};

export default ClassroomPreviewPage;
