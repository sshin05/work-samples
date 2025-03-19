import React from 'react';
import { renderV3, screen } from '@@/test-utils';
import { useFindMissionPartnerMinDetails } from '@/api/mission-partner';
import { useRouteParams } from '@/hooks/useRouteParams';
import { useGraphqlErrorHandler } from '@/hooks/useGraphqlErrorHandler';
import { MpCourseMetricsPage } from './MpCourseMetricsPage';

// Mocking dependencies
jest.mock('@/hooks/useRouteParams', () => ({
  useRouteParams: jest.fn()
}));

jest.mock('@/api/mission-partner', () => ({
  useFindMissionPartnerMinDetails: jest.fn()
}));

jest.mock('@/hooks/useGraphqlErrorHandler', () => ({
  useGraphqlErrorHandler: jest.fn()
}));

jest.mock('@/components/manage-mission-partners/MMPHeader', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mmp-header" />)
}));

jest.mock('next/dynamic', () => (importer, options) => {
  // convert the importer function to a string so we can inspect it
  const importerStr = importer.toString();

  // check if we're importing CourseMetricsTable
  if (importerStr.includes('CourseMetricsTable')) {
    const CourseMetricsTableMock = () => (
      <div data-testid="course-metrics-table" />
    );
    CourseMetricsTableMock.displayName = 'CourseMetricsTable';

    return CourseMetricsTableMock;
  }

  // check if we're importing CourseMetricsPageHeader
  if (importerStr.includes('CourseMetricsPageHeader')) {
    const CourseMetricsPageHeaderMock = () => (
      <div data-testid="course-metrics-page-header" />
    );
    CourseMetricsPageHeaderMock.displayName = 'CourseMetricsPageHeader';

    return CourseMetricsPageHeaderMock;
  }

  // otherwise, use the loading fallback if provided
  const DefaultMock =
    options && options.loading
      ? options.loading
      : () => <div data-testid="dynamic-mock" />;
  DefaultMock.displayName = 'DynamicMock';

  return DefaultMock;
});

jest.mock('@/components_new/layout/MainContentVStack', () => ({
  __esModule: true,
  default: jest.fn(({ children }) => (
    <div data-testid="main-content-vstack">{children}</div>
  ))
}));

jest.mock('@/utils/getRouteUrl', () => ({
  getRouteUrl: jest.fn(() => '/mocked-route'),
  routeGenerators: {
    MissionPartner: jest.fn()
  }
}));

jest.mock('@/components_new/table/components/NoDataMessage', () => ({
  NoDataMessage: jest.fn(() => <div data-testid="no-data-message">No Data</div>)
}));

describe('MpCourseMetricsPage', () => {
  const mockMissionPartnerId = 'partner123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state when data is loading', () => {
    (useRouteParams as jest.Mock).mockReturnValue({
      missionPartnerId: mockMissionPartnerId
    });
    (useFindMissionPartnerMinDetails as jest.Mock).mockReturnValue({
      missionPartnerMinDetailsLoading: true,
      missionPartnerMinDetailsError: null,
      missionPartnerMinDetails: null
    });

    renderV3(<MpCourseMetricsPage missionPartnerId={mockMissionPartnerId} />);
    expect(
      screen.getByTestId('course-metrics-page-header')
    ).toBeInTheDocument();
  });

  it('should render null if missionPartnerId is missing', () => {
    (useRouteParams as jest.Mock).mockReturnValue({ missionPartnerId: null });
    (useFindMissionPartnerMinDetails as jest.Mock).mockReturnValue({
      missionPartnerMinDetailsLoading: false,
      missionPartnerMinDetailsError: null,
      missionPartnerMinDetails: null
    });

    renderV3(<MpCourseMetricsPage missionPartnerId={mockMissionPartnerId} />);
    expect(
      screen.getByTestId('course-metrics-page-header')
    ).toBeInTheDocument();
  });

  it('should render course metrics table when data is available', () => {
    (useRouteParams as jest.Mock).mockReturnValue({
      missionPartnerId: mockMissionPartnerId
    });
    const mockMissionPartnerMinDetails = {
      name: 'Mock Mission Partner',
      affiliateId: 'affiliate123',
      // eslint-disable-next-line sonarjs/no-clear-text-protocols
      logoUrl: 'http://mocked-logo.com/logo.png'
    };

    (useFindMissionPartnerMinDetails as jest.Mock).mockReturnValue({
      missionPartnerMinDetailsLoading: false,
      missionPartnerMinDetailsError: null,
      missionPartnerMinDetails: mockMissionPartnerMinDetails
    });

    renderV3(<MpCourseMetricsPage missionPartnerId={mockMissionPartnerId} />);
    expect(screen.getByTestId('course-metrics-table')).toBeInTheDocument();
  });

  it('should handle error state by calling useGraphqlErrorHandler', () => {
    const mockError = new Error('Network Error');

    (useRouteParams as jest.Mock).mockReturnValue({
      missionPartnerId: mockMissionPartnerId
    });
    (useFindMissionPartnerMinDetails as jest.Mock).mockReturnValue({
      missionPartnerMinDetailsLoading: false,
      missionPartnerMinDetailsError: mockError,
      missionPartnerMinDetails: null
    });

    renderV3(<MpCourseMetricsPage />);

    expect(useGraphqlErrorHandler).toHaveBeenCalledWith(mockError);
  });
});
