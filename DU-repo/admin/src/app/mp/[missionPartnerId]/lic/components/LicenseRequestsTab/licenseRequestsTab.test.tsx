import { fireEvent, renderV3, screen, waitFor } from '@@/test-utils';
import {
  useApproveLicenseRequest,
  useDeclineLicenseRequest,
  useExportMissionPartnerLicenseRequests,
  useFindOpenLicenseRequestsFilter,
  useGetVendorsForOpenLicenseRequests,
  useGetBranchesForOpenLicenseRequest
} from '@/api/license-requests';
import type { TextInputProps } from '@/components_new/form/TextInput/TextInput.types';
import LicenseRequestsTab from './LicenseRequestsTab';

jest.mock('@/api/license-requests');
jest.mock('react-use', () => ({
  useMedia: jest.fn()
}));

const mockModalRef = { current: null };
const mockNotify = jest.fn();
jest.mock('@cerberus/react', () => ({
  useModal: jest.fn(() => ({
    modalRef: mockModalRef,
    show: jest.fn(),
    close: jest.fn(),
    isOpen: true
  })),
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  trapFocus: jest.fn(),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Field: ({ children, ...props }) => <div {...props}>{children}</div>,
  Label: ({ children, ...props }) => <div {...props}>{children}</div>,
  Button: ({ children, onClick, ...props }) => (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  ),
  Select: ({ children, ...props }) => <select {...props}>{children}</select>,
  Option: ({ children, ...props }) => <option {...props}>{children}</option>,
  Modal: ({ children, ...props }) => <div {...props}>{children}</div>,
  IconButton: ({ children, onClick, ...props }) => (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  ),
  Input: ({ onChange, ...props }) => <input {...props} onChange={onChange} />,
  Tabs: ({ children, ...props }) => <div {...props}>{children}</div>,
  TabsList: ({ children, ...props }) => <div {...props}>{children}</div>,
  Tab: ({ children, ...props }) => <div {...props}>{children}</div>,
  TabPanel: ({ children, ...props }) => <div {...props}>{children}</div>,
  Table: ({ children }) => <table>{children}</table>,
  Td: ({ children }) => <td>{children}</td>,
  Tr: ({ children }) => <tr>{children}</tr>,
  Th: ({ children }) => <th>{children}</th>,
  Thead: ({ children }) => <thead>{children}</thead>,
  Tbody: ({ children }) => <tbody>{children}</tbody>
}));

jest.mock('@/components_new/modals/CustomModal', () => ({
  CustomModal: ({ customModal, title, onClose, children }) => (
    <div>
      {customModal.isOpen && (
        <>
          <div>{title}</div>
          <button onClick={onClose}>Close</button>
          <div>{children}</div>
        </>
      )}
    </div>
  )
}));

jest.mock('./components/LicenseRequestModalContent', () => {
  const LicenseRequestModalContent = () => (
    <div>
      <p>Mocked License Request Modal</p>
      <button>Deny</button>
    </div>
  );
  LicenseRequestModalContent.displayName = 'LicenseRequestModalContent';
  return { LicenseRequestModalContent };
});

jest.mock('@/components_new/form', () => ({
  TextInput: ({ children }: TextInputProps) => <div>{children}</div>
}));

