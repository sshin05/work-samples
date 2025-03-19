import { gql, useQuery, type DocumentNode } from '@apollo/client';
import type {
  FindLearningPathByIdQuery,
  FindLearningPathByIdQueryVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

const STATIC_OBJECT: unknown = {};

export const useFindLearningPathById = (id: string | null) => {
  const query: DocumentNode = gql`
    query FindLearningPathById($id: ID!) {
      findLearningPathById(id: $id) {
        id
        title
        schoolId
        content {
          description
          summary
          valuePropositions {
            title
            summary
          }
          about {
            title
            description
            image
          }
          learningPathSummary {
            eyebrowTitle
            title
            summary
            valueText
            image
            caption {
              captionText
              name
              title
            }
          }
          testimonial {
            title
            description
            image
            caption {
              captionText
              name
              title
            }
          }
          opportunities {
            title
            locations {
              prefix
              organization
              location
              summary
            }
          }
          skillTree {
            title
            description
            image
          }
          callToAction {
            title
          }
        }
      }
    }
  `;
  const { refetch, loading, error, data } = useQuery<
    FindLearningPathByIdQuery,
    FindLearningPathByIdQueryVariables
  >(query, {
    variables: {
      id: id || ''
    },
    skip: !id
  });
  return useMemo(
    () => ({
      fetchLearningPath: (id: string) =>
        refetch({
          id
        }),
      learningPathByIdLoading: loading,
      learningPathByIdError: error,
      learningPathById: (data?.findLearningPathById ||
        STATIC_OBJECT) as FindLearningPathByIdQuery['findLearningPathById']
    }),
    [loading, error, data, refetch]
  );
};
