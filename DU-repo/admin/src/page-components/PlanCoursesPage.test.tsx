import { render, screen, userEvent, waitFor } from '@@/test-utils';
import {
  useAggregateTranscriptItemsForTrainingPlan,
  useAggregateTrainingPlanVersions
} from '@/api/course';
import { useExportCourseLevelMetricsForTrainingPlan } from '@/api/mission-partner';
import PlanCoursesPage from './PlanCoursesPage';
import { routeGenerators, getRouteUrl } from '@/utils/getRouteUrl';
import { useRouter } from 'next/navigation';

jest.mock('@/api/mission-partner');
jest.mock('@/api/course');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

const mockNotify = jest.fn();
jest.mock('@cerberus/react', () => ({
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Button: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Input: ({ value = '', onChange }) => (
    <input value={value} onChange={onChange} />
  ),
  Field: ({ children }) => <div>{children}</div>,
  Label: ({ children }) => <div>{children}</div>,
  IconButton: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Table: ({ children }) => <table>{children}</table>,
  Td: ({ children }) => <td>{children}</td>,
  Tr: ({ children }) => <tr>{children}</tr>,
  Th: ({ children }) => <th>{children}</th>,
  Thead: ({ children }) => <thead>{children}</thead>,
  Tbody: ({ children }) => <tbody>{children}</tbody>,
  Select: ({ children }) => <select>{children}</select>,
  Option: ({ children }) => <option>{children}</option>
}));

jest.mock('@cerberus/icons', () => ({
  ArrowLeft: () => <div>ArrowLeft</div>,
  Download: () => <div>Download</div>,
  Search: () => <div>Search</div>,
  ArrowsVertical: () => <div>ArrowsVertical</div>,
  Filter: () => <div>Filter</div>,
  SortAscending: () => <div>SortAscending</div>,
  SortDescending: () => <div>SortDescending</div>
}));

jest.mock('@/components_new/form', () => ({
  TextInput: ({ children, ...props }) => <input {...props}>{children}</input>
}));

describe('Plan Courses Page', () => {
  const mockExportMetrics = jest.fn(async () => Promise.resolve());

  let data = [];

  const props = {
    groupId: 'testGroupId',
    missionPartnerId: 'testMpId',
    planType: 'testPlanType',
    planSourceId: 'testPlanSourceId',
    planVersion: '',
    title: 'AWS Cloud Architect',
    sourceToDestinationUrl: 'PlanMetricsPlanLearners'
  };

  beforeEach(() => {
    data = [
      {
        itemId: 'testCourseId1',
        itemTitle: 'Becoming a Cloud Architect — Learn the Fundamentals',
        vendorName: 'DigitalU',
        total: 123,
        started: 0,
        stopped: 0,
        pendingReview: 0,
        markedCompleted: 0,
        completed: 0
      },
      {
        itemId: 'testCourseId2',
        itemTitle: 'Becoming an AWS Cloud Architect — Started',
        vendorName: 'DigitalU',
        total: 0,
        started: 0,
        stopped: 0,
        pendingReview: 0,
        markedCompleted: 0,
        completed: 0
      }
    ];

    (useRouter as jest.Mock).mockReturnValue({
      back: jest.fn(),
      query: {}
    });
    (
      useAggregateTranscriptItemsForTrainingPlan as jest.Mock
    ).mockImplementation(() => ({
      transcriptItems: data,
      transcriptItemsLoading: false
    }));

    (useAggregateTrainingPlanVersions as jest.Mock).mockImplementation(() => ({
      trainingPlanVersions: {
        versions: [],
        versionEnabled: false
      }
    }));

    (
      useExportCourseLevelMetricsForTrainingPlan as jest.Mock
    ).mockImplementation(() => ({
      exportCourseLevelMetricsForTrainingPlan: mockExportMetrics
    }));
  });

  afterEach(() => jest.clearAllMocks());

  it('should render with empty data', () => {
    data = [];
    render(<PlanCoursesPage {...props} />);

    expect(
      screen.getByText('AWS Cloud Architect | Plan Courses')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Once plan items have been added, they will appear here')
    ).toBeInTheDocument();
    expect(screen.getByText('0 items')).toBeInTheDocument();
  });

  it('should render with given data', () => {
    render(<PlanCoursesPage {...props} />);
    expect(
      screen.getByText('AWS Cloud Architect | Plan Courses')
    ).toBeInTheDocument();
    expect(screen.getByText(data[0].itemTitle)).toBeInTheDocument();
    expect(screen.getByText(data[1].itemTitle)).toBeInTheDocument();
    expect(screen.getByText('1 - 2 of 2 items')).toBeInTheDocument();
  });

  it('should properly search for items', async () => {
    render(<PlanCoursesPage {...props} />);

    const searchInput = screen.getByLabelText('search table for value');
    expect(searchInput).toBeInTheDocument();
    userEvent.paste(searchInput, data[0].itemTitle);
    userEvent.type(searchInput, '{enter}');
    await waitFor(() => {
      expect(screen.getByText(data[0].itemTitle)).toBeInTheDocument();
      expect(screen.queryAllByText(data[1].itemTitle)).toHaveLength(0);
    });
  });

  it('should download with the correct hook', () => {
    render(<PlanCoursesPage {...props} />);

    expect(screen.getByText('Download')).toBeInTheDocument();
    userEvent.click(screen.getByText('Download'));
    expect(mockExportMetrics).toHaveBeenCalled();
  });

  it('should properly format links', () => {
    render(<PlanCoursesPage {...props} />);

    expect(screen.getByText('123')).toHaveAttribute(
      'href',
      getRouteUrl(
        routeGenerators.PlanMetricsPlanLearners({
          missionPartnerId: 'testMpId'
        }),
        {
          planType: 'testPlanType',
          planSourceId: 'testPlanSourceId',
          planVersion: '',
          courseId: undefined,
          groupId: 'testGroupId',
          vendor: 'testCourseId1',
          status: 'Total Enrolled',
          title: 'AWS Cloud Architect'
        }
      )
    );
  });
});
