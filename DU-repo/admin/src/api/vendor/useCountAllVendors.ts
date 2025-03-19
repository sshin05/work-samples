import { gql, useQuery } from '@apollo/client';
import type {
  CountAllVendorsQuery,
  CountAllVendorsQueryVariables
} from '@/api/codegen/graphql';

export const useCountAllVendors = () => {
  const query = gql`
    query countAllVendors {
      countAllVendors
    }
  `;
  const { loading, error, data } = useQuery<
    CountAllVendorsQuery,
    CountAllVendorsQueryVariables
  >(query, {
    fetchPolicy: 'network-only'
  });
  return {
    countVendorsLoading: loading,
    countvendorsError: error,
    countVendors: data?.countAllVendors || null
  };
};
