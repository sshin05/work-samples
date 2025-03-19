import { gql, useMutation } from '@apollo/client';

// TODO: Come back to fix the codegen

export const useAddHostedExamQuestion = () => {
  const mutation = gql`
    mutation addHostedExamQuestion(
      $hostedExamId: ID!
      $questionInput: JSONObject!
    ) {
      addHostedExamQuestion(
        hostedExamId: $hostedExamId
        questionInput: $questionInput
      )
    }
  `;
  const [addHostedExamQuestion, { loading, error, data }] = useMutation(
    mutation,
    {
      refetchQueries: ['FindHostedExamById']
    }
  );
  return {
    addHostedExamQuestion: (hostedExamId: string, questionInput: object) =>
      addHostedExamQuestion({
        variables: {
          hostedExamId,
          questionInput
        }
      }),
    addHostedExamQuestionLoading: loading,
    addHostedExamQuestionError: error,
    addHostedExamQuestionData: data?.addHostedExamQuestion
  };
};
