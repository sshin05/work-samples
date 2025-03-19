'use client';

import { gql, useQuery } from '@apollo/client';

export const useGetMissionPartnerById = (id: string) => {
  const query = gql`
    query GetMissionPartnerById($id: ID!) {
      findMissionPartnerById(id: $id) {
        id
        name
      }
    }
  `;
  return useQuery(query, {
    variables: {
      id
    },
    skip: !id
  });
};
