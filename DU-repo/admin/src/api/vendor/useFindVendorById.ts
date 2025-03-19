import { gql, useQuery } from '@apollo/client';
import type {
  FindVendorByIdQuery,
  FindVendorByIdQueryVariables
} from '@/api/codegen/graphql';

export const useFindVendorById = (id: string) => {
  const query = gql`
    query findVendorById($id: ID!) {
      findVendorById(id: $id) {
        id
        name
        provisioned
        assigned
      }
    }
  `;
  const { loading, error, data } = useQuery<
    FindVendorByIdQuery,
    FindVendorByIdQueryVariables
  >(query, {
    variables: {
      id
    },
    skip: !id
  });
  return {
    vendorLoading: loading,
    vendorError: error,
    vendor: data?.findVendorById || null
  };
};
