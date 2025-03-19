import { gql, useMutation } from '@apollo/client';
import type {
  RemoveCollectionMutation,
  RemoveCollectionMutationVariables
} from '@/api/codegen/graphql';

export const useRemoveCollection = () => {
  const mutation = gql`
    mutation RemoveCollection($Id: ID!, $missionPartnerId: ID!) {
      removeCollection(id: $Id, missionPartnerId: $missionPartnerId) {
        collections {
          id
          name
          description
          items {
            assessmentId
            courseId
            dateAdded
            type
            planType
            planSourceId
            planVersion
            title
            description
            vendors
          }
        }
      }
    }
  `;
  const [removeCollection, { loading, error, data }] = useMutation<
    RemoveCollectionMutation,
    RemoveCollectionMutationVariables
  >(mutation, {
    refetchQueries: ['FindMissionPartnerById']
  });
  return {
    removeCollection: async (Id: string, missionPartnerId: string) =>
      removeCollection({
        variables: {
          Id,
          missionPartnerId
        }
      }),
    removeCollectionLoading: loading,
    removeCollectionError: error,
    removeCollectionData: data?.removeCollection
  };
};
