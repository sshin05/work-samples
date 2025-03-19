import { gql, useQuery } from '@apollo/client';
import type {
  FindGroupByIdQuery,
  FindGroupByIdQueryVariables
} from '@/api/codegen/graphql';

export const useFindGroupById = (groupId: string) => {
  const query = gql`
    query findGroupById($groupId: ID!) {
      findGroupById(groupId: $groupId) {
        id
        name
        missionPartnerId
        missionPartnerName
        groupMemberCount
        trainingPlans {
          planSourceId
          planType
          planVersion
          title
          isLatestVersion
        }
        courses {
          courseId
          vendorName
          courseTitle
        }
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery<
    FindGroupByIdQuery,
    FindGroupByIdQueryVariables
  >(query, {
    fetchPolicy: 'network-only',
    variables: {
      groupId
    },
    skip: !groupId
  });
  return {
    groupByIdLoading: loading,
    groupByIdError: error,
    groupById: data?.findGroupById,
    refetchGroupById: (groupId: string) =>
      refetch({
        groupId
      })
  };
};
