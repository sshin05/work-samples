import React from 'react';
import {
  useGetPlansQuarterlyByMissionPartner,
  useGetCoursesQuarterlyByMissionPartner,
  useFindMissionPartnerById
} from '@/api/mission-partner';
import { DashboardTabs } from './DashboardTabs';
import { renderV3, screen } from '@@/test-utils';
import { useGetTopCourses } from '@/api/training-plan/useGetTopCourses';
import { useGetTopPlans } from '@/api/training-plan/useGetTopPlans';

jest.mock('./components/StatusBarChart/StatusBarChart', () => {
  const MockStatusBarChart = () => <div data-testid="mock-statusbar-chart" />;
  MockStatusBarChart.displayName = 'MockStatusBarChart';
  return MockStatusBarChart;
});

jest.mock('./components/TopItems/TopItems', () => {
  const MockTopItems = () => <div data-testid="mock-top-items" />;
  MockTopItems.displayName = 'MockTopItems';
  return MockTopItems;
});

jest.mock('@cerberus/react', () => ({
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Tabs: ({ children, ...props }) => <div {...props}>{children}</div>,
  TabPanel: ({ children, ...props }) => <div {...props}>{children}</div>,
  TabsList: ({ children, ...props }) => <div {...props}>{children}</div>,
  Tab: ({ children, ...props }) => <div {...props}>{children}</div>
}));

jest.mock('@/api/mission-partner');
jest.mock('@/api/training-plan');
jest.mock('@/api/training-plan/useGetTopCourses');
jest.mock('@/api/training-plan/useGetTopPlans');

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

describe('Mission Partner Detail page', () => {
  beforeEach(() => {
    jest.resetModules();
    (useFindMissionPartnerById as jest.Mock).mockReturnValue({
      missionPartnerLoading: false,
      missionPartnerError: null,
      missionPartner: mockMissionPartner,
      refetchMissionPartner: jest.fn(async () => Promise.resolve())
    });
    (useGetTopPlans as jest.Mock).mockReturnValue({
      getTopPlansData: [],
      getTopPlansError: false
    });
    (useGetTopCourses as jest.Mock).mockReturnValue({
      topCoursesMetrics: [],
      topCoursesMetricsLoading: jest.fn()
    });
    (useGetPlansQuarterlyByMissionPartner as jest.Mock).mockReturnValue({
      getPlansQuarterlyByMissionPartnerLoading: false,
      getPlansQuarterlyByMissionPartnerError: false,
      getPlansQuarterlyByMissionPartner: []
    });
    (useGetCoursesQuarterlyByMissionPartner as jest.Mock).mockReturnValue({
      getCoursesQuarterlyByMissionPartnerLoading: false,
      getCoursesQuarterlyByMissionPartnerError: false,
      getCoursesQuarterlyByMissionPartner: []
    });
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should render with dynamic components', () => {
    renderV3(<DashboardTabs missionPartnerId="1" />);

    expect(screen.getByText('Plans')).toBeInTheDocument();
    expect(screen.getByText('Courses')).toBeInTheDocument();
    const statusBarChart = screen.getAllByTestId('mock-statusbar-chart');
    expect(statusBarChart[0]).toBeInTheDocument();
    expect(statusBarChart[1]).toBeInTheDocument();
    const topItemsCard = screen.getAllByTestId('mock-top-items');
    expect(topItemsCard[0]).toBeInTheDocument();
    expect(topItemsCard[1]).toBeInTheDocument();
  });
});
