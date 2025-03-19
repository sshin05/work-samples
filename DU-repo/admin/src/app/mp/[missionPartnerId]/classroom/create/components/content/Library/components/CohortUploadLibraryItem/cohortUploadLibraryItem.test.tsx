import { renderV3 as render, fireEvent, screen } from '@@/test-utils';
import { CohortUploadLibraryItem } from './CohortUploadLibraryItem';
import type { CreateCohortState } from '../../../../../providers/CreateCohortProvider/CreateCohortProvider.types';
import {
  CreateCohortContext,
  initialContext
} from '../../../../../providers/CreateCohortProvider/CreateCohortProvider';

const mockShow = jest.fn();
jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  useModal: jest.fn(() => ({
    modalRef: { current: null },
    show: mockShow
  }))
}));

jest.mock('./components/CohortUploadLibraryItemModal', () => ({
  CohortUploadLibraryItemModal: () => (
    <div data-testid="upload-files-modal">CohortUploadLibraryItemModal</div>
  )
}));

describe('UploadFiles', () => {
  const mockLibraryItems = jest.fn();

  beforeEach(() => {
    mockLibraryItems.mockImplementation(() => []);
  });

  const renderWithContext = (state: CreateCohortState) => {
    render(
      <CreateCohortContext.Provider
        value={{
          createCohortState: state,
          updateCohortState: jest.fn(),
          saveCohortState: jest.fn(),
          updateAndSaveCohortState: jest.fn(),
          cohortDetails: {
            cohort: null,
            cohortMembers: []
          },
          isLoadingCohort: false
        }}
      >
        <CohortUploadLibraryItem />
      </CreateCohortContext.Provider>
    );
  };

  const getInitialCreateCohortState = (): CreateCohortState => {
    return {
      ...initialContext.createCohortState,
      libraryItems: mockLibraryItems()
    };
  };

  it('renders', () => {
    renderWithContext(getInitialCreateCohortState());

    expect(screen.getByText('Add library resources')).toBeInTheDocument();
  });

  it('shows the modal when add library item button is clicked', () => {
    renderWithContext(getInitialCreateCohortState());

    fireEvent.click(screen.getByText('Add library resources'));
    expect(mockShow).toHaveBeenCalled();
  });

  it('shows the error message when the maximum number of files has been uploaded', () => {
    mockLibraryItems.mockImplementation(() => [
      { id: '1', name: 'Item 1', type: 'Type 1', url: 'http://example.com/1' },
      { id: '2', name: 'Item 2', type: 'Type 2', url: 'http://example.com/2' },
      { id: '3', name: 'Item 3', type: 'Type 3', url: 'http://example.com/3' },
      { id: '4', name: 'Item 4', type: 'Type 4', url: 'http://example.com/4' },
      { id: '5', name: 'Item 5', type: 'Type 5', url: 'http://example.com/5' },
      { id: '6', name: 'Item 6', type: 'Type 6', url: 'http://example.com/6' },
      { id: '7', name: 'Item 7', type: 'Type 7', url: 'http://example.com/7' },
      { id: '8', name: 'Item 8', type: 'Type 8', url: 'http://example.com/8' },
      { id: '9', name: 'Item 9', type: 'Type 9', url: 'http://example.com/9' },
      {
        id: '10',
        name: 'Item 10',
        type: 'Type 10',
        url: 'http://example.com/10'
      }
    ]);

    renderWithContext(getInitialCreateCohortState());

    fireEvent.click(screen.getByText('Add library resources'));

    expect(
      screen.getByText(
        'You have already uploaded the maximum number of files. Remove one or more files before uploading additional files.'
      )
    ).toBeInTheDocument();
  });
});
