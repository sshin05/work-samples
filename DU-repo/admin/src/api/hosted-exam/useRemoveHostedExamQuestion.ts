import { gql, useMutation } from '@apollo/client';

// TODO: Come back to fix the codegen

export const useRemoveHostedExamQuestion = () => {
  const mutation = gql`
    mutation removeHostedExamQuestion($hostedExamId: ID!, $questionId: ID!) {
      removeHostedExamQuestion(
        hostedExamId: $hostedExamId
        questionId: $questionId
      )
    }
  `;
  const [removeHostedExamQuestion, { loading, error, data }] = useMutation(
    mutation,
    {
      refetchQueries: ['FindHostedExamById']
    }
  );
  return {
    removeHostedExamQuestion: (hostedExamId: string, questionId: string) =>
      removeHostedExamQuestion({
        variables: {
          hostedExamId,
          questionId
        }
      }),
    removeHostedExamQuestionLoading: loading,
    removeHostedExamQuestionError: error,
    removeHostedExamQuestionData: data?.removeHostedExamQuestion
  };
};
