import { gql, useQuery } from '@apollo/client';

export const useFindHostedVendorById = hostedVendorId => {
  const query = gql`
    query FindHostedVendorById($hostedVendorId: ID!) {
      findHostedVendorById(id: $hostedVendorId) {
        id
        name
        logoUrl
        exams {
          id
          name
          duration
          createdAt
          updatedAt
          status
        }
        courses {
          id
          name
          duration
          createdAt
          updatedAt
          status
        }
        scorms {
          id
          name
          duration
          status
          createdAt
          updatedAt
        }
      }
    }
  `;
  const buildOptions = id => ({ skip: !id, variables: { hostedVendorId: id } });

  const { refetch, loading, error, data } = useQuery(
    query,
    buildOptions(hostedVendorId)
  );

  return {
    hostedVendorByIdLoading: loading,
    hostedVendorByIdError: error,
    hostedVendorById: data?.findHostedVendorById ?? {},
    fetchHostedVendorById: id => refetch(buildOptions(id))
  };
};
