import { renderV3, screen, userEvent, waitFor } from '@@/test-utils';
import StatusBarChart from './StatusBarChart';
import {
  useFindMissionPartnerById,
  useGetCoursesQuarterlyByMissionPartner,
  useGetPlansQuarterlyByMissionPartner
} from '@/api/mission-partner';

jest.mock('@/api/mission-partner');

jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  Text: ({ children }) => <div>{children}</div>
}));

jest.mock('react-chartjs-2', () => ({
  Bar: ({ options }) => {
    const { scales } = options;
    const { plugins } = options;

    // Simulate the usage of scales, plugins and callbacks
    const yScale = scales.y;
    const { tooltip } = plugins;

    const yTicksCallback: (value: number, index: number) => string =
      yScale.ticks.callback;
    yTicksCallback(0, 0);

    const tooltipTitle: () => string = tooltip.callbacks.title;
    tooltipTitle();

    const tooltipLabelCallback: ({ label }: { label: string }) => string =
      tooltip.callbacks.label;
    tooltipLabelCallback({ label: 'Q2 2022' });

    const tooltipAfterLabelCallback: ({
      dataIndex,
      dataset: { label }
    }: {
      dataIndex: number;
      dataset: { label: string };
    }) => string = tooltip.callbacks.afterLabel;
    tooltipAfterLabelCallback({
      dataIndex: 0,
      dataset: { label: 'Completed' }
    });

    return <div>Bar</div>;
  }
}));

const mockMissionPartner = {
  affiliateId: '1',
  id: '1',
  logoUrl: null,
  name: 'test 1',
  exams: [],
  courses: [],
  scorms: [],
  surveys: [],
  forceMultipliers: [],
  labs: []
};

