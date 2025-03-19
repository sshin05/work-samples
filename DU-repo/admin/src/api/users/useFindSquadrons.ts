import { gql, useQuery } from '@apollo/client';
import type {
  FindSquadronsQuery,
  FindSquadronsQueryVariables
} from '@/api/codegen/graphql';

export const useFindSquadrons = () => {
  const query = gql`
    query findSquadrons {
      findSquadrons {
        title
      }
    }
  `;
  const { loading, error, data } = useQuery<
    FindSquadronsQuery,
    FindSquadronsQueryVariables
  >(query);
  return {
    squadronsLoading: loading,
    squadronsError: error,
    squadrons: data?.findSquadrons || null
  };
};
