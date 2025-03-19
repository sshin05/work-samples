import { gql, useMutation } from '@apollo/client';
import type {
  StartIndividualCourseByIdMutation,
  StartIndividualCourseByIdMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useStartIndividualCourseById = () => {
  const mutation = gql`
    mutation startIndividualCourseById($id: ID!) {
      startIndividualCourseById(id: $id) {
        id
        courseTitle
        courseDescription
        courseDuration
        courseImage
        dateUpdated
        courseUrl
      }
    }
  `;
  const [startCourse, { loading, error, data }] = useMutation<
    StartIndividualCourseByIdMutation,
    StartIndividualCourseByIdMutationVariables
  >(mutation);
  return useMemo(
    () => ({
      startCourse,
      startCourseLoading: loading,
      startCourseError: error,
      course: data?.startIndividualCourseById || null
    }),
    [loading, error, data, startCourse]
  );
};
