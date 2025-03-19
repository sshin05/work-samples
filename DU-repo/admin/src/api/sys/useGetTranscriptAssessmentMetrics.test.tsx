import React from 'react';
import { render, screen } from '@@/test-utils';
import { useQuery } from '@apollo/client';
import { useGetTranscriptAssessmentMetrics } from './useGetTranscriptAssessmentMetrics';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn()
}));

describe('useGetTranscriptAssessmentMetrics', () => {
  const TestComponent = () => {
    const {
      transcriptAssessmentMetrics,
      transcriptAssessmentMetricsLoading,
      transcriptAssessmentMetricsError
    } = useGetTranscriptAssessmentMetrics('2025-01-01');

    if (transcriptAssessmentMetricsLoading) return <p>Loading...</p>;
    if (transcriptAssessmentMetricsError) return <p>Error</p>;

    return (
      <div>
        <p>Started: {transcriptAssessmentMetrics.started}</p>
        <p>Stopped: {transcriptAssessmentMetrics.stopped}</p>
        <p>Pending Review: {transcriptAssessmentMetrics.pendingReview}</p>
        <p>Marked Completed: {transcriptAssessmentMetrics.markedCompleted}</p>
        <p>Completed: {transcriptAssessmentMetrics.completed}</p>
        <p>Total: {transcriptAssessmentMetrics.total}</p>
      </div>
    );
  };

  it('should return the transcript assessment metrics', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: {
        getTranscriptAssessmentMetrics: {
          started: 1,
          stopped: 2,
          pendingReview: 3,
          markedCompleted: 4,
          completed: 5,
          total: 6
        }
      }
    });

    render(<TestComponent />);

    expect(screen.getByText('Started: 1')).toBeInTheDocument();
    expect(screen.getByText('Stopped: 2')).toBeInTheDocument();
    expect(screen.getByText('Pending Review: 3')).toBeInTheDocument();
    expect(screen.getByText('Marked Completed: 4')).toBeInTheDocument();
    expect(screen.getByText('Completed: 5')).toBeInTheDocument();
    expect(screen.getByText('Total: 6')).toBeInTheDocument();
  });

  it('should display the loading state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      data: null
    });

    render(<TestComponent />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display the error state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: new Error('Test Error'),
      data: null
    });

    render(<TestComponent />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
