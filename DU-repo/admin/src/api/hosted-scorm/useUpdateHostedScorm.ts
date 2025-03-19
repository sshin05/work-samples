import { gql, useMutation } from '@apollo/client';
import type {
  UpdatedHostedScormInput,
  UpdateHostedScormMutation,
  UpdateHostedScormMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useUpdateHostedScorm = () => {
  const mutation = gql`
    mutation UpdateHostedScorm($hostedScormInput: UpdatedHostedScormInput!) {
      updateHostedScorm(input: $hostedScormInput) {
        id
        missionPartnerId
        name
        description
        duration
        status
        scormFilename
        scormUrl
        createdAt
        updatedAt
      }
    }
  `;
  const [updateHostedScorm, { loading, error, data }] = useMutation<
    UpdateHostedScormMutation,
    UpdateHostedScormMutationVariables
  >(mutation, { refetchQueries: ['FindMissionPartnerById'] });
  return useMemo(
    () => ({
      updateHostedScorm: async (input: UpdatedHostedScormInput) =>
        updateHostedScorm({
          variables: {
            hostedScormInput: input
          }
        }),
      updateHostedScormLoading: loading,
      updateHostedScormError: error,
      updateHostedScormData: data
    }),
    [loading, error, data, updateHostedScorm]
  );
};
