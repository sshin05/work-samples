import { gql, useMutation } from '@apollo/client';
import type {
  CreateForceMultiplierMutation,
  CreateForceMultiplierMutationVariables
} from '@/api/codegen/graphql';

export const useCreateForceMultiplier = () => {
  const mutation = gql`
    mutation CreateForceMultiplier(
      $title: String!
      $summary: String!
      $missionPartnerId: String
    ) {
      createForceMultiplier(
        title: $title
        summary: $summary
        missionPartnerId: $missionPartnerId
      ) {
        id
        missionPartnerId
        title
        status
        version
      }
    }
  `;
  const [create, { loading, error, data }] = useMutation<
    CreateForceMultiplierMutation,
    CreateForceMultiplierMutationVariables
  >(mutation, { refetchQueries: ['FindMissionPartnerById'] });
  const createForceMultiplier = async (
    input: CreateForceMultiplierMutationVariables
  ) =>
    create({
      variables: input
    });
  return {
    createForceMultiplier,
    createForceMultiplierLoading: loading,
    createForceMultiplierError: error,
    createForceMultiplierData: data
  };
};
