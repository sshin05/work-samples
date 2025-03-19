import { screen, renderV3 } from '@@/test-utils';
import DashboardLearningMetrics from './DashboardLearningMetrics';

jest.mock('./components/LearnerDoughnut/LearnerDoughnut', () => {
  const MockLearnerDoughnut = () => <div data-testid="mock-learner-doughnut" />;
  MockLearnerDoughnut.displayName = 'MockStatusBarChart';
  return MockLearnerDoughnut;
});

jest.mock('@/api/users');
jest.mock('@/api/mission-partner');

const mockNotify = jest.fn();
jest.mock('@cerberus/react', () => ({
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  useConfirmModal: jest.fn(() => ({
    show: jest.fn().mockReturnValue(true)
  })),
  ConfirmModal: ({ children }) => <div>{children}</div>
}));

const mockMissionPartner = {
  affiliateId: '1',
  id: '1',
  logoUrl: null,
  name: 'test 1'
};

describe('Mission Partner Dashboard - Learning Metrics', () => {
  it('should render', () => {
    renderV3(
      <DashboardLearningMetrics missionPartnerId={mockMissionPartner.id} />
    );

    expect(screen.getByTestId('mock-learner-doughnut')).toBeInTheDocument();
  });
});
