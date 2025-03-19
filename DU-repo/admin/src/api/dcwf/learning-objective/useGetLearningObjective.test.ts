import { renderHook } from '@@/test-utils';
import { useQuery } from '@apollo/client';
import { useGetLearningObjective } from './useGetLearningObjective';
import type { LearningObjective } from '@/api/codegen/graphql';

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  gql: jest.fn()
}));

const mockLearningObjective: LearningObjective = {
  id: 'some-valid-id',
  description: 'description'
};

const mockLearningObjectiveData = {
  getLearningObjective: mockLearningObjective
};

describe('useGetLearningObjective', () => {
  it('should return data', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: undefined,
      data: mockLearningObjectiveData
    });

    const { result } = renderHook(() =>
      useGetLearningObjective({ getLearningObjectiveId: 'some-valid-id' })
    );

    const {
      learningObjective,
      learningObjectiveLoading,
      learningObjectiveError
    } = result.current;

    expect(learningObjective).toEqual(mockLearningObjective);
    expect(learningObjectiveLoading).toEqual(false);
    expect(learningObjectiveError).toBeUndefined();
  });
});
