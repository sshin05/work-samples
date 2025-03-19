import { gql, useQuery } from '@apollo/client';
import type {
  FindSkillByIdQuery,
  FindSkillByIdQueryVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

const STATIC_ARRAY: never[] = [];

export const useFindSkillById = (id: string) => {
  const query = gql`
    query findSkillById($id: ID!) {
      findSkillById(id: $id) {
        id
        title
        learningPaths {
          id
          title
          schoolId
          content {
            summary
          }
        }
        content {
          summary
          description
          valuePropositions {
            title
            summary
          }
          about {
            title
            description
            image
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
        vendors
        totalItems
        totalDuration
        enrolledLearners
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery<
    FindSkillByIdQuery,
    FindSkillByIdQueryVariables
  >(query, {
    variables: {
      id
    },
    skip: !id
  });
  return useMemo(
    () => ({
      refetchSkill: (id: string) =>
        refetch({
          id
        }),
      skillsByIdLoading: loading,
      skillsByIdError: error,
      skillsById: (data?.findSkillById ||
        STATIC_ARRAY) as FindSkillByIdQuery['findSkillById']
    }),
    [loading, error, data, refetch]
  );
};
