import { renderV3 as render, fireEvent, screen, waitFor } from '@@/test-utils';
import { CohortLibraryItemsList } from './CohortLibraryItemsList';
import {
  CreateCohortContext,
  initialContext
} from '../../../../../providers/CreateCohortProvider/CreateCohortProvider';
import {
  type CreateCohortState,
  CreateCohortStateReducerActionTypes
} from '../../../../../providers/CreateCohortProvider/CreateCohortProvider.types';

const mockRemoveLibraryItem = jest.fn();
jest.mock('@/app/api', () => ({
  useSQLMutation: () => ({ mutation: mockRemoveLibraryItem })
}));
jest.mock(
  '@/app/mp/[missionPartnerId]/training/components/DragAndDropList/DragAndDropList',
  () => ({
    __esModule: true,
    default: ({ onRemoveItem, onReorder }) => (
      <>
        <div>Mocked DragAndDropList</div>
        <div
          onClick={() =>
            onReorder([
              {
                id: '1',
                title: 'Item 1',
                displayName: 'Item 1',
                name: 'Item 1',
                type: 'Document',
                sourceLocation: 'http://example.com',
                _idx: 0,
                _createdAt: '',
                _updatedAt: '',
                _table: '',
                size: '',
                path: '',
                sourceType: 'LINK',
                version: ''
              },
              {
                id: '2',
                title: 'Item 2',
                displayName: 'Item 2',
                name: 'Item 2',
                type: 'Video',
                _idx: 0,
                _createdAt: '',
                _updatedAt: '',
                _table: '',
                size: '',
                path: '',
                sourceType: 'LINK',
                sourceLocation: '',
                version: ''
              }
            ])
          }
        >
          Reorder
        </div>
        <div onClick={() => onRemoveItem('1')}>Remove</div>
      </>
    )
  })
);

describe('CohortLibraryItemsList', () => {
  const mockDispatchMethod = jest.fn();
  const mockUpdateAndSaveCohortState = jest.fn();

  const renderWithContext = (state: CreateCohortState) => {
    render(
      <CreateCohortContext.Provider
        value={{
          createCohortState: state,
          updateCohortState: mockDispatchMethod,
          saveCohortState: jest.fn(),
          updateAndSaveCohortState: mockUpdateAndSaveCohortState,
          cohortDetails: {
            cohort: null,
            cohortMembers: []
          },
          isLoadingCohort: false
        }}
      >
        <CohortLibraryItemsList />
      </CreateCohortContext.Provider>
    );
  };

  const getInitialCreateCohortState = (): CreateCohortState => {
    return {
      ...initialContext.createCohortState,
      libraryItems: [
        {
          id: '2',
          displayName: 'Item 2',
          name: 'Item 2',
          type: 'Video',
          _idx: 0,
          _createdAt: '',
          _updatedAt: '',
          _table: '',
          size: '',
          path: '',
          sourceType: 'LINK',
          sourceLocation: '',
          version: ''
        },
        {
          id: '1',
          displayName: 'Item 1',
          name: 'Item 1',
          type: 'Document',
          sourceLocation: 'http://example.com',
          _idx: 0,
          _createdAt: '',
          _updatedAt: '',
          _table: '',
          size: '',
          path: '',
          sourceType: 'LINK',
          version: ''
        }
      ]
    };
  };

  beforeEach(() => {
    mockRemoveLibraryItem.mockResolvedValue({});
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render', () => {
    renderWithContext(getInitialCreateCohortState());
    expect(screen.getByText('Mocked DragAndDropList')).toBeInTheDocument();
  });

  it('should call updateCohortState with correct payload on item reorder', () => {
    renderWithContext(getInitialCreateCohortState());
    const dragAndDropList = screen.getByText('Reorder');

    fireEvent.click(dragAndDropList);

    expect(mockUpdateAndSaveCohortState).toHaveBeenCalledWith({
      libraryItems: [
        {
          id: '1',
          displayName: 'Item 1',
          name: 'Item 1',
          type: 'Document',
          sourceLocation: 'http://example.com',
          _idx: 0,
          _createdAt: '',
          _updatedAt: '',
          _table: '',
          size: '',
          path: '',
          sourceType: 'LINK',
          version: ''
        },
        {
          id: '2',
          displayName: 'Item 2',
          name: 'Item 2',
          type: 'Video',
          _idx: 0,
          _createdAt: '',
          _updatedAt: '',
          _table: '',
          size: '',
          path: '',
          sourceType: 'LINK',
          sourceLocation: '',
          version: ''
        }
      ]
    });
  });

  it('should call updateCohortState with correct payload on item remove', () => {
    renderWithContext(getInitialCreateCohortState());
    const dragAndDropList = screen.getByText('Remove');

    fireEvent.click(dragAndDropList);

    waitFor(() => {
      expect(mockRemoveLibraryItem).toHaveBeenCalledWith({
        libraryItemId: '1'
      });
      expect(mockDispatchMethod).toHaveBeenCalledWith({
        type: CreateCohortStateReducerActionTypes.UPDATE_LIBRARY_ITEMS,
        payload: [
          {
            id: '2',
            displayName: 'Item 2',
            type: 'Video',
            source: 'http://example.com'
          }
        ]
      });
    });
  });
});
