import { gql, useMutation } from '@apollo/client';
import type {
  CreateAdminManagedCourseMutation,
  CreateAdminManagedCourseMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';
import { FIND_COURSE_BY_ID_QUERY } from './queries/FIND_COURSE_BY_ID_QUERY';

export const useCreateAdminManagedCourse = () => {
  const mutation = gql`
    mutation CreateAdminManagedCourse($course: CourseInput!) {
      createAdminManagedCourse(course: $course) {
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
  const [createAdminManagedCourse, { loading, error, data }] = useMutation<
    CreateAdminManagedCourseMutation,
    CreateAdminManagedCourseMutationVariables
  >(mutation, {
    refetchQueries: ({ data }) => {
      const { createAdminManagedCourse } = data || {};
      return [
        {
          query: FIND_COURSE_BY_ID_QUERY,
          variables: {
            id: createAdminManagedCourse?.id
          }
        }
      ];
    }
  });
  return useMemo(
    () => ({
      createAdminManagedCourse: (
        course: CreateAdminManagedCourseMutationVariables['course']
      ) =>
        createAdminManagedCourse({
          variables: {
            course
          }
        }),
      createAdminManagedCourseLoading: loading,
      createAdminManagedCourseError: error,
      createAdminManagedCourseData: data
    }),
    [loading, error, data, createAdminManagedCourse]
  );
};
