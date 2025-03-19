import { renderV3, screen } from '@@/test-utils';
import { LearnersTabs } from './LearnersTabs';

jest.mock('../MissionPartnerLearnersTab/MissionPartnerLearnersTab', () => {
  const MockLearnersTab = () => <div data-testid="mock-learners-tab" />;
  MockLearnersTab.displayName = 'MockMissionPartnerLearnersTab';
  return MockLearnersTab;
});

jest.mock('../MissionPartnerRequestsTab/MissionPartnerRequestsTab', () => {
  const MockRequestsTab = () => <div data-testid="mock-requests-tab" />;
  MockRequestsTab.displayName = 'MockMissionPartnerRequestsTab';
  return MockRequestsTab;
});

jest.mock('@cerberus/react', () => ({
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Tabs: ({ children, ...props }) => <div {...props}>{children}</div>,
  TabPanel: ({ children, ...props }) => <div {...props}>{children}</div>,
  TabsList: ({ children, ...props }) => <div {...props}>{children}</div>,
  Tab: ({ children, ...props }) => <div {...props}>{children}</div>
}));

jest.mock('@/api/mission-partner/useGetMissionPartnerById', () => ({
  useGetMissionPartnerById: jest.fn(() => ({
    data: { findMissionPartnerById: { name: 'Test Partner' } }
  }))
}));
jest.mock('@/api/mission-partner/useFindLearnersTotal', () => ({
  useFindLearnersTotal: jest.fn(() => ({
    refetchLearnersTotal: jest.fn()
  }))
}));
jest.mock('@/api/mission-partner-requests', () => ({
  useFindOpenForMissionPartner: jest.fn(() => ({
    findOpenForMissionPartnerData: [{ id: 1 }, { id: 2 }]
  }))
}));

describe('LearnersTabs', () => {
  it('renders dynamically loaded tabs', async () => {
    renderV3(
      <LearnersTabs missionPartnerId="123" missionPartherRequestCount={2} />
    );

    expect(screen.getByText('Learners')).toBeInTheDocument();
    expect(
      screen.getByText('Mission Partner Requests (2)')
    ).toBeInTheDocument();

    expect(screen.getByTestId('mock-learners-tab')).toBeInTheDocument();
    expect(screen.getByTestId('mock-requests-tab')).toBeInTheDocument();
  });
});
