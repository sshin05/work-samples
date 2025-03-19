import { gql } from '@apollo/client';

export const GET_USER_UPLOADS_QUERY = gql`
  query GetUserUploads {
    getUserUploads {
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
