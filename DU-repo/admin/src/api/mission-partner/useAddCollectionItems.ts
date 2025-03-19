import { gql, useMutation } from '@apollo/client';
import type {
  AddCollectionItemsMutation,
  AddCollectionItemsMutationVariables,
  CollectionItemInput
} from '@/api/codegen/graphql';

const STATIC_ARRAY = [];

export const useAddCollectionItems = () => {
  const mutation = gql`
    mutation AddCollectionItems(
      $ID: ID!
      $items: [CollectionItemInput!]!
      $missionPartnerId: ID!
    ) {
      addCollectionItems(
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
  const [addCollectionItems, { loading, error, data }] = useMutation<
    AddCollectionItemsMutation,
    AddCollectionItemsMutationVariables
  >(mutation, {
    refetchQueries: ['FindMissionPartnerById']
  });
  return {
    addCollectionItems: async (
      ID: string,
      items: CollectionItemInput[],
      missionPartnerId: string
    ) =>
      addCollectionItems({
        variables: {
          ID,
          items,
          missionPartnerId
        }
      }),
    addCollectionItemsLoading: loading,
    addCollectionItemsError: error,
    addCollectionItemsData: data?.addCollectionItems || STATIC_ARRAY
  };
};
