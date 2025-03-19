import { gql, useMutation } from '@apollo/client';

// TODO: Come back to fix the codegen

export const useUpdateHostedExamQuestion = () => {
  const mutation = gql`
    mutation updateHostedExamQuestion(
      $hostedExamId: ID!
      $questionInput: JSONObject!
    ) {
      updateHostedExamQuestion(
        hostedExamId: $hostedExamId
        questionInput: $questionInput
      )
    }
  `;
  const [updateHostedExamQuestion, { loading, error, data }] = useMutation(
    mutation,
    {
      refetchQueries: ['FindHostedExamById']
    }
  );
  return {
    updateHostedExamQuestion: (hostedExamId: string, questionInput: object) =>
      updateHostedExamQuestion({
        variables: {
          hostedExamId,
          questionInput
        }
      }),
    updateHostedExamQuestionLoading: loading,
    updateHostedExamQuestionError: error,
    updateHostedExamQuestionData: data?.updateHostedExamQuestion
  };
};
