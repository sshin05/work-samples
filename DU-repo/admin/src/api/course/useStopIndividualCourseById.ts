import { gql, useMutation } from '@apollo/client';
import type {
  StopIndividualCourseByIdMutation,
  StopIndividualCourseByIdMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useStopIndividualCourseById = () => {
  const mutation = gql`
    mutation stopIndividualCourseById($id: ID!) {
      stopIndividualCourseById(id: $id) {
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
  const [stopCourse, { loading, error, data }] = useMutation<
    StopIndividualCourseByIdMutation,
    StopIndividualCourseByIdMutationVariables
  >(mutation);
  return useMemo(
    () => ({
      stopCourse,
      stopCourseLoading: loading,
      stopCourseError: error,
      course: data?.stopIndividualCourseById || null
    }),
    [loading, error, data, stopCourse]
  );
};
