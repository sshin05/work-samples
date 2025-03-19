import { gql, useQuery } from '@apollo/client';
import type {
  FindOrganizationsQuery,
  FindOrganizationsQueryVariables
} from '@/api/codegen/graphql';

export const useFindOrganizations = () => {
  const query = gql`
    query findOrganizations {
      findOrganizations {
        title
      }
    }
  `;
  const { loading, error, data } = useQuery<
    FindOrganizationsQuery,
    FindOrganizationsQueryVariables
  >(query);
  return {
    organizationsLoading: loading,
    organizationsError: error,
    organizations: data?.findOrganizations || null
  };
};
