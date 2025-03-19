import { renderV3, screen, userEvent, waitFor } from '@@/test-utils';
import TopItems from './TopItems';
import { useFindMissionPartnerById } from '@/api/mission-partner';
import { useGetTopCourses } from '@/api/training-plan/useGetTopCourses';
import { useGetTopPlans } from '@/api/training-plan/useGetTopPlans';

jest.mock('@/api/mission-partner');
jest.mock('@/api/training-plan/useGetTopCourses');
jest.mock('@/api/training-plan/useGetTopPlans');

jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  Text: ({ children }) => <div>{children}</div>
}));

const mockMissionPartner = {
  affiliateId: '1',
  id: '1',
  logoUrl: null,
  name: 'MockMissionPartnerName',
  exams: [],
  courses: [],
  scorms: [],
  surveys: [],
  forceMultipliers: [],
  labs: []
};

const route =
  'http://localhost/mp/MockMissionPartnerId/plan-metrics/plan?missionPartnerId=MockMissionPartnerId&missionPartnerName=MockMissionPartnerName&planType=Learning%20Path&planSourceId=advanced-cloud-native-architecture&title=Advanced%20Cloud%20Native%20Architecture';

describe('top-items component testing', () => {
  beforeEach(() => {
    jest.resetModules();
    (useFindMissionPartnerById as jest.Mock).mockReturnValue({
      missionPartnerLoading: false,
      missionPartnerError: null,
      missionPartner: mockMissionPartner,
      refetchMissionPartner: jest.fn(async () => Promise.resolve())
    });
    (useGetTopPlans as jest.Mock).mockReturnValue({
      getTopPlansData: [
        {
          title: 'Advanced Cloud Native Architecture',
          planType: 'Learning Path',
          planSourceId: 'advanced-cloud-native-architecture',
          count: 1
        },
        {
          title: 'Advanced Data Engineer',
          planType: 'Learning Path',
          planSourceId: 'advanced-data-engineer',
          count: 1
        },
        {
          title: 'Advanced Front End Web Developer',
          planType: 'Learning Path',
          planSourceId: 'advanced-frontend-developer',
          count: 1
        },
        {
          title: 'Advanced Machine Learning Engineer',
          planType: 'Learning Path',
          planSourceId: 'advanced-ml-engineer',
          count: 1
        },
        {
          title: 'Advanced User Experience Designer',
          planType: 'Learning Path',
          planSourceId: 'advanced-ux-designer',
          count: 1
        }
      ],
      getTopPlansError: false
    });
    (useGetTopCourses as jest.Mock).mockReturnValue({
      topCoursesMetrics: [
        {
          title: 'Post-Test: AWS Cloud Architect — Proficient',
          id: 'cloudacademy#6344f81b-f384-4913-abe3-a08afef69665',
          vendorName: 'Cloud Academy',
          count: 1
        },
        {
          title: 'Pre-Test: AWS Cloud Architect — Proficient',
          id: 'cloudacademy#7a6cc031-d1b1-4f92-a1ed-71ff111abed7',
          vendorName: 'Cloud Academy',
          count: 2
        },
        {
          title: 'AWS DevOps Engineer Professional-Introduction',
          id: 'cloudacademy#aws-devops-engineer-professional-introduction',
          vendorName: 'Cloud Academy',
          count: 2
        },
        {
          title:
            'AWS Global Infrastructure: Availability Zones, Regions, Edge Locations, Regional Edge Caches',
          id: 'cloudacademy#aws-global-infrastructure',
          vendorName: 'Cloud Academy',
          count: 1
        },
        {
          title: 'Cloud Developer - Azure Assessment',
          id: 'udacity#assessment-udacity-cloud-developer-azure',
          vendorName: 'Udacity',
          count: 1
        }
      ],
      topCoursesMetricsLoading: jest.fn()
    });
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should render when given 5 plans and not loading', () => {
    renderV3(
      <TopItems
        missionPartnerId="MockMissionPartnerId"
        topItemsCategory="Plans"
      />
    );

    expect(screen.getByText('Top assigned plans')).toBeInTheDocument();
    expect(
      screen.getAllByText('Advanced Cloud Native Architecture')[0]
    ).toBeInTheDocument();
    expect(screen.getAllByText('1 Learner')[0]).toBeInTheDocument();
    expect(
      screen.getAllByText('Advanced Data Engineer')[0]
    ).toBeInTheDocument();
    expect(screen.getAllByText('1 Learner')[1]).toBeInTheDocument();
    expect(
      screen.getAllByText('Advanced Front End Web Developer')[0]
    ).toBeInTheDocument();
    expect(screen.getAllByText('1 Learner')[2]).toBeInTheDocument();
    expect(
      screen.getAllByText('Advanced Machine Learning Engineer')[0]
    ).toBeInTheDocument();
    expect(screen.getAllByText('1 Learner')[3]).toBeInTheDocument();
    expect(
      screen.getAllByText('Advanced User Experience Designer')[0]
    ).toBeInTheDocument();
    expect(screen.getAllByText('1 Learner')[4]).toBeInTheDocument();
  });

  it('should render when given 5 courses and not loading', () => {
    renderV3(
      <TopItems
        missionPartnerId="MockMissionPartnerId"
        topItemsCategory="Courses"
      />
    );

    expect(screen.getByText('Top assigned courses')).toBeInTheDocument();
    expect(
      screen.getAllByText('Pre-Test: AWS Cloud Architect — Proficient')[0]
    ).toBeInTheDocument();
    expect(screen.getAllByText('2 Learners')[0]).toBeInTheDocument();
    expect(
      screen.getAllByText('Pre-Test: AWS Cloud Architect — Proficient')[0]
    ).toBeInTheDocument();
    expect(screen.getAllByText('2 Learners')[1]).toBeInTheDocument();
    expect(
      screen.getAllByText('AWS DevOps Engineer Professional-Introduction')[0]
    ).toBeInTheDocument();
    expect(screen.getAllByText('1 Learner')[0]).toBeInTheDocument();
    expect(
      screen.getAllByText(
        'AWS Global Infrastructure: Availability Zones, Regions, Edge Locations, Regional Edge Caches'
      )[0]
    ).toBeInTheDocument();
    expect(screen.getAllByText('1 Learner')[1]).toBeInTheDocument();
    expect(
      screen.getAllByText('Cloud Developer - Azure Assessment')[0]
    ).toBeInTheDocument();
    expect(screen.getAllByText('1 Learner')[2]).toBeInTheDocument();
  });

  //TODO: Add new loading tests when animation is added

  it('should contain link to plans page', async () => {
    renderV3(
      <TopItems
        missionPartnerId="MockMissionPartnerId"
        topItemsCategory="Plans"
      />
    );

    const firstLink = screen
      .getAllByText('Advanced Cloud Native Architecture')[0]
      .closest('a');

    expect(firstLink).toHaveProperty('href', route);
  });

  it('should display null hover on hover', async () => {
    (useGetTopPlans as jest.Mock).mockReturnValue({
      getTopPlansData: [],
      getTopPlansError: false
    });
    renderV3(
      <TopItems
        missionPartnerId="MockMissionPartnerId"
        topItemsCategory="Plans"
      />
    );

    userEvent.hover(screen.getByText('Top assigned plans'));
    await waitFor(() => {
      expect(
        screen.getByText(
          'Once your learners start training, their most popular curriculum items will appear here.'
        )
      ).toBeInTheDocument();
    });
  });
});
