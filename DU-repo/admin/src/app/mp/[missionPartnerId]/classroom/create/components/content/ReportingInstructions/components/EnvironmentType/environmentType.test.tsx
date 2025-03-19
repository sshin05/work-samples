import { renderV3, screen, fireEvent } from '@@/test-utils';
import { EnvironmentType } from './EnvironmentType';
import {
  CreateCohortContext,
  initialContext
} from '../../../../../providers/CreateCohortProvider/CreateCohortProvider';
import {
  type CreateCohortState,
  CreateCohortStateReducerActionTypes
} from '../../../../../providers/CreateCohortProvider/CreateCohortProvider.types';

jest.mock('./components/MeetingLocation', () => ({
  MeetingLocation: () => <div>MeetingLocation</div>
}));

describe('EnvironmentType', () => {
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
        <EnvironmentType />
      </CreateCohortContext.Provider>
    );
  };

  const getInitialCreateCohortState = (): CreateCohortState => {
    return { ...initialContext.createCohortState };
  };

  describe('rendering', () => {
    it('renders', () => {
      renderWithContext({
        ...getInitialCreateCohortState(),
        environment: 'Virtual'
      });
      expect(screen.getByText('Where is it located?')).toBeInTheDocument();
      expect(screen.getByLabelText('Virtual')).toBeInTheDocument();
      expect(screen.getByLabelText('In-person')).toBeInTheDocument();
    });

    it('checks the correct radio button based on context state - Virtual', () => {
      renderWithContext({
        ...getInitialCreateCohortState(),
        environment: 'Virtual'
      });
      expect(screen.getByLabelText('Virtual')).toBeChecked();
      expect(screen.getByLabelText('In-person')).not.toBeChecked();
    });

    it('checks the correct radio button based on context state - InPerson', () => {
      renderWithContext({
        ...getInitialCreateCohortState(),
        environment: 'InPerson'
      });
      expect(screen.getByLabelText('Virtual')).not.toBeChecked();
      expect(screen.getByLabelText('In-person')).toBeChecked();
    });

    // Put this back in when Location field is implemented
    // it('renders the MeetingLocation when environemnt is InPerson', () => {
    //   renderWithContext({
    //     ...getInitialCreateCohortState(),
    //     environment: 'InPerson'
    //   });

    //   expect(screen.getByText('MeetingLocation')).toBeInTheDocument();
    // });

    it('does not render MeetingLocation when environment is Virtual', () => {
      renderWithContext({
        ...getInitialCreateCohortState(),
        environment: 'Virtual'
      });
      expect(screen.queryByText('MeetingLocation')).not.toBeInTheDocument();
    });
  });

  describe('updating context', () => {
    it('calls updateCohortState with correct payload when radio button is changed', () => {
      renderWithContext({
        ...getInitialCreateCohortState(),
        environment: 'Virtual'
      });

      const expectedActionInPerson = {
        type: CreateCohortStateReducerActionTypes.UPDATE_ENVIRONMENT,
        payload: 'InPerson'
      };
      const expectedActionVirtual = {
        type: CreateCohortStateReducerActionTypes.UPDATE_ENVIRONMENT,
        payload: 'Virtual'
      };

      fireEvent.click(screen.getByLabelText('In-person'));
      expect(mockDispatchMethod).toHaveBeenCalledWith(expectedActionInPerson);

      fireEvent.click(screen.getByLabelText('Virtual'));
      expect(mockDispatchMethod).toHaveBeenCalledWith(expectedActionVirtual);
    });
  });
});
