import { gql, useMutation } from '@apollo/client';
import type {
  UpdatedHostedExamInput,
  UpdateHostedExamMutation,
  UpdateHostedExamMutationVariables
} from '@/api/codegen/graphql';

export const useUpdateHostedExam = () => {
  const mutation = gql`
    mutation UpdateHostedExam($hostedExamInput: UpdatedHostedExamInput!) {
      updateHostedExam(hostedExamInput: $hostedExamInput) {
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
  const [updateHostedExam, { loading, error, data }] = useMutation<
    UpdateHostedExamMutation,
    UpdateHostedExamMutationVariables
  >(mutation, { refetchQueries: ['FindMissionPartnerById'] });
  return {
    updateHostedExam: (updatedHostedExam: UpdatedHostedExamInput) =>
      updateHostedExam({
        variables: {
          hostedExamInput: updatedHostedExam
        }
      }),
    updateHostedExamLoading: loading,
    updateHostedExamError: error,
    updateHostedExamData: data?.updateHostedExam || {}
  };
};
