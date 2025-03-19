import { gql, useMutation } from '@apollo/client';
import type {
  AddHostedExamProgressCommentMutation,
  AddHostedExamProgressCommentMutationVariables
} from '@/api/codegen/graphql';

export const useAddHostedExamProgressComment = () => {
  const mutation = gql`
    mutation addHostedExamProgressComment(
      $hostedExamId: ID!
      $userId: ID!
      $questionId: ID!
      $comment: String!
    ) {
      addHostedExamProgressComment(
        hostedExamId: $hostedExamId
        userId: $userId
        questionId: $questionId
        comment: $comment
      ) {
        userId
      }
    }
  `;
  const [addHostedExamProgressComment, { loading, error, data }] = useMutation<
    AddHostedExamProgressCommentMutation,
    AddHostedExamProgressCommentMutationVariables
  >(mutation);
  return {
    addHostedExamProgressComment: async (
      hostedExamId: string,
      userId: string,
      questionId: string,
      comment: string
    ) =>
      addHostedExamProgressComment({
        variables: {
          hostedExamId,
          userId,
          questionId,
          comment
        }
      }),
    addHostedExamProgressCommentLoading: loading,
    addHostedExamProgressCommentError: error,
    addHostedExamProgressCommentData: data
  };
};
