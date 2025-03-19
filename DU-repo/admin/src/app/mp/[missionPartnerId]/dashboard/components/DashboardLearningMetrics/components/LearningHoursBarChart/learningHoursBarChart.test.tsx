import { renderV3, screen, userEvent, waitFor } from '@@/test-utils';
import { LearningHoursBarChart } from './LearningHoursBarChart';
import { useFindCategorizedTimeSpentLearningMissionPartnerDashboard } from '@/api/mission-partner';

jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  Text: ({ children }) => <div>{children}</div>
}));

jest.mock('react-chartjs-2', () => ({
  Bar: ({ options }) => {
    const { scales } = options;
    const { plugins } = options;

    // Simulate the usage of scales, plugins and callbacks
    const xScale = scales.x;
    const { tooltip } = plugins;

    const xTicksCallback: (value: number, index: number) => string =
      xScale.ticks.callback;
    xTicksCallback(0, 0);

    const tooltipTitle: () => string = tooltip.callbacks.title;
    tooltipTitle();

    const tooltipLabelCallback: ({
      dataIndex
    }: {
      dataIndex: number;
    }) => string = tooltip.callbacks.label;
    tooltipLabelCallback({ dataIndex: 0 });

    const tooltipAfterLabelCallback: ({
      dataIndex
    }: {
      dataIndex: number;
    }) => string = tooltip.callbacks.afterLabel;
    tooltipAfterLabelCallback?.({
      dataIndex: 0
    });

    return <div>Bar</div>;
  }
}));

//TODO: fix these tests once the component actually functions and is addd back in

describe('learning hours bar chart', () => {
  beforeEach(() => {
    (
      useFindCategorizedTimeSpentLearningMissionPartnerDashboard as jest.Mock
    ).mockReturnValue({
      findCategorizedTimeSpentLearningLoading: false,
      findCategorizedTimeSpentLearningError: false,
      findCategorizedTimeSpentLearning: []
    });
  });
  it.skip('should render component', () => {
    renderV3(<LearningHoursBarChart missionPartnerId="mp1" />);

    expect(screen.getByText('OVER ALL TIME')).toBeInTheDocument();
    expect(screen.getByText('Hours spent learning')).toBeInTheDocument();
    expect(screen.getByText('Bar')).toBeInTheDocument();
  });

  it.skip('should render loading status', () => {
    const { container } = renderV3(
      <LearningHoursBarChart missionPartnerId="mp1" />
    );

    expect(
      container.querySelector('.react-loading-skeleton')
    ).toBeInTheDocument();
  });

  it.skip('should render null state on hover', async () => {
    renderV3(<LearningHoursBarChart missionPartnerId="mp1" />);

    userEvent.hover(screen.getByText('Hours spent learning'));
    await waitFor(() => {
      expect(
        screen.getByText(
          'Once your learners start training, their hours logged will appear here.'
        )
      ).toBeInTheDocument();
    });
  });
});
