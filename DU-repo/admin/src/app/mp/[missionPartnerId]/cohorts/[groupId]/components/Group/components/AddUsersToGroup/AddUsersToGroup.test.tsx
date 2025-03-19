import { AddUsersToGroup } from './AddUsersToGroup';
import { renderV3, screen, fireEvent, waitFor } from '@@/test-utils';

const userData = {
  email: 'foo@mail.com',
  firstName: 'first',
  lastName: 'last'
};

const mockUsersCsv = new File(
  ['"firstName","lastName", "email"\n"John","Doe","jd@fake.com'],
  'data.csv',
  {
    type: 'text/csv'
  }
);

const mockNotify = jest.fn();
jest.mock('@cerberus/react', () => ({
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  ModalHeader: ({ children }) => <div>{children}</div>,
  ModalHeading: ({ children }) => <div>{children}</div>,
  IconButton: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  )
}));

jest.mock('@/components_new/modals/ImportUsersModal', () => {
  const ImportUsersModal = ({
    onAddSingleUser,
    onAddMultipleUsers,
    onSubmit
  }) => {
    return (
      <div>
        <span>IMPORT USERS MODAL</span>
        <button onClick={() => onAddSingleUser(userData)}>
          ADD SINGLE USER
        </button>
        <button onClick={() => onAddMultipleUsers(mockUsersCsv)}>
          ADD MULTIPLE USERS
        </button>
        <button onClick={onSubmit}>SUBMIT</button>
      </div>
    );
  };
  return { ImportUsersModal };
});

const mockImportSingleUser = jest.fn();
const mockUseImportSingleUser = jest.fn(() => ({
  importSingleUser: mockImportSingleUser,
  importSingleUserLoading: false
}));

const mockImportBulkUsers = jest.fn();
const mockUseImportBulkUsers = jest.fn(() => ({
  importBulkUsers: mockImportBulkUsers,
  importBulkUsersLoading: false
}));

jest.mock('@/api/user', () => ({
  useImportSingleUser: () => mockUseImportSingleUser(),
  useImportBulkUsers: () => mockUseImportBulkUsers()
}));

const defaultProps = {
  onClose: jest.fn(),
  group: {
    id: 'group-id',
    name: 'group-name'
  }
};

describe('AddUsersToGroup component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockImportSingleUser.mockImplementation(() => Promise.resolve());
    mockImportBulkUsers.mockImplementation(() => Promise.resolve());
  });

  it('should render', () => {
    renderV3(<AddUsersToGroup {...defaultProps} />);

    expect(screen.getByText('IMPORT USERS MODAL')).toBeInTheDocument();
  });

  it('should handle single user', () => {
    renderV3(<AddUsersToGroup {...defaultProps} />);
    fireEvent.click(screen.getByText('ADD SINGLE USER'));

    expect(mockImportSingleUser).toHaveBeenCalledWith({
      variables: {
        groupId: 'group-id',
        email: 'foo@mail.com',
        firstName: 'first',
        lastName: 'last'
      }
    });
  });

  it('should handle single user :: error', async () => {
    mockImportSingleUser.mockRejectedValue({
      message: 'error message'
    });

    renderV3(<AddUsersToGroup {...defaultProps} />);
    expect(screen.queryByText('error message')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('ADD SINGLE USER'));

    await waitFor(() => {
      expect(mockNotify).toHaveBeenCalledWith({
        palette: 'danger',
        description: 'There was an error adding a user.',
        heading: 'Error'
      });
    });
  });

  it('should handle multiple users upload', () => {
    renderV3(<AddUsersToGroup {...defaultProps} />);
    fireEvent.click(screen.getByText('ADD MULTIPLE USERS'));

    expect(mockImportBulkUsers).toHaveBeenCalledWith({
      variables: {
        bulkUploadFile: mockUsersCsv,
        groupId: 'group-id'
      }
    });
  });

  it('should handle multiple users :: error on return', async () => {
    mockImportBulkUsers.mockReturnValue({
      data: {
        importBulkUsers: {
          error: 'Duplicate email found in file.'
        }
      }
    });

    renderV3(<AddUsersToGroup {...defaultProps} />);

    expect(
      screen.queryByText('Duplicate email found in file.')
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('ADD MULTIPLE USERS'));

    await waitFor(() => {
      expect(mockNotify).toHaveBeenCalledWith({
        palette: 'danger',
        description: 'Error: Duplicate email found in file.',
        heading: 'Error'
      });
    });
  });

  it('should handle multiple users :: error', async () => {
    mockImportBulkUsers.mockRejectedValue({
      message: 'error message'
    });

    renderV3(<AddUsersToGroup {...defaultProps} />);
    expect(screen.queryByText('error message')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('ADD MULTIPLE USERS'));

    await waitFor(() =>
      expect(mockNotify).toHaveBeenCalledWith({
        palette: 'danger',
        description: 'There was an error adding users.',
        heading: 'Error'
      })
    );
  });
});
