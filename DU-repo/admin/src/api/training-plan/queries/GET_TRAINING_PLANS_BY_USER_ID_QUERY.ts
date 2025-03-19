import { gql } from '@apollo/client';

export const GET_TRAINING_PLANS_BY_USER_ID_QUERY = gql`
  query getTrainingPlansByUserId($userId: ID!) {
    getTrainingPlansByUserId(userId: $userId) {
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
