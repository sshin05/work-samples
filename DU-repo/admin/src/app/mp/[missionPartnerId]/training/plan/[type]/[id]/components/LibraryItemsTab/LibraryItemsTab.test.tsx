import { fireEvent, renderV3, screen, waitFor } from '@@/test-utils';
import { LibraryItemsTab } from './LibraryItemsTab';
import {
  useDeleteLibraryItem,
  useUpdateLibraryItems,
  useUploadLibraryItem
} from '@/api/force-multipliers';

jest.mock('@/api/force-multipliers');

const mockNotify = jest.fn();
jest.mock('@cerberus/react', () => ({
  useModal: jest.fn(() => ({
    modalRef: { current: null },
    show: jest.fn(),
    close: jest.fn(),
    isOpen: true
  })),
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  trapFocus: jest.fn(),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Button: ({ children, onClick, type, className }) => (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  ),
  Modal: ({ children, className, role, ariaModal }) => (
    <div className={className} role={role} aria-modal={ariaModal}>
      {children}
    </div>
  )
}));

jest.mock('@/components_new/loaders', () => ({
  BaseSkeleton: () => <div>BaseSkeleton</div>
}));

jest.mock(
  '@/app/mp/[missionPartnerId]/training/components/DragAndDropList/DragAndDropList',
  () => ({
    __esModule: true,
    default: ({ items, onReorder, onRemoveItem }) => (
      <div>
        <button
          data-testid="mock-reorder-button"
          type="button"
          onClick={() => {
            // simulate an actual re-order (needs to be a deep copy)
            const reorderedItems = [...items].reverse();
            onReorder(reorderedItems);
          }}
        >
          ReorderItem
        </button>
        <button onClick={() => onRemoveItem('item1')}>RemoveItem</button>
        {items?.map(item => <div key={item.id}>{item.title}</div>)}
      </div>
    )
  })
);

jest.mock('./components/AddLibraryItemModalContent', () => ({
  AddLibraryItemModalContent: () => (
    <div>
      <div>Library Item Modal</div>
    </div>
  )
}));

describe('LibraryItemsTab', () => {
  const mockForceMultiplierById = {
    id: 'mock-fm',
    version: '1',
    status: 'Published',
    items: [],
    libraryItems: [
      {
        id: 'item1',
        name: 'item1',
        type: 'Link',
        url: 'sample.com'
      },
      {
        id: 'item2',
        name: 'item2',
        type: 'Video',
        url: 'sample.com'
      },
      {
        id: 'item3',
        name: 'item3',
        type: 'Audio',
        url: 'sample.com'
      },
      {
        id: 'item4',
        name: 'item4',
        type: 'File',
        url: 'sample.com'
      }
    ]
  };

  const mockUpdateLibraryItems = jest.fn(async () => Promise.resolve());
  const mockUploadLibraryItems = jest.fn(async () => Promise.resolve());
  const mockDeleteLibraryItems = jest.fn(async () => Promise.resolve());

  beforeEach(() => {
    (useUpdateLibraryItems as jest.Mock).mockReturnValue({
      updateLibraryItemsLoading: false,
      updateLibraryItems: mockUpdateLibraryItems
    });
    (useUploadLibraryItem as jest.Mock).mockReturnValue({
      uploadLibraryItemLoading: false,
      uploadLibraryItem: mockUploadLibraryItems
    });
    (useDeleteLibraryItem as jest.Mock).mockReturnValue({
      deleteLibraryItemLoading: false,
      deleteLibraryItem: mockDeleteLibraryItems
    });
  });

  it('should render the component', () => {
    renderV3(
      <LibraryItemsTab
        forceMultiplierById={mockForceMultiplierById}
        disabled={false}
        forceMultiplierByIdLoading={false}
        isFmPublished={false}
        isSubmitting={false}
        loading={false}
        setRemovingItems={jest.fn()}
      />
    );

    expect(screen.getByText(/item1/)).toBeInTheDocument();
  });

  it('should reorder the library items on ReorderItem click', async () => {
    renderV3(
      <LibraryItemsTab
        forceMultiplierById={mockForceMultiplierById}
        disabled={false}
        forceMultiplierByIdLoading={false}
        isFmPublished={false}
        isSubmitting={false}
        loading={false}
        setRemovingItems={jest.fn()}
      />
    );

    fireEvent.click(screen.getByTestId('mock-reorder-button'));

    await waitFor(() =>
      expect(mockUpdateLibraryItems).toHaveBeenCalledWith({
        id: 'mock-fm',
        libraryItems: [
          { id: 'item4', name: 'item4', type: 'File', url: 'sample.com' },
          { id: 'item3', name: 'item3', type: 'Audio', url: 'sample.com' },
          { id: 'item2', name: 'item2', type: 'Video', url: 'sample.com' },
          { id: 'item1', name: 'item1', type: 'Link', url: 'sample.com' }
        ],
        missionPartnerId: undefined
      })
    );
  });

  it('should handle onClick of Add Library Item button', () => {
    renderV3(
      <LibraryItemsTab
        forceMultiplierById={mockForceMultiplierById}
        disabled={false}
        forceMultiplierByIdLoading={false}
        isFmPublished={false}
        isSubmitting={false}
        loading={false}
        setRemovingItems={jest.fn()}
      />
    );

    expect(screen.getByText(/Add Library Item +/)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Add Library Item +/));
    expect(screen.getByText(/Library Item Modal/)).toBeInTheDocument();
  });

  it('should handle delete library item', () => {
    renderV3(
      <LibraryItemsTab
        forceMultiplierById={mockForceMultiplierById}
        disabled={false}
        forceMultiplierByIdLoading={false}
        isFmPublished={false}
        isSubmitting={false}
        loading={false}
        setRemovingItems={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText(/RemoveItem/));
    expect(mockDeleteLibraryItems).toHaveBeenCalledWith({
      forceMultiplierId: 'mock-fm',
      missionPartnerId: undefined,
      libraryItemId: 'item1',
      version: '1'
    });
  });
});
