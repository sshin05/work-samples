import { renderV3, screen, waitFor } from '@@/test-utils';
import { MpPlanMetricsPage } from './MpPlanMetricsPage';
import { useFindMissionPartnerMinDetails } from '@/api/mission-partner';
import { useGraphqlErrorHandler } from '@/hooks/useGraphqlErrorHandler';

jest.mock('@/api/mission-partner', () => ({
  useFindMissionPartnerMinDetails: jest.fn()
}));

jest.mock('@/hooks/useGraphqlErrorHandler', () => ({
  useGraphqlErrorHandler: jest.fn()
}));

jest.mock('@/components_new/buttons/BackArrowButton', () => ({
  BackArrowButton: () => <button data-testid="back-arrow-button" />
}));

jest.mock('@/components_new/layout/ContentArea', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="content-area">{children}</div>
  )
}));

jest.mock('@/components_new/typography/PageHeader', () => ({
  __esModule: true,
  PageHeader: ({ children }) => <div>{children}</div>
}));

jest.mock('../PlanMetricsTable/PlanMetricsTable', () => {
  const PlanMetricsTableMock = () => <div data-testid="plan-metrics-table" />;
  PlanMetricsTableMock.displayName = 'PlanMetricsTable';

  return PlanMetricsTableMock;
});

jest.mock('./components/PlanMetricsPageHeader/PlanMetricsPageHeader', () => {
  const PlanMetricsPageHeaderMock = ({ name }: { name?: string }) => (
    <div data-testid="plan-metrics-page-header">{name}</div>
  );
  PlanMetricsPageHeaderMock.displayName = 'PlanMetricsPageHeader';

  return PlanMetricsPageHeaderMock;
});

describe('MpPlanMetricsPage', () => {
  const mockMissionPartnerId = 'partner123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return null if missionPartnerId is missing', () => {
    (useFindMissionPartnerMinDetails as jest.Mock).mockReturnValue({
      missionPartnerMinDetailsLoading: true,
      missionPartnerMinDetailsError: null,
      missionPartnerMinDetails: null
    });

    const { container } = renderV3(
      <MpPlanMetricsPage missionPartnerId={null} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render header, back button, and table when missionPartnerMinDetails is available', async () => {
    const mockMissionPartnerMinDetails = { name: 'Test Partner' };
    (useFindMissionPartnerMinDetails as jest.Mock).mockReturnValue({
      missionPartnerMinDetailsError: null,
      missionPartnerMinDetails: mockMissionPartnerMinDetails
    });
    renderV3(
      <MpPlanMetricsPage
        missionPartnerId={mockMissionPartnerId}
        missionPartnerName="Agency A"
      />
    );

    await waitFor(() => {
      const header = screen.getByTestId('plan-metrics-page-header');
      expect(header).toBeInTheDocument();
      expect(screen.getByText(/Test Partner/i)).toBeInTheDocument();
    });

    expect(screen.getByTestId('plan-metrics-table')).toBeInTheDocument();
    expect(screen.getByTestId('back-arrow-button')).toBeInTheDocument();
  });

  it('should call useGraphqlErrorHandler if there is an error', () => {
    const mockError = new Error('Test error');
    (useFindMissionPartnerMinDetails as jest.Mock).mockReturnValue({
      missionPartnerMinDetailsError: mockError,
      missionPartnerMinDetails: null
    });
    renderV3(<MpPlanMetricsPage missionPartnerId={mockMissionPartnerId} />);
    expect(useGraphqlErrorHandler).toHaveBeenCalledWith(mockError);
  });
});
