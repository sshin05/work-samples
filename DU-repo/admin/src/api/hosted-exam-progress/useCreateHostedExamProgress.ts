import { gql, useMutation } from '@apollo/client';
import type {
  CreateHostedExamProgressMutation,
  CreateHostedExamProgressMutationVariables
} from '@/api/codegen/graphql';

export const useCreateHostedExamProgress = () => {
  const mutation = gql`
    mutation createHostedExamProgress($hostedExamId: ID!) {
      createHostedExamProgress(hostedExamId: $hostedExamId) {
        score
        answers
        status
        startedAt
      }
    }
  `;
  const [createHostedExamProgress, { loading, error, data }] = useMutation<
    CreateHostedExamProgressMutation,
    CreateHostedExamProgressMutationVariables
  >(mutation);
  return {
    createHostedExamProgress: async (hostedExamId: string) =>
      createHostedExamProgress({
        variables: {
          hostedExamId
        }
      }),
    createHostedExamProgressLoading: loading,
    createHostedExamProgressError: error,
    createHostedExamProgressData: data
  };
};
