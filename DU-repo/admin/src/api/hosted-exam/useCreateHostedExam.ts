import { gql, useMutation } from '@apollo/client';
import type {
  CreateHostedExamMutation,
  CreateHostedExamMutationVariables,
  NewHostedExamInput
} from '@/api/codegen/graphql';

export const useCreateHostedExam = () => {
  const mutation = gql`
    mutation CreateHostedExam($hostedExamInput: NewHostedExamInput!) {
      createHostedExam(hostedExamInput: $hostedExamInput) {
        id
        name
      }
    }
  `;
  const [createHostedExam, { loading, error, data }] = useMutation<
    CreateHostedExamMutation,
    CreateHostedExamMutationVariables
  >(mutation, { refetchQueries: ['FindMissionPartnerById'] });
  return {
    createHostedExam: (hostedExamInput: NewHostedExamInput) =>
      createHostedExam({
        variables: {
          hostedExamInput
        }
      }),
    createHostedExamLoading: loading,
    createHostedExamError: error,
    createHostedExamData: data
  };
};
