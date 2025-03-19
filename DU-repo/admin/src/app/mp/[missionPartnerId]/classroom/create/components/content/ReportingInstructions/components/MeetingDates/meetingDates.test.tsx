import { renderV3, screen, fireEvent } from '@@/test-utils';
import { MeetingDates } from './MeetingDates';
import {
  CreateCohortContext,
  initialContext
} from '../../../../../providers/CreateCohortProvider/CreateCohortProvider';
import {
  type CreateCohortState,
  CreateCohortStateInputValidationErrors,
  CreateCohortStateReducerActionTypes
} from '../../../../../providers/CreateCohortProvider/CreateCohortProvider.types';
import dayjs from 'dayjs';

describe('MeetingDates Component', () => {
  const today = dayjs().format('YYYY-MM-DD');
  const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');
  const mockDispatchMethod = jest.fn();
  const expectedActionStartDate = {
    type: CreateCohortStateReducerActionTypes.UPDATE_MEETING_START_DATE,
    payload: today
  };
  const expectedActionEndDate = {
    type: CreateCohortStateReducerActionTypes.UPDATE_MEETING_END_DATE,
    payload: tomorrow
  };
  const expectedActionClearValidationError = {
    type: CreateCohortStateReducerActionTypes.SET_VALIDATION_ERROR,
    payload: null
  };

  const renderWithContext = (state: CreateCohortState) => {
    renderV3(
      <CreateCohortContext.Provider
        value={{
          createCohortState: state,
          updateCohortState: mockDispatchMethod,
          saveCohortState: jest.fn(),
          updateAndSaveCohortState: jest.fn(),
          cohortDetails: {
            cohort: null,
            cohortMembers: []
          },
          isLoadingCohort: false
        }}
      >
        <MeetingDates />
      </CreateCohortContext.Provider>
    );
  };

  const getInitialCreateCohortState = (): CreateCohortState => {
    return { ...initialContext.createCohortState };
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders', () => {
    renderWithContext({
      ...getInitialCreateCohortState(),
      validationError: null,
      meetingStartDate: '',
      meetingEndDate: ''
    });

    expect(screen.getByLabelText('Start date')).toBeInTheDocument();
    expect(screen.getByLabelText('End date')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Cohorts begin at 9:00 CST on their start date, and conclude at 23:59 CST on their end date.'
      )
    ).toBeInTheDocument();
  });

  it('updates state on input change', () => {
    renderWithContext({
      ...getInitialCreateCohortState(),
      validationError: null,
      meetingStartDate: '',
      meetingEndDate: ''
    });

    const startDateInput = screen.getByLabelText('Start date');
    const endDateInput = screen.getByLabelText('End date');

    fireEvent.change(startDateInput, {
      target: { value: today, name: 'meetingStartDate' }
    });
    fireEvent.change(endDateInput, {
      target: {
        value: tomorrow,
        name: 'meetingEndDate'
      }
    });

    expect(mockDispatchMethod).toHaveBeenCalledWith(expectedActionStartDate);
    expect(mockDispatchMethod).toHaveBeenCalledWith(expectedActionEndDate);
  });

  it('displays validation error message', () => {
    renderWithContext({
      ...getInitialCreateCohortState(),
      validationError:
        CreateCohortStateInputValidationErrors.INVALID_MEETING_START_DATE,
      meetingStartDate: '',
      meetingEndDate: ''
    });

    expect(
      screen.getByText('A valid start and end date are required.')
    ).toBeInTheDocument();
  });

  it('clears validation error on valid input', () => {
    renderWithContext({
      ...getInitialCreateCohortState(),
      validationError:
        CreateCohortStateInputValidationErrors.INVALID_MEETING_START_DATE,
      meetingStartDate: '',
      meetingEndDate: ''
    });

    const startDateInput = screen.getByLabelText('Start date');

    fireEvent.change(startDateInput, {
      target: { value: today, name: 'meetingStartDate' }
    });

    expect(mockDispatchMethod).toHaveBeenCalledWith(expectedActionStartDate);
    expect(mockDispatchMethod).toHaveBeenCalledWith(
      expectedActionClearValidationError
    );
  });
});
