import { renderV3, screen } from '@@/test-utils';
import { MpCohortsPage } from './MpCohortsPage';

jest.mock('../components/CohortsTab/CohortsTab', () => {
  const MockCohortsTab = () => <div data-testid="mock-cohorts-tab" />;
  MockCohortsTab.displayName = 'MockCohortsTab';
  return MockCohortsTab;
});

jest.mock('@cerberus/react', () => ({
  NotificationCenter: ({ children }) => <div>{children}</div>
}));

describe('CohortsPage', () => {
  it('renders the cohorts tab', () => {
    renderV3(<MpCohortsPage missionPartnerId="123" />);
    expect(screen.getByTestId('mock-cohorts-tab')).toBeInTheDocument();
  });
});
