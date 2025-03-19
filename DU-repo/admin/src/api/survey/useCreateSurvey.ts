import { gql, useMutation } from '@apollo/client';
import { useMemo } from 'react';

// TODO: Come back to fix codegen

export const useCreateSurvey = () => {
  const mutation = gql`
    mutation CreateSurvey($surveyInput: NewSurveyInput!) {
      createSurvey(input: $surveyInput) {
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
  const [createSurvey, { loading, error, data }] = useMutation(mutation, {
    refetchQueries: ['FindMissionPartnerById']
  });
  return useMemo(
    () => ({
      createSurvey: surveyInput =>
        createSurvey({
          variables: {
            surveyInput
          }
        }),
      createSurveyLoading: loading,
      createSurveyError: error,
      createSurveyData: data
    }),
    [loading, error, data, createSurvey]
  );
};
