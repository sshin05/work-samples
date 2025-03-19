import { gql, useQuery } from '@apollo/client';
import type {
  GetAllTrainingPlansQuery,
  GetAllTrainingPlansQueryVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useGetAllTrainingPlans = () => {
  const query = gql`
    query getAllTrainingPlans {
      getAllTrainingPlans {
        id
        userId
        planType
        planSourceId
        title
        startedAt
        completedAt
        activities {
          activityType
          masteryLevel
          course {
            id
            vendorId
            vendorCourseId
            courseTitle
            courseUrl
            courseDescription
            courseDuration
          }
          startedAt
          markedCompletedAt
          completedAt
          specialization {
            id
            title
            instructions
            options {
              title
              text
              value
            }
          }
          value
        }
        stats {
          group
          total
          completed
          completedPercentage
          duration
          completedAt
        }
        nextActivity {
          activityType
          masteryLevel
          course {
            id
            vendorId
            vendorCourseId
            courseTitle
            courseUrl
            courseDescription
            courseDuration
          }
          startedAt
          markedCompletedAt
          completedAt
          specialization {
            id
            title
            instructions
            options {
              title
              text
              value
            }
          }
          value
        }
      }
    }
  `;
  const { loading, error, data } = useQuery<
    GetAllTrainingPlansQuery,
    GetAllTrainingPlansQueryVariables
  >(query, {
    fetchPolicy: 'cache-and-network'
  });
  return useMemo(
    () => ({
      allTrainingPlansLoading: loading,
      allTrainingPlansError: error,
      allTrainingPlans: (data?.getAllTrainingPlans ||
        null) as GetAllTrainingPlansQuery['getAllTrainingPlans']
    }),
    [loading, error, data]
  );
};
