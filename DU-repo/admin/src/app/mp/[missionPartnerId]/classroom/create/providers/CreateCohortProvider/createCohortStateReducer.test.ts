import type {
  CohortData,
  CohortMemberData
} from '../../../[cohortId]/cohort.types';
import {
  type CreateCohortReducerActions,
  CreateCohortStateInputValidationErrors,
  CreateCohortStateReducerActionTypes
} from './CreateCohortProvider.types';
import {
  createCohortStateReducer,
  createCohortStateReducerInitialState
} from './createCohortStateReducer';

describe('createCohortStateReducer', () => {
  it('should return the initial state when no action is provided', () => {
    const result = createCohortStateReducer(
      createCohortStateReducerInitialState,
      {} as CreateCohortReducerActions
    );

    expect(result).toEqual(createCohortStateReducerInitialState);
  });

  it('should handle SYNC_COHORT_DATA as expected', () => {
    const action: CreateCohortReducerActions = {
      type: CreateCohortStateReducerActionTypes.SYNC_COHORT_DATA,
      payload: {
        id: 'mock-cohort-id',
        name: 'Mock Cohort Name',
        description: 'Mock Cohort Description',
        meetingStartDate: '2023-10-01',
        meetingEndDate: '2023-10-02',
        environment: 'Mock Environment',
        location: 'Mock Location',
        meetingDetails: 'Mock Meeting Details',
        members: [],
        libraryItems: []
      } as unknown as CohortData
    };

    const result = createCohortStateReducer(
      createCohortStateReducerInitialState,
      action
    );

    expect(result).toEqual({
      ...createCohortStateReducerInitialState,
      id: 'mock-cohort-id',
      name: 'Mock Cohort Name',
      description: 'Mock Cohort Description',
      meetingStartDate: '2023-10-01',
      meetingEndDate: '2023-10-02',
      environment: 'Mock Environment',
      location: 'Mock Location',
      meetingDetails: 'Mock Meeting Details',
      libraryItems: []
    });
  });

  it('should handle SET_VALIDATION_ERROR as expected', () => {
    const action: CreateCohortReducerActions = {
      type: CreateCohortStateReducerActionTypes.SET_VALIDATION_ERROR,
      payload: CreateCohortStateInputValidationErrors.DUPLICATE_NAME
    };

    const result = createCohortStateReducer(
      createCohortStateReducerInitialState,
      action
    );

    expect(result).toEqual({
      ...createCohortStateReducerInitialState,
      validationError: CreateCohortStateInputValidationErrors.DUPLICATE_NAME
    });
  });

  it('should handle UPDATE_NAME as expected', () => {
    const action: CreateCohortReducerActions = {
      type: CreateCohortStateReducerActionTypes.UPDATE_NAME,
      payload: 'Update - Name'
    };

    const result = createCohortStateReducer(
      createCohortStateReducerInitialState,
      action
    );

    expect(result).toEqual({
      ...createCohortStateReducerInitialState,
      name: 'Update - Name'
    });
  });

  it('should handle UPDATE_DESCRIPTION as expected', () => {
    const action: CreateCohortReducerActions = {
      type: CreateCohortStateReducerActionTypes.UPDATE_DESCRIPTION,
      payload: 'Update - Description'
    };

    const result = createCohortStateReducer(
      createCohortStateReducerInitialState,
      action
    );

    expect(result).toEqual({
      ...createCohortStateReducerInitialState,
      description: 'Update - Description'
    });
  });

  it('should handle UPDATE_MEETING_START_DATE as expected', () => {
    const action: CreateCohortReducerActions = {
      type: CreateCohortStateReducerActionTypes.UPDATE_MEETING_START_DATE,
      payload: 'Update - Start Date'
    };

    const result = createCohortStateReducer(
      createCohortStateReducerInitialState,
      action
    );

    expect(result).toEqual({
      ...createCohortStateReducerInitialState,
      meetingStartDate: 'Update - Start Date'
    });
  });

  it('should handle UPDATE_MEETING_END_DATE as expected', () => {
    const action: CreateCohortReducerActions = {
      type: CreateCohortStateReducerActionTypes.UPDATE_MEETING_END_DATE,
      payload: 'Update - End Date'
    };

    const result = createCohortStateReducer(
      createCohortStateReducerInitialState,
      action
    );

    expect(result).toEqual({
      ...createCohortStateReducerInitialState,
      meetingEndDate: 'Update - End Date'
    });
  });

  it('should handle UPDATE_MEETING_DETAILS as expected', () => {
    const action: CreateCohortReducerActions = {
      type: CreateCohortStateReducerActionTypes.UPDATE_MEETING_DETAILS,
      payload: 'Update - Meeting Details'
    };

    const result = createCohortStateReducer(
      createCohortStateReducerInitialState,
      action
    );

    expect(result).toEqual({
      ...createCohortStateReducerInitialState,
      meetingDetails: 'Update - Meeting Details'
    });
  });

  it('should handle UPDATE_ENVIRONMENT as expected', () => {
    const action: CreateCohortReducerActions = {
      type: CreateCohortStateReducerActionTypes.UPDATE_ENVIRONMENT,
      payload: 'Update - Environment'
    };

    const result = createCohortStateReducer(
      createCohortStateReducerInitialState,
      action
    );

    expect(result).toEqual({
      ...createCohortStateReducerInitialState,
      environment: 'Update - Environment'
    });
  });

  it('should handle UPDATE_LOCATION as expected', () => {
    const action: CreateCohortReducerActions = {
      type: CreateCohortStateReducerActionTypes.UPDATE_LOCATION,
      payload: 'Update - Location'
    };

    const result = createCohortStateReducer(
      createCohortStateReducerInitialState,
      action
    );

    expect(result).toEqual({
      ...createCohortStateReducerInitialState,
      location: 'Update - Location'
    });
  });

  it('handles setting the cohort id', () => {
    const action: CreateCohortReducerActions = {
      type: CreateCohortStateReducerActionTypes.SET_COHORT_ID,
      payload: 'mock-cohort-id'
    };

    const result = createCohortStateReducer(
      createCohortStateReducerInitialState,
      action
    );

    expect(result.id).toBe('mock-cohort-id');
  });

  describe('ADD_LEARNER', () => {
    it('handles adding a single learner', () => {
      const mockLearner = {
        firstName: 'Mock Learner 0',
        email: 'mockLearner@mockLearnerEmail.com'
      } as CohortMemberData;

      const action: CreateCohortReducerActions = {
        type: CreateCohortStateReducerActionTypes.ADD_LEARNER,
        payload: mockLearner
      };

      const { learners } = createCohortStateReducer(
        createCohortStateReducerInitialState,
        action
      );

      expect(learners).toEqual([mockLearner]);
    });

    it('handles adding multiple learners', () => {
      const mockLearner_0 = {
        firstName: 'Mock Learner 0'
      } as CohortMemberData;

      const mockLearner_1 = {
        firstName: 'Mock Learner 1'
      } as CohortMemberData;

      const mockLearner_2 = {
        firstName: 'Mock Learner 2'
      } as CohortMemberData;

      let reducerState = createCohortStateReducerInitialState;

      [mockLearner_0, mockLearner_1, mockLearner_2].forEach(mockLearner => {
        const action: CreateCohortReducerActions = {
          type: CreateCohortStateReducerActionTypes.ADD_LEARNER,
          payload: mockLearner
        };

        reducerState = createCohortStateReducer(reducerState, action);
      });

      expect(reducerState.learners).toEqual([
        mockLearner_0,
        mockLearner_1,
        mockLearner_2
      ]);
    });
    it('should handle UPDATE_LIBRARY_ITEMS as expected', () => {
      const action1: CreateCohortReducerActions = {
        type: CreateCohortStateReducerActionTypes.UPDATE_LIBRARY_ITEMS,
        payload: [
          {
            id: 'test-id-1',
            sourceLocation: 'http://example.com',
            type: 'Document',
            name: 'Mock Name',
            _idx: 0,
            _createdAt: '',
            _updatedAt: '',
            _table: '',
            size: '',
            path: '',
            sourceType: 'LINK',
            version: '',
            displayName: ''
          }
        ]
      };

      const result1 = createCohortStateReducer(
        createCohortStateReducerInitialState,
        action1
      );

      expect(result1).toEqual({
        ...createCohortStateReducerInitialState,
        libraryItems: [
          {
            id: 'test-id-1',
            sourceLocation: 'http://example.com',
            type: 'Document',
            name: 'Mock Name',
            _idx: 0,
            _createdAt: '',
            _updatedAt: '',
            _table: '',
            size: '',
            path: '',
            sourceType: 'LINK',
            version: '',
            displayName: ''
          }
        ]
      });

      const action2: CreateCohortReducerActions = {
        type: CreateCohortStateReducerActionTypes.UPDATE_LIBRARY_ITEMS,
        payload: [
          {
            id: 'test-id-1',
            sourceLocation: 'http://example.com',
            type: 'Document',
            name: 'Mock Name',
            _idx: 0,
            _createdAt: '',
            _updatedAt: '',
            _table: '',
            size: '',
            path: '',
            sourceType: 'LINK',
            version: '',
            displayName: ''
          },
          {
            id: 'test-id-2',
            sourceLocation: 'http://example.com',
            type: 'Document',
            name: 'Mock Name',
            _idx: 0,
            _createdAt: '',
            _updatedAt: '',
            _table: '',
            size: '',
            path: '',
            sourceType: 'LINK',
            version: '',
            displayName: ''
          }
        ]
      };

      const result2 = createCohortStateReducer(result1, action2);

      expect(result2).toEqual({
        ...createCohortStateReducerInitialState,
        libraryItems: [
          {
            id: 'test-id-1',
            sourceLocation: 'http://example.com',
            type: 'Document',
            name: 'Mock Name',
            _idx: 0,
            _createdAt: '',
            _updatedAt: '',
            _table: '',
            size: '',
            path: '',
            sourceType: 'LINK',
            version: '',
            displayName: ''
          },
          {
            id: 'test-id-2',
            sourceLocation: 'http://example.com',
            type: 'Document',
            name: 'Mock Name',
            _idx: 0,
            _createdAt: '',
            _updatedAt: '',
            _table: '',
            size: '',
            path: '',
            sourceType: 'LINK',
            version: '',
            displayName: ''
          }
        ]
      });
    });
  });
});
