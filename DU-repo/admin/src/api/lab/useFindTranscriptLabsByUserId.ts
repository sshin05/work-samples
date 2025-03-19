import { gql, useQuery } from '@apollo/client';
import type {
  FindTranscriptLabsByUserIdQuery,
  FindTranscriptLabsByUserIdQueryVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useFindTranscriptLabsByUserId = (userId: string) => {
  const query = gql`
    query FindTranscriptLabsByUserId($userId: ID!) {
      findTranscriptLabsByUserId(userId: $userId) {
        lab {
          id
          name
          description
          previewImageUrl
          launchConfig {
            type
            path
          }
          durationInMinutes
          type
          status
          createdAt
          updatedAt
        }
        progress {
          userId
          labId
          status
          startedAt
          markedCompletedAt
        }
      }
    }
  `;
  const { refetch, data, loading, error } = useQuery<
    FindTranscriptLabsByUserIdQuery,
    FindTranscriptLabsByUserIdQueryVariables
  >(query, {
    variables: {
      userId
    },
    skip: !userId
  });
  return useMemo(
    () => ({
      transcriptLabs: (data?.findTranscriptLabsByUserId ??
        []) as FindTranscriptLabsByUserIdQuery['findTranscriptLabsByUserId'],
      transcriptLabsLoading: loading,
      transcriptLabsError: error,
      refetchTranscriptLabs: (userId: string) => refetch({ userId })
    }),
    [loading, error, data, refetch]
  );
};
