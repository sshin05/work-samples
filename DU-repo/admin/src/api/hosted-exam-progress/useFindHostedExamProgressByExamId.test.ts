import { useQuery } from '@apollo/client';
import { useFindHostedExamProgressByExamIdUserId } from './useFindHostedExamProgressByExamIdUserId';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn()
}));

describe('hosted exam test', () => {
  const mockRefetch = jest.fn();

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: false,
      data: {},
      refetch: mockRefetch
    });
  });

  afterEach(() => {
    mockRefetch.mockReset();
  });

  it('useFindHostedExamById', () => {
    const findHostedExamProgress = useFindHostedExamProgressByExamIdUserId(
      'hostedExamId',
      'userId'
    );
    findHostedExamProgress.fetchHostedExamProgress('eId', 'uId');

    expect(findHostedExamProgress).toEqual(
      expect.objectContaining({
        findHostedExamProgressLoading: false,
        findHostedExamProgressError: false,
        findHostedExamProgressData: {}
      })
    );
    expect(findHostedExamProgress.fetchHostedExamProgress).toBeInstanceOf(
      Function
    );
    expect(mockRefetch).toHaveBeenCalledWith({
      hostedExamId: 'eId',
      userId: 'uId'
    });
  });
});
