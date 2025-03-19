import { renderV3, screen, userEvent, waitFor } from '@@/test-utils';
import { useFindMissionPartnerById } from '@/api/mission-partner';
import LicensesTabs from './LicensesTabs';

jest.mock('../components/LicenseRequestsTab/LicenseRequestsTab', () => {
  const LicenseRequestsTab = () => (
    <div data-testid="mock-license-requests-tab"></div>
  );
  LicenseRequestsTab.displayName = 'LicenseRequestsTab';
  return LicenseRequestsTab;
});

jest.mock('../components/LicensesTab/LicensesTab', () => {
  const LicensesTab = () => <div data-testid="mock-licenses-tab"></div>;
  LicensesTab.displayName = 'LicensesTab';
  return LicensesTab;
});

jest.mock('@/hooks/useRouteParams');
jest.mock('@/api/mission-partner');
jest.mock('@/api/license-requests');

jest.mock('@/hooks/useCurrentSession/useCurrentSession', () => ({
  useIsDuAdmin: jest.fn()
}));

jest.mock('@/components_new/typography/PageHeader', () => ({
  __esModule: true,
  PageHeader: ({ children }) => <div>{children}</div>
}));

const missionPartnerId = '1234';

describe('MissionPartnerVendorsPage', () => {
  beforeEach(() => {
    (useFindMissionPartnerById as jest.Mock).mockReturnValue({
      missionPartnerLoading: false,
      missionPartner: {},
      refetchMissionPartner: jest.fn(async () => Promise.resolve())
    });
  });

  afterEach(() => jest.clearAllMocks());

  it('should render the page with both tabs', () => {
    renderV3(<LicensesTabs missionPartnerId={missionPartnerId} />);
    expect(screen.getByText('Licenses')).toBeInTheDocument();
    expect(screen.getByText('Requests')).toBeInTheDocument();
  });

  it('should render the licenses table by default', () => {
    renderV3(<LicensesTabs missionPartnerId={missionPartnerId} />);
    expect(screen.getByTestId('mock-licenses-tab')).toBeInTheDocument();
  });

  it('should render the license requests table on tab click', async () => {
    renderV3(<LicensesTabs missionPartnerId={missionPartnerId} />);

    const requestsBtn = screen.getByText('Requests');
    expect(requestsBtn).toBeInTheDocument();

    userEvent.click(requestsBtn);
    await waitFor(() => {
      const lrTab = screen.getByTestId('mock-license-requests-tab');
      expect(lrTab).toBeInTheDocument();
    });
  });
});
