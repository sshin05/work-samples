import { renderV3, screen, fireEvent } from '@@/test-utils';
import { AdditionalInformationTextArea } from './AdditionalInformationTextArea';
import {
  CreateCohortContext,
  initialContext
} from '../../../../../providers/CreateCohortProvider/CreateCohortProvider';
import {
  type CreateCohortState,
  CreateCohortStateReducerActionTypes
} from '../../../../../providers/CreateCohortProvider/CreateCohortProvider.types';

describe('DescriptionTextArea', () => {
  const mockDispatchMethod = jest.fn();

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
        <AdditionalInformationTextArea />
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

    expect(
      screen.getByText('Additional Information (optional)')
    ).toBeInTheDocument();
  });

  it('should call updateCohortState with the correct action when input value changes', () => {
    renderWithContext({
      ...getInitialCreateCohortState(),
      meetingDetails: 'Meeting Details'
    });

    const AdditionalInformationTextArea =
      screen.getByDisplayValue('Meeting Details');
    fireEvent.change(AdditionalInformationTextArea, {
      target: { value: 'test test' }
    });

    const expectedAction = {
      type: CreateCohortStateReducerActionTypes.UPDATE_MEETING_DETAILS,
      payload: 'test test'
    };

    expect(mockDispatchMethod).toHaveBeenCalledWith(expectedAction);
  });
});
