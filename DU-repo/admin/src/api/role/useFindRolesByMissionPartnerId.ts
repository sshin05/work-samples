import { gql, useQuery } from '@apollo/client';
import type {
  FindRolesByMissionPartnerIdQuery,
  FindRolesByMissionPartnerIdQueryVariables
} from '@/api/codegen/graphql';
import { useCallback, useMemo } from 'react';

interface RoleInfo {
  userId: string;
  userName: string;
  userEmail: string;
  userDate: string;
  name: string;
}
const STATIC_ARRAY: RoleInfo[] = [];

export const useFindRolesByMissionPartnerId = (missionPartnerId: string) => {
  const query = gql`
    query FindRolesByMissionPartnerId($missionPartnerId: ID!) {
      findRolesByMissionPartnerId(missionPartnerId: $missionPartnerId) {
        userId
        userName
        userEmail
        userDate
        name
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery<
    FindRolesByMissionPartnerIdQuery,
    FindRolesByMissionPartnerIdQueryVariables
  >(query, {
    variables: {
      missionPartnerId
    },
    skip: !missionPartnerId
  });
  const handleRefetch = useCallback(
    (id: string) => {
      return refetch({
        missionPartnerId: id
      });
    },
    [refetch]
  );
  return useMemo(
    () => ({
      roleUserInfoLoading: loading,
      roleUserInfoError: error,
      roleUserInfoData: (data?.findRolesByMissionPartnerId ||
        STATIC_ARRAY) as FindRolesByMissionPartnerIdQuery['findRolesByMissionPartnerId'],
      refetchRoleUserInfo: handleRefetch
    }),
    [loading, error, data, handleRefetch]
  );
};
