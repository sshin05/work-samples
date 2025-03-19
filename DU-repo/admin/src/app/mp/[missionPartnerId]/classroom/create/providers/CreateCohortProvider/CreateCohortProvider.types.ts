import type { Dispatch } from 'react';
import type {
  CohortData,
  CohortMemberData,
  LibraryItem
} from '../../../[cohortId]/cohort.types';

/** Application state for user progression through cohort creation process */

export type Environment = 'InPerson' | 'Virtual' | 'Hybrid';

export type CreateCohortState = {
  id: string | null;
  name: string | null;
  description: string | null;
  meetingStartDate: string | null;
  meetingEndDate: string | null;
  environment: Environment | null;
  location?: string | null;
  meetingDetails?: string | null;
  libraryItems?: LibraryItem[] | null;
  validationError?: CreateCohortStateInputValidationErrors | null;
  learners: CohortMemberData[];
};

export type CreateCohortInitialContextType = {
  /** In-App state management object for create cohort flow */
  createCohortState: CreateCohortState;
  /** Update createCohortState in application state */
  updateCohortState: Dispatch<CreateCohortReducerActions>;
  /** Persist createCohortState in database */
  saveCohortState: () => void;
  updateAndSaveCohortState: (updatedCohort: CohortData) => Promise<void>;
  cohortDetails: {
    cohort: CohortData;
    cohortMembers: CohortMemberData[];
  };
  isLoadingCohort: boolean;
};

export enum CreateCohortStateReducerActionTypes {
  SET_COHORT_ID = 'SET_COHORT_ID',
  ADD_LEARNER = 'ADD_LEARNER',
  UPDATE_NAME = 'UPDATE_NAME',
  UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION',
  UPDATE_MEETING_START_DATE = 'UPDATE_MEETING_START_DATE',
  UPDATE_MEETING_END_DATE = 'UPDATE_MEETING_END_DATE',
  UPDATE_ENVIRONMENT = 'UPDATE_ENVIRONMENT',
  UPDATE_LOCATION = 'UPDATE_LOCATION',
  UPDATE_MEETING_DETAILS = 'UPDATE_MEETING_DETAILS',
  UPDATE_LIBRARY_ITEMS = 'UPDATE_LIBRARY_ITEMS',
  SET_VALIDATION_ERROR = 'SET_VALIDATION_ERROR',
  SYNC_COHORT_DATA = 'SYNC_COHORT_DATA',
  SYNC_COHORT_MEMBERS = 'SYNC_COHORT_MEMBERS',
  UPDATE_COHORT = 'UPDATE_COHORT'
}

export enum CreateCohortStateInputValidationErrors {
  DUPLICATE_NAME = 'DUPLICATE_NAME',
  INVALID_NAME = 'INVALID_NAME',
  MISSING_NAME = 'MISSING_NAME',
  INVALID_MEETING_START_DATE = 'INVALID_MEETING_START_DATE',
  INVALID_MEETING_END_DATE = 'INVALID_MEETING_END_DATE',
  MISSING_LOCATION = 'MISSING_LOCATION',
  MISSING_LEARNERS = 'MISSING_LEARNERS'
}

export type CreateCohortReducerActions =
  | {
      type: CreateCohortStateReducerActionTypes.SYNC_COHORT_DATA;
      payload: CohortData;
    }
  | {
      type: CreateCohortStateReducerActionTypes.SYNC_COHORT_MEMBERS;
      payload: CohortMemberData[];
    }
  | {
      type: CreateCohortStateReducerActionTypes.SET_COHORT_ID;
      payload: string | null;
    }
  | {
      type: CreateCohortStateReducerActionTypes.UPDATE_NAME;
      payload: string | null;
    }
  | {
      type: CreateCohortStateReducerActionTypes.UPDATE_DESCRIPTION;
      payload: string | null;
    }
  | {
      type: CreateCohortStateReducerActionTypes.UPDATE_MEETING_START_DATE;
      payload: string | null;
    }
  | {
      type: CreateCohortStateReducerActionTypes.UPDATE_MEETING_END_DATE;
      payload: string | null;
    }
  | {
      type: CreateCohortStateReducerActionTypes.UPDATE_ENVIRONMENT;
      payload: string | null;
    }
  | {
      type: CreateCohortStateReducerActionTypes.UPDATE_LOCATION;
      payload: string | null;
    }
  | {
      type: CreateCohortStateReducerActionTypes.UPDATE_MEETING_DETAILS;
      payload: string | null;
    }
  | {
      type: CreateCohortStateReducerActionTypes.UPDATE_LIBRARY_ITEMS;
      payload: LibraryItem[] | null;
    }
  | {
      type: CreateCohortStateReducerActionTypes.SET_VALIDATION_ERROR;
      payload: CreateCohortStateInputValidationErrors;
    }
  | {
      type: CreateCohortStateReducerActionTypes.ADD_LEARNER;
      payload: CohortMemberData;
    }
  | {
      type: CreateCohortStateReducerActionTypes.UPDATE_COHORT;
      payload: CohortData;
    };
