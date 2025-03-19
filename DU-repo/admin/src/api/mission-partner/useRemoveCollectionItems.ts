import { gql, useMutation } from '@apollo/client';
import type {
  RemoveCollectionItemInput,
  RemoveCollectionItemsMutation,
  RemoveCollectionItemsMutationVariables
} from '@/api/codegen/graphql';

export const useRemoveCollectionItems = () => {
  const mutation = gql`
    mutation RemoveCollectionItems(
      $ID: ID!
      $items: [RemoveCollectionItemInput!]!
      $missionPartnerId: ID!
    ) {
      removeCollectionItems(
        id: $ID
        items: $items
        missionPartnerId: $missionPartnerId
      ) {
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
  const [removeCollectionItems, { loading, error, data }] = useMutation<
    RemoveCollectionItemsMutation,
    RemoveCollectionItemsMutationVariables
  >(mutation, {
    refetchQueries: ['FindMissionPartnerById']
  });
  return {
    removeCollectionItems: async (
      ID: string,
      items: RemoveCollectionItemInput[],
      missionPartnerId: string
    ) =>
      removeCollectionItems({
        variables: {
          ID,
          items,
          missionPartnerId
        }
      }),
    removeCollectionItemsLoading: loading,
    removeCollectionItemsError: error,
    removeCollectionItemsData: data?.removeCollectionItems
  };
};
