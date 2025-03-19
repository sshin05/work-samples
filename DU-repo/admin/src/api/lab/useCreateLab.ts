import { gql, useMutation } from '@apollo/client';
import type {
  CreateLabMutation,
  CreateLabMutationVariables,
  NewLabInput
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useCreateLab = () => {
  const mutation = gql`
    mutation CreateLab($input: NewLabInput!) {
      createLab(input: $input) {
        id
      }
    }
  `;
  const [createLab, { loading, error, data }] = useMutation<
    CreateLabMutation,
    CreateLabMutationVariables
  >(mutation, { refetchQueries: ['FindMissionPartnerById'] });
  return useMemo(
    () => ({
      createLab: (input: NewLabInput) =>
        createLab({
          variables: {
            input
          }
        }),
      createLabLoading: loading,
      createLabError: error,
      createLabData: data
    }),
    [loading, error, data, createLab]
  );
};
