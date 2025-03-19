import { gql, useLazyQuery } from '@apollo/client';
import { USER_SEARCH_LIMIT } from './constants/USER_SEARCH_LIMIT';
import { useCallback, useState } from 'react';
import { canPaginate } from '@/utils/data/canPaginate';

export const useFindUsersBySearchTextLazy = () => {
  const query = gql`
    query FindUsersBySearchText(
      $searchText: String!
      $branch: String
      $pageNumber: SafeInt
      $pageSize: SafeInt
    ) {
      findUsersBySearchText(
        searchText: $searchText
        branch: $branch
        pageNumber: $pageNumber
        pageSize: $pageSize
      ) {
        records {
          id
          firstName
          lastName
          email
          photoUrl
          branch
          userType
          grade
          occupationalCode
          metadata
          currentCareer
          onboardingCompletedAt
          licenseOnboardingCompletedAt
          showThirdPartySiteWarning
          badgeNotifications
        }
        total
      }
    }
  `;

  const [pageNum, setPageNum] = useState(1);

  const [fetchUsersQuery, { loading, error, data }] = useLazyQuery(query, {
    fetchPolicy: 'network-only'
  });

  const fetchUsers = useCallback(
    async (searchText: string, pageNumber = 1, branch = '') => {
      if (!searchText) return;
      await fetchUsersQuery({
        variables: {
          searchText: searchText || undefined,
          pageNumber,
          pageSize: USER_SEARCH_LIMIT,
          branch: branch || undefined
        }
      });
      // doing this after fetch for poor network conditions; todo: when things slow down; there are implementations which are setting current page and we can just pass it here.
      // if this is done, we need to think about the `!searchText` check/return above; we may want to conditionally set the page number to the first page in that block
      setPageNum(pageNumber);
    },
    [fetchUsersQuery]
  );

  return {
    usersBySearchLoading: loading,
    usersBySearchError: error,
    usersBySearch: data?.findUsersBySearchText?.records || null,
    isMore: canPaginate(
      pageNum,
      USER_SEARCH_LIMIT,
      data?.findUsersBySearchText?.total
    ),
    fetchUsersBySearch: fetchUsers
  };
};
