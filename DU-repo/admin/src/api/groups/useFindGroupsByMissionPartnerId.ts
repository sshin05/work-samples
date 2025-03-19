import { gql, useQuery } from '@apollo/client';
import type {
  FindGroupsByMissionPartnerIdQuery,
  FindGroupsByMissionPartnerIdQueryVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

const STATIC_ARRAY: never[] = [];

export const useFindGroupsByMissionPartnerId = (missionPartnerId: string) => {
  const query = gql`
    query findGroupsByMissionPartnerId($missionPartnerId: ID!) {
      findGroupsByMissionPartnerId(missionPartnerId: $missionPartnerId) {
        id
        name
        groupMemberCount
        missionPartnerName
        missionPartnerId
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
        totalItems
        CREATED_AT
        SAVED_AT
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery<
    FindGroupsByMissionPartnerIdQuery,
    FindGroupsByMissionPartnerIdQueryVariables
  >(query, {
    fetchPolicy: 'network-only',
    variables: {
      missionPartnerId
    }
  });
  const useRefetch = (options: FindGroupsByMissionPartnerIdQueryVariables) => {
    refetch(options);
  };
  const sortedData = useMemo(() => {
    if (!data?.findGroupsByMissionPartnerId) {
      return STATIC_ARRAY;
    }

    // Cannot assign to read only property '0' of object '[object Array]', felt like an old immutableJS error, so I spread the array
    const returnArray = [...data.findGroupsByMissionPartnerId].sort((a, b) => {
      if (a?.SAVED_AT > b?.SAVED_AT) {
        return -1;
      }
      if (a?.SAVED_AT < b?.SAVED_AT) {
        return 1;
      }
      return 0;
    });
    return returnArray;
  }, [data?.findGroupsByMissionPartnerId]);
  return {
    groupsByMissionPartnerIdLoading: loading,
    groupsByMissionPartnerIdError: error,
    groupsByMissionPartnerId: sortedData || STATIC_ARRAY,
    refetchGroupsByMissionPartnerId: useRefetch
  };
};
