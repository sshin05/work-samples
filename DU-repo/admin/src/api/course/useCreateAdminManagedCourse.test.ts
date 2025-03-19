import { renderHook, act } from '@@/test-utils';
import { useMutation } from '@apollo/client';
import { useCreateAdminManagedCourse } from './useCreateAdminManagedCourse';

jest.mock('@apollo/client');

describe('useCreateAdminManagedCourse', () => {
  it('should create course without error', () => {
    const mockCreateAdminManagedCourse = jest.fn();
    (useMutation as jest.Mock).mockReturnValue([
      mockCreateAdminManagedCourse,
      { loading: false }
    ]);

    const { result } = renderHook(() => useCreateAdminManagedCourse());

    act(() =>
      result.current.createAdminManagedCourse({
        vendorId: 'vendorId',
        vendorCourseId: 'vendorCourseId',
        courseDescription: 'Description',
        courseDuration: 120,
        courseTitle: 'Course Title',
        courseUrl: 'http://example.com'
      })
    );

    expect(mockCreateAdminManagedCourse).toHaveBeenCalledWith({
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
