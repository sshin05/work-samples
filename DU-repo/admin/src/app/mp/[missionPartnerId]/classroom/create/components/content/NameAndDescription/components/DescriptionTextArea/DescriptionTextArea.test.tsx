import { render, screen, fireEvent } from '@@/test-utils';
import { DescriptionTextArea } from './DescriptionTextArea';
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
        <DescriptionTextArea />
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

    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('should call updateCohortState with the correct action when input value changes', () => {
    renderWithContext({
      ...getInitialCreateCohortState(),
      description: 'Initial Description'
    });

    const DescriptionTextArea = screen.getByDisplayValue('Initial Description');
    fireEvent.change(DescriptionTextArea, {
      target: { value: 'New Cohort Description' }
    });

    const expectedAction = {
      type: CreateCohortStateReducerActionTypes.UPDATE_DESCRIPTION,
      payload: 'New Cohort Description'
    };

    expect(mockDispatchMethod).toHaveBeenCalledWith(expectedAction);
  });

  describe('character count', () => {
    it('sets the correct default character count', () => {
      renderWithContext({
        ...getInitialCreateCohortState(),
        description: ''
      });

      expect(screen.getByText('0 / 300')).toBeInTheDocument();
    });

    it('falls back to the expected default when the description is falsy', () => {
      renderWithContext({
        ...getInitialCreateCohortState(),
        description: null
      });

      expect(screen.getByText('0 / 300')).toBeInTheDocument();
    });

    it('renders with the initial values length', () => {
      const initialValue = 'Initial Description';

      renderWithContext({
        ...getInitialCreateCohortState(),
        description: initialValue
      });

      expect(
        screen.getByText(`${initialValue.length} / 300`)
      ).toBeInTheDocument();
    });

    it('limits the input to the `MAX_DESCRIPTION_CHARACTER_COUNT` when updating the description in the app state', () => {
      const initialValue = 'Initial Description';

      renderWithContext({
        ...getInitialCreateCohortState(),
        description: initialValue
      });

      const longText =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse maximus orci ut massa malesuada luctus. Quisque volutpat sapien non nibh pretium aliquet. Sed maximus neque et aliquet fermentum. Maecenas commodo dui ut metus sodales, et venenatis odio pharetra. Nunc vehicula nec lacus quis eleifend. Nulla tincidunt orci quam, nec elementum est iaculis in. Vestibulum fermentum non velit at ornare. Phasellus mattis pellentesque vulputate. Ut hendrerit vitae diam non consectetur. Nulla at lectu';

      expect(longText.length).toBe(500);

      const DescriptionTextArea = screen.getByDisplayValue(initialValue);
      fireEvent.change(DescriptionTextArea, {
        target: { value: longText }
      });

      const expectedAction = {
        type: CreateCohortStateReducerActionTypes.UPDATE_DESCRIPTION,
        payload: longText.slice(0, 300)
      };

      expect(mockDispatchMethod).toHaveBeenCalledWith(expectedAction);
    });
  });
});
