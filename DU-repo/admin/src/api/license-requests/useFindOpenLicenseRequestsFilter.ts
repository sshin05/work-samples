import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import type {
  FindOpenLicenseRequestsFilterQuery,
  FindOpenLicenseRequestsFilterQueryVariables
} from '../codegen/graphql';

export const useFindOpenLicenseRequestsFilter = options => {
  const query = gql`
    query FindOpenLicenseRequestsFilter(
      $missionPartnerId: ID!
      $sortDirection: String
      $sortField: String
      $search: String
      $pageNumber: SafeInt
      $pageSize: SafeInt
      $branch: String
      $vendorName: String
    ) {
      findOpenLicenseRequests(
        missionPartnerId: $missionPartnerId
        sortDirection: $sortDirection
        sortField: $sortField
        search: $search
        pageNumber: $pageNumber
        pageSize: $pageSize
        branch: $branch
        vendorName: $vendorName
      ) {
        records {
          missionPartnerId
          missionPartnerName
          vendorId
          vendorName
          userId
          userFirstName
          userLastName
          userEmail
          userOrganization
          id
          status
          requestedAt
          approvedAt
          declinedAt
        }
        total
      }
    }
  `;
  const { refetch, loading, error, data } = useQuery<
    FindOpenLicenseRequestsFilterQuery,
    FindOpenLicenseRequestsFilterQueryVariables
  >(query, {
    variables: {
      ...options,
      branch: options.branch || undefined,
      vendorName: options.vendorName || undefined,
      pageSize: options.pageSize || 50
    },
    fetchPolicy: 'cache-and-network'
  });

  const memoizedResult = useMemo(
    () => ({
      requestsLoading: loading,
      requestsError: error,
      requests: data?.findOpenLicenseRequests?.records || [],
      total: data?.findOpenLicenseRequests?.total || 0,
      refetchRequests: refetch
    }),
    [loading, error, data, refetch]
  );

  return memoizedResult;
};
