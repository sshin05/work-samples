import { gql, useQuery } from '@apollo/client';
import type {
  GetUserForRolesQuery,
  GetUserForRolesQueryVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useFindUserRoles = () => {
  const query = gql`
    query getUserForRoles {
      getUser {
        roles {
          name
          missionPartnerId
        }
      }
    }
  `;
  const { loading, error, data } = useQuery<
    GetUserForRolesQuery,
    GetUserForRolesQueryVariables
  >(query);
  return useMemo(
    () => ({
      userRolesLoading: loading,
      userRolesError: error,
      userRolesData: data?.getUser?.roles
    }),
    [loading, error, data]
  );
};