describe('<LicenseRequestsTab />', () => {
  const mockExportMissionPartnerLicenseRequests = jest.fn(() =>
    Promise.resolve()
  );
  const mockApproveLicenseRequest = jest.fn(() => Promise.resolve());
  const mockDeclineLicenseRequest = jest.fn(() => Promise.resolve());

  const mockRequests = [
    {
      missionPartnerId: '1234',
      missionPartnerName: 'Mission Partner A',
      vendorId: 'udemy',
      vendorName: 'Udemy',
      userId: 'bart',
      userFirstName: 'Bart',
      userLastName: 'Simpson',
      userEmail: 'bart@simpsons.com',
      userOrganization: 'Army',
      id: 'LR1',
      status: 'Open',
      requestedAt: new Date('2022-01-01')
    },
    {
      missionPartnerId: '1234',
      missionPartnerName: 'Mission Partner B',
      vendorId: 'coursera',
      vendorName: 'Coursera',
      userId: 'bart',
      userFirstName: 'Jane',
      userLastName: 'Doe',
      userEmail: 'janeadoe@generic.com',
      userOrganization: 'Air Force',
      id: 'LR2',
      status: 'Open',
      requestedAt: new Date('2021-01-09')
    }
  ];

  const mockMissionPartner = {
    id: '1234',
    name: 'Mission Partner A'
  };

  const getVendors = {
    data: ['Udemy', 'Coursera']
  };

  const getBranches = {
    data: ['Army', 'Air Force']
  };

  beforeEach(() => {
    (useFindOpenLicenseRequestsFilter as jest.Mock).mockReturnValue({
      requests: mockRequests
    });

    (useGetVendorsForOpenLicenseRequests as jest.Mock).mockReturnValue({
      vendorsForOpenLicenseRequests: getVendors.data,
      vendorsForOpenLicenseRequestsLoading: false,
      vendorsForOpenLicenseRequestsError: null
    });

    (useGetBranchesForOpenLicenseRequest as jest.Mock).mockReturnValue({
      branchesForOpenLicenseRequests: getBranches.data,
      branchesForOpenLicenseRequestsLoading: false,
      branchesForOpenLicenseRequestsError: null
    });

    (useApproveLicenseRequest as jest.Mock).mockReturnValue({
      approveLicenseRequest: mockApproveLicenseRequest,
      approveLicenseRequestLoading: false
    });

    (useDeclineLicenseRequest as jest.Mock).mockReturnValue({
      declineLicenseRequest: mockDeclineLicenseRequest,
      declineLicenseRequestLoading: false
    });
    (useExportMissionPartnerLicenseRequests as jest.Mock).mockReturnValue({
      exportMissionPartnerLicenseRequests:
        mockExportMissionPartnerLicenseRequests
    });
  });

  afterEach(() => jest.clearAllMocks());

  describe('rendering', () => {
    it('should render', () => {
      renderV3(
        <LicenseRequestsTab
          loading={false}
          missionPartner={mockMissionPartner}
        />
      );

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Date')).toBeInTheDocument();
      expect(screen.getByText('Vendor')).toBeInTheDocument();
      expect(screen.getByText('Organization')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();

      expect(screen.getByText('Bart Simpson')).toBeInTheDocument();
      expect(screen.queryAllByText('Udemy')[0]).toBeInTheDocument();
      expect(screen.queryAllByText('Army')[0]).toBeInTheDocument();
      expect(screen.queryAllByText('View Request')[0]).toBeInTheDocument();
    });

    it('should open license requests modal', () => {
      renderV3(
        <LicenseRequestsTab
          loading={false}
          missionPartner={mockMissionPartner}
        />
      );

      const viewRequestBtn = screen.queryAllByText('View Request')[0];
      fireEvent.click(viewRequestBtn);
      expect(screen.getByText('Deny')).toBeInTheDocument();
    });
  });

  describe('functionality', () => {
    it('should export license requests', () => {
      renderV3(
        <LicenseRequestsTab
          loading={false}
          missionPartner={mockMissionPartner}
        />
      );

      const exportButton = document.querySelector(
        'button[ariaLabel="download table content"]'
      );
      fireEvent.click(exportButton);
      expect(mockExportMissionPartnerLicenseRequests).toHaveBeenCalledWith(
        '1234',
        'Mission Partner A',
        undefined,
        undefined
      );
    });

    it('should open drawer and reset filter', async () => {
      renderV3(
        <LicenseRequestsTab
          loading={false}
          missionPartner={mockMissionPartner}
        />
      );

      mockModalRef.current = document.createElement('div');

      const toggleFilters = document.querySelector(
        'button[ariaLabel="toggle filters"]'
      );
      fireEvent.click(toggleFilters);

      await waitFor(() => {
        expect(mockModalRef.current).not.toBeNull();
      });

      const [comboBoxOne, comboBoxTwo] = screen.getAllByRole(
        'combobox'
      ) as HTMLSelectElement[];

      fireEvent.change(comboBoxOne, {
        target: { value: 'Army' }
      });
      fireEvent.change(comboBoxTwo, {
        target: { value: 'Coursera' }
      });
      fireEvent.click(screen.getByText('Reset'));
      expect(comboBoxOne.value).toBe('');
    });

    it('open filters and submit', async () => {
      renderV3(
        <LicenseRequestsTab
          loading={false}
          missionPartner={mockMissionPartner}
        />
      );

      const toggleFilters = document.querySelector(
        'button[ariaLabel="toggle filters"]'
      );
      fireEvent.click(toggleFilters);

      expect(screen.getByText('Submit')).toBeInTheDocument();

      const [comboBoxOne, comboBoxTwo] = screen.getAllByRole(
        'combobox'
      ) as HTMLSelectElement[];
      fireEvent.change(comboBoxOne, {
        target: { value: 'Army' }
      });
      fireEvent.change(comboBoxTwo, {
        target: { value: 'Coursera' }
      });

      fireEvent.click(screen.getByText('Submit'));

      await waitFor(() => {
        expect(screen.getAllByText('Coursera')[1]).toBeInTheDocument();
      });
    });
  });
});
