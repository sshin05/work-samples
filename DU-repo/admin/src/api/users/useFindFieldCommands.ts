import { gql, useQuery } from '@apollo/client';
import type {
  FindFieldCommandsQuery,
  FindFieldCommandsQueryVariables
} from '@/api/codegen/graphql';

export const useFindFieldCommands = () => {
  const query = gql`
    query FindFieldCommands {
      findFieldCommands {
        title
      }
    }
  `;
  const { loading, error, data } = useQuery<
    FindFieldCommandsQuery,
    FindFieldCommandsQueryVariables
  >(query);
  return {
    fieldCommandsLoading: loading,
    fieldCommandsError: error,
    fieldCommands: data?.findFieldCommands || null
  };
};
