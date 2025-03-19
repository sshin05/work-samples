import { fireEvent, renderV3, screen } from '@@/test-utils';
import { CurriculumTab } from './CurriculumTab';
import {
  useUpdateForceMultiplier,
  useFindLatestForceMultiplierByIdAdmin,
  useRemoveItemFromForceMultiplier
} from '@/api/force-multipliers';

jest.mock('@/api/force-multipliers');

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush
  })),
  usePathname: jest.fn(() => '/foo')
}));

const mockNotify = jest.fn();
jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  Button: ({ children, onClick }) => (
    <button type="submit" onClick={onClick}>
      {children}
    </button>
  ),
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  useModal: jest.fn(() => ({
    modalRef: { current: null },
    show: jest.fn(),
    close: jest.fn(),
    isOpen: true
  })),
  trapFocus: jest.fn(),
  Modal: ({ children, className, role, ariaModal }) => (
    <div className={className} role={role} aria-modal={ariaModal}>
      {children}
    </div>
  )
}));

jest.mock('@/components_new/loaders', () => ({
  __esModule: true,
  default: () => <div>BaseSkeleton</div>
}));

jest.mock(
  '@/app/mp/[missionPartnerId]/training/components/DragAndDropList/DragAndDropList',
  () => ({
    __esModule: true,
    default: ({ onClickItem, onReorder, onRemoveItem }) => (
      <div>
        <div>DragAndDropList</div>{' '}
        <div onClick={() => onClickItem('spoof1')}>handleClickItem</div>
        <div
          onClick={() =>
            onReorder([
              { id: 'spoof2', item: { source: 'du-create' }, itemIndex: 1 },
              { id: 'spoof1', item: { source: 'du-create' }, itemIndex: 0 }
            ])
          }
        >
          handleReorder
        </div>
        <div onClick={() => onRemoveItem('spoof1')}>handleRemoveItem</div>
      </div>
    )
  })
);

jest.mock(
  '@/components/manage-mission-partners/custom-training/HostedContentPreviewContainer',
  () => ({
    __esModule: true,
    default: ({ onClose }) => (
      <div onClick={() => onClose()}>HostedContentPreviewContainer</div>
    )
  })
);

jest.mock(
  '../../../../../components/ForceMultiplierModules/CurriculumTabModules',
  () => ({
    CurriculumTabModules: ({ children }) => (
      <div>CurriculumTabModules {children}</div>
    )
  })
);

jest.mock('./components/AddModuleModalContent', () => ({
  AddModuleModalContent: ({ close, handleClickCreateModule }) => (
    <div>
      <span onClick={() => handleClickCreateModule({ moduleName: 'Module 1' })}>
        Add Module
      </span>
      <button onClick={close}>Close</button>
    </div>
  )
}));

describe('CurriculumTab', () => {
  const mockForceMultiplierById = {
    version: '1',
    status: 'Published',
    items: [
      { id: 'spoof1', item: { source: 'du-create' } },
      { id: 'spoof2', item: { source: 'du-create' } }
    ]
  };

  const mockFetchFM = jest.fn(async () => Promise.resolve());
  const mockUpdateFM = jest.fn(async () => Promise.resolve());
  const mockRemoveCourseFromFM = jest.fn(async () => Promise.resolve());

  beforeEach(() => {
    (useFindLatestForceMultiplierByIdAdmin as jest.Mock).mockReturnValue({
      forceMultiplierById: mockForceMultiplierById,
      forceMultiplierByIdLoading: false,
      forceMultiplierByIdError: true,
      fetchForceMultiplierById: mockFetchFM
    });

    (useUpdateForceMultiplier as jest.Mock).mockReturnValue({
      updateForceMultiplier: mockUpdateFM,
      updateForceMultiplierLoading: false
    });

    (useRemoveItemFromForceMultiplier as jest.Mock).mockReturnValue({
      removeItemFromForceMultiplier: mockRemoveCourseFromFM,
      removeItemFromForceMultiplierLoading: false
    });
  });

  it('should render the component', () => {
    renderV3(
      <CurriculumTab
        forceMultiplierById={mockForceMultiplierById}
        forceMultiplierByIdLoading={false}
        isModularizedForceMultiplier={false}
        isFmPublished={false}
        disabled={false}
        setEditTitleLoading={jest.fn()}
        setRemovingItems={jest.fn()}
      />
    );

    expect(screen.queryByText(/CirriculumTabModules/i)).not.toBeInTheDocument();
  });

  it('should handle preview modal clicks', () => {
    renderV3(
      <CurriculumTab
        forceMultiplierById={mockForceMultiplierById}
        forceMultiplierByIdLoading={false}
        isModularizedForceMultiplier={false}
        isFmPublished={false}
        disabled={false}
        setEditTitleLoading={jest.fn()}
        setRemovingItems={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText(/handleClickItem/i));
    expect(
      screen.queryByText(/HostedContentPreviewContainer/i)
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText(/HostedContentPreviewContainer/i));
    expect(
      screen.queryByText(/HostedContentPreviewContainer/i)
    ).not.toBeInTheDocument();
  });

  it('should handle reordering', () => {
    renderV3(
      <CurriculumTab
        forceMultiplierById={mockForceMultiplierById}
        forceMultiplierByIdLoading={false}
        isModularizedForceMultiplier={false}
        isFmPublished={false}
        disabled={false}
        setEditTitleLoading={jest.fn()}
        setRemovingItems={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText(/handleReorder/i));
    expect(mockUpdateFM).toHaveBeenCalled();
  });

  it('should handle adding an item', () => {
    renderV3(
      <CurriculumTab
        forceMultiplierById={mockForceMultiplierById}
        forceMultiplierByIdLoading={false}
        isModularizedForceMultiplier={false}
        isFmPublished={false}
        disabled={false}
        setEditTitleLoading={jest.fn()}
        setRemovingItems={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText(/Add Training Item \+/i));
    expect(mockPush).toHaveBeenCalled();
  });

  it('should handle removing an item', () => {
    renderV3(
      <CurriculumTab
        forceMultiplierById={mockForceMultiplierById}
        forceMultiplierByIdLoading={false}
        isModularizedForceMultiplier={false}
        isFmPublished={false}
        disabled={false}
        setEditTitleLoading={jest.fn()}
        setRemovingItems={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText(/handleRemoveItem/i));
    expect(mockRemoveCourseFromFM).toHaveBeenCalled();
  });

  describe('with modules', () => {
    const mockForceMultiplierById = {
      version: '1',
      status: 'Published',
      items: [
        { id: 'spoof1', item: { source: 'du-create' } },
        { id: 'spoof2', item: { source: 'du-create' } }
      ],
      modules: [
        {
          id: 'spoofModule',
          title: 'Module 1',
          items: [
            { id: 'spoof1', item: { source: 'du-create' } },
            { id: 'spoof2', item: { source: 'du-create' } }
          ]
        }
      ]
    };

    it('should handle creating a new module', () => {
      renderV3(
        <CurriculumTab
          forceMultiplierById={mockForceMultiplierById}
          forceMultiplierByIdLoading={false}
          isModularizedForceMultiplier={true}
          isFmPublished={false}
          disabled={false}
          setEditTitleLoading={jest.fn()}
          setRemovingItems={jest.fn()}
        />
      );
      fireEvent.click(screen.getByText(/Create New Module \+/i));
      fireEvent.click(screen.getByText(/Add Module/i));
      expect(mockUpdateFM).toHaveBeenCalled();
    });
  });
});
