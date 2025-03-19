import { gql, useQuery } from '@apollo/client';
import type {
  FindAllAffiliatesQuery,
  FindAllAffiliatesQueryVariables
} from '@/api/codegen/graphql';

const STATIC_ARRAY = [];

export const useFindAllAffiliates = () => {
  const query = gql`
    query FindAllAffiliates {
      findAllAffiliates {
        id
        name
      }
    }
  `;
  const { loading, error, data } = useQuery<
    FindAllAffiliatesQuery,
    FindAllAffiliatesQueryVariables
  >(query);
  return {
    affiliatesLoading: loading,
    affiliatesError: error,
    affiliates: data?.findAllAffiliates || STATIC_ARRAY
  };
};
