import { SysRootPage } from './SysRootPage';
import { renderV3, screen } from '@@/test-utils';
import { useCountAllUsers, useCountNewUsers, useGetUser } from '@/api/user';
import { useCountAllVendors } from '@/api/vendor';
import { useGetTranscriptAssessmentMetrics } from '@/api/sys/useGetTranscriptAssessmentMetrics';
import { useGetTranscriptCourseMetrics } from '@/api/sys/useGetTranscriptCourseMetrics';
import { useGetTrainingPlanMetrics } from '@/api/sys/useGetTrainingPlanMetrics';
import { useCountAllCourses } from '@/api/sys/useCountAllCourses';
import { useGetNewTranscriptCourseMetrics } from '@/api/sys/useGetNewTranscriptCourseMetrics';
import { useGetNewTrainingPlanMetrics } from '@/api/sys/useGetNewTrainingPlanMetrics';

jest.mock('@/api/user');
jest.mock('@/api/vendor');
jest.mock('@/api/sys/useGetTranscriptCourseMetrics');
jest.mock('@/api/sys/useGetTrainingPlanMetrics');
jest.mock('@/api/sys/useCountAllCourses');
jest.mock('@/api/sys/useGetNewTranscriptCourseMetrics');
jest.mock('@/api/sys/useGetNewTrainingPlanMetrics');
jest.mock('@/api/sys/useGetTranscriptAssessmentMetrics');

jest.mock('@cerberus/styled-system/patterns', () => ({
  flex: jest.fn(() => 'mock-flex-class'),
  vstack: jest.fn(() => 'mock-vstack-class'),
  hstack: jest.fn(() => 'mock-hstack-class'),
  box: jest.fn(() => ''),
  animateIn: jest.fn(() => 'mock-animate-in')
}));

jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  Text: ({ children }) => <span>{children}</span>
}));

const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  branch: 'Air Force Test Branch'
};

describe('SysRootPage', () => {
  beforeEach(() => {
    (useCountAllUsers as jest.Mock).mockReturnValue({
      countUsers: 100,
      countUsersLoading: false
    });
    (useCountNewUsers as jest.Mock).mockReturnValue({
      countNewUsers: 10,
      countNewUsersLoading: false
    });
    (useCountAllVendors as jest.Mock).mockReturnValue({
      countVendors: 5,
      countVendorsLoading: false
    });
    (useGetTranscriptCourseMetrics as jest.Mock).mockReturnValue({
      transcriptCourseMetrics: {
        totalMinutesCompleted: 600,
        coursesCompleted: 20,
        coursesInProgress: 5
      },
      transcriptCourseMetricsLoading: false
    });
    (useGetTrainingPlanMetrics as jest.Mock).mockReturnValue({
      trainingPlanMetrics: { plansInProgress: 3, plansCompleted: 2 },
      trainingPlanMetricsLoading: false
    });
    (useCountAllCourses as jest.Mock).mockReturnValue({
      countAllCourses: 50,
      countAllCoursesLoading: false
    });
    (useGetNewTranscriptCourseMetrics as jest.Mock).mockReturnValue({
      transcriptCourseMetrics: {
        totalMinutesCompleted: 120,
        coursesCompleted: 5,
        coursesInProgress: 2
      },
      transcriptCourseMetricsLoading: false
    });
    (useGetNewTrainingPlanMetrics as jest.Mock).mockReturnValue({
      trainingPlanMetrics: { plansInProgress: 1, plansCompleted: 1 },
      trainingPlanMetricsLoading: false
    });
    (useGetUser as jest.Mock).mockReturnValue({
      user: mockUser,
      userLoading: false
    });
    (useGetTranscriptAssessmentMetrics as jest.Mock).mockReturnValue({
      transcriptAssessmentMetrics: { completed: 1, total: 2 },
      transcriptAssessmentMetricsLoading: false
    });
  });

  it('renders Available Courses card', () => {
    renderV3(<SysRootPage />);
    const cardTitle = screen.getByText('Available courses');
    expect(cardTitle).toBeInTheDocument();
  });

  it('renders Hours of Training card', () => {
    renderV3(<SysRootPage />);
    const cardTitle = screen.getByText('Hours of training');
    expect(cardTitle).toBeInTheDocument();
  });

  it('renders Courses Completed card', () => {
    renderV3(<SysRootPage />);
    const cardTitle = screen.getByText('Courses completed');
    expect(cardTitle).toBeInTheDocument();
  });

  it('renders Courses in Progress card', () => {
    renderV3(<SysRootPage />);
    const cardTitle = screen.getByText('Courses in progress');
    expect(cardTitle).toBeInTheDocument();
  });

  it('renders Plans in Progress card', () => {
    renderV3(<SysRootPage />);
    const cardTitle = screen.getByText('Plans in progress');
    expect(cardTitle).toBeInTheDocument();
  });

  it('renders Plans Completed card', () => {
    renderV3(<SysRootPage />);
    const cardTitle = screen.getByText('Plans completed');
    expect(cardTitle).toBeInTheDocument();
  });

  it('renders Total Users card', () => {
    renderV3(<SysRootPage />);
    const cardTitle = screen.getByText('Total users');
    expect(cardTitle).toBeInTheDocument();
  });

  it('renders Assessments completed card', () => {
    renderV3(<SysRootPage />);
    const cardTitle = screen.getByText('Assessments completed');
    expect(cardTitle).toBeInTheDocument();
  });

  it('renders SysRootPage', () => {
    renderV3(<SysRootPage />);

    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Total users')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();

    expect(screen.getByText('Hours of training')).toBeInTheDocument();

    expect(screen.getByText('Courses completed')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('Courses in progress')).toBeInTheDocument();
    expect(screen.getByText('started in the last 7 days')).toBeInTheDocument();

    expect(screen.getByText('Plans in progress')).toBeInTheDocument();
    expect(screen.getByText('started in the last 7 Days')).toBeInTheDocument();

    expect(screen.getByText('Plans completed')).toBeInTheDocument();
    expect(
      screen.getByText('completed in the last 7 Days')
    ).toBeInTheDocument();

    expect(screen.getByText('Available courses')).toBeInTheDocument();
    expect(screen.getByText('Assessments completed')).toBeInTheDocument();
  });
});
