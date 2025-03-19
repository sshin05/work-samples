import { useMutation, useQuery } from '@apollo/client';
import { useCreateHostedExamProgress } from './useCreateHostedExamProgress';
import { useUpdateHostedExamProgressStatus } from './useUpdateHostedExamProgressStatus';
import { useUpdateHostedExamProgressAnswers } from './useUpdateHostedExamProgressAnswers';
import { useAddHostedExamProgressComment } from './useAddHostedExamProgressComment';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
  useMutation: jest.fn()
}));

describe('hosted exam test', () => {
  const mockRefetch = jest.fn();
  const mockMutation = jest.fn();

  beforeEach(() => {
    useQuery.mockReturnValue({
      loading: false,
      error: false,
      data: {},
      refetch: mockRefetch
    });

    useMutation.mockReturnValue([
      mockMutation,
      { loading: false, error: false, data: {} }
    ]);
  });

  afterEach(() => {
    useMutation.mockReset();
    mockRefetch.mockReset();
    mockMutation.mockReset();
  });

  it('useCreateHostedExamProgress', () => {
    const createHostedExamProgress = useCreateHostedExamProgress();
    createHostedExamProgress.createHostedExamProgress('hosted-exam-id');

    expect(useMutation).toHaveBeenCalledTimes(1);
    expect(mockMutation).toHaveBeenCalledWith({
      variables: { hostedExamId: 'hosted-exam-id' }
    });
    expect(createHostedExamProgress).toEqual(
      expect.objectContaining({
        createHostedExamProgressLoading: false,
        createHostedExamProgressError: false,
        createHostedExamProgressData: {}
      })
    );
    expect(createHostedExamProgress.createHostedExamProgress).toBeInstanceOf(
      Function
    );
  });

  it('useUpdateHostedExamProgressStatus', () => {
    const updateHostedExamProgressStatus = useUpdateHostedExamProgressStatus();
    updateHostedExamProgressStatus.updateHostedExamProgressStatus(
      'hosted-exam-id',
      'In Progress'
    );

    expect(useMutation).toHaveBeenCalledTimes(1);
    expect(mockMutation).toHaveBeenCalledWith({
      variables: {
        hostedExamId: 'hosted-exam-id',
        status: 'In Progress',
        userId: null
      }
    });
    expect(updateHostedExamProgressStatus).toEqual(
      expect.objectContaining({
        updateHostedExamProgressStatusLoading: false,
        updateHostedExamProgressStatusError: false,
        updateHostedExamProgressStatusData: {}
      })
    );
    expect(
      updateHostedExamProgressStatus.updateHostedExamProgressStatus
    ).toBeInstanceOf(Function);
  });

  it('useUpdateHostedExamProgressAnswers', () => {
    const updateHostedExamProgressAnswers =
      useUpdateHostedExamProgressAnswers();
    updateHostedExamProgressAnswers.updateHostedExamProgressAnswers(
      'hosted-exam-id',
      { answers: 'answersObject' }
    );

    expect(useMutation).toHaveBeenCalledTimes(1);
    expect(mockMutation).toHaveBeenCalledWith({
      variables: {
        hostedExamId: 'hosted-exam-id',
        answers: { answers: 'answersObject' },
        userId: null
      }
    });
    expect(updateHostedExamProgressAnswers).toEqual(
      expect.objectContaining({
        updateHostedExamProgressAnswersLoading: false,
        updateHostedExamProgressAnswersError: false,
        updateHostedExamProgressAnswersData: {}
      })
    );
    expect(
      updateHostedExamProgressAnswers.updateHostedExamProgressAnswers
    ).toBeInstanceOf(Function);
  });

  it('useAddHostedExamProgressComment', () => {
    const addHostedExamProgressComment = useAddHostedExamProgressComment();
    addHostedExamProgressComment.addHostedExamProgressComment(
      'hosted-exam-id',
      'user-id',
      'question-id',
      'comment'
    );

    expect(useMutation).toHaveBeenCalledTimes(1);
    expect(mockMutation).toHaveBeenCalledWith({
      variables: {
        hostedExamId: 'hosted-exam-id',
        userId: 'user-id',
        questionId: 'question-id',
        comment: 'comment'
      }
    });
    expect(addHostedExamProgressComment).toEqual(
      expect.objectContaining({
        addHostedExamProgressCommentLoading: false,
        addHostedExamProgressCommentError: false,
        addHostedExamProgressCommentData: {}
      })
    );
    expect(
      addHostedExamProgressComment.addHostedExamProgressComment
    ).toBeInstanceOf(Function);
  });
});