describe('status bar chart', () => {
  beforeEach(() => {
    jest.resetModules();
    (useFindMissionPartnerById as jest.Mock).mockReturnValue({
      missionPartnerLoading: false,
      missionPartnerError: null,
      missionPartner: mockMissionPartner,
      refetchMissionPartner: jest.fn(async () => Promise.resolve())
    });
    (useGetPlansQuarterlyByMissionPartner as jest.Mock).mockReturnValue({
      getPlansQuarterlyByMissionPartnerLoading: false,
      getPlansQuarterlyByMissionPartnerError: false,
      getPlansQuarterlyByMissionPartner: [
        {
          quarter: 'Q2 2022',
          assigned: { numberOfUsers: 5, percentageOfUsers: 0.0847 },
          started: { numberOfUsers: 27, percentageOfUsers: 0.4576 },
          stopped: { numberOfUsers: 20, percentageOfUsers: 0.3389 },
          completed: { numberOfUsers: 7, percentageOfUsers: 0.1186 },
          total: 59
        },
        {
          quarter: 'Q3 2022',
          assigned: { numberOfUsers: 5, percentageOfUsers: 0.0847 },
          started: { numberOfUsers: 27, percentageOfUsers: 0.4576 },
          stopped: { numberOfUsers: 20, percentageOfUsers: 0.3389 },
          completed: { numberOfUsers: 7, percentageOfUsers: 0.1186 },
          total: 59
        },
        {
          quarter: 'Q4 2022',
          assigned: { numberOfUsers: 5, percentageOfUsers: 0.0847 },
          started: { numberOfUsers: 27, percentageOfUsers: 0.4576 },
          stopped: { numberOfUsers: 20, percentageOfUsers: 0.3389 },
          completed: { numberOfUsers: 7, percentageOfUsers: 0.1186 },
          total: 59
        },
        {
          quarter: 'Q1 2023',
          assigned: { numberOfUsers: 5, percentageOfUsers: 0.0847 },
          started: { numberOfUsers: 27, percentageOfUsers: 0.4576 },
          stopped: { numberOfUsers: 20, percentageOfUsers: 0.3389 },
          completed: { numberOfUsers: 7, percentageOfUsers: 0.1186 },
          total: 59
        },
        {
          quarter: 'Q2 2023',
          assigned: { numberOfUsers: 5, percentageOfUsers: 0.0847 },
          started: { numberOfUsers: 27, percentageOfUsers: 0.4576 },
          stopped: { numberOfUsers: 20, percentageOfUsers: 0.3389 },
          completed: { numberOfUsers: 7, percentageOfUsers: 0.1186 },
          total: 59
        },
        {
          quarter: 'Q3 2023',
          assigned: { numberOfUsers: 10, percentageOfUsers: 0.0096 },
          started: { numberOfUsers: 212, percentageOfUsers: 0.2046 },
          stopped: { numberOfUsers: 702, percentageOfUsers: 0.6776 },
          completed: { numberOfUsers: 112, percentageOfUsers: 0.1081 },
          total: 1036
        }
      ]
    });
    (useGetCoursesQuarterlyByMissionPartner as jest.Mock).mockReturnValue({
      getCoursesQuarterlyByMissionPartnerLoading: false,
      getCoursesQuarterlyByMissionPartnerError: false,
      getCoursesQuarterlyByMissionPartner: [
        {
          quarter: 'Q2 2023',
          started: { numberOfUsers: 27, percentageOfUsers: 0.4576 },
          stopped: { numberOfUsers: 20, percentageOfUsers: 0.3389 },
          completed: { numberOfUsers: 7, percentageOfUsers: 0.1186 },
          total: 59
        },
        {
          quarter: 'Q3 2023',
          started: { numberOfUsers: 212, percentageOfUsers: 0.2046 },
          stopped: { numberOfUsers: 702, percentageOfUsers: 0.6776 },
          completed: { numberOfUsers: 112, percentageOfUsers: 0.1081 },
          total: 1036
        }
      ]
    });
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should render plans component', () => {
    renderV3(<StatusBarChart missionPartnerId="mp1" statusType="Plans" />);

    expect(screen.getByText('Plans by')).toBeInTheDocument();
    expect(screen.getByText('status')).toBeInTheDocument();
    expect(screen.getByText('Bar')).toBeInTheDocument();
  });

  it('should render courses component', () => {
    renderV3(<StatusBarChart missionPartnerId="mp1" statusType="Courses" />);

    expect(screen.getByText('Courses by')).toBeInTheDocument();
    expect(screen.getByText('status')).toBeInTheDocument();
    expect(screen.getByText('Bar')).toBeInTheDocument();
  });

  //TODO: Add new loading tests when animation is added

  it('should render null state on hover plans', async () => {
    (useGetPlansQuarterlyByMissionPartner as jest.Mock).mockReturnValue({
      getPlansQuarterlyByMissionPartnerLoading: false,
      getPlansQuarterlyByMissionPartnerError: false,
      getPlansQuarterlyByMissionPartner: [
        {
          quarter: 'Q2 2022',
          assigned: { numberOfUsers: 0, percentageOfUsers: 0 },
          started: { numberOfUsers: 0, percentageOfUsers: 0 },
          stopped: { numberOfUsers: 0, percentageOfUsers: 0 },
          completed: { numberOfUsers: 0, percentageOfUsers: 0 },
          total: 0
        }
      ]
    });
    renderV3(<StatusBarChart missionPartnerId="mp1" statusType="Plans" />);

    await waitFor(() => {
      userEvent.hover(screen.getByText('status'));
      const messageElement = screen.getByText(
        'their progress on plans will appear here'
      );
      expect(messageElement).toBeInTheDocument();
    });
  });

  it('should render null state on hover courses', async () => {
    (useGetCoursesQuarterlyByMissionPartner as jest.Mock).mockReturnValue({
      getCoursesQuarterlyByMissionPartnerLoading: false,
      getCoursesQuarterlyByMissionPartnerError: false,
      getCoursesQuarterlyByMissionPartner: [
        {
          quarter: 'Q2 2022',
          started: { numberOfUsers: 0, percentageOfUsers: 0 },
          stopped: { numberOfUsers: 0, percentageOfUsers: 0 },
          completed: { numberOfUsers: 0, percentageOfUsers: 0 },
          total: 0
        }
      ]
    });
    renderV3(<StatusBarChart missionPartnerId="mp1" statusType="Courses" />);

    await waitFor(() => {
      userEvent.hover(screen.getByText('status'));
      expect(
        screen.getByText('their progress on courses will appear here')
      ).toBeInTheDocument();
    });
  });
});
