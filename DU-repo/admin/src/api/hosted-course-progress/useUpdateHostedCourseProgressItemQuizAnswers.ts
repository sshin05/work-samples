import { gql, useMutation } from '@apollo/client';
import type {
  UpdateHostedCourseProgressItemQuizAnswersMutation,
  UpdateHostedCourseProgressItemQuizAnswersMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useUpdateHostedCourseProgressItemQuizAnswers = () => {
  const mutation = gql`
    mutation UpdateHostedCourseProgressItemQuizAnswers(
      $hostedCourseId: ID!
      $lessonId: ID!
      $userId: ID!
      $answers: [JSONObject]!
    ) {
      updateHostedCourseProgressItemQuizAnswers(
        hostedCourseId: $hostedCourseId
        lessonId: $lessonId
        userId: $userId
        answers: $answers
      ) {
        completedAt
        hostedCourseId
        items
        startedAt
        status
        userId
      }
    }
  `;
  const [updateHostedCourseProgressItemQuizAnswers, { loading, error, data }] =
    useMutation<
      UpdateHostedCourseProgressItemQuizAnswersMutation,
      UpdateHostedCourseProgressItemQuizAnswersMutationVariables
    >(mutation);
  return useMemo(
    () => ({
      updateHostedCourseProgressItemQuizAnswers: async (
        hostedCourseId: string,
        lessonId: string,
        userId: string,
        answers: Record<string, unknown>[]
      ) =>
        updateHostedCourseProgressItemQuizAnswers({
          variables: {
            hostedCourseId,
            lessonId,
            userId,
            answers
          }
        }),
      startCourseLoading: loading,
      startCourseError: error,
      response: data?.updateHostedCourseProgressItemQuizAnswers || null
    }),
    [loading, error, data, updateHostedCourseProgressItemQuizAnswers]
  );
};
