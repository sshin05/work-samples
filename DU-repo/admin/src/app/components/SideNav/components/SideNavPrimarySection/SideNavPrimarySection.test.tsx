import { renderV3 as render, screen } from '@@/test-utils';
import { SideNavPrimarySection } from './SideNavPrimarySection';
import { useParams, usePathname } from 'next/navigation';
import { useFindMissionPartnerById } from '@/api/mission-partner/useFindMissionPartnerById';
import { useFindOpenForMissionPartner } from '@/api/mission-partner-requests/useFindOpenForMissionPartner';
import { useFindOpenLicenseRequests } from '@/api/license-requests/useFindOpenLicenseRequests';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  usePathname: jest.fn()
}));

jest.mock('@/api/mission-partner/useFindMissionPartnerById', () => ({
  useFindMissionPartnerById: jest.fn()
}));

jest.mock(
  '@/api/mission-partner-requests/useFindOpenForMissionPartner',
  () => ({
    useFindOpenForMissionPartner: jest.fn()
  })
);
jest.mock('@/api/license-requests/useFindOpenLicenseRequests', () => ({
  useFindOpenLicenseRequests: jest.fn()
}));

jest.mock('@/hooks/useCurrentSession/useCurrentSession', () => ({
  useIsDuAdmin: () => ({ isDuAdmin: false })
}));

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn().mockReturnValue({
    loading: false,
    error: null,
    data: null,
    refetch: jest.fn()
  })
}));

const mockNotify = jest.fn();
jest.mock('@cerberus/react', () => {
  const actual = jest.requireActual('@cerberus/react');
  return {
    ...actual,
    useModal: jest.fn(() => ({
      modalRef: { current: null },
      show: jest.fn(),
      close: jest.fn(),
      isOpen: true
    })),
    useNotificationCenter: jest.fn(() => ({
      notify: mockNotify
    })),
    formatNotifyCount: jest.fn(),
    NotificationCenter: ({ children }) => <div>{children}</div>,
    Menu: ({ children }) => <div>{children}</div>,
    MenuItem: ({ children, onClick }) => (
      <button onClick={onClick}>{children}</button>
    ),
    MenuTrigger: ({ children }) => <div>{children}</div>,
    MenuContent: ({ children }) => <div>{children}</div>,
    MenuSeparator: ({ children }) => <div>{children}</div>
  };
});

describe('SideNavPrimarySection', () => {
  const mockMissionPartner = { name: 'test 1' };
  const mockRequests = {
    total: 2,
    data: [
      {
        id: '1',
        name: 'Request 1'
      },
      {
        id: '2',
        name: 'Request 2'
      }
    ]
  };
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('missionPartnerId=1');
    (useFindMissionPartnerById as jest.Mock).mockReturnValue({
      missionPartner: mockMissionPartner
    });
    (useFindOpenForMissionPartner as jest.Mock).mockReturnValue({
      findOpenForMissionPartner: jest.fn(),
      findOpenForMissionPartnerData: [
        {
          missionPartnerId: '1',
          missionPartnerName: 'Air Force 1',
          userId: '12345',
          userFirstName: 'first',
          userLastName: 'last',
          userEmail: 'email',
          status: 'Open',
          requestedAt: new Date('01-02-2023'),
          approvedAt: null,
          declinedAt: null
        }
      ]
    });
    (useFindOpenLicenseRequests as jest.Mock).mockReturnValue({
      requests: mockRequests
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render SideNavMpPrimaryLinks when missionPartnerId exists', () => {
    (useParams as jest.Mock).mockReturnValue({ missionPartnerId: '123' });

    render(<SideNavPrimarySection />);

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });

  it('should not render SideNavMpPrimaryLinks when missionPartnerId is undefined', () => {
    (useParams as jest.Mock).mockReturnValue({});

    render(<SideNavPrimarySection />);

    expect(screen.queryByText('SideNavMpPrimaryLinks')).toBeNull();
  });

  it('should render Menu component', () => {
    (useParams as jest.Mock).mockReturnValue({ missionPartnerId: '123' });

    render(<SideNavPrimarySection />);

    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('should render SideNavSysPrimaryLinks when path starts with /sys', () => {
    (useParams as jest.Mock).mockReturnValue({});
    (usePathname as jest.Mock).mockReturnValue('/sys');

    render(<SideNavPrimarySection />);

    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
  });

  it('should not render SideNavSysPrimaryLinks when path does not start with /sys', () => {
    (useParams as jest.Mock).mockReturnValue({});
    (usePathname as jest.Mock).mockReturnValue('/mp/123');

    render(<SideNavPrimarySection />);

    expect(screen.queryByText(/Overview/i)).not.toBeInTheDocument();
  });
});
