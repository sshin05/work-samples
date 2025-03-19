import { gql } from '@apollo/client';

export const FIND_LEARNERS_BY_SEARCH_QUERY = gql`
  query FindLearnersBySearch(
    $missionPartnerId: ID!
    $searchText: String
    $onboardingComplete: Boolean
    $sortKey: String
    $sortDirection: SortDirection
    $pageNumber: SafeInt
    $pageSize: SafeInt
  ) {
    findLearnersBySearch(
      missionPartnerId: $missionPartnerId
      searchText: $searchText
      onboardingComplete: $onboardingComplete
      sortKey: $sortKey
      sortDirection: $sortDirection
      pageNumber: $pageNumber
      pageSize: $pageSize
    ) {
      records {
        id
        email
        firstName
        lastName
        onboardingCompletedAt
        keycloakUserCreatedAt
        userType
        lastLoginAt
      }
      total
    }
  }
`;
