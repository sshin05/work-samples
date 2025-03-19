import { gql, useMutation } from '@apollo/client';

// TODO: Come back to fix the codegen

export const usePublishHostedExam = () => {
  const mutation = gql`
    mutation PublishHostedExam($hostedExamId: ID!) {
      publishHostedExam(hostedExamId: $hostedExamId) {
        id
        name
        createdAt
        missionPartnerId
        description
        durationInMinutes
        questions
        maxAttempts
        passingScore
      }
    }
  `;
  const [publishHostedExam, { loading, error, data }] = useMutation(mutation, {
    refetchQueries: ['FindMissionPartnerById']
  });
  return {
    publishHostedExam: (hostedExamId: string) =>
      publishHostedExam({
        variables: {
          hostedExamId
        }
      }),
    publishHostedExamLoading: loading,
    publishHostedExamError: error,
    publishHostedExamData: data?.publishHostedExam
  };
};
