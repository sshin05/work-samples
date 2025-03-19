import { gql, useQuery } from '@apollo/client';
import type {
  FindHostedExamProgressByExamIdUserIdQuery,
  FindHostedExamProgressByExamIdUserIdQueryVariables
} from '@/api/codegen/graphql';

export const useFindHostedExamProgressByExamIdUserId = (
  hostedExamId: string,
  userId: string
) => {
  const query = gql`
    query findHostedExamProgressByExamIdUserId(
      $hostedExamId: ID!
      $userId: ID
    ) {
      findHostedExamProgressByExamIdUserId(
        hostedExamId: $hostedExamId
        userId: $userId
      ) {
        status
        score
        answers
      }
    }
  `;
  const { refetch, loading, error, data } = useQuery<
    FindHostedExamProgressByExamIdUserIdQuery,
    FindHostedExamProgressByExamIdUserIdQueryVariables
  >(query, {
    skip: !hostedExamId,
    variables: {
      hostedExamId,
      userId
    }
  });
  return {
    fetchHostedExamProgress: async (newExamId: string, newUserId: string) =>
      refetch({
        hostedExamId: newExamId,
        userId: newUserId
      }),
    findHostedExamProgressLoading: loading,
    findHostedExamProgressError: error,
    findHostedExamProgressData: data?.findHostedExamProgressByExamIdUserId ?? {}
  };
};
