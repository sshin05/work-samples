import { render, screen, fireEvent } from '@@/test-utils';
import { NameInput } from './NameInput';
import {
  CreateCohortContext,
  initialContext
} from '../../../../../providers/CreateCohortProvider/CreateCohortProvider';
import {
  type CreateCohortState,
  CreateCohortStateInputValidationErrors,
  CreateCohortStateReducerActionTypes
} from '../../../../../providers/CreateCohortProvider/CreateCohortProvider.types';

describe('NameInput', () => {
  const mockDispatchMethod = jest.fn();

  const renderWithContext = (state: CreateCohortState) => {
    render(
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
        <NameInput />
      </CreateCohortContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const getInitialCreateCohortState = (): CreateCohortState => {
    return { ...initialContext.createCohortState };
  };

  it('should render', () => {
    renderWithContext(getInitialCreateCohortState());

    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  it('should not display error messages when validationError is null', () => {
    renderWithContext(getInitialCreateCohortState());

    expect(
      screen.queryByText('A cohort name is required.')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('This cohort name is already in use.')
    ).not.toBeInTheDocument();
  });

  it('should display unique message when missing the cohort name', () => {
    renderWithContext({
      ...getInitialCreateCohortState(),
      name: '',
      validationError: CreateCohortStateInputValidationErrors.MISSING_NAME
    });

    expect(screen.getByText('A cohort name is required.')).toBeInTheDocument();
  });

  it('should display a unique message when the name is a duplicate', () => {
    renderWithContext({
      ...getInitialCreateCohortState(),
      name: 'Duplicate Name',
      validationError: CreateCohortStateInputValidationErrors.DUPLICATE_NAME
    });

    expect(screen.getByDisplayValue('Duplicate Name')).toBeInTheDocument();

    expect(
      screen.getByText('This cohort name is already in use.')
    ).toBeInTheDocument();
  });

  it('should call updateCohortState with the correct action when input value changes', () => {
    renderWithContext({
      ...getInitialCreateCohortState(),
      name: 'Initial Name'
    });

    const nameInput = screen.getByDisplayValue('Initial Name');
    fireEvent.change(nameInput, { target: { value: 'New Cohort Name' } });

    const expectedAction = {
      type: CreateCohortStateReducerActionTypes.UPDATE_NAME,
      payload: 'New Cohort Name'
    };

    expect(mockDispatchMethod).toHaveBeenCalledWith(expectedAction);
  });

  const INVALID_NAMES = {
    EMPTY: '',
    DUPLICATE: 'Duplicate Name',
    INVALID_CHARACTER: 'Invalid!!',
    TOO_LONG:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse'
  };

  it.each([
    {
      initialNameValue: INVALID_NAMES.EMPTY,
      validationError: CreateCohortStateInputValidationErrors.MISSING_NAME
    },
    {
      initialNameValue: INVALID_NAMES.DUPLICATE,
      validationError: CreateCohortStateInputValidationErrors.DUPLICATE_NAME
    },
    {
      initialNameValue: INVALID_NAMES.INVALID_CHARACTER,
      validationError: CreateCohortStateInputValidationErrors.INVALID_NAME
    },
    {
      initialNameValue: INVALID_NAMES.TOO_LONG,
      validationError: CreateCohortStateInputValidationErrors.INVALID_NAME
    }
  ])(
    'should clear validation error when input value changes and there is an error',
    ({ initialNameValue, validationError }) => {
      renderWithContext({
        ...getInitialCreateCohortState(),
        name: initialNameValue,
        validationError: validationError
      });

      const nameInput = screen.getByDisplayValue(initialNameValue);
      fireEvent.change(nameInput, { target: { value: 'New Cohort Name' } });

      expect(mockDispatchMethod).toHaveBeenCalledWith({
        type: CreateCohortStateReducerActionTypes.UPDATE_NAME,
        payload: 'New Cohort Name'
      });

      expect(mockDispatchMethod).toHaveBeenCalledWith({
        type: CreateCohortStateReducerActionTypes.SET_VALIDATION_ERROR,
        payload: null
      });
    }
  );
});
