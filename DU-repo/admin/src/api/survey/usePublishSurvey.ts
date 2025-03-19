import { gql, useMutation } from '@apollo/client';
import { useMemo } from 'react';

// TODO: Come back to fix codegen

export const usePublishSurvey = () => {
  const mutation = gql`
    mutation PublishSurvey($id: ID!) {
      publishSurvey(id: $id) {
        id
        missionPartnerId
        missionPartner {
          name
        }
        name
        description
        durationInMinutes
        status
        questions
        createdAt
        updatedAt
      }
    }
  `;
  const [publishSurvey, { loading, error, data }] = useMutation(mutation, {
    refetchQueries: ['FindMissionPartnerById']
  });
  return useMemo(
    () => ({
      publishSurvey: (id: string) =>
        publishSurvey({
          variables: {
            id
          }
        }),
      publishSurveyLoading: loading,
      publishSurveyError: error,
      publishSurveyData: data
    }),
    [loading, error, data, publishSurvey]
  );
};
