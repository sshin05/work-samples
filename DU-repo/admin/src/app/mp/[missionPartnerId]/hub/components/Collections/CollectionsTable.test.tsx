import { renderV3, screen, fireEvent, waitFor } from '@@/test-utils';
import { CollectionsTable } from './CollectionsTable';
import {
  useRemoveCollectionItems,
  useRemoveCollection,
  useCreateCollection,
  useUpdateCollection
} from '@/api/mission-partner';
import type { TextInputProps } from '@/components_new/form/TextInput/TextInput.types';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: mockPush })),
  usePathname: jest.fn(() => '/curriculum-catalog')
}));

const mockNotify = jest.fn();
jest.mock('@cerberus/react', () => ({
  useModal: jest.fn(() => ({
    modalRef: { current: null },
    show: jest.fn(),
    close: jest.fn(),
    isOpen: true
  })),
  useConfirmModal: jest.fn(() => ({
    show: jest.fn().mockReturnValue(true)
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
  IconButton: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Modal: ({ children, className, role, ariaModal }) => (
    <div className={className} role={role} aria-modal={ariaModal}>
      {children}
    </div>
  ),
  Field: ({ children }) => <div>{children}</div>,
  FieldMessage: ({ children }) => <div>{children}</div>,
  Label: ({ children }) => <div>{children}</div>,
  Select: ({ children }) => <select>{children}</select>,
  Option: ({ children }) => <option>{children}</option>,
  Input: ({ onChange }) => <input onChange={onChange} />,
  Table: ({ children }) => <table>{children}</table>,
  Td: ({ children }) => <td>{children}</td>,
  Tr: ({ children }) => <tr>{children}</tr>,
  Th: ({ children }) => <th>{children}</th>,
  Thead: ({ children }) => <thead>{children}</thead>,
  Tbody: ({ children }) => <tbody>{children}</tbody>,
  Checkbox: ({ children, onChange }) => (
    <input type="checkbox" onChange={onChange}>
      {children}
    </input>
  ),
  Portal: ({ children }) => <div>{children}</div>
}));

jest.mock('@/components_new/form', () => ({
  TextInput: ({ children }: TextInputProps) => <div>{children}</div>
}));

jest.mock('@cerberus/icons', () => ({
  TrashCan: () => 'Delete',
  Search: () => 'Search',
  Edit: () => 'Edit',
  Add: () => <div>Add</div>,
  ArrowsVertical: () => 'ArrowsVertical',
  SortAscending: () => 'SortAscending',
  SortDescending: () => 'SortDescending'
}));

jest.mock('./components/CreateCollectionsModal', () => ({
  CreateCollectionModal: ({ onClose, onSubmit, missionPartnerId }) => {
    const collectionObject = {
      name: 'Code Combat',
      description: 'Description for Code Combat'
    };

    return (
      <div>
        <input type="text" name="name" value={collectionObject.name} />
        <input
          type="text"
          name="description"
          value={collectionObject.description}
        />
        <button
          onClick={() => {
            onSubmit(missionPartnerId, collectionObject);
            onClose();
          }}
        >
          Create Collection
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    );
  }
}));

jest.mock('./components/EditCollectionModal', () => ({
  EditCollectionModal: ({ onClose, onSubmit, missionPartnerId }) => {
    const collectionObject = {
      name: 'Code Combat',
      description: 'Description for Code Combat'
    };

    return (
      <div>
        <input type="text" name="name" value={collectionObject.name} />
        <input
          type="text"
          name="description"
          value={collectionObject.description}
        />
        <button
          onClick={() => {
            onSubmit(missionPartnerId, collectionObject);
          }}
        >
          Save Collection
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    );
  }
}));

jest.mock('./components/DeleteCollectionModal', () => ({
  DeleteCollectionModal: ({
    onClose,
    onSubmit,
    collection,
    missionPartnerId
  }) => (
    <div>
      <button
        onClick={() => {
          onSubmit(missionPartnerId, collection);
        }}
      >
        Delete Collection
      </button>
      <button onClick={onClose}>Cancel</button>
    </div>
  )
}));

jest.clearAllMocks();
jest.mock('@/api/mission-partner', () => ({
  useCreateCollection: jest.fn(() => ({
    createCollection: jest.fn().mockResolvedValue({})
  })),
  useRemoveCollection: jest.fn(() => ({
    removeCollection: jest.fn().mockResolvedValue({})
  })),
  useUpdateCollection: jest.fn(() => ({
    updateCollection: jest.fn().mockResolvedValue({})
  })),
  useRemoveCollectionItems: jest.fn(() => ({
    removeCollectionItems: jest.fn().mockResolvedValue({})
  })),
  useFindMissionPartnerById: () => ({ missionPartnerLoading: false })
}));

const mockData = [
  {
    id: 'f6c9e1f1-de89-4ecc-8039-d5cb18674e7b',
    name: 'Code Combat',
    description: 'This is code combat, we can defeat the enemy with great code',
    items: [
      {
        type: 'COURSE',
        courseId: 'coursera#agile-project-management',
        title: 'Agile Project Management',
        dateAdded: '2024-10-01T23:03:01.162Z'
      },
      {
        type: 'ASSESSMENT',
        assessmentId: 'assessemt-1',
        title: 'Test Assessment 1',
        dateAdded: '2024-10-01T23:03:01.162Z'
      },
      {
        type: 'TRAINING_PLAN',
        planSourceId: 'advanced-product-manage',
        planType: 'Learning Path',
        planVersion: '1',
        title: 'Advanced Product Manager',
        dateAdded: '2024-10-03T13:57:55.919Z'
      }
    ]
  }
];

describe('CollectionsTable', () => {
  it('renders collections when data is provided', () => {
    renderV3(
      <CollectionsTable
        isPortalManager={true}
        data={mockData}
        isDuAdmin={true}
        missionPartnerId="123"
      />
    );

    expect(screen.getByText('Code Combat')).toBeInTheDocument();
    expect(
      screen.getByText(
        'This is code combat, we can defeat the enemy with great code'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Agile Project Management')).toBeInTheDocument();
  });

  it('shows "Add a collection" button and opens create modal', () => {
    renderV3(
      <CollectionsTable
        isPortalManager={true}
        data={[]}
        isDuAdmin={true}
        missionPartnerId="12345"
      />
    );

    expect(screen.getByText('Add a collection')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Add a collection'));

    expect(screen.getByText('Create Collection')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('shows "Add a collection" button and create a new collection', () => {
    const mockCreateCollection = jest.fn().mockResolvedValue({});
    (useCreateCollection as jest.Mock).mockReturnValue({
      createCollection: mockCreateCollection
    });
    renderV3(
      <CollectionsTable
        isPortalManager={true}
        data={[]}
        isDuAdmin={true}
        missionPartnerId="12345"
      />
    );

    expect(screen.getByText('Add a collection')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Add a collection'));

    expect(screen.getByText('Create Collection')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Create Collection'));

    expect(mockCreateCollection).toHaveBeenCalled();
  });

  it('shows edit and delete buttons on hover', async () => {
    renderV3(
      <CollectionsTable
        isPortalManager={true}
        data={mockData}
        isDuAdmin={true}
        missionPartnerId="123"
      />
    );

    const collectionElement = screen.getByText('Code Combat').closest('div');
    fireEvent.mouseEnter(collectionElement);
    const editButton = await screen.findByText(/Delete Collection/);

    expect(editButton).toBeInTheDocument();
    expect(await screen.findByText(/Delete Collection/)).toBeInTheDocument();

    fireEvent.mouseLeave(collectionElement);

    expect(editButton).not.toBeInTheDocument();
    expect(screen.queryByText(/Delete Collection/)).not.toBeInTheDocument();
  });

  describe('edit and delete buttons', () => {
    it('renders', async () => {
      renderV3(
        <CollectionsTable
          isPortalManager={true}
          data={mockData}
          isDuAdmin={true}
          missionPartnerId="123"
        />
      );

      const collectionElement = screen.getByText('Code Combat').closest('div');
      fireEvent.mouseEnter(collectionElement);
      expect(await screen.findByText(/Save Collection/)).toBeInTheDocument();
    });

    it('succesfully updates the collection', async () => {
      const mockUpdateCollection = jest.fn().mockResolvedValue({});
      (useUpdateCollection as jest.Mock).mockReturnValue({
        updateCollection: mockUpdateCollection
      });

      renderV3(
        <CollectionsTable
          isPortalManager={true}
          data={mockData}
          isDuAdmin={true}
          missionPartnerId="123"
        />
      );

      const collectionElement = screen.getByText('Code Combat').closest('div');
      fireEvent.mouseEnter(collectionElement);
      expect(await screen.findByText(/Save Collection/)).toBeInTheDocument();
      fireEvent.change(screen.getAllByRole('textbox')[0], {
        target: { value: 'Collection name' }
      });

      // this is here solely for sonarqube rule: Refactor this code to not nest functions more than 4 levels deep.
      const stuffToAwait = () => {
        fireEvent.click(screen.getByText(/Save Collection/));
        expect(mockUpdateCollection).toHaveBeenCalled();
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({ heading: 'Success' })
        );
      };
      await waitFor(stuffToAwait);
    });

    it('fails to update the collection', async () => {
      const mockUpdateCollection = jest
        .fn()
        .mockRejectedValueOnce(new Error('failure to update'));
      (useUpdateCollection as jest.Mock).mockReturnValue({
        updateCollection: mockUpdateCollection
      });

      renderV3(
        <CollectionsTable
          isPortalManager={true}
          data={mockData}
          isDuAdmin={true}
          missionPartnerId="123"
        />
      );

      const collectionElement = screen.getByText('Code Combat').closest('div');
      fireEvent.mouseEnter(collectionElement);
      const saveButton = await screen.findByText(/Save Collection/);
      expect(saveButton).toBeInTheDocument();
      fireEvent.change(screen.getAllByRole('textbox')[0], {
        target: { value: 'Collection name' }
      });
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockUpdateCollection).toHaveBeenCalled();
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({ heading: 'Error' })
        );
      });
    });

    it('renders', async () => {
      renderV3(
        <CollectionsTable
          isPortalManager={true}
          data={mockData}
          isDuAdmin={true}
          missionPartnerId="123"
        />
      );

      const collectionElement = screen.getByText('Code Combat').closest('div');
      fireEvent.mouseEnter(collectionElement);

      expect(await screen.findByText(/Delete Collection/)).toBeInTheDocument();
    });

    it('successfully deletes a collection', async () => {
      const mockRemoveCollection = jest.fn().mockResolvedValue({});
      (useRemoveCollection as jest.Mock).mockReturnValue({
        removeCollection: mockRemoveCollection
      });
      renderV3(
        <CollectionsTable
          isPortalManager={true}
          data={mockData}
          isDuAdmin={true}
          missionPartnerId="123"
        />
      );

      const collectionElement = screen.getByText('Code Combat').closest('div');
      fireEvent.mouseEnter(collectionElement);

      expect(screen.getByText('Delete Collection')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Delete Collection'));

      await waitFor(() => {
        expect(mockRemoveCollection).toHaveBeenCalled();
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({ heading: 'Success' })
        );
      });
    });

    it('fails to delete a collection', async () => {
      const mockRemoveCollection = jest
        .fn()
        .mockRejectedValueOnce(new Error('failure to delete'));
      (useRemoveCollection as jest.Mock).mockReturnValue({
        removeCollection: mockRemoveCollection
      });
      renderV3(
        <CollectionsTable
          isPortalManager={true}
          data={mockData}
          isDuAdmin={true}
          missionPartnerId="123"
        />
      );

      const collectionElement = screen.getByText('Code Combat').closest('div');
      fireEvent.mouseEnter(collectionElement);

      expect(screen.getByText('Delete Collection')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Delete Collection'));

      await waitFor(() => {
        expect(mockRemoveCollection).toHaveBeenCalled();
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({ heading: 'Error' })
        );
      });
    });
  });
  describe('toolbar tests', () => {
    it('shows "Add Training" button for each collection', () => {
      renderV3(
        <CollectionsTable
          isPortalManager={true}
          data={mockData}
          isDuAdmin={true}
          missionPartnerId="123"
        />
      );

      expect(screen.getByText('Training')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Training'));
      expect(mockPush).toHaveBeenCalled();
    });

    it('click on edit items button and then cancel', async () => {
      renderV3(
        <CollectionsTable
          isPortalManager={true}
          data={mockData}
          isDuAdmin={true}
          missionPartnerId="123"
        />
      );

      fireEvent.click(screen.getByText('Edit'));
      fireEvent.click(screen.getAllByRole('checkbox')[0]);
      const cancelBtn = screen.getAllByRole('button', {
        name: /Cancel/i
      })[0];
      fireEvent.click(cancelBtn);
      await waitFor(() => {
        expect(cancelBtn).not.toBeInTheDocument();
      });
    });

    it('fail to remove items in the table', async () => {
      const mockRemoveCollectionItems = jest
        .fn()
        .mockRejectedValueOnce(new Error('failure to remove items'));

      (useRemoveCollectionItems as jest.Mock).mockReturnValue({
        removeCollectionItems: mockRemoveCollectionItems
      });

      renderV3(
        <CollectionsTable
          isPortalManager={true}
          data={mockData}
          isDuAdmin={true}
          missionPartnerId="123"
        />
      );

      fireEvent.click(screen.getByText('Edit'));
      fireEvent.click(screen.getAllByRole('checkbox')[0]);
      const removeBtn = screen.getByText('Delete');
      fireEvent.click(removeBtn);
      await waitFor(() => {
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({ heading: 'Error' })
        );
      });
    });

    it('successfully remove items in the table', async () => {
      const mockRemoveCollectionItems = jest.fn().mockResolvedValue({});

      (useRemoveCollectionItems as jest.Mock).mockReturnValue({
        removeCollectionItems: mockRemoveCollectionItems
      });

      renderV3(
        <CollectionsTable
          isPortalManager={true}
          data={mockData}
          isDuAdmin={true}
          missionPartnerId="123"
        />
      );

      fireEvent.click(screen.getByText('Edit'));
      fireEvent.click(screen.getAllByRole('checkbox')[0]);
      const removeBtn = screen.getByText('Delete');
      expect(removeBtn).toBeInTheDocument();
      fireEvent.click(screen.getAllByRole('checkbox')[0]);
      await waitFor(() => {
        expect(removeBtn).not.toBeInTheDocument();
      });

      fireEvent.click(screen.getAllByRole('checkbox')[0]);
      fireEvent.click(screen.getAllByRole('checkbox')[1]);
      fireEvent.click(screen.getAllByRole('checkbox')[2]);
      await waitFor(() => {
        expect(screen.getByText('3 items selected')).toBeInTheDocument();
      });
      fireEvent.click(screen.getByText('Delete'));
      await waitFor(() => {
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({ heading: 'Success' })
        );
      });
    });
  });
});
