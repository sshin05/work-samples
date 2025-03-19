import { renderHook } from '@testing-library/react';
import { useQuery } from '@apollo/client';
import { useFindTranscriptCourses } from './useFindTranscriptCourses';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn()
}));

describe('useFindTranscriptCourses', () => {
  const defaultOptions = {
    courseId: 'course-1',
    missionPartnerId: 'mp-1',
    sortField: 'name',
    sortDirection: 'asc',
    pageSize: 10,
    pageNumber: 1
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return loading state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      data: null
    });

    const { result } = renderHook(() =>
      useFindTranscriptCourses(defaultOptions)
    );

    const {
      transcriptCoursesLoading,
      transcriptCoursesError,
      transcriptCoursesCount,
      transcriptCoursesData
    } = result.current;

    expect(transcriptCoursesLoading).toBe(true);
    expect(transcriptCoursesError).toBeNull();
    expect(transcriptCoursesCount).toBe(0);
    expect(transcriptCoursesData).toBeUndefined();
  });

  it('should return error state', () => {
    const mockError = new Error('Network error');
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: mockError,
      data: null
    });

    const { result } = renderHook(() =>
      useFindTranscriptCourses(defaultOptions)
    );

    const {
      transcriptCoursesLoading,
      transcriptCoursesError,
      transcriptCoursesCount,
      transcriptCoursesData
    } = result.current;

    expect(transcriptCoursesLoading).toBe(false);
    expect(transcriptCoursesError).toBe(mockError);
    expect(transcriptCoursesCount).toBe(0);
    expect(transcriptCoursesData).toBeUndefined();
  });

  it('should return data', () => {
    const mockData = {
      findTranscriptCourses: {
        count: 1,
        data: [
          {
            userId: 'user-1',
            courseId: 'course-1',
            status: 'Pending Review',
            planTitle: 'title1',
            course: {
              id: 'course-1',
              courseTitle: 'Course 1',
              vendorId: 'vendor-1',
              vendorCourseId: 'vendor-course-1'
            },
            user: {
              id: 'user-1',
              email: 'user1@email.com',
              firstName: 'User',
              lastName: 'One'
            }
          }
        ]
      }
    };

    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: mockData
    });

    const { result } = renderHook(() =>
      useFindTranscriptCourses(defaultOptions)
    );

    const {
      transcriptCoursesLoading,
      transcriptCoursesError,
      transcriptCoursesCount,
      transcriptCoursesData
    } = result.current;

    expect(transcriptCoursesLoading).toBe(false);
    expect(transcriptCoursesError).toBe(null);
    expect(transcriptCoursesCount).toBe(1);
    expect(transcriptCoursesData).toEqual([
      {
        userId: 'user-1',
        courseId: 'course-1',
        status: 'Pending Review',
        planTitle: 'title1',
        course: {
          id: 'course-1',
          courseTitle: 'Course 1',
          vendorId: 'vendor-1',
          vendorCourseId: 'vendor-course-1'
        },
        user: {
          id: 'user-1',
          email: 'user1@email.com',
          firstName: 'User',
          lastName: 'One'
        }
      }
    ]);
  });
});
