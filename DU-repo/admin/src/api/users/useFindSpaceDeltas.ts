import { gql, useQuery } from '@apollo/client';
import type {
  FindSpaceDeltasQuery,
  FindSpaceDeltasQueryVariables
} from '@/api/codegen/graphql';

export const useFindSpaceDeltas = () => {
  const query = gql`
    query FindSpaceDeltas {
      findSpaceDeltas {
        title
      }
    }
  `;
  const { loading, error, data } = useQuery<
    FindSpaceDeltasQuery,
    FindSpaceDeltasQueryVariables
  >(query);
  return {
    spaceDeltasLoading: loading,
    spaceDeltasError: error,
    spaceDeltas: data?.findSpaceDeltas || null
  };
};
