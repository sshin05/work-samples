import { useMutation, useQuery } from '@apollo/client';
import { render, screen, fireEvent } from '@testing-library/react';
import { useFindHostedCourseProgress } from './useFindHostedCourseProgress';
import { useUpdateHostedCourseProgressItemQuizAnswers } from './useUpdateHostedCourseProgressItemQuizAnswers';
import { useAddHostedCourseProgressItemQuizComment } from './useAddHostedCourseProgressItemQuizComment';

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  gql: jest.fn()
}));

describe('hosted course progress test', () => {
  const HostedProgress = () => {
    const { hostedCourseProgress, fetchHostedCourseProgress } =
      useFindHostedCourseProgress('userId', 'hostedCourseId');
    const { updateHostedCourseProgressItemQuizAnswers } =
      useUpdateHostedCourseProgressItemQuizAnswers();
    const { addHostedCourseProgressItemQuizComment } =
      useAddHostedCourseProgressItemQuizComment();

    updateHostedCourseProgressItemQuizAnswers(
      'hostedCourseId',
      'lessonId',
      'userId',
      [{ key: 'answers' }]
    );

    addHostedCourseProgressItemQuizComment(
      'hostedCourseId',
      'lessonId',
      'userId',
      'quizId',
      'comment'
    );

    return (
      <>
        <div>{hostedCourseProgress?.status}</div>
        <button
          onClick={() => fetchHostedCourseProgress('userId', 'hostedCourseId')}
        >
          Fetch Hosted Course
        </button>
      </>
    );
  };
  it('should use groups hook without error', () => {
    const mockRefetch = jest.fn();
    const data = {};

    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: false,
      data: {
        findHostedCourseProgressById: { status: 'test' }
      },
      refetch: mockRefetch
    });

    (useMutation as jest.Mock).mockReturnValue([
      () => {
        // Intentionally left empty.
      },
      { loading: false, error: false, data }
    ]);
    render(<HostedProgress />);
    expect(screen.getByText('test')).toBeInTheDocument();
    const fetchButton = screen.getByText('Fetch Hosted Course');
    fireEvent.click(fetchButton);
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });
});
