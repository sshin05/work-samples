import { fireEvent, renderV3, screen, waitFor } from '@@/test-utils';
import { AddLibraryItemModalContent } from './AddLibraryItemModalContent';
import {
  useFindLatestForceMultiplierByIdAdmin,
  useUploadLibraryItem
} from '@/api/force-multipliers';

jest.mock('@/api/force-multipliers');
jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  InlineNotification: ({ onClose }) => (
    <div>
      <div
        onClick={() => {
          onClose();
        }}
      >
        Close Error
      </div>
    </div>
  )
}));

const mockNotify = jest.fn();
jest.mock('@cerberus/react', () => ({
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  IconButton: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Tabs: ({ children }) => <div>{children}</div>,
  Tab: ({ children, onClick }) => <button onClick={onClick}>{children}</button>,
  TabsList: ({ children }) => <div>{children}</div>,
  TabPanel: ({ children }) => <div>{children}</div>,
  ModalHeader: ({ children }) => <div>{children}</div>,
  ModalHeading: ({ children }) => <div>{children}</div>
}));

jest.mock('@/components_new/form', () => ({
  TextInput: ({ label, name, value, onChange, onBlur }) => (
    <div>
      <label>{label}</label>
      <input name={name} value={value} onChange={onChange} onBlur={onBlur} />
    </div>
  )
}));

jest.mock('./components/LibraryItemDropArea', () => ({
  LibraryItemDropArea: ({ setHasFileRejections }) => (
    <div onClick={() => setHasFileRejections(true)}>DropArea</div>
  )
}));

jest.mock('./components/LibraryItemFormFields', () => ({
  LibraryItemFormFields: ({}) => <div>LibraryItemFormFields</div>
}));

jest.mock('./components/LibraryItemFormButtons', () => ({
  LibraryItemFormButtons: ({ onClick, close }) => (
    <div>
      <button type="submit" onClick={onClick}>
        Add
      </button>
      <button onClick={close}>Cancel</button>
    </div>
  )
}));

const uploadLibraryItemMock = jest.fn(() => Promise.resolve());
const fetchForceMultilierByIdMock = jest.fn(() => Promise.resolve());
describe('Add Library Item From test', () => {
  const closeModalMock = jest.fn();
  beforeEach(() => {
    (useUploadLibraryItem as jest.Mock).mockImplementation(() => ({
      uploadLibraryItem: uploadLibraryItemMock,
      uploadLibraryItemLoading: false
    }));

    (useFindLatestForceMultiplierByIdAdmin as jest.Mock).mockImplementation(
      () => ({
        fetchForceMultiplierById: fetchForceMultilierByIdMock
      })
    );
  });

  it('should render the modal', () => {
    renderV3(
      <AddLibraryItemModalContent
        forceMultiplierId="123"
        forceMultiplierVersion="1"
        missionPartnerId="test"
        setLibraryItems={jest.fn()}
        disabled={false}
        loading={false}
        close={closeModalMock}
      />
    );

    expect(screen.getByText(/Add a link/)).toBeInTheDocument();
  });

  it('should upload a link', async () => {
    renderV3(
      <AddLibraryItemModalContent
        forceMultiplierId="123"
        forceMultiplierVersion="1"
        missionPartnerId="test"
        setLibraryItems={jest.fn()}
        disabled={false}
        loading={false}
        close={closeModalMock}
      />
    );

    expect(screen.getByText(/Example: www.sampleurl.com/)).toBeInTheDocument();
    fireEvent.input(screen.getByRole('textbox'), {
      target: { value: 'https://www.vimeo.com' }
    });
    expect(
      screen.getByDisplayValue('https://www.vimeo.com')
    ).toBeInTheDocument();
  });

  it('should handle uploading a library item', async () => {
    (useUploadLibraryItem as jest.Mock).mockImplementation(() => ({
      uploadLibraryItem: jest.fn(() =>
        Promise.resolve({
          data: {
            uploadLibraryItem: {}
          }
        })
      ),
      uploadLibraryItemLoading: false
    }));

    renderV3(
      <AddLibraryItemModalContent
        forceMultiplierId="123"
        forceMultiplierVersion="1"
        missionPartnerId="test"
        setLibraryItems={jest.fn()}
        disabled={false}
        loading={false}
        close={closeModalMock}
      />
    );

    // must fill out URL to submit because field is always showing
    fireEvent.input(screen.getByRole('textbox'), {
      target: { value: 'testUrl' }
    });
    fireEvent.click(screen.getByText('Add'));
    await waitFor(() => {
      expect(mockNotify).toHaveBeenCalledWith(
        expect.objectContaining({ heading: 'Success' })
      );
    });
  });

  it('should handle rejecting a library item', async () => {
    (useUploadLibraryItem as jest.Mock).mockImplementation(() => ({
      uploadLibraryItem: jest.fn(() =>
        Promise.reject({ message: 'error test' })
      ),
      uploadLibraryItemLoading: false
    }));

    renderV3(
      <AddLibraryItemModalContent
        forceMultiplierId="123"
        forceMultiplierVersion="1"
        missionPartnerId="test"
        setLibraryItems={jest.fn()}
        disabled={false}
        loading={false}
        close={closeModalMock}
      />
    );

    // must fill out URL to submit because field is always showing
    fireEvent.input(screen.getByRole('textbox'), {
      target: { value: 'testUrl' }
    });
    fireEvent.click(screen.getByText('Add'));
    await waitFor(() => {
      expect(screen.getByText(/Close Error/)).toBeInTheDocument();
    });
  });

  it('should show error notification', async () => {
    (useUploadLibraryItem as jest.Mock).mockImplementation(() => ({
      uploadLibraryItem: uploadLibraryItemMock,
      uploadLibraryItemLoading: false,
      uploadLibraryItemError: false,
      uploadLibraryItemData: {
        libraryItems: {}
      }
    }));
    renderV3(
      <AddLibraryItemModalContent
        forceMultiplierId="123"
        forceMultiplierVersion="1"
        missionPartnerId="test"
        setLibraryItems={jest.fn()}
        disabled={false}
        loading={false}
        close={closeModalMock}
      />
    );

    fireEvent.click(screen.getByText('DropArea'));
    const error = screen.getByText(/Close Error/);
    expect(error).toBeInTheDocument();
    fireEvent.click(error);
    expect(error).not.toBeInTheDocument();
  });

  it('should close the modal', async () => {
    renderV3(
      <AddLibraryItemModalContent
        forceMultiplierId="123"
        forceMultiplierVersion="1"
        missionPartnerId="test"
        setLibraryItems={jest.fn()}
        disabled={false}
        loading={false}
        close={closeModalMock}
      />
    );

    fireEvent.click(screen.getByText(/Cancel/));
    await waitFor(() => {
      expect(closeModalMock).toHaveBeenCalled();
    });
  });
});
