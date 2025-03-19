import { gql, useMutation } from '@apollo/client';
import type {
  UpdatedLabInput,
  UpdateLabMutation,
  UpdateLabMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useUpdateLab = () => {
  const mutation = gql`
    mutation UpdateLab($input: UpdatedLabInput!) {
      updateLab(input: $input) {
        id
        missionPartnerId
        missionPartner {
          id
          name
        }
        status
        name
        description
        durationInMinutes
        previewImageUrl
        content {
          id
          title
          description
        }
        coreConceptItems {
          itemId
          itemType
          itemTitle
          itemVersion
        }
        relevantLearningPaths {
          itemId
          itemType
          itemTitle
          itemVersion
        }
        instructions {
          id
          type
          title
          content
          videoFilename
          videoUrl
        }
        launchConfig {
          type
          path
        }
        type
        createdAt
        updatedAt
      }
    }
  `;
  const [updateLab, { loading, error, data }] = useMutation<
    UpdateLabMutation,
    UpdateLabMutationVariables
  >(mutation, {
    refetchQueries: ['FindMissionPartnerById']
  });
  return useMemo(
    () => ({
      updateLab: (input: UpdatedLabInput) =>
        updateLab({
          variables: {
            input
          }
        }),
      updateLabLoading: loading,
      updateLabError: error,
      updateLabData: data
    }),
    [loading, error, data, updateLab]
  );
};
