import type { CreateCohortState } from './CreateCohortProvider.types';

export const createCohortInitialState: CreateCohortState = {
  id: null,
  name: null,
  description: null,
  meetingDetails: null,
  meetingStartDate: null,
  meetingEndDate: null,
  environment: null,
  location: null,
  learners: [],
  libraryItems: [],
  validationError: null
};
