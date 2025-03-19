import { gql, useQuery } from '@apollo/client';
import type {
  FindLabByIdQuery,
  FindLabByIdQueryVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useFindLabById = (labId: string) => {
  const query = gql`
    query FindLabById($labId: ID!) {
      findLabById(labId: $labId) {
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
        __typename
      }
    }
  `;
  const { refetch, loading, error, data } = useQuery<
    FindLabByIdQuery,
    FindLabByIdQueryVariables
  >(query, {
    variables: {
      labId
    },
    skip: !labId
  });
  return useMemo(
    () => ({
      findLabByIdLoading: loading,
      findLabByIdError: error,
      findLabById:
        (data?.findLabById as FindLabByIdQuery['findLabById']) || null,
      fetchLabById: (labId: string) =>
        refetch({
          labId
        })
    }),
    [loading, error, data, refetch]
  );
};
