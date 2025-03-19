import { Suspense } from 'react';
import type { Metadata } from 'next';
import Loading from '../../loading';
import { CreateCohortPageWrapper } from '../components/CreateCohortPageWrapper';

export const metadata: Metadata = {
  title: {
    template: '%s | Create Cohort',
    default: 'Create Cohort'
  }
};

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CreateCohortPageWrapper />
    </Suspense>
  );
};

export default Page;
