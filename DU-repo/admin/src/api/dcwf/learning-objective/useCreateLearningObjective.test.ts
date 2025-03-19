import { renderHook } from '@@/test-utils';
import { useMutation } from '@apollo/client';
import { useCreateLearningObjective } from './useCreateLearningObjective';

jest.mock('@apollo/client');

describe('useCreateLearningObjective', () => {
  it('should create a learningObjective', () => {
    const mockCreateLearningObjective = jest.fn();
    (useMutation as jest.Mock).mockReturnValue([
      mockCreateLearningObjective,
      { loading: false }
    ]);

    const { result } = renderHook(() => useCreateLearningObjective());

    result.current.createLearningObjective({
      description: 'description'
    });

    expect(mockCreateLearningObjective).toHaveBeenCalledWith({
      variables: {
        input: {
          description: 'description'
        }
      }
    });
  });
});
