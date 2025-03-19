import { gql, useMutation } from '@apollo/client';
import type {
  DeleteLabMutation,
  DeleteLabMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useDeleteLab = () => {
  const mutation = gql`
    mutation DeleteLab($labId: ID!) {
      deleteLab(labId: $labId)
    }
  `;

  const [deleteLab, { loading, error, data }] = useMutation<
    DeleteLabMutation,
    DeleteLabMutationVariables
  >(mutation, {
    refetchQueries: ['FindMissionPartnerById']
  });

  return useMemo(
    () => ({
      deleteLab: (labId: string) =>
        deleteLab({
          variables: {
            labId
          }
        }),
      deleteLabLoading: loading,
      deleteLabError: error,
      deleteLabData: data?.deleteLab
    }),
    [loading, error, data, deleteLab]
  );
};
