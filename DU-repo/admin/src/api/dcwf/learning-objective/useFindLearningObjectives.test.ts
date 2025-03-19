import { renderHook } from '@@/test-utils';
import { useQuery } from '@apollo/client';
import { useFindLearningObjectives } from './useFindLearningObjectives';

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  gql: jest.fn()
}));

const mockLearningObjective = {
  id: '06aa4d38-8b42-4382-8796-bc01157268fe',
  description: 'This is a mock learning objective'
};

const mockLearningObjectiveData = {
  findLearningObjectives: {
    data: [mockLearningObjective],
    total: 1
  }
};

describe('useFindLearningObjectives', () => {
  it('should return data', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: undefined,
      data: mockLearningObjectiveData
    });

    const { result } = renderHook(() =>
      useFindLearningObjectives({ pageSize: 25, pageNumber: 1 })
    );

    const {
      learningObjectives,
      learningObjectivesTotal,
      learningObjectivesLoading,
      learningObjectivesError
    } = result.current;

    expect(learningObjectives).toEqual([mockLearningObjective]);
    expect(learningObjectivesTotal).toEqual(1);
    expect(learningObjectivesLoading).toEqual(false);
    expect(learningObjectivesError).toBeUndefined();
  });
});
