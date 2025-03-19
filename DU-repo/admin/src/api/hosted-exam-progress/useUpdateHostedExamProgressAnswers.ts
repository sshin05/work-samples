import { gql, useMutation } from '@apollo/client';
import type {
  InputMaybe,
  Scalars,
  UpdateHostedExamProgressAnswersMutation,
  UpdateHostedExamProgressAnswersMutationVariables
} from '@/api/codegen/graphql';

export const useUpdateHostedExamProgressAnswers = () => {
  const mutation = gql`
    mutation updateHostedExamProgressAnswers(
      $hostedExamId: ID!
      $userId: ID
      $answers: [JSONObject]!
    ) {
      updateHostedExamProgressAnswers(
        hostedExamId: $hostedExamId
        userId: $userId
        answers: $answers
      ) {
        score
        answers
        status
        startedAt
        completedAt
      }
    }
  `;
  const [_updateHostedExamProgressAnswers, { loading, error, data }] =
    useMutation<
      UpdateHostedExamProgressAnswersMutation,
      UpdateHostedExamProgressAnswersMutationVariables
    >(mutation);
  const updateHostedExamProgressAnswers = async (
    hostedExamId: string,
    answers:
      | Array<InputMaybe<Scalars['JSONObject']>>
      | InputMaybe<Scalars['JSONObject']>,
    userId: string | null | undefined = null
  ) =>
    _updateHostedExamProgressAnswers({
      variables: {
        hostedExamId,
        answers,
        userId
      }
    });
  return {
    updateHostedExamProgressAnswers,
    updateHostedExamProgressAnswersLoading: loading,
    updateHostedExamProgressAnswersError: error,
    updateHostedExamProgressAnswersData: data
  };
};
