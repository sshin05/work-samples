import { gql, useMutation } from '@apollo/client';
import type {
  PublishHostedScormMutation,
  PublishHostedScormMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const usePublishHostedScorm = () => {
  const mutation = gql`
    mutation PublishHostedScorm($id: ID!, $missionPartnerId: ID) {
      publishHostedScorm(id: $id, missionPartnerId: $missionPartnerId) {
        id
        name
        missionPartnerId
        description
        status
        scormFilename
        scormUrl
      }
    }
  `;
  const [publishHostedScorm, { loading, error, data }] = useMutation<
    PublishHostedScormMutation,
    PublishHostedScormMutationVariables
  >(mutation, { refetchQueries: ['FindMissionPartnerById'] });
  return useMemo(
    () => ({
      publishHostedScorm: async (id: string, missionPartnerId: string) =>
        publishHostedScorm({
          variables: {
            id,
            missionPartnerId
          }
        }),
      publishHostedScormLoading: loading,
      publishHostedScormError: error,
      publishHostedScormData: data?.publishHostedScorm
    }),
    [loading, error, data, publishHostedScorm]
  );
};
