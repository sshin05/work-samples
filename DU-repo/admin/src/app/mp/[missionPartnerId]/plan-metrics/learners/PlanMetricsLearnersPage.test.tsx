import { useQuery } from '@apollo/client';
import { renderV3, screen } from '@@/test-utils';
import { useFindTranscriptTrainingPlans } from '@/api/training-plan';
import MissionPartnerPlanMetricsLearners from './page';

jest.mock('@/api/training-plan');
jest.mock('@/api/mission-partner');
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn()
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    back: jest
      .fn()
      .mockImplementation(() => console.log('router.back() called'))
  })),
  useParams: jest.fn(() => ({ missionPartnerId: 'mpId1' })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(key => {
      if (key === 'planType') return 'Force Multiplier';
      if (key === 'planSourceId') return 'planSourceId';
      if (key === 'type') return 'enrolled';
      if (key === 'title') return 'Test Plan Title';
      if (key === 'status') return undefined;
      return null;
    })
  }))
}));

const mockTrainingPlans = {
  records: [
    {
      userId: 'user1',
      trainingPlanId: 'trainingPlan-1',
      status: 'Assigned',
      assignedAt: '2023-02-01T21:39:42.711Z',
      startedAt: '2023-02-02T21:39:42.711Z',
      stoppedAt: '2023-02-03T21:39:42.711Z',
      AssignedAt: '2023-04-01T21:39:42.711Z',
      trainingPlan: {
        planType: 'Force Multiplier',
        planSourceId: 'cyber-security-for-everyone',
        title: 'Cyber Security for Everyone'
      },
      user: {
        id: 'user1',
        firstName: 'Roger',
        lastName: 'Rabbit',
        email: 'roger@toons.com'
      }
    },
    {
      userId: 'user2',
      trainingPlanId: 'trainingPLan-2',
      status: 'completed',
      assignedAt: '2023-01-01T21:39:42.711Z',
      startedAt: '2023-01-02T21:39:42.711Z',
      stoppedAt: '2023-01-03T21:39:42.711Z',
      completedAt: '2023-01-04T21:39:42.711Z',
      trainingPlan: {
        planType: 'Force Multiplier',
        planSourceId: 'cyber-security-for-everyone',
        title: 'Cyber Security for Everyone'
      },
      user: {
        id: 'user2',
        firstName: 'Doctor',
        lastName: 'Doom',
        email: 'doom@toons.com'
      }
    }
  ],
  total: 2
};

beforeAll(() => {
  (useQuery as jest.Mock).mockImplementation(() => ({
    data: {
      findTranscriptTrainingPlans: mockTrainingPlans
    },
    loading: false,
    error: null
  }));
  (useFindTranscriptTrainingPlans as jest.Mock).mockReturnValue({
    transcriptTrainingPlans: mockTrainingPlans,
    transcriptTrainingPlansLoading: false,
    transcriptTrainingPlansTotal: mockTrainingPlans.total
  });
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('PlanMetricsLearnersPage', () => {
  it('renders the page', () => {
    renderV3(<MissionPartnerPlanMetricsLearners />);

    expect(
      screen.getByText('Test Plan Title | Total Enrolled')
    ).toBeInTheDocument();
  });
});
