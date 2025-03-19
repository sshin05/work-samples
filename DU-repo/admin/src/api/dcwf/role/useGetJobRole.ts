import { gql, useQuery } from '@apollo/client';
import type {
  GetJobRoleQuery,
  GetJobRoleQueryVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useGetJobRole = ({ getJobRoleId }: GetJobRoleQueryVariables) => {
  const query = gql`
    query GetJobRole($getJobRoleId: ID!) {
      getJobRole(id: $getJobRoleId) {
        id
        roleId
        name
        description
      }
    }
  `;

  const { data, loading, error } = useQuery<
    GetJobRoleQuery,
    GetJobRoleQueryVariables
  >(query, {
    variables: {
      getJobRoleId
    }
  });

  return useMemo(
    () => ({
      jobRole: data?.getJobRole || [],
      jobRoleLoading: loading,
      jobRoleError: error
    }),
    [data, loading, error]
  );
};
