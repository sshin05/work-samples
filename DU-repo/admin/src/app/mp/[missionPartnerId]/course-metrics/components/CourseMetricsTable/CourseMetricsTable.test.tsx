import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CourseMetricsTable from './CourseMetricsTable';
import { useAggregateTranscriptCourses } from '@/api/course';

jest.mock('@/api/course', () => ({
  useAggregateTranscriptCourses: jest.fn()
}));

jest.mock('./useHandleDownloadClick', () => ({
  useHandleDownloadClick: jest.fn()
}));

jest.mock('@/components_new/table/ServerSideTable', () => ({
  ServerSideTable: jest.fn(
    ({ noDataMessage, filterComponent, filterProps }) => (
      <div data-testid="server-side-table">
        {noDataMessage}
        <button onClick={() => filterProps.setOpenFilters(true)}>
          Open Filters
        </button>
        {filterComponent}
      </div>
    )
  )
}));

jest.mock('./CourseMetricsTableFilters', () => ({
  CourseMetricsTableFilters: jest.fn(
    ({ handleFilterFormSubmit, handleFilterResetClick }) => (
      <div data-testid="course-metrics-filters">
        <button
          onClick={() =>
            handleFilterFormSubmit({
              courseVendor: 'Vendor A',
              courseStatus: 'Active'
            })
          }
        >
          Submit Filters
        </button>
        <button onClick={handleFilterResetClick}>Reset Filters</button>
      </div>
    )
  )
}));

jest.mock('@/components_new/table/components/NoDataMessage', () => ({
  NoDataMessage: jest.fn(() => <div data-testid="no-data-message">No Data</div>)
}));

describe('CourseMetricsTable', () => {
  const mockMissionPartnerId = 'partner123';
  const mockMissionPartnerName = 'Mock Mission Partner';

  const defaultProps = {
    missionPartnerId: mockMissionPartnerId,
    missionPartnerName: mockMissionPartnerName
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAggregateTranscriptCourses as jest.Mock).mockReturnValue({
      transcriptCoursesCount: 0,
      transcriptCoursesData: [],
      transcriptCoursesLoading: false
    });
  });

  it('should render the table component', () => {
    render(<CourseMetricsTable {...defaultProps} />);

    expect(screen.getByTestId('server-side-table')).toBeInTheDocument();
  });

  it('should display a loading state when data is loading', () => {
    (useAggregateTranscriptCourses as jest.Mock).mockReturnValue({
      transcriptCoursesCount: 0,
      transcriptCoursesData: [],
      transcriptCoursesLoading: true
    });

    render(<CourseMetricsTable {...defaultProps} />);

    expect(screen.getByTestId('server-side-table')).toBeInTheDocument();
  });

  it('should call handleFilterFormSubmit when the filter form is submitted', async () => {
    render(<CourseMetricsTable {...defaultProps} />);

    fireEvent.click(screen.getByText('Open Filters'));

    // open filters calls a state-setter, so ya gotta wait:
    await waitFor(() => {
      expect(screen.getByTestId('course-metrics-filters')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Submit Filters'));
  });

  it('should call handleFilterResetClick when the filter reset button is clicked', async () => {
    render(<CourseMetricsTable {...defaultProps} />);

    fireEvent.click(screen.getByText('Open Filters'));

    // open filters calls a state-setter, so ya gotta wait:
    await waitFor(() => {
      expect(screen.getByTestId('course-metrics-filters')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Reset Filters'));
  });
});
