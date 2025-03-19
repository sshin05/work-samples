import { gql, useMutation } from '@apollo/client';
import type {
  AddHostedCourseProgressItemQuizCommentMutation,
  AddHostedCourseProgressItemQuizCommentMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useAddHostedCourseProgressItemQuizComment = () => {
  const mutation = gql`
    mutation addHostedCourseProgressItemQuizComment(
      $hostedCourseId: ID!
      $lessonId: ID!
      $userId: ID!
      $questionId: ID!
      $comment: String!
    ) {
      addHostedCourseProgressItemQuizComment(
        hostedCourseId: $hostedCourseId
        lessonId: $lessonId
        userId: $userId
        questionId: $questionId
        comment: $comment
      ) {
        userId
        hostedCourseId
        items
      }
    }
  `;
  const [addHostedCourseProgressItemQuizComment, { loading, error, data }] =
    useMutation<
      AddHostedCourseProgressItemQuizCommentMutation,
      AddHostedCourseProgressItemQuizCommentMutationVariables
    >(mutation);
  return useMemo(
    () => ({
      addHostedCourseProgressItemQuizComment: async (
        hostedCourseId: string,
        lessonId: string,
        userId: string,
        questionId: string,
        comment: string
      ) =>
        addHostedCourseProgressItemQuizComment({
          variables: {
            hostedCourseId,
            lessonId,
            userId,
            questionId,
            comment
          }
        }),
      addHostedCourseProgressItemQuizCommentLoading: loading,
      addHostedCourseProgressItemQuizCommentError: error,
      addHostedCourseProgressItemQuizCommentData: data
    }),
    [loading, error, data, addHostedCourseProgressItemQuizComment]
  );
};
