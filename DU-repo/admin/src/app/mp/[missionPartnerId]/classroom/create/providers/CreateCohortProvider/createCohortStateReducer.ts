import {
  type CreateCohortReducerActions,
  type CreateCohortState,
  CreateCohortStateReducerActionTypes
} from './CreateCohortProvider.types';
import { createCohortInitialState } from './CreateCohortProvider.constants';

export const createCohortStateReducerInitialState: CreateCohortState = {
  ...createCohortInitialState
};

export const createCohortStateReducer = (
  state,
  action: CreateCohortReducerActions
) => {
  switch (action.type) {
    case CreateCohortStateReducerActionTypes.SYNC_COHORT_DATA:
      return {
        ...state,
        ...Object.keys(state).reduce((acc, key) => {
          if (action.payload.hasOwnProperty(key)) {
            acc[key] = action.payload[key];
          }
          return acc;
        }, {})
      };
    case CreateCohortStateReducerActionTypes.SYNC_COHORT_MEMBERS:
      return {
        ...state,
        learners: action.payload
      };
    case CreateCohortStateReducerActionTypes.SET_VALIDATION_ERROR:
      return {
        ...state,
        validationError: action.payload
      };
    case CreateCohortStateReducerActionTypes.SET_COHORT_ID:
      return {
        ...state,
        id: action.payload
      };
    case CreateCohortStateReducerActionTypes.UPDATE_NAME:
      return {
        ...state,
        name: action.payload
      };
    case CreateCohortStateReducerActionTypes.UPDATE_DESCRIPTION:
      return {
        ...state,
        description: action.payload
      };
    case CreateCohortStateReducerActionTypes.UPDATE_MEETING_START_DATE:
      return {
        ...state,
        meetingStartDate: action.payload
      };
    case CreateCohortStateReducerActionTypes.UPDATE_MEETING_END_DATE:
      return {
        ...state,
        meetingEndDate: action.payload
      };
    case CreateCohortStateReducerActionTypes.UPDATE_MEETING_DETAILS:
      return {
        ...state,
        meetingDetails: action.payload
      };
    case CreateCohortStateReducerActionTypes.UPDATE_ENVIRONMENT:
      return {
        ...state,
        environment: action.payload
      };
    case CreateCohortStateReducerActionTypes.UPDATE_LOCATION:
      return {
        ...state,
        location: action.payload
      };

    case CreateCohortStateReducerActionTypes.ADD_LEARNER:
      return {
        ...state,
        learners: Array.from(new Set([...state.learners, action.payload]))
      };
    case CreateCohortStateReducerActionTypes.UPDATE_LIBRARY_ITEMS:
      return {
        ...state,
        libraryItems: action.payload
      };
    case CreateCohortStateReducerActionTypes.UPDATE_COHORT:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
