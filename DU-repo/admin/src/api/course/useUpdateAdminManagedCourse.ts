import { gql, useMutation } from '@apollo/client';
import type {
  UpdateAdminManagedCourseMutation,
  UpdateAdminManagedCourseMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';
import { FIND_COURSE_BY_ID_QUERY } from './queries/FIND_COURSE_BY_ID_QUERY';

export const useUpdateAdminManagedCourse = () => {
  const mutation = gql`
    mutation UpdateAdminManagedCourse($course: CourseInput!) {
      updateAdminManagedCourse(course: $course) {
        id
        vendorId
        vendorCourseId
        vendorName
        courseDescription
        courseDuration
        courseTitle
        courseUrl
      }
    }
  `;
  const [updateAdminManagedCourse, { loading, error, data }] = useMutation<
    UpdateAdminManagedCourseMutation,
    UpdateAdminManagedCourseMutationVariables
  >(mutation, {
    refetchQueries: ({ data }) => {
      const { updateAdminManagedCourse } = data || {};
      return [
        {
          query: FIND_COURSE_BY_ID_QUERY,
          variables: {
            id: updateAdminManagedCourse?.id
          }
        }
      ];
    }
  });
  return useMemo(
    () => ({
      updateAdminManagedCourse: (
        course: UpdateAdminManagedCourseMutationVariables['course']
      ) =>
        updateAdminManagedCourse({
          variables: {
            course
          }
        }),
      updateAdminManagedCourseLoading: loading,
      updateAdminManagedCourseError: error,
      updateAdminManagedCourseData: data
    }),
    [loading, error, data, updateAdminManagedCourse]
  );
};
