import { gql, useQuery } from '@apollo/client';
import type {
  FindLearnerAssessmentsQuery,
  FindLearnerAssessmentsQueryVariables
} from '@/api/codegen/graphql';

const STATIC_ARRAY = [];

export const useFindLearnerAssessments = (
  userId: FindLearnerAssessmentsQueryVariables['userId'],
  missionPartnerId: FindLearnerAssessmentsQueryVariables['missionPartnerId']
) => {
  const query = gql`
    query findLearnerAssessments($userId: ID!, $missionPartnerId: ID) {
      findAssessmentsByUserId(
        userId: $userId
        missionPartnerId: $missionPartnerId
      ) {
        id
        assessmentTitle
        vendorName
        vendorAssessmentId
        vendorId
        startedAt
        markedCompletedAt
        status
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery<
    FindLearnerAssessmentsQuery,
    FindLearnerAssessmentsQueryVariables
  >(query, {
    variables: {
      userId,
      missionPartnerId
    },
    skip: !userId
  });
  const useRefetch = async (
    userId: FindLearnerAssessmentsQueryVariables['userId'],
    missionPartnerId: FindLearnerAssessmentsQueryVariables['missionPartnerId']
  ) =>
    refetch({
      userId,
      missionPartnerId
    });
  return {
    learnerAssessmentsLoading: loading,
    learnerAssessmentsError: error,
    learnerAssessments: data?.findAssessmentsByUserId || STATIC_ARRAY,
    refetchLearnerAssessments: useRefetch,
    totalLearnerAAssessments: data?.findAssessmentsByUserId?.length || 0
  };
};
