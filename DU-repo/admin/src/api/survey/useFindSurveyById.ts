import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';

// TODO: Come back to fix codegen

export const useFindSurveyById = (id: string) => {
  const query = gql`
    query FindSurveyById($id: ID!) {
      findSurveyById(id: $id) {
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
        __typename
      }
    }
  `;
  const { refetch, loading, error, data } = useQuery(query, {
    variables: {
      id
    },
    skip: !id,
    fetchPolicy: 'network-only'
  });
  return useMemo(
    () => ({
      surveyByIdLoading: loading,
      surveyByIdError: error,
      surveyById: data?.findSurveyById ?? {},
      fetchSurveyById: (surveyId: string) =>
        refetch({
          id: surveyId
        })
    }),
    [loading, error, data, refetch]
  );
};
