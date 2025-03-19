import { renderV3 as render, screen, fireEvent, waitFor } from '@@/test-utils';
import { CohortUploadLibraryItemModal } from './CohortUploadLibraryItemModal';
import {
  CreateCohortContext,
  initialContext
} from '@/app/mp/[missionPartnerId]/classroom/create/providers/CreateCohortProvider/CreateCohortProvider';
import axios from 'axios';
import type { CreateCohortState } from '@/app/mp/[missionPartnerId]/classroom/create/providers/CreateCohortProvider/CreateCohortProvider.types';

jest.mock('axios');
const mockAddLibraryItem = jest.fn();
jest.mock('@/app/api', () => ({
  useSQLMutation: () => ({ mutation: mockAddLibraryItem })
}));
const mockNotify = jest.fn();
jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  useNotificationCenter: () => ({ notify: mockNotify })
}));
jest.mock('./components/CohortLibraryFileDropzone', () => ({
  CohortLibraryFileDropzone: ({ onAttachFile }) => (
    <div>
      CohortLibraryFileDropzone
      <input type="file" data-testid="file-input" onChange={onAttachFile} />
    </div>
  )
}));
jest.mock(
  '@/app/mp/[missionPartnerId]/training/plan/[type]/[id]/components/LibraryItemsTab/components/AddLibraryItemModalContent/components/LibraryItemFormFields',
  () => ({
    LibraryItemFormFields: () => <div>LibraryItemFormFields</div>
  })
);

const mockProps = {
  modalRef: { current: null },
  close: jest.fn(),
  show: jest.fn(),
  isOpen: true
};

const mockFile = new File(['test-file'], 'test.jpg', { type: 'image/jpeg' });
const mockLibraryItem = {
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
};

describe('CohortUploadLibraryItemModal', () => {
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
        <CohortUploadLibraryItemModal {...mockProps} />
      </CreateCohortContext.Provider>
    );
  };

  const getInitialCreateCohortState = (): CreateCohortState => {
    return {
      ...initialContext.createCohortState,
      id: 'cohort-id',
      libraryItems: []
    };
  };

  beforeEach(() => {
    mockAddLibraryItem.mockResolvedValue({ data: mockLibraryItem });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('renders file form by default', () => {
      renderWithContext(getInitialCreateCohortState());

      expect(screen.getByText('Add library item')).toBeInTheDocument();
      expect(screen.getByText('Upload a file')).toBeInTheDocument();
      expect(screen.getByText('CohortLibraryFileDropzone')).toBeInTheDocument();
      expect(screen.getByText('LibraryItemFormFields')).toBeInTheDocument();
      expect(screen.getByText('Upload file')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('renders link form when form type is changed', () => {
      renderWithContext(getInitialCreateCohortState());

      fireEvent.click(screen.getByText('Add a link'));

      expect(
        screen.queryByText('CohortLibraryFileDropzone')
      ).not.toBeInTheDocument();
      expect(screen.getByText('LibraryItemFormFields')).toBeInTheDocument();
      expect(screen.getByText('Add link')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });
  });

  describe('basic modal functionality', () => {
    it('calls close function when cancel button is clicked', () => {
      renderWithContext(getInitialCreateCohortState());

      fireEvent.click(screen.getByText('Cancel'));

      expect(mockProps.close).toHaveBeenCalled();
    });
  });

  describe('form submission/validation', () => {
    it('submits the file upload form successfully', async () => {
      (axios.post as jest.Mock).mockResolvedValue({
        data: {
          savedItem: {
            id: '',
            displayName: '',
            name: '',
            source: '/path/to/file',
            type: 'Document',
            sourceType: ''
          }
        }
      });

      renderWithContext(getInitialCreateCohortState());

      const fileInput = screen.getByTestId('file-input');

      await waitFor(() => {
        fireEvent.change(fileInput, { target: { files: [mockFile] } });
        fireEvent.submit(screen.getByText('Upload file'));
        expect(mockDispatchMethod).toHaveBeenCalledWith({
          type: 'UPDATE_LIBRARY_ITEMS',
          payload: [
            {
              id: '',
              displayName: '',
              name: '',
              source: '/path/to/file',
              type: 'Document',
              sourceType: ''
            }
          ]
        });
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({ heading: 'Success' })
        );
      });
    });

    it('submits the link form successfully', async () => {
      renderWithContext(getInitialCreateCohortState());

      await waitFor(() => {
        fireEvent.click(screen.getByText('Add a link'));
        fireEvent.change(screen.getByRole('textbox', { hidden: true }), {
          target: { value: 'https://example.com' }
        });
        fireEvent.submit(screen.getByText('Add link'));
        expect(mockAddLibraryItem).toHaveBeenCalledWith({
          cohortId: 'cohort-id',
          source: 'https://example.com',
          name: ''
        });
        expect(mockDispatchMethod).toHaveBeenCalledWith({
          type: 'UPDATE_LIBRARY_ITEMS',
          payload: [mockLibraryItem]
        });
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({ heading: 'Success' })
        );
      });
    });

    it('displays an error message when upload fails', async () => {
      (axios.post as jest.Mock).mockRejectedValue(new Error('Upload failed'));

      renderWithContext(getInitialCreateCohortState());

      const fileInput = screen.getByTestId('file-input');

      await waitFor(() => {
        fireEvent.change(fileInput, { target: { files: [mockFile] } });
        fireEvent.submit(screen.getByText('Upload file'));
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({ heading: 'Error' })
        );
      });
    });
  });
});
