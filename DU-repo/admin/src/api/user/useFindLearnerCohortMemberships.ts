import { gql, useQuery } from '@apollo/client';

const STATIC_ARRAY: never[] = [];

export const useFindLearnerCohortMemberships = (
  userId: string,
  missionPartnerId: string
) => {
  // TODO: Update api to return groupMemberships.createdAt (finished on api side)
  const query = gql`
    query findLearnerCohorts($userId: ID!, $missionPartnerId: ID!) {
      getUserCohorts(userId: $userId, missionPartnerId: $missionPartnerId) {
        group {
          id
          name
          createdAt
        }
        count
        missionPartner {
          id
          name
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(query, {
    variables: {
      userId,
      missionPartnerId
    }
  });

  return {
    learnerCohortsLoading: loading,
    learnerCohortsError: error,
    learnerCohortMemberships: data?.getUserCohorts || STATIC_ARRAY
  };
};
