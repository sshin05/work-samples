import { gql, useQuery } from '@apollo/client';
import type {
  FindLicensedVendorsQuery,
  FindLicensedVendorsQueryVariables
} from '@/api/codegen/graphql';

export const useFindLicensedVendors = () => {
  const query = gql`
    query FindLicensedVendors {
      findLicensedVendors {
        id
        name
        provisioned
        assigned
        isLicensed
      }
    }
  `;
  const { loading, error, data } = useQuery<
    FindLicensedVendorsQuery,
    FindLicensedVendorsQueryVariables
  >(query);
  return {
    licensedVendorsLoading: loading,
    licensedVendorsError: error,
    licensedVendors: data?.findLicensedVendors || null
  };
};
