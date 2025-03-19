import { gql, useQuery } from '@apollo/client';
import type {
  FindSettingByIdQuery,
  FindSettingByIdQueryVariables
} from '@/api/codegen/graphql';

export const useFindSettingById = (id: string) => {
  const query = gql`
    query FindSettingById($id: ID!) {
      findSettingById(id: $id) {
        id
        name
        enabled
      }
    }
  `;
  const { loading, error, data } = useQuery<
    FindSettingByIdQuery,
    FindSettingByIdQueryVariables
  >(query, {
    variables: {
      id
    },
    skip: !id
  });
  return {
    settingLoading: loading,
    settingError: error,
    setting: data?.findSettingById || null
  };
};
