'use client';
import { CreateCohortProvider } from '../providers/CreateCohortProvider/CreateCohortProvider';
import { CreateCohortPage } from './pages/CreateCohortPage/CreateCohortPage';

export const CreateCohortPageWrapper = () => (
  <CreateCohortProvider>
    <CreateCohortPage />
  </CreateCohortProvider>
);
