import { gql } from '@apollo/client';

export const GET_USER_DOWNLOADS_QUERY = gql`
  query GetUserDownloads {
    getUserDownloads {
      id
      userId
      type
      requestedAt
      completedAt
      title
      parameters
      status
      error
    }
  }
`;
