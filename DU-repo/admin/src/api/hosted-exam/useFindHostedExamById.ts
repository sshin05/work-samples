import { gql, useQuery } from '@apollo/client';
import type {
  FindHostedExamByIdQuery,
  FindHostedExamByIdQueryVariables
} from '@/api/codegen/graphql';

export const useFindHostedExamById = (hostedExamId: string) => {
  const query = gql`
    query FindHostedExamById($hostedExamId: ID!) {
      findHostedExamById(hostedExamId: $hostedExamId) {
        id
        name
        description
        durationInMinutes
        missionPartnerId
        createdAt
        updatedAt
        questions
        status
        maxAttempts
        passingScore
        trainingCriteria {
          id
          maxScore
          minScore
          ruleType
          training {
            type
            courseId
            assessmentId
            planType
            planSourceId
            planVersion
            title
            requiredLicenses {
              vendorId
              vendorName
            }
            vendors
          }
        }
        __typename
      }
    }
  `;
  const { refetch, loading, error, data } = useQuery<
    FindHostedExamByIdQuery,
    FindHostedExamByIdQueryVariables
  >(query, {
    variables: {
      hostedExamId
    },
    skip: !hostedExamId,
    fetchPolicy: 'network-only'
  });
  return {
    hostedExamByIdLoading: loading,
    hostedExamByIdError: error,
    hostedExamById: data?.findHostedExamById,
    fetchHostedExamById: (hostedExamId: string) =>
      refetch({
        hostedExamId
      })
  };
};
