import { renderHook, act } from '@@/test-utils';
import { useMutation } from '@apollo/client';
import { useUpdateAdminManagedCourse } from './useUpdateAdminManagedCourse';

jest.mock('@apollo/client');

describe('useUpdateAdminManagedCourse', () => {
  it('should update course without error', () => {
    const mockUpdateAdminManagedCourse = jest.fn();
    (useMutation as jest.Mock).mockReturnValue([
      mockUpdateAdminManagedCourse,
      { loading: false }
    ]);

    const { result } = renderHook(() => useUpdateAdminManagedCourse());

    act(() =>
      result.current.updateAdminManagedCourse({
        vendorId: 'vendorId',
        vendorCourseId: 'vendorCourseId',
        courseDescription: 'Description',
        courseDuration: 120,
        courseTitle: 'Course Title',
        courseUrl: 'http://example.com'
      })
    );

    expect(mockUpdateAdminManagedCourse).toHaveBeenCalledWith({
      variables: {
        course: {
          vendorId: 'vendorId',
          vendorCourseId: 'vendorCourseId',
          courseDescription: 'Description',
          courseDuration: 120,
          courseTitle: 'Course Title',
          courseUrl: 'http://example.com'
        }
      }
    });
  });
});
