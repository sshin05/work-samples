import { AddLicensesToUsers } from './AddLicensesToUsers';
import { renderV3, screen, userEvent, waitFor } from '@@/test-utils';
import { useAddLicenseToUsers } from '@/api/user';
import { useAssignLicenseByMissionPartnerAndVendorAndUser } from '@/api/license';

const mockNotify = jest.fn();
jest.mock('@cerberus/react', () => ({
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  IconButton: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  ModalHeader: ({ children }) => <div>{children}</div>,
  ModalHeading: ({ children }) => <div>{children}</div>
}));

jest.mock('@/components_new/modals/ImportUsersModal', () => ({
  ImportUsersModal: props => (
    <div data-testid="mockAddOrImportUsersModal">
      <div data-testid="title">Add {props.title}</div>
      <div
        data-testid="onAddSingleUser"
        onClick={() => props.onAddSingleUser({ id: 1, name: 'Mock User' })}
      />
      <div
        data-testid="onAddMultipleUsers"
        onClick={() => props.onAddMultipleUsers([{ id: 1, name: 'Mock User' }])}
      />
      <button onClick={props.onClose} type="button">
        Close Me
      </button>
      <div data-testid="onSubmit" onClick={props.onSubmit} />
      {props.error}
    </div>
  )
}));

jest.mock('@/api/user');
jest.mock('@/api/license');

describe('AddLicensesToUsers component', () => {
  const mockOnClose = jest.fn();
  const mockAddLicenseToUsers = jest.fn(() => Promise.resolve());

  const defaultProps = {
    show: true,
    onClose: mockOnClose,
    notify: mockNotify,
    missionPartner: {
      id: 'missionPartnerId'
    },
    vendorId: 'vendorId',
    vendorName: 'vendorName',
    refetchLicenses: jest.fn()
  };

  describe('success', () => {
    beforeEach(() => {
      (useAddLicenseToUsers as jest.Mock).mockReturnValue({
        addLicenseToUsers: mockAddLicenseToUsers
      });

      (
        useAssignLicenseByMissionPartnerAndVendorAndUser as jest.Mock
      ).mockReturnValue({
        assignLicenseByMissionPartnerAndVendorAndUser: jest.fn(() =>
          Promise.resolve()
        )
      });
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should render', () => {
      renderV3(
        <div id="app-root">
          <AddLicensesToUsers {...defaultProps} />
        </div>
      );
      expect(screen.getByText(/add license to user/i)).toBeInTheDocument();
    });

    it('should add single user', async () => {
      renderV3(
        <div id="app-root">
          <AddLicensesToUsers {...defaultProps} />
        </div>
      );

      userEvent.click(screen.getByTestId('onAddSingleUser'));

      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalled();
        expect(mockNotify).toHaveBeenCalledWith({
          palette: 'success',
          heading: 'User Added Successfully',
          description: `User uploaded, you will receive an email when your import is complete`
        });
      });
    });

    it('should add multiple users', async () => {
      renderV3(
        <div id="app-root">
          <AddLicensesToUsers {...defaultProps} />
        </div>
      );

      userEvent.click(screen.getByTestId('onAddMultipleUsers'));

      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalled();
        expect(mockNotify).toHaveBeenCalledWith({
          palette: 'success',
          heading: 'Users Added Successfully',
          description: `File uploaded, you will receive an email when your import is complete`
        });
      });
    });
  });

  describe('fail', () => {
    const mockError = new Error('mockError');

    beforeEach(() => {
      (useAddLicenseToUsers as jest.Mock).mockReturnValue({
        addLicenseToUsers: jest.fn(() => Promise.reject(mockError))
      });

      (
        useAssignLicenseByMissionPartnerAndVendorAndUser as jest.Mock
      ).mockReturnValue({
        assignLicenseByMissionPartnerAndVendorAndUser: jest.fn(() =>
          Promise.reject(mockError)
        )
      });
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should add single user', async () => {
      renderV3(
        <div id="app-root">
          <AddLicensesToUsers {...defaultProps} />
        </div>
      );

      userEvent.click(screen.getByTestId('onAddSingleUser'));

      expect(mockOnClose).not.toHaveBeenCalled();
      expect(mockNotify).not.toHaveBeenCalled();
      await waitFor(() =>
        expect(screen.getByText('mockError')).toBeInTheDocument()
      );
    });

    it('should add multiple users', async () => {
      renderV3(
        <div id="app-root">
          <AddLicensesToUsers {...defaultProps} />
        </div>
      );

      userEvent.click(screen.getByTestId('onAddMultipleUsers'));

      expect(mockOnClose).not.toHaveBeenCalled();
      expect(mockNotify).not.toHaveBeenCalled();
      await waitFor(() =>
        expect(screen.getByText('mockError')).toBeInTheDocument()
      );
    });

    it('should display errors based on return data', async () => {
      (mockAddLicenseToUsers as jest.Mock).mockReturnValue({
        data: {
          addLicenseToUsers: {
            error: 'Duplicate email found in file.'
          }
        }
      });

      (useAddLicenseToUsers as jest.Mock).mockReturnValue({
        addLicenseToUsers: mockAddLicenseToUsers
      });

      renderV3(
        <div id="app-root">
          <AddLicensesToUsers {...defaultProps} />
        </div>
      );

      userEvent.click(screen.getByTestId('onAddMultipleUsers'));

      expect(mockOnClose).not.toHaveBeenCalled();
      expect(mockNotify).not.toHaveBeenCalled();
      await waitFor(() =>
        expect(
          screen.getByText('Duplicate email found in file.')
        ).toBeInTheDocument()
      );
    });
  });
});
