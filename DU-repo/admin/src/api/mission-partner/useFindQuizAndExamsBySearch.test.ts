import { useQuery } from '@apollo/client';
import { useFindQuizAndExamsBySearch } from './useFindQuizAndExamsBySearch';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useMemo: jest.fn()
}));

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useLazyQuery: jest.fn(),
  useQuery: jest.fn(),
  useMutation: jest.fn()
}));

describe('useFindQuizAndExamsBySearch', () => {
  it('should return quiz and exams', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: undefined,
      data: undefined,
      refetch: jest.fn()
    });

    const result = useFindQuizAndExamsBySearch({
      missionPartnerId: '1',
      search: 'test',
      pageNumber: 1,
      pageSize: 10,
      sortKey: 'test',
      sortDirection: 'test'
    });

    expect(result.quizExamsLoading).toEqual(false);
    expect(result.quizExamsError).toEqual(undefined);
    expect(result.quizExams).toEqual([]);
  });
});
