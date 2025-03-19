import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';

export const useFindTranscriptTrainingPlans = (options: {
  missionPartnerId?: string;
  groupId?: string;
  planType?: string;
  planSourceId?: string;
  status?: string;
  search?: string;
  sortField?: string;
  sortDirection?: string;
  pageSize?: number;
  pageNumber?: number;
}) => {
  const query = gql`
    query FindTranscriptTrainingPlans(
      $missionPartnerId: String
      $groupId: String
      $planType: String
      $planSourceId: String
      $status: String
      $search: String
      $sortField: String
      $sortDirection: String
      $pageSize: SafeInt
      $pageNumber: SafeInt
    ) {
      findTranscriptTrainingPlans(
        missionPartnerId: $missionPartnerId
        groupId: $groupId
        planType: $planType
        planSourceId: $planSourceId
        status: $status
        search: $search
        sortField: $sortField
        sortDirection: $sortDirection
        pageSize: $pageSize
        pageNumber: $pageNumber
      ) {
        records {
          userId
          trainingPlanId
          status
          assignedAt
          startedAt
          stoppedAt
          completedAt
          trainingPlan {
            planType
            planSourceId
            title
          }
          user {
            id
            firstName
            lastName
            email
          }
        }
        total
      }
    }
  `;
  const { loading, error, data } = useQuery(query, {
    variables: {
      ...options
    },
    fetchPolicy: 'cache-and-network'
  });
  return useMemo(
    () => ({
      transcriptTrainingPlansLoading: loading,
      transcriptTrainingPlansError: error,
      transcriptTrainingPlansTotal:
        data?.findTranscriptTrainingPlans?.total || 0,
      transcriptTrainingPlans: data?.findTranscriptTrainingPlans.records
    }),
    [loading, error, data]
  );
};
