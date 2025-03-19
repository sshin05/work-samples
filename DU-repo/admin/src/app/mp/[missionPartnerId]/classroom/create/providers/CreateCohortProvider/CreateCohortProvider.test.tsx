import { screen, render } from '@testing-library/react';
import {
  CreateCohortContext,
  CreateCohortProvider
} from './CreateCohortProvider';
import { useSQLMutation, useSQLQuery } from '@/app/api';
import { useContext, useEffect } from 'react';
import { CreateCohortStateReducerActionTypes } from './CreateCohortProvider.types';

jest.mock('@/app/api', () => {
  return {
    useSQLMutation: jest.fn().mockReturnValue({}),
    useSQLQuery: jest.fn().mockReturnValue({
      data: {}
    })
  };
});

describe('CreateCohortProvider', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    (useSQLQuery as jest.Mock).mockReturnValue({ data: {} });
    (useSQLMutation as jest.Mock).mockReturnValue({});
  });

  it('renders with default createCohortState', () => {
    const TestComponent = ({ expectedState }) => {
      const { createCohortState } = useContext(CreateCohortContext);

      expect(createCohortState).toEqual(expectedState);

      return <div>TestComponent</div>;
    };

    const expectedState = {
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

    render(
      <CreateCohortProvider>
        <TestComponent expectedState={expectedState} />
      </CreateCohortProvider>
    );

    expect(screen.getByText('TestComponent')).toBeInTheDocument();
  });

  const CohortDetailTestComponent = ({ expected }) => {
    const { cohortDetails } = useContext(CreateCohortContext);

    expect(cohortDetails).toEqual(expected);

    return <div>CohortDetailTestComponent</div>;
  };

  it('provides the cohort details', () => {
    (useSQLQuery as jest.Mock).mockReturnValueOnce({
      data: {
        mockCohortDetails: true
      },
      loading: true
    });
    (useSQLQuery as jest.Mock).mockReturnValueOnce({
      data: {
        records: [{ mockCohortMemberRecord: true }]
      },
      loading: true
    });

    const expected = {
      cohort: { mockCohortDetails: true },
      cohortMembers: [{ mockCohortMemberRecord: true }]
    };

    render(
      <CreateCohortProvider>
        <CohortDetailTestComponent expected={expected} />
      </CreateCohortProvider>
    );

    expect(screen.getByText('CohortDetailTestComponent')).toBeInTheDocument();
  });

  it('provides an empty array of cohort members when the request is unresolved', () => {
    (useSQLQuery as jest.Mock).mockReturnValueOnce({
      data: {
        mockCohortDetails: true
      },
      loading: true
    });

    const expected = {
      cohort: { mockCohortDetails: true },
      cohortMembers: []
    };

    render(
      <CreateCohortProvider>
        <CohortDetailTestComponent expected={expected} />
      </CreateCohortProvider>
    );

    expect(screen.getByText('CohortDetailTestComponent')).toBeInTheDocument();
  });

  test('a cohort is created when saved', () => {
    const mockCreateCohort = jest.fn();

    const TestComponent = () => {
      const expectedName = 'Mock Cohort Name Value';
      const { createCohortState, saveCohortState, updateCohortState } =
        useContext(CreateCohortContext);

      useEffect(() => {
        updateCohortState({
          type: CreateCohortStateReducerActionTypes.UPDATE_NAME,
          payload: expectedName
        });
      }, []);

      useEffect(() => {
        if (createCohortState.name) {
          saveCohortState();

          expect(mockCreateCohort).toHaveBeenCalledWith({
            name: expectedName,
            description: null
          });
        }
      }, [createCohortState.name]);

      return <div>TestComponent</div>;
    };

    (useSQLMutation as jest.Mock).mockReturnValue({
      data: {},
      mutation: mockCreateCohort
    });

    render(<TestComponent />, { wrapper: CreateCohortProvider });

    expect(screen.getByText('TestComponent')).toBeInTheDocument();
  });

  test('a cohort is updated when it already exists', () => {
    const mockUpdateCohort = jest.fn();

    const expectedCohortId = 'mock-cohort-id';
    const TestComponent = () => {
      const expectedCohortName = 'mock-cohort-name';

      const { createCohortState, saveCohortState, updateCohortState } =
        useContext(CreateCohortContext);

      useEffect(() => {
        updateCohortState({
          type: CreateCohortStateReducerActionTypes.SET_COHORT_ID,
          payload: expectedCohortId
        });

        updateCohortState({
          type: CreateCohortStateReducerActionTypes.UPDATE_NAME,
          payload: expectedCohortName
        });
      }, []);

      useEffect(() => {
        if (createCohortState.id && createCohortState.name) {
          saveCohortState();

          expect(mockUpdateCohort).toHaveBeenCalledWith(
            expect.objectContaining({
              id: expectedCohortId,
              name: expectedCohortName
            })
          );
        }
      }, [createCohortState.id, createCohortState.name]);

      return <div>TestComponent</div>;
    };

    (useSQLQuery as jest.Mock).mockReturnValue({
      data: {
        id: expectedCohortId
      },
      loading: true
    });
    (useSQLMutation as jest.Mock).mockReturnValue({
      data: {},
      mutation: mockUpdateCohort
    });

    render(<TestComponent />, { wrapper: CreateCohortProvider });

    expect(screen.getByText('TestComponent')).toBeInTheDocument();
  });
});
