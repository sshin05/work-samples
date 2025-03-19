import { gql, useMutation } from '@apollo/client';
import type {
  CreateHostedScormMutation,
  CreateHostedScormMutationVariables,
  NewHostedScormInput
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useCreateHostedScorm = () => {
  const mutation = gql`
    mutation CreateHostedScorm($hostedScormInput: NewHostedScormInput!) {
      createHostedScorm(input: $hostedScormInput) {
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
  const [createHostedScorm, { loading, error, data }] = useMutation<
    CreateHostedScormMutation,
    CreateHostedScormMutationVariables
  >(mutation, { refetchQueries: ['FindMissionPartnerById'] });
  return useMemo(
    () => ({
      createHostedScorm: async (hostedScormInput: NewHostedScormInput) =>
        createHostedScorm({
          variables: {
            hostedScormInput
          }
        }),
      createHostedScormLoading: loading,
      createHostedScormError: error,
      createHostedScormData: data
    }),
    [loading, error, data, createHostedScorm]
  );
};
