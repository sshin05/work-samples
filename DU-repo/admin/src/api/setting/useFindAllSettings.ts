import { gql, useQuery } from '@apollo/client';
import type {
  FindAllSettingsQuery,
  FindAllSettingsQueryVariables
} from '@/api/codegen/graphql';

const STATIC_ARRAY = [];

export const useFindAllSettings = () => {
  const query = gql`
    query FindAllSettings {
      findAllSettings {
        id
        name
        enabled
      }
    }
  `;
  const { loading, error, data } = useQuery<
    FindAllSettingsQuery,
    FindAllSettingsQueryVariables
  >(query);
  return {
    settingsLoading: loading,
    settingsError: error,
    settings: data?.findAllSettings || STATIC_ARRAY
  };
};
