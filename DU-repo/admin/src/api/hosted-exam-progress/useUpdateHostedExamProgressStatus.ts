import { gql, useMutation } from '@apollo/client';
import type {
  UpdateHostedExamProgressStatusMutation,
  UpdateHostedExamProgressStatusMutationVariables
} from '@/api/codegen/graphql';

export const useUpdateHostedExamProgressStatus = () => {
  const mutation = gql`
    mutation updateHostedExamProgressStatus(
      $hostedExamId: ID!
      $userId: ID
      $status: String!
    ) {
      updateHostedExamProgressStatus(
        hostedExamId: $hostedExamId
        userId: $userId
        status: $status
      ) {
        score
        answers
        status
        startedAt
        completedAt
      }
    }
  `;
  const [_updateHostedExamProgressStatus, { loading, error, data }] =
    useMutation<
      UpdateHostedExamProgressStatusMutation,
      UpdateHostedExamProgressStatusMutationVariables
    >(mutation);
  const updateHostedExamProgressStatus = async (
    hostedExamId: string,
    status: string,
    userId = null
  ) =>
    _updateHostedExamProgressStatus({
      variables: {
        hostedExamId,
        status,
        userId
      }
    });
  return {
    updateHostedExamProgressStatus,
    updateHostedExamProgressStatusLoading: loading,
    updateHostedExamProgressStatusError: error,
    updateHostedExamProgressStatusData: data
  };
};
