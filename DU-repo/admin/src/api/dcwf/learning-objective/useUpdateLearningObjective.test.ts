import { renderHook } from '@@/test-utils';
import { useMutation } from '@apollo/client';
import { useUpdateLearningObjective } from './useUpdateLearningObjective';

jest.mock('@apollo/client');

describe('useUpdateLearningObjective', () => {
  it('should update a learningObjective', () => {
    const mockUpdateLearningObjective = jest.fn();
    (useMutation as jest.Mock).mockReturnValue([
      mockUpdateLearningObjective,
      { loading: false }
    ]);

    const { result } = renderHook(() => useUpdateLearningObjective());

    result.current.updateLearningObjective('learningObjectiveId', {
      description: 'description'
    });

    expect(mockUpdateLearningObjective).toHaveBeenCalledWith({
      variables: {
        updateLearningObjectiveId: 'learningObjectiveId',
        input: {
          description: 'description'
        }
      }
    });
  });
});
