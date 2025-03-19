import { gql, useQuery } from '@apollo/client';
import type {
  FindAllVendorsQuery,
  FindAllVendorsQueryVariables
} from '@/api/codegen/graphql';

export const useFindAllVendors = () => {
  const query = gql`
    query FindAllVendors {
      findAllVendors {
        id
        name
        provisioned
        assigned
        isLicensed
      }
    }
  `;
  const { loading, error, data } = useQuery<
    FindAllVendorsQuery,
    FindAllVendorsQueryVariables
  >(query);
  return {
    vendorsReady: !loading && !error,
    vendorsLoading: loading,
    vendorsError: error,
    vendors: data?.findAllVendors || null
  };
};
