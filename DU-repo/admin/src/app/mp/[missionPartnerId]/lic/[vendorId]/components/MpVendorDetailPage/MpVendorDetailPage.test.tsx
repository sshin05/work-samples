import {
  renderV3,
  screen,
  fireEvent,
  waitFor,
  setupResizeObserver
} from '@@/test-utils';
import {
  useFindMissionPartnerById,
  useUpdateMissionPartner
} from '@/api/mission-partner';
import {
  useFindLicensesByMissionPartnerAndVendor,
  useAssignLicenseByMissionPartnerAndVendorAndUser,
  useExportMissionPartnerLicensesForVendor,
  useRemoveLicenses,
  useFindLicenseStatusCounts
} from '@/api/license';
import { useAddLicenseToUsers } from '@/api/user';
import { useRevokeVendorLicensesForUsers } from '@/api/users';
import { useRouteParams } from '@/hooks/useRouteParams';
import { MpVendorDetailPage } from './MpVendorDetailPage';
import { useFindUsersBySearchTextLazy } from '@/api/user/useFindUsersBySearchTextLazy';
import { useIsDuAdmin } from '@/hooks/useCurrentSession/useCurrentSession';

setupResizeObserver();

jest.mock('@/api/user');
jest.mock('@/api/users');
jest.mock('@/api/user/useFindUsersBySearchTextLazy');
jest.mock('@/api/mission-partner');
jest.mock('@/api/license');
jest.mock('@/hooks/useRouteParams');
jest.mock('@/hooks/useCurrentSession/useCurrentSession');
jest.mock('@/components_new/table/components/NoDataMessage', () => ({
  NoDataMessage: () => <div>No data message</div>
}));

const mockNotify = jest.fn();
jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
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
  NotificationCenter: ({ children }) => <div>{children}</div>
}));

jest.mock(
  '../VendorLicenseTable/components/RevokeLicensesFromUsersModal',
  () => ({
    RevokeLicensesFromUsersModal: () => (
      <div>MockRemoveLicensesFromUsersModal</div>
    )
  })
);

jest.mock('../../../components/AddLicensesToUsers', () => ({
  AddLicensesToUsers: () => <div>MockAddLicensesToUsers</div>
}));

jest.mock('../UpdateLicenseQuantityModal', () => ({
  UpdateLicenseQuantityModal: () => <div>MockUpdateLicenseQuantityModal</div>
}));

const vendor = {
  vendorId: 'toontown',
  vendorName: 'Toontown'
};

const missionPartner = {
  affiliateId: 'a1',
  id: 'mp1',
  logoUrl: null,
  name: 'Disney',
  provisionedLicenses: [
    {
      vendorId: vendor.vendorId,
      vendorName: vendor.vendorName,
      provisioned: 1001,
      autoAssignmentEnabled: true
    }
  ]
};

const findLicensesByMissionPartnerAndVendor = [
  {
    ...vendor,
    userId: '1988',
    userFirstName: 'Roger',
    userLastName: 'Rabbit',
    userEmail: 'roger@toontown.com',
    missionPartnerId: missionPartner.id,
    missionPartnerName: missionPartner.name,
    assignedAt: '1988-06-22T11:26:01.752Z',
    lastUsedAt: '2023-04-23T18:26:01.752Z'
  }
];

