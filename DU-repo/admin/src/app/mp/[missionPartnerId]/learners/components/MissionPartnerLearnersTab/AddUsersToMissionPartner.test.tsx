import {
  renderV3,
  screen,
  fireEvent,
  useModuleMock,
  waitFor
} from '@@/test-utils';
import {
  AddUsersToMissionPartner,
  type AddUsersToMissionPartnerProps
} from './AddUsersToMissionPartner';

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

jest.mock('@/api/user');

jest.mock('@/components_new/modals/ImportUsersModal', () => ({
  ImportUsersModal: props => {
    return (
      <div data-testid="mockNewImportUsersModal">
        <div
          data-testid="onAddSingleUser"
          onClick={() => props.onAddSingleUser(userData)}
        />
        <div
          data-testid="onAddMultipleUsers"
          onClick={() => props.onAddMultipleUsers(mockUsersCsv)}
        />
        {props.error}
      </div>
    );
  }
}));

const mockNotify = jest.fn();

describe('AddUsersToMissionPartner component', () => {
  const defaultProps: AddUsersToMissionPartnerProps = {
    notify: mockNotify,
    onClose: jest.fn(),
    onUsersAdded: jest.fn(),
    missionPartnerId: 'mission-partner-id'
  };

  const mockImportSingleUser = jest.fn();
  const mockImportBulkUsers = jest.fn();

  const useImportSingleUser = useModuleMock(
    'src/api/user',
    'useImportSingleUser'
  );

  const useImportBulkUsers = useModuleMock(
    'src/api/user',
    'useImportBulkUsers'
  );

  beforeEach(() => {
    mockImportSingleUser.mockResolvedValue({});
    mockImportBulkUsers.mockResolvedValue({});

    useImportSingleUser.mockReturnValue({
      importSingleUser: mockImportSingleUser
    });

    useImportBulkUsers.mockReturnValue({
      importBulkUsers: mockImportBulkUsers
    });
  });

  it('should render', () => {
    renderV3(<AddUsersToMissionPartner {...defaultProps} />);

    expect(screen.getByTestId('mockNewImportUsersModal')).toBeInTheDocument();
  });

  it('should handle single user', () => {
    renderV3(<AddUsersToMissionPartner {...defaultProps} />);
    fireEvent.click(screen.getByTestId('onAddSingleUser'));

    expect(mockImportSingleUser).toHaveBeenCalledWith({
      variables: {
        missionPartnerId: 'mission-partner-id',
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

    renderV3(<AddUsersToMissionPartner {...defaultProps} />);
    expect(screen.queryByText('error message')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('onAddSingleUser'));

    expect(await screen.findByText('error message')).toBeInTheDocument();
    await waitFor(() => {
      expect(mockNotify).toHaveBeenCalledWith(
        expect.objectContaining({ heading: 'Error' })
      );
    });
  });

  it('should handle multiple users upload', async () => {
    renderV3(<AddUsersToMissionPartner {...defaultProps} />);
    fireEvent.click(screen.getByTestId('onAddMultipleUsers'));

    expect(mockImportBulkUsers).toHaveBeenCalledWith({
      variables: {
        bulkUploadFile: mockUsersCsv,
        missionPartnerId: 'mission-partner-id'
      }
    });
  });

  it('should handle multiple users :: error', async () => {
    mockImportBulkUsers.mockRejectedValue({
      message: 'error message'
    });

    renderV3(<AddUsersToMissionPartner {...defaultProps} />);
    expect(screen.queryByText('error message')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('onAddMultipleUsers'));

    expect(await screen.findByText('error message')).toBeInTheDocument();
    await waitFor(() => {
      expect(mockNotify).toHaveBeenCalledWith(
        expect.objectContaining({ heading: 'Error' })
      );
    });
  });
});
