import { Suspense } from 'react';
import type { Metadata } from 'next';
import { CreateCohortPageWrapper } from './components/CreateCohortPageWrapper';
import CreateCohortLoadingView from './loading';

export const metadata: Metadata = {
  title: {
    template: '%s | Create Cohort',
    default: 'Create Cohort'
  }
};

const Page = () => {
  return (
    <Suspense fallback={<CreateCohortLoadingView />}>
      <CreateCohortPageWrapper />
    </Suspense>
  );
};

export default Page;
