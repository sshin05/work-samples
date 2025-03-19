import { renderHook, act } from '@@/test-utils';
import { useMutation } from '@apollo/client';
import { useStartIndividualCourseById } from './useStartIndividualCourseById';

jest.mock('@apollo/client');

describe('useStartIndividualCourseById', () => {
  it('should start course by ID without error', () => {
    const mockStartCourse = jest.fn();
    (useMutation as jest.Mock).mockReturnValue([
      mockStartCourse,
      { loading: false }
    ]);

    const { result } = renderHook(() => useStartIndividualCourseById());

    act(() => result.current.startCourse({ variables: { id: 'courseId' } }));
    expect(mockStartCourse).toHaveBeenCalledWith({
      variables: { id: 'courseId' }
    });
  });
});
