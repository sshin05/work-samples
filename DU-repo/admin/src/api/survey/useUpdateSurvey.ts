import { gql, useMutation } from '@apollo/client';
import { useMemo } from 'react';

// TODO: Come back to fix codegen

export const useUpdateSurvey = () => {
  const mutation = gql`
    mutation UpdateSurvey($input: UpdatedSurveyInput!) {
      updateSurvey(input: $input) {
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
  const [updateSurvey, { loading, error, data }] = useMutation(mutation, {
    refetchQueries: ['FindMissionPartnerById']
  });
  return useMemo(
    () => ({
      updateSurvey: input =>
        updateSurvey({
          variables: {
            input
          }
        }),
      updateSurveyLoading: loading,
      updateSurveyError: error,
      updateSurveyData: data
    }),
    [loading, error, data, updateSurvey]
  );
};