describe('ManageVendorLicenses', () => {
  const mockRefetchLicensesByMissionPartnerAndVendor = jest.fn();
  const mockAddLicenseToUsers = jest.fn();
  const mockExportMissionPartnerLicensesForVendor = jest.fn();
  const mockRemoveLicenses = jest.fn();
  const mockRevokeLicenses = jest.fn();
  const mockUpdateMissionPartner = jest.fn();

  beforeAll(() => {
    (useFindMissionPartnerById as jest.Mock).mockReturnValue({
      missionPartner,
      missionPartnerError: null,
      missionPartnerLoading: false,
      refetchMissionPartner: jest.fn()
    });

    (useFindLicensesByMissionPartnerAndVendor as jest.Mock).mockReturnValue({
      licenses: [...findLicensesByMissionPartnerAndVendor],
      licensesLoading: false,
      licensesError: null,
      licensesTotal: 1,
      refetchLicenses: mockRefetchLicensesByMissionPartnerAndVendor
    });

    (
      useAssignLicenseByMissionPartnerAndVendorAndUser as jest.Mock
    ).mockReturnValue({
      assignLicenseByMissionPartnerAndVendorAndUser: jest
        .fn()
        .mockResolvedValue({}),
      assignLicenseByMissionPartnerAndVendorAndUserLoading: false,
      assignLicenseByMissionPartnerAndVendorAndUserError: null,
      assignLicenseByMissionPartnerAndVendorAndUserData: null
    });

    (useFindUsersBySearchTextLazy as jest.Mock).mockReturnValue({
      fetchUsersBySearch: jest.fn().mockResolvedValue({}),
      usersBySearchLoading: false,
      usersBySearchError: null,
      usersBySearch: null
    });

    (useAddLicenseToUsers as jest.Mock).mockReturnValue({
      addLicenseToUsers: mockAddLicenseToUsers,
      addLicenseToUsersLoading: false,
      addLicenseToUsersError: null,
      addLicenseToUsersData: null
    });

    (useExportMissionPartnerLicensesForVendor as jest.Mock).mockReturnValue({
      exportMissionPartnerLicensesForVendor:
        mockExportMissionPartnerLicensesForVendor,
      exportMissionPartnerLicensesForVendorLoading: false,
      exportMissionPartnerLicensesForVendorError: null,
      exportMissionPartnerLicensesForVendorData: null
    });

    (useRemoveLicenses as jest.Mock).mockReturnValue({
      removeLicenses: mockRemoveLicenses,
      removeLicensesLoading: false,
      removeLicensesError: null,
      removeLicensesData: null
    });

    (useRevokeVendorLicensesForUsers as jest.Mock).mockReturnValue({
      revokeVendorLicensesForUsers: mockRevokeLicenses,
      revokeVendorLicensesForUsersLoading: false,
      revokeVendorLicensesForUsersError: null,
      revokeVendorLicensesForUsersData: null
    });

    (useRouteParams as jest.Mock).mockReturnValue({
      missionPartnerId: 'mp1',
      vendorId: 'toontown'
    });

    (useFindLicenseStatusCounts as jest.Mock).mockReturnValue({
      licenseStatusCounts: [
        {
          vendorId: 'toontown',
          vendorName: 'Toontown',
          active: 1,
          inactive: 0,
          available: 0
        }
      ],
      licenseStatusCountsLoading: false,
      licenseStatusCountsError: null,
      refetchLicenseStatusCounts: jest.fn()
    });

    (useUpdateMissionPartner as jest.Mock).mockReturnValue({
      updateMissionPartner: mockUpdateMissionPartner,
      updateMissionPartnerLoading: false,
      updateMissionPartnerError: null
    });

    (useIsDuAdmin as jest.Mock).mockReturnValue({
      isDuAdmin: true
    });
  });

  afterEach(() => {
    mockNotify.mockRestore();
    jest.clearAllMocks();
  });

  describe('auto-assignment', () => {
    it('should render the checkbox with the correct state', () => {
      renderV3(<MpVendorDetailPage />);

      const checkbox = screen.getByLabelText(
        'Check the box to allow users to automatically receive a license when requested'
      );

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeChecked();
    });

    it('should successfully update auto-assignment', async () => {
      mockUpdateMissionPartner.mockResolvedValueOnce({});

      renderV3(<MpVendorDetailPage />);

      fireEvent.click(
        screen.getByText(
          'Check the box to allow users to automatically receive a license when requested'
        )
      );

      await waitFor(() => {
        expect(mockUpdateMissionPartner).toHaveBeenCalled();
        expect(mockNotify).toHaveBeenCalledWith({
          palette: 'success',
          heading: 'Success',
          description: 'Updated vendor successfully.'
        });
      });
    });

    it('should fail to update auto-assignment', async () => {
      mockUpdateMissionPartner.mockRejectedValueOnce({});

      renderV3(<MpVendorDetailPage />);

      fireEvent.click(
        screen.getByText(
          'Check the box to allow users to automatically receive a license when requested'
        )
      );

      await waitFor(() => {
        expect(mockUpdateMissionPartner).toHaveBeenCalled();
        expect(mockNotify).toHaveBeenCalledWith({
          palette: 'danger',
          heading: 'Error',
          description: 'Failed to update vendor.'
        });
      });
    });
  });

  describe('Page Renders', () => {
    it('renders the page', () => {
      renderV3(<MpVendorDetailPage />);

      const [missionPartnerName] = screen.getAllByText(missionPartner.name);
      expect(missionPartnerName).toBeInTheDocument();
      expect(screen.getByText(/1,001 Provisioned/i)).toBeInTheDocument();
      expect(screen.getByText(/1 Assigned/i)).toBeInTheDocument();
      expect(screen.getByText(/Available/i)).toBeInTheDocument();
      expect(
        screen.getByText('MockUpdateLicenseQuantityModal')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Check the box to allow users to automatically receive a license when requested'
        )
      ).toBeInTheDocument();
      expect(screen.getByLabelText('add Assign License')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('User Email')).toBeInTheDocument();
      expect(screen.getByText('Assigned At')).toBeInTheDocument();
      expect(screen.getByText('Last Used')).toBeInTheDocument();

      expect(screen.getByText('Roger Rabbit')).toBeInTheDocument();
      expect(screen.getByText('roger@toontown.com')).toBeInTheDocument();
      expect(screen.getByText('22 Jun 1988')).toBeInTheDocument();
      expect(screen.getByText('23 Apr 2023')).toBeInTheDocument();
      expect(screen.getByText(/1 - 1 of 1 item/i)).toBeInTheDocument();
    });

    it('renders the page with no licenses', () => {
      (useFindLicensesByMissionPartnerAndVendor as jest.Mock).mockReturnValue({
        licenses: [],
        licensesTotal: 0,
        licensesLoading: false,
        licensesError: null,
        refetchLicenses: jest.fn()
      });
      (useRouteParams as jest.Mock).mockReturnValue({
        missionPartnerId: 'mp1',
        vendorId: 0
      });

      renderV3(<MpVendorDetailPage />);

      expect(screen.getByText(`No data message`)).toBeInTheDocument();
    });

    it('should not show update license quantity ui for non admin', () => {
      (useIsDuAdmin as jest.Mock).mockImplementation(() => ({
        isDuAdmin: false
      }));

      renderV3(<MpVendorDetailPage />);

      expect(
        screen.queryByRole('button', { name: 'Update' })
      ).not.toBeInTheDocument();
    });
  });

  describe('Assign Licenses', () => {
    it('should open add modal', async () => {
      (useFindLicensesByMissionPartnerAndVendor as jest.Mock).mockReturnValue({
        licenses: [...findLicensesByMissionPartnerAndVendor],
        licensesTotal: 1,
        licensesLoading: false,
        licensesError: null,
        refetchLicenses: jest.fn()
      });

      renderV3(<MpVendorDetailPage />);

      fireEvent.click(screen.getByText('Assign License'));
      expect(screen.getByText('MockAddLicensesToUsers')).toBeInTheDocument();
    });
  });

  describe('Export Licenses', () => {
    it('should export licenses', async () => {
      (useFindLicensesByMissionPartnerAndVendor as jest.Mock).mockReturnValue({
        licenses: [...findLicensesByMissionPartnerAndVendor],
        licensesLoading: false,
        licensesError: null,
        refetchLicenses: jest.fn()
      });

      mockExportMissionPartnerLicensesForVendor.mockResolvedValue(
        Promise.resolve()
      );

      renderV3(<MpVendorDetailPage />);

      await waitFor(() => {
        fireEvent.click(screen.getByLabelText('download table content'));
        expect(mockExportMissionPartnerLicensesForVendor).toHaveBeenCalled();
        expect(mockNotify).toHaveBeenCalledWith({
          palette: 'success',
          heading: 'Success',
          description: `The export has been started. You will receive an email when it is ready.`
        });
      });
    });

    it('should fail to export licenses', async () => {
      (useFindLicensesByMissionPartnerAndVendor as jest.Mock).mockReturnValue({
        licenses: [...findLicensesByMissionPartnerAndVendor],
        licensesTotal: 1,
        licensesLoading: false,
        licensesError: null,
        refetchLicenses: jest.fn()
      });

      mockExportMissionPartnerLicensesForVendor.mockImplementation(() =>
        Promise.reject()
      );

      renderV3(<MpVendorDetailPage />);

      await waitFor(() => {
        fireEvent.click(screen.getByLabelText('download table content'));
        expect(mockExportMissionPartnerLicensesForVendor).toHaveBeenCalled();
        expect(mockNotify).toHaveBeenCalledWith({
          palette: 'danger',
          heading: 'Error',
          description: 'There was an error exporting licenses.'
        });
      });
    });
  });
});
