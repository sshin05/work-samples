import { renderHook, act } from '@@/test-utils';
import { useMutation } from '@apollo/client';
import { useStopIndividualCourseById } from './useStopIndividualCourseById';

jest.mock('@apollo/client');

describe('useStopIndividualCourseById', () => {
  it('should stop course by ID without error', () => {
    const mockStopCourse = jest.fn();
    (useMutation as jest.Mock).mockReturnValue([
      mockStopCourse,
      { loading: false }
    ]);

    const { result } = renderHook(() => useStopIndividualCourseById());

    act(() => result.current.stopCourse({ variables: { id: 'courseId' } }));
    expect(mockStopCourse).toHaveBeenCalledWith({
      variables: { id: 'courseId' }
    });
  });
});
