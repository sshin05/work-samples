import { gql, useQuery } from '@apollo/client';
import type {
  FindLabAndInfoByIdQuery,
  FindLabAndInfoByIdQueryVariables,
  FindLabByIdQuery
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

const STATIC_OBJECT: unknown = {};

export const useFindLabAndInfoById = (labId: string) => {
  const query = gql`
    query FindLabAndInfoById($labId: ID!) {
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
      }

      fetchRelevantLabInformation(labId: $labId) {
        coreConcepts {
          href
          id
          itemType
          source
          title
        }
        relevantLearningPaths {
          id
          itemType
          schoolId
          title
          version
        }
      }
    }
  `;
  const { refetch, data, loading, error } = useQuery<
    FindLabAndInfoByIdQuery,
    FindLabAndInfoByIdQueryVariables
  >(query, {
    variables: {
      labId
    },
    skip: !labId
  });
  return useMemo(
    () => ({
      findLabById: (data?.findLabById ??
        STATIC_OBJECT) as FindLabByIdQuery['findLabById'],
      relevantLabInfo: (data?.fetchRelevantLabInformation ??
        STATIC_OBJECT) as FindLabAndInfoByIdQuery['fetchRelevantLabInformation'],
      findLabAndInfoByIdLoading: loading,
      findLabAndInfoByIdError: error,
      fetchLabAndInfoById: (labId: string) =>
        refetch({
          labId
        })
    }),
    [loading, error, data, refetch]
  );
};
