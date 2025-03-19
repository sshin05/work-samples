import { render, screen } from '@testing-library/react';
import { useQuery } from '@apollo/client';
import { useGetNewTranscriptCourseMetrics } from './useGetNewTranscriptCourseMetrics';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn()
}));

describe('useGetNewTranscriptCourseMetrics', () => {
  const TestComponent = ({ branch, dayRange }) => {
    const {
      transcriptCourseMetrics,
      transcriptCourseMetricsLoading,
      transcriptCourseMetricsError
    } = useGetNewTranscriptCourseMetrics(branch, dayRange);

    if (transcriptCourseMetricsLoading) return <p>Loading...</p>;
    if (transcriptCourseMetricsError) return <p>Error</p>;

    return (
      <div>
        <p>Total Courses: {transcriptCourseMetrics.totalCourses}</p>
        <p>Courses In Progress: {transcriptCourseMetrics.coursesInProgress}</p>
        <p>Courses Completed: {transcriptCourseMetrics.coursesCompleted}</p>
        <p>Courses Stopped: {transcriptCourseMetrics.coursesStopped}</p>
        <p>
          Courses Pending Review: {transcriptCourseMetrics.coursesPendingReview}
        </p>
        <p>
          Total Hours Completed: {transcriptCourseMetrics.totalHoursCompleted}
        </p>
      </div>
    );
  };

  it('should return the transcript course metrics', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: {
        getTranscriptCourseMetrics: {
          totalCourses: 10,
          coursesInProgress: 5,
          coursesCompleted: 3,
          coursesStopped: 2,
          coursesPendingReview: 1,
          totalHoursCompleted: 34
        }
      }
    });

    render(<TestComponent branch="test-branch" dayRange={7} />);
    expect(screen.getByText('Total Courses: 10')).toBeInTheDocument();
    expect(screen.getByText('Courses In Progress: 5')).toBeInTheDocument();
    expect(screen.getByText('Courses Completed: 3')).toBeInTheDocument();
    expect(screen.getByText('Courses Stopped: 2')).toBeInTheDocument();
    expect(screen.getByText('Courses Pending Review: 1')).toBeInTheDocument();
    expect(screen.getByText('Total Hours Completed: 34')).toBeInTheDocument();
  });

  it('should show loading state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      data: null
    });

    render(<TestComponent branch="test-branch" dayRange={7} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show error state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: true,
      data: null
    });

    render(<TestComponent branch="test-branch" dayRange={7} />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
