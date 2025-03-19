import { gql } from '@apollo/client';

export const FIND_ALL_HOSTED_VENDORS_QUERY = gql`
  query FindAllHostedVendors {
    findAllHostedVendors {
      id
      name
      logoUrl
      exams {
        id
      }
      courses {
        id
      }
      scorms {
        id
      }
    }
  }
`;
