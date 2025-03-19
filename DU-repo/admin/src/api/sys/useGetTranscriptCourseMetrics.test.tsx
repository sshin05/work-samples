import { render, screen } from '@testing-library/react';
import { useQuery } from '@apollo/client';
import { useGetTranscriptCourseMetrics } from './useGetTranscriptCourseMetrics';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn()
}));

describe('useGetTranscriptCourseMetrics', () => {
  const TestComponent = ({
    branch,
    trainingGroup,
    missionPartnerId,
    fieldCommand,
    spaceDelta,
    squadron,
    organization
  }) => {
    const {
      transcriptCourseMetrics,
      transcriptCourseMetricsLoading,
      transcriptCourseMetricsError
    } = useGetTranscriptCourseMetrics(
      branch,
      trainingGroup,
      missionPartnerId,
      fieldCommand,
      spaceDelta,
      squadron,
      organization
    );

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
          coursesPendingReview: 1
        }
      }
    });

    render(
      <TestComponent
        branch="test-branch"
        trainingGroup="test-group"
        missionPartnerId="test-mission"
        fieldCommand="test-command"
        spaceDelta="test-delta"
        squadron="test-squadron"
        organization="test-organization"
      />
    );
    expect(screen.getByText('Total Courses: 10')).toBeInTheDocument();
    expect(screen.getByText('Courses In Progress: 5')).toBeInTheDocument();
    expect(screen.getByText('Courses Completed: 3')).toBeInTheDocument();
    expect(screen.getByText('Courses Stopped: 2')).toBeInTheDocument();
    expect(screen.getByText('Courses Pending Review: 1')).toBeInTheDocument();
  });

  it('should show loading state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      data: null
    });

    render(
      <TestComponent
        branch="test-branch"
        trainingGroup="test-group"
        missionPartnerId="test-mission"
        fieldCommand="test-command"
        spaceDelta="test-delta"
        squadron="test-squadron"
        organization="test-organization"
      />
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show error state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: true,
      data: null
    });

    render(
      <TestComponent
        branch="test-branch"
        trainingGroup="test-group"
        missionPartnerId="test-mission"
        fieldCommand="test-command"
        spaceDelta="test-delta"
        squadron="test-squadron"
        organization="test-organization"
      />
    );
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
